'use strict'

const db = require('./db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto2');

class API {
    constructor(token, id) {
        this.token = token;
        this.id = id;
        this.member = void 0;
        this.payload = {};

        this.init();
    }

    init() {
        this.payload = this.token && this.verifyJWT(this.token);
    }

    hash(value) {
        let salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(value, salt);
    }

    async generateJWT({ member }) {
        let salt = bcrypt.genSaltSync(10);
        let jwtid = await crypto.createPassword(salt, 32);

        let payload = {
            jwtid,
            member: member._id,
            auth: {
                email: member.email,
                name: member.name
            },
            key: member.publicKey
        };

        this.signJWT(member, payload);

        //await db.insert('token', payload);
        return this.token;
    }

    signJWT(member, payload) {
        this.token = jwt.sign(payload, member.privateKey, {algorithm: 'RS256', expiresIn: '1m'});
    }

    verifyJWT(token) {
        let payload = jwt.decode(token);

        try {
            jwt.verify(token, payload.key);
            this.member = payload.member;
        }
        catch(err) {
            this.revokeJWT(payload.jwtid);
            return { error: err.message};
        };

        return payload;
    }

    async revokeJWT(id) {
        this.token = void 0;
        this.payload = {};
    }

    default() {
        return {}
    }
};

class Auth extends API {
    constructor(...args) {
        super(...args);
    }

    default() {
        return this.payload && (this.payload.auth ? {auth: this.payload.auth, error: this.payload.error} : {auth: void 0, error: this.payload.error}) || {};
    }
}

class Account extends API {
    constructor(...args) {
        super(...args);
        //use proxy to handle not auth
    }

    default() {
        //console.log(this.payload.member);
        return this.payload ? {balance: {btc: .00001, bonus: 10}} : {error: 'AUTH ERROR'};
    }
}

class Signin extends API {
    constructor(...args) {
        super(...args);
    }

    async submit({email, password}) {
        //console.log(email, password);
        
        let member = await db.findOne('member', {email});
        let auth = member && await bcrypt.compare(`${email}:${password}`, member.hash);

        auth && await this.generateJWT({ member });

        let account = auth && new Account(this.token);
        let balance = account.default();
        

        return auth ? {auth: { name: member.name, email }, balance} : { error: 'Пользователь не найден' };
    }
}

class Signout extends API {
    constructor(...args) {
        super(...args);
    }

    async submit({email, password}) {
        this.payload && await this.revokeJWT(this.payload.jwtid);

        return {auth: void 0};
    }
}

class Signup extends API {
    constructor(...args) {
        super(...args);
    }

    async submit({name, email, password, referer}) {
        let member = await db.findOne('member', { email });

        if(!member) {
            let default_list = await db.findOne('list', { default: true });
            if(!default_list) {
                let roots = await db.find('member', { group: "root" });
                roots = roots.map((member, inx) => { 
                    member.position = inx;
                    return member._id;
                });
                default_list = await db.insert('list', { default: true, members: roots});
            }
    
            referer = referer || default_list.members.slice(-1)[0];

            let hash = this.hash(`${email}:${password}`);
            let {privateKey, publicKey} = await crypto.createKeyPair();

            let member = await db.insert('member', { group: "member", referer, name, email, hash, publicKey, privateKey });
            

            await this.generateJWT({ member });
    
            return { auth: { name, email } };
        }

        //this.revokeJWT(this.payload.jwtid);
        return { error: 'Не корректный адрес почтового ящика или пользователь уже зарегистрирован.', auth: this.payload && this.payload.auth };
    }
}

let classes = {
    API,
    Signin,
    Signup,
    Signout,
    Auth,
    Account
}

async function createObject(type, ...args) {
    let object = new type(...args);
    await object.init();

    return object;
}

module.exports = Object.entries(classes).reduce((memo, item) => {
    memo[item[0].toLowerCase()] = item[1];
    return memo;
}, {});

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
        this.payload = {}
    }

    async init() {
        this.payload = this.token && await this.verifyJWT(this.token);
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

        this.token = this.signJWT(member, payload);

        //await db.insert('token', payload);
        return this.token;
    }

    signJWT(member, payload) {
        return jwt.sign(payload, member.privateKey, {algorithm: 'RS256', expiresIn: '10s'});
    }

    async verifyJWT(token) {
        let payload = jwt.decode(token);

        try {
            jwt.verify(token, payload.key);
            this.member = payload.member;
        }
        catch(err) {
            await this.revokeJWT(payload.jwtid);
            return {};
        };

        return payload;
    }

    async revokeJWT(id) {
        //await db.remove('token', {_id: id});
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
        return this.payload && this.payload.auth ? {auth: this.payload.auth} : {auth: void 0};
    }
}

class Signin extends API {
    constructor(...args) {
        super(...args);
    }

    async submit({email, password}) {
        console.log(email, password);
        
        let hash = this.hash(`${email}:${password}`);
        let member = await db.findOne('member', {email});
        let auth = member && await bcrypt.compare(`${email}:${password}`, member.hash);

        auth && await this.generateJWT({ member });

        return auth ? {auth: { name: member.name, email }} : { error: 'Пользователь не найден' };
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

    async submit({name, email, password}) {
        let member = await db.findOne('member', { email });

        if(!member) {
            let hash = this.hash(`${email}:${password}`);
            let {privateKey, publicKey} = await crypto.createKeyPair();

            let member = await db.insert('member', { name, email, hash, publicKey, privateKey });
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
    Auth
}

module.exports = Object.entries(classes).reduce((memo, item) => {
    memo[item[0].toLowerCase()] = item[1];
    return memo;
}, {});

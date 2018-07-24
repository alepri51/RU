'use strict'

let collections = ['member', 'token', 'transaction', 'product', 'list'];

const cluster = require('cluster');
const path = require('path');

const Datastore = require('nedb');

if(cluster.isMaster) { 

    let db = module.exports;

    for (let inx in collections) {
        let collection = collections[inx];
        db[collection] = new Datastore({filename: path.join(__dirname, `nedb/_${collection}.db`), autoload: true});
    }

    db.find = function (collection, query, options) {
        return new Promise(function (resolve, reject) {
            db[collection].find(query).exec(function (err, results) {
                err ? reject(err) : resolve(results);
            })
        });
    };

    db.findOne = function (collection, query, options) {
        return new Promise(async function (resolve, reject) {
            try {
                let results = await db.find(collection, query, options);
                resolve(results[0]);
            }
            catch (err) {
                reject(err);
            }
        });
    };

    db.remove = function (collection, query, options) {
        return new Promise(function (resolve, reject) {
            db[collection].remove(query, {multi: true}, function (err, results) {
                err ? reject(err) : resolve(results);
            });

        });
    };

    /* db.update = function (collection, query, body) {
        return new Promise(async function (resolve, reject) {

            body.created = body.created || new Date() / 1;
            body.updated = new Date() / 1;

            let object = await db.findOne(collection, query, {allow_empty: true});
            object && (body = {...object, ...body});
            body && (delete body.id);

            db[collection].update(query, body, {upsert: true}, async function (err, results, upsert) {
                if (!results || err) {
                    reject(err || new NotFoundError(collection));
                }
                else {
                    results = upsert ? await db.find(collection, {_id: upsert._id}) : await db.find(collection, query);
                    results && resolve(results);
                    //reject(err || new NotFoundError(collection));
                }
            });

        });
    }; */

    db.insert = function (collection, data) {
        return new Promise(async function (resolve, reject) {
            db[collection].insert(data, function (err, inserted) {
                err ? reject(err) : resolve(inserted);
            });
        });
    };

    /* db.throttleLead = function (fn, threshhold = 250, scope) {
        let last;
        return function(...args) {
            const context = scope || this;
            const now = +(new Date());

            if (last && now > last + threshhold) {
                last = now;
                fn.apply(context, args);
            } else if (!last) {
                last = now;
                fn.apply(context, args);
            }
        };
    }; */
}
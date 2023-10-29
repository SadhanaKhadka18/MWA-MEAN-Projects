const MongoClient = require("mongodb").MongoClient;
const callbackify = require("util").callbackify;
let _connection = null;
const mongoClientConnectWithCallback = callbackify(function (url) {
    return MongoClient.connect(url);
});
const open = function () {
    if (get() == null) {
        MongoClient.connect(process.env.DB_URL, function (err, client) {
            if (err) {
                console.log("DB connection Failed");
                return;
            }
            _connection = client.db(process.env.DB_NAME);
            console.log("DB Conection open");
        });
    }

}
const get = function () {
    return _connection;

}
module.exports = { open, get }
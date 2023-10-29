const mongoose = require('mongoose');
const User = mongoose.model(process.env.USER_MODEL);
const bcrypt = require('bcrypt');

const _createResponse = function () {
    const response = { status: parseInt(process.env.SUCCESS_STATUS_CODE, process.env.BASE_DECIMAL), message: [] };
    return response;
}
const _createNewUser = function (name, username, password) {
    const user = { "name": name, "username": username, "password": password };
    return user;
}

const _setPassword = function (user, password) {
    return new Promise((resolve) => {
        user.password = password;
        resolve();
    });
}

const _setResponse = function (response, status, message) {
    response.status = parseInt(status, process.env.BASE_DECIMAL);
    response.message = message;
}
const _sendResponse = function (response, res) {
    res.status(response.status).json(response.message);
}

const _generateSalt = function () {
    saltRounds = parseInt(process.env.SALT_ROUNDS, 10);
    return bcrypt.genSalt(saltRounds);
}

const _generateHash = function (unEncrypted, salt) {
    return bcrypt.hash(unEncrypted, salt);

}
const _createQuery = function (username) {
    return { "username": username };
}
const _createUser = function (newUser) {
    return User.create(newUser);
}
const _findOneUser = function (loginUser) {
    return User.findOne(loginUser);
}
const _checkUserExist = function (user) {
    return new Promise((resolve, reject) => {
        if (null == user) {
            reject({ "message": "user Doesnot exists" })
        } else {
            resolve(user);
        }
    })

}
const _addUserToResponse = function (response, user) {
    response.message = user;
    return new Promise((resolve) => {
        resolve(user);
    })

}

const _comparePasswords = function (loginPassword, dbPassword) {
    return bcrypt.compare(loginPassword, dbPassword);
}
const _checkIfMatching = function (match) {
    return new Promise((resolve, reject) => {
        if (match) {
            resolve()
        } else {
            reject();
        }
    });
}

const getOne = function (req, res) {
    let response = _createResponse();
    console.log("get one User request");
    const loginUser = _createNewUser(req.body.name, req.body.username, req.body.password);
    const query = _createQuery(loginUser.username);

    _findOneUser(query)
        .then((dbUser) => _checkUserExist(dbUser))
        .then((existingUser) => _addUserToResponse(response, existingUser))
        .then((existingUser) => _comparePasswords(loginUser.password, existingUser.password))
        .then((match) => _checkIfMatching(match))
        .then(() => _setResponse(response, process.env.SUCCESS_STATUS_CODE, { "authentication": "success" }))
        .catch((error) => _setResponse(response, process.env.ERROR_STATUS_CODE, { "authentication": "Not Authorized" }))
        .finally(() => _sendResponse(response, res));

}
const addOne = function (req, res) {
    console.log("add one user");
    let response = _createResponse();
    let user = _createNewUser(req.body.name, req.body.username);
    _generateSalt()
        .then((salt) => _generateHash(req.body.password, salt))
        .then((encryptedPassword) => _setPassword(user, encryptedPassword))
        .then(() => _createUser(user))
        .then((addedUser) => _setResponse(response, process.env.SUCCESS_STATUS_CODE, addedUser))
        .catch((error) => _setResponse(response, process.env.ERROR_STATUS_CODE, { "message": "add new user unsucccessful" }))
        .finally(() => _sendResponse(response, res));
}



module.exports = {
    getOne,
    addOne
}
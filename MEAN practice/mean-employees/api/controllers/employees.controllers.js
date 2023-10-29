const mongoose = require("mongoose");
const Employee = mongoose.model(process.env.EMPLOYEEMODEL);
const bcrypt = require('bcrypt');

const getAll = function (req, res) {
    const count = process.env.DEFAULT_FIND_COUNT;
    let offset = process.env.DEFAULT_FIND_OFFSET;
    if (req.query && req.query.offset) {
        offset = req.query.offset;
    }
    Employee.find().limit(count).skip(offset).exec(function (err, employees) {
        const response = {
            status: parseInt(process.env.REST_API_OK, 10),
            message: employees
        };
        if (err) {
            response.status = parseInt(process.env.REST_API_SYSTEM_ERROR, 10);
            response.message = err;
        }
        res.status(response.status).json(response.message);
    });
}
const getAllByName = function (req, res) {
    const count = process.env.DEFAULT_FIND_COUNT;
    let offset = process.env.DEFAULT_FIND_OFFSET;
    if (req.query && req.query.offset) {
        offset = req.query.offset;
    }
    const name = req.params.employeeName;
    const query = { "name": name }
    console.log(query);
    Employee.find(query).limit(count).skip(offset).exec(function (err, employees) {
        const response = {
            status: parseInt(process.env.REST_API_OK, 10),
            message: employees
        };
        if (err) {
            response.status = parseInt(process.env.REST_API_SYSTEM_ERROR, 10);
            response.message = err;
        }
        res.status(response.status).json(response.message);
    });
}

const getOne = function (req, res) {
    const employeeId = req.params.employeeId;
    Employee.findById(employeeId).exec(function (err, employee) {
        const response = {
            status: parseInt(process.env.REST_API_OK, 10),
            message: employee
        };
        if (err) {
            response.status = parseInt(process.env.REST_API_SYSTEM_ERROR, 10);
            response.message = err;
        } else if (!employee) {
            response.status = parseInt(process.env.REST_API_RESOURCE_NOT_FOUND_ERROR, 10);
            response.message = {
                "message": process.env.REST_API_RESOURCE_NOT_FOUND_MESSAGE
            };
        }
        res.status(response.status).json(response.message);
    });
}
const updateOne = function (req, res) {
    const employeeId = req.params.employeeId;
    // console.log("here");
    Employee.findById(employeeId).exec(function (err, employee) {
        const response = {
            status: parseInt(process.env.REST_API_OK, 10),
            message: employee
        };
        if (err) {
            response.status = parseInt(process.env.REST_API_SYSTEM_ERROR, 10);
            response.message = err;

        } else if (!employee) {
            response.status = parseInt(process.env.REST_API_RESOURCE_NOT_FOUND_ERROR, 10);
            response.message = {
                "message": process.env.REST_API_RESOURCE_NOT_FOUND_MESSAGE
            };
        } else {
            const password = employee.password
            bcrypt.hash(password, 15).then((hash) => {
                employee.password = hash;
                employee.save().then((savedUser) => {
                    response.status = parseInt(process.env.REST_API_OK, 10);
                    response.message = savedUser;

                })
            }).catch((err) => {
                console.log(err);
            });


        }
        res.status(response.status).json(response.message);
    });
}

module.exports = {
    getAll: getAll,
    getOne: getOne,
    getAllByName: getAllByName,
    updateOne: updateOne
};
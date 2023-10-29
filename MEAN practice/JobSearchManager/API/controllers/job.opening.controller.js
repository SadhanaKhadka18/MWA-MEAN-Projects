const { response } = require('express');
const mongoose = require('mongoose');
const JobOpening = mongoose.model(process.env.JOB_OPENING_MODEL);

const createResponse = function () {
    let response = { status: parseInt(process.env.SUCCESS_STATUS_CODE, process.env.BASE_FOR_PARSING), message: "" }
    return response;
}
const setResponse = function (response, statusCode, responseMessage) {
    response.status = parseInt(statusCode, process.env.BASE_FOR_PARSING);
    response.message = responseMessage;
}
const sendResponse = function (response, res) {
    res.status(response.status).json(response.message);
}

const getAllJobOpenings = function (req, res) {
    let response = createResponse();
    const sixMonthAgo=new Date();
    sixMonthAgo.setMonth(sixMonthAgo.getMonth()-6);
    const query={"postDate":{$gte:sixMonthAgo}};
    console.log(query);
    JobOpening.find(query).then((allJobOpenings) => {
        if (allJobOpenings.length == 0) {
            setResponse(response, process.env.NOT_FOUND_STATUS_CODE, { "message": "No Job Openings" });
        } else {
            setResponse(response, process.env.SUCCESS_STATUS_CODE, allJobOpenings);
        }
    })
        .catch((err) => {
            console.log(err);
            setResponse(response, process.env.ERROR_STATUS_CODE, process.env.ERROR_MESSSAGE);
        })
        .finally(() => {
            sendResponse(response, res);
        })
}

const addOneJobOpening = function (req, res) {
    console.log("add one request");
    const newJobOpening = {
        "title": req.body.title, "salary": req.body.salary, "location": req.body.location,
        "description": req.body.description, "experience": req.body.experience, "skills": req.body.skills,
        "postDate": req.body.postDate
    }
    let response = createResponse();
    JobOpening.create(newJobOpening).then((createdJobOpening) => {
        if (!createdJobOpening) {
            setResponse(response, process.env.NOT_FOUND_STATUS_CODE, { "message": "Job Opening is not added" });
        } else {
            setResponse(response, process.env.SUCCESS_STATUS_CODE, createdJobOpening)
        }
    })
        .catch((err) => {
            console.log(err);
            setResponse(response, process.env.ERROR_STATUS_CODE, process.env.ERROR_MESSSAGE)
        })
        .finally(() => {
            sendResponse(response, res);
        })

}

const getOneJobOpening = function (req, res) {
    let response = createResponse();
    const jobOpeningId = req.params.jobId;

    JobOpening.findById(jobOpeningId).then((foundJobOpening) => {
        if (!foundJobOpening) {
            setResponse(response, process.env.NOT_FOUND_STATUS_CODE, { "message": "No Job Opening found" });
        } else {
            setResponse(response, process.env.SUCCESS_STATUS_CODE, foundJobOpening);
        }
    })
        .catch((err) => {
            console.log(err);
            setResponse(response, process.env.ERROR_STATUS_CODE, process.env.ERROR_MESSSAGE);
        })
        .finally(() => {
            console.log(response);
            sendResponse(response, res);
        })

}
const _updateOne = function (req, res, updateCallbackFunction) {
    let response = createResponse();
    const jobOpeningId = req.params.jobId;
    JobOpening.findById(jobOpeningId).exec().then((foundJobOpening) => {
        if (!foundJobOpening) {
            setResponse(response, process.env.NOT_FOUND_STATUS_CODE, { "message": "No job found to update" })
        } else {
            updateCallbackFunction(req, res, foundJobOpening)
        }
    }).catch((err) => {
        console.log(err);
        setResponse(response, process.env.ERROR_STATUS_CODE, { "message": "error findinf job opening to update" })
    })
        .finally(() => {
            if (response.status != process.env.SUCCESS_STATUS_CODE) {
                sendResponse(response, res);
            }

        })
}

const _updateOneJobOpeningPartially = function (req, res, foundJobOpening) {
    let response = createResponse();
    if (req.body.title) {
        foundJobOpening.title = req.body.title;
    }
    if (req.body.salary) {
        foundJobOpening.salary = req.body.salary;
    }
    if (req.body.location) {
        foundJobOpening.location = req.body.location;
    }
    if (req.body.description) {
        foundJobOpening.description = req.body.description;
    }
    if (req.body.experience) {
        foundJobOpening.experience = req.body.experience;
    }
    if (req.body.skills) {
        foundJobOpening.skills = req.body.skills;
    }
    if (req.body.postDate) {
        foundJobOpening.postDate = req.body.postDate;
    }
    foundJobOpening.save().then((updatedJobOpening) => {
        if (!updatedJobOpening) {
            setResponse(response, process.env.ERROR_STATUS_CODE, { "message": "error updating job opening" })
        } else {
            setResponse(response, process.env.SUCCESS_STATUS_CODE, updatedJobOpening)
        }
    })
        .catch((err) => {
            console.log(err);
            setResponse(response, process.env.ERROR_STATUS_CODE, { "message": "error updating job opening" })
        })
        .finally(() => {
            sendResponse(response, res);
        })
}

const _updateOneJobOpeningfully = function (req, res, foundJobOpening) {
    let response = createResponse();

    foundJobOpening.title = req.body.title;
    foundJobOpening.salary = req.body.salary;
    foundJobOpening.location = req.body.location;
    foundJobOpening.description = req.body.description;
    foundJobOpening.experience = req.body.experience;
    foundJobOpening.skills = req.body.skills;
    foundJobOpening.postDate = req.body.postDate;

    foundJobOpening.save().then((updatedJobOpening) => {
        if (!updatedJobOpening) {
            setResponse(response, process.env.ERROR_STATUS_CODE, { "message": "error updating job opening" })
        } else {
            setResponse(response, process.env.SUCCESS_STATUS_CODE, updatedJobOpening)
        }
    })
        .catch((err) => {
            console.log(err);
            setResponse(response, process.env.ERROR_STATUS_CODE, { "message": "error updating job opening" })
        })
        .finally(() => {
            sendResponse(response, res);
        })


}
const updateOneJobOpeningfully = function (req, res) {

    console.log("full delete job opening request");
    _updateOne(req, res, _updateOneJobOpeningfully);


}
const updateOneJobOpeningPartially = function (req, res) {
    console.log("partial delete job opening request");
    _updateOne(req, res, _updateOneJobOpeningPartially);
}

const deleteOneJobOpening = function (req, res) {
    console.log("delete ine job request");
    const jobOpeningId = req.params.jobId;
    let response = createResponse();
    JobOpening.findByIdAndDelete(jobOpeningId).exec()
        .then((deletedJobOpening) => {
            if (!deleteOneJobOpening) {
                setResponse(response, process.env.NOT_FOUND_STATUS_CODE, { "message": "empty deleted object" })
            } else {
                setResponse(response, process.env.SUCCESS_STATUS_CODE, { "deleted job opening": deletedJobOpening })
            }
        })
        .catch((err) => {
            console.log(err);
            setResponse(response, process.env.ERROR_STATUS_CODE, process.env.ERROR_MESSSAGE);
        })
        .finally(() => {
            sendResponse(response, res);
        })

}
module.exports = {
    getAllJobOpenings,
    addOneJobOpening,
    getOneJobOpening,
    updateOneJobOpeningPartially,
    updateOneJobOpeningfully,
    deleteOneJobOpening
}
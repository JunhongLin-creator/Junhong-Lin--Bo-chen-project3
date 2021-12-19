const mongoose = require("mongoose")
const JobSchema = require('../schema/job.Schema').JobSchema



const JobModel = mongoose.model("Job", JobSchema);

function insertjob(job) {
    return JobModel.create(job);
}

function getAllJob() {
    return JobModel.find().exec();
}

function findJobByTitle(title) {
    return JobModel.find({"title": title}).exec();
}

function findJobById(id) {
    return JobModel.findById(id).exec();
}

function findByIdAndRemove(id) {
    return JobModel.findByIdAndRemove(id).exec();
}

function findByIdAndUpdate(id, body) {
    return JobModel.findByIdAndUpdate(id, body).exec();
}

function findOne(id) {
    return JobModel.findOne(id).exec();
}


// Make sure to export a function after you create it!
module.exports = {
    insertjob,
    findJobByTitle,
    getAllJob,
    findJobById,
    findByIdAndRemove,
    findByIdAndUpdate,
    findOne
};
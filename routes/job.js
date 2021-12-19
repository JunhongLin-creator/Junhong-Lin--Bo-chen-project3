const express = require('express');
const match = require('nodemon/lib/monitor/match');
const auth_middleware = require('./auth_middleware');
const router = express.Router()
const JobAccessor = require('./models/Jobs.Model');

// get all jobs
router.get('/', function(request, response, next) {
    return JobAccessor.getAllJob()
    .then(jobResponse => response.status(200).send(jobResponse))
    .catch(error => response.status(400).send(error))
})



//get one job by id

// router.get('/:id', function(request, response) {
//     return JobAccessor.findJobByTitle(request.title)
//     .then(jobResponse => response.status(200).send(jobResponse))
//     .catch(error => response.status(400).send(error))
    
//   })
router.get('/getById/:id', function(req, res, next) {
    JobAccessor.findJobById(req.params.id).then(function (job) {
        res.send(job)
    }).catch(next)
})

// get one job by title
router.get('/get_matched_jobs', function(req, res, next) {
    // return JobAccessor.findJobByTitle(req.body.title)
    // .then(jobResponse => response.status(200).send(jobResponse))
    // .catch(error => response.status(400).send(error))
    
    JobAccessor.findJobByTitle(req.query.title).then(function (job) {
        res.send(job)
    }).catch(next)
})



// add new job
router.post('/', auth_middleware, (request, response) => {
    const job = request.body;
    if(!job.title || !job.description || !job.location || !job.companyName) {
      return response.status(422).send("Missing data");
    }
    //pokemon.owner = request.username;
  
    JobAccessor.insertjob(request.body)
      .then(jobResponse => response.status(200).send(jobResponse))
      .catch(error => response.status(400).send(error))
})
// router.post('/jobs', function(req, res, next) {
//     Job.create(req.body)
//     .then(function (job) {
//         res.send(job)
//     }).catch(next)
// })


// update job
router.put('/:id', auth_middleware, function(req, res, next){
    JobAccessor.findByIdAndUpdate(req.params.id, req.body)
    .then(function () {
        JobAccessor.findJobById(req.params.id).then(function (job) {
            res.send(job)
        })
    }).catch(next)
})


// delete job
router.delete('/:id' ,function(req, res, next){
    JobAccessor.findByIdAndRemove(req.params.id)
    .then(function (job) {
        res.send(job)
    }).catch(next)
})



module.exports = router;
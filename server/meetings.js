const express = require('express');
const meetingsRouter = express.Router();

module.exports = meetingsRouter;

const {
    createMeeting,
    getAllFromDatabase,
    deleteAllFromDatabase,
} = require('./db');


meetingsRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('meetings'));
});

meetingsRouter.post('/', (req, res, next) => {
    newMeeting = createMeeting();
    res.send(201).send(newMeeting);
});

meetingsRouter.delete('/', (req, res, next) => {
    const deleted = deleteAllFromDatabase('meetings')
});

/*
  - GET /api/meetings to get an array of all meetings.
  - POST /api/meetings to create a new meeting and save it to the database.
  - DELETE /api/meetings to delete *all* meetings from the database.
*/
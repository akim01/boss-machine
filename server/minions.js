const express = require('express');
const minionsRouter = express.Router();

module.exports = minionsRouter;

const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
} = require('./db');

minionsRouter.param('minionId', (req, res, next, id) => {
    const minionId = Number(id);
    minionSelected = getFromDatabaseById('minions', minionId);
    if (minionSelected) {
        req.minionId = minionId;
        req.minion = minionSelected;
        next();
    } else {
        res.status(404).send('Minion not found!');
    }
});

minionsRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('minions'));
});

minionsRouter.post('/', (req, res, next) => {
    newMinion = req.body;
    addToDatabase('minions', newMinion);
    res.status(201).send(newMinion);
});

minionsRouter.get('/:minionId', (req, res, next) => {
    res.send(req.minion);
});

minionsRouter.put('/:minionId', (req, res, next) => {
    let updatedMinion = updateInstanceInDatabase('minions', req.body);
    res.send(updatedMinion);
});

minionsRouter.delete('/:minionId', (req, res, next) => {
    const deleted = deleteFromDatabasebyId('minions', req.params.minionId);
    if (deleted) {
        res.status(204);
    } else {
        res.status(500);
    }
    res.send();
});

const express = require('express');
const ideasRouter = express.Router();

module.exports = ideasRouter;

const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
} = require('./db');

ideasRouter.param('ideaId', (req, res, next, id) => {
    const ideaId = Number(id);
    ideaSelected = getFromDatabaseById('idea', ideaId);
    if (ideaSelected) {
        req.idea = ideaSelected;
        next();
    } else {
        res.status(404).send('Idea not found!');
    }
});

ideasRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('ideas'));
});

ideasRouter.post('/', (req, res, next) => {
    newIdea = req.body;
    addToDatabase('ideas', newIdea);
    res.status(201).send(newIdea);
});

ideasRouter.get('/:ideaId', (req, res, next) => {
    res.send(req.idea);
});

ideasRouter.put('/:ideaId', (req, res, next) => {
    let updatedIdea = updateInstanceInDatabase('ideas', req.body);
    res.send(updatedIdea);
});

ideasRouter.delete('/:ideaId', (req, res, next) => {
    const deleted = deleteFromDatabasebyId('ideas', req.params.ideaId);
    if (deleted) {
        res.status(204);
    } else {
        res.status(500);
    }
    res.send();
});

/*
- **`/api/ideas`**
    - GET /api/ideas to get an array of all ideas.
    - POST /api/ideas to create a new idea and save it to the database.
    - GET /api/ideas/:ideaId to get a single idea by id.
    - PUT /api/ideas/:ideaId to update a single idea by id.
    - DELETE /api/ideas/:ideaId to delete a single idea by id.
 */

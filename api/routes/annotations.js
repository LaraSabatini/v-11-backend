const express = require('express');
const router = express.Router();
const annotations = require('../services/annotations');

router.get('/', async function(req, res, next) {
    try {
      res.json(await annotations.getMultiple(req.query.page));
      console.log(req);
    } catch (err) {
      console.error(`Error while getting the annotations `, err.message);
      next(err);
    }
});

router.get('/todos/done=:done', async function(req, res, next) {
  try {
    res.json(await annotations.getToDosByDone(req.params.done, req.query.page));
    console.log(req);
  } catch (err) {
    console.error(`Error while getting the annotations `, err.message);
    next(err);
  }
});

router.get('/todos', async function(req, res, next) {
    try {
      res.json(await annotations.getToDos(req.query.page));
      console.log(req);
    } catch (err) {
      console.error(`Error while getting the todos `, err.message);
      next(err);
    }
});

router.get('/notes/order=:order', async function(req, res, next) {
    try {
      res.json(await annotations.getNotes(req.params.order, req.query.page));
      console.log(req);
    } catch (err) {
      console.error(`Error while getting the notes `, err.message);
      next(err);
    }
});

router.get('/notes/date=:date', async function(req, res, next) {
  try {
    res.json(await annotations.getNotesByDate(req.params.date, req.query.page,));
    console.log(req);
  } catch (err) {
    console.error(`Error while getting the notes`, err.message);
    next(err);
  }
});

router.post('/', async function(req, res, next) {
    try {
      res.json(await annotations.create(req.body));
    } catch (err) {
      console.error(`Error while creating annotation`, err.message);
      next(err);
    }
});

router.delete('/:id', async function(req, res, next) {
    try {
      res.json(await annotations.deleteAnnotation(req.params.id));
    } catch (err) {
      console.error(`Error while deleting annotation`, err.message);
      next(err);
    }
});

router.put('/:id', async function(req, res, next) {
    try {
      res.json(await annotations.update(req.params.id, req.body));
    } catch (err) {
      console.error(`Error while updating annotation`, err.message);
      next(err);
    }
});

module.exports = router;
const express = require('express');

const router = express.Router();
const annotations = require('../services/annotations');

router.get('/', async (req, res, next) => {
  try {
    res.json(await annotations.getMultiple(req.query.page));
  } catch (err) {
    next(err);
  }
});

router.get('/todos/done=:done', async (req, res, next) => {
  try {
    res.json(await annotations.getToDosByDone(req.params.done, req.query.page));
  } catch (err) {
    next(err);
  }
});

router.get('/todos', async (req, res, next) => {
  try {
    res.json(await annotations.getToDos(req.query.page));
  } catch (err) {
    next(err);
  }
});

router.get('/notes/order=:order', async (req, res, next) => {
  try {
    res.json(await annotations.getNotes(req.params.order, req.query.page));
  } catch (err) {
    next(err);
  }
});

router.get('/notes/date=:date', async (req, res, next) => {
  try {
    res.json(await annotations.getNotesByDate(req.params.date, req.query.page));
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    res.json(await annotations.create(req.body));
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    res.json(await annotations.deleteAnnotation(req.params.id));
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    res.json(await annotations.update(req.params.id, req.body));
  } catch (err) {
    next(err);
  }
});

module.exports = router;

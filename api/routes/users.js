const express = require('express');
const router = express.Router();
const users = require('../services/users');

/* GET users */
router.get('/users', async function(req, res, next) {
  try {
    res.json(await users.getMultiple(req.query.page));
    console.log(req);
  } catch (err) {
    console.error(`Error while getting the users `, err.message);
    next(err);
  }
});

// /* GET products */
// router.get('/', async function(req, res, next) {
//   try {
//     res.json(await products.getMultiple(req.query.page));
//     console.log(req);
//   } catch (err) {
//     console.error(`Error while getting products `, err.message);
//     next(err);
//   }
// });

/* SEARCH products */
// router.get('/busqueda/:value', async function(req, res, next) {
//   try {
//     res.json(await products.search(req.params.value, req.query.page));
//     console.log(req);
//   } catch (err) {
//     console.error(`Error while getting search `, err.message);
//     next(err);
//   }
// });

/* SEARCH products by category */
// router.get('/category/:value', async function(req, res, next) {
//   try {
//     res.json(await products.searchByCategory(req.params.value, req.query.page));
//     console.log(req);
//   } catch (err) {
//     console.error(`Error while getting search `, err.message);
//     next(err);
//   }
// });

// /* SEARCH products by subcategory */
// router.get('/subcategory/:value', async function(req, res, next) {
//   try {
//     res.json(await products.searchBySubCategory(req.params.value, req.query.page));
//     console.log(req);
//   } catch (err) {
//     console.error(`Error while getting search `, err.message);
//     next(err);
//   }
// });

// /* POST products */
// router.post('/', async function(req, res, next) {
//     try {
//       res.json(await products.create(req.body));
//     } catch (err) {
//       console.error(`Error while creating product`, err.message);
//       next(err);
//     }
//   });

// /* PUT product */
// router.put('/:id', async function(req, res, next) {
//     try {
//       res.json(await products.update(req.params.id, req.body));
//     } catch (err) {
//       console.error(`Error while updating product`, err.message);
//       next(err);
//     }
// });

// /* DELETE product */
// router.delete('/:id', async function(req, res, next) {
//     try {
//       res.json(await products.remove(req.params.id));
//     } catch (err) {
//       console.error(`Error while deleting product`, err.message);
//       next(err);
//     }
// });

module.exports = router;
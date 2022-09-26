const express = require("express");
const app = express();
const port = 3000;

const usersRouter = require("./api/routes/users");
const partnersRouter = require("./api/routes/partners");
const trainersRouter = require("./api/routes/trainers");
const productsRouter = require("./api/routes/products");
const categoriesRouter = require("./api/routes/categories");
const brandsRouter = require("./api/routes/brands");
const pricesRouter = require("./api/routes/prices");
const combosRouter = require("./api/routes/combos")
const partnersPaymentRouter = require("./api/routes/partnersPayment")
const scheduleRouter = require("./api/routes/schedule")
const digitalPaymentsRouter = require("./api/routes/digitalPayments")
const storePaymentsRouter = require("./api/routes/storePayments")
const boulderPurchasesRouter = require("./api/routes/boulderPurchases")

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
     next();
});

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

app.use("/users", usersRouter);
/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message});
  return;
});

app.use("/partners", partnersRouter);
/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message});
  return;
});

app.use("/trainers", trainersRouter);
/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message});
  return;
});

app.use("/products", productsRouter);
/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message});
  return;
});

app.use("/categories", categoriesRouter);
/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message});
  return;
});

app.use("/brands", brandsRouter);
/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message});
  return;
});

app.use("/prices", pricesRouter);
/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message});
  return;
});

app.use("/combos", combosRouter);
/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message});
  return;
});

app.use("/partnersPayment", partnersPaymentRouter);
/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message});
  return;
});

app.use("/schedule", scheduleRouter);
/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message});
  return;
});

app.use("/digitalPayments", digitalPaymentsRouter);
/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message});
  return;
});

app.use("/storePayments", storePaymentsRouter);
/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message});
  return;
});

app.use("/boulderPurchases", boulderPurchasesRouter);
/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message});
  return;
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
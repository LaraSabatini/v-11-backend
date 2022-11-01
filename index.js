const express = require("express");
const app = express();
const port = 3000;

const usersRouter = require("./api/routes/users");
const productsRouter = require("./api/routes/products");
const brandsRouter = require("./api/routes/brands");
const categoriesRouter = require("./api/routes/categories");
const digitalPaymentsRouter = require("./api/routes/digitalPayments")
const storePaymentsRouter = require("./api/routes/storePayments")
const boulderPurchasesRouter = require("./api/routes/boulderPurchases")
const partnersPaymentRouter = require("./api/routes/partnersPayment")
const partnersRouter = require("./api/routes/partners");
const trainersRouter = require("./api/routes/trainers");
const pricesRouter = require("./api/routes/prices");
const combosRouter = require("./api/routes/combos")
const lessonsPurchasedRouter = require("./api/routes/lessonsPurchased")
const workingHoursRouter = require("./api/routes/workingHours")
const sendEmailRouter = require("./api/routes/sendEmail")

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
app.use("/partners", partnersRouter);
app.use("/trainers", trainersRouter);
app.use("/products", productsRouter);
app.use("/categories", categoriesRouter);
app.use("/brands", brandsRouter);
app.use("/prices", pricesRouter);
app.use("/combos", combosRouter);
app.use("/partnersPayment", partnersPaymentRouter);
app.use("/digitalPayments", digitalPaymentsRouter);
app.use("/storePayments", storePaymentsRouter);
app.use("/boulderPurchases", boulderPurchasesRouter);
app.use("/workingHours", workingHoursRouter);
app.use("/lessonsPurchased", lessonsPurchasedRouter);
app.use("/sendEmail", sendEmailRouter);
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
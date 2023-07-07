const express = require('express');
const cors = require('cors');

const app = express();
const port = 3001;

const usersRouter = require('./api/routes/users');
const productsRouter = require('./api/routes/products');
const brandsRouter = require('./api/routes/brands');
const categoriesRouter = require('./api/routes/categories');
const digitalPaymentsRouter = require('./api/routes/digitalPayments');
const storePaymentsRouter = require('./api/routes/storePayments');
const boulderPurchasesRouter = require('./api/routes/boulderPurchases');
const partnersPaymentRouter = require('./api/routes/partnersPayment');
const partnersRouter = require('./api/routes/partners');
const trainersRouter = require('./api/routes/trainers');
const pricesRouter = require('./api/routes/prices');
const combosRouter = require('./api/routes/combos');
const lessonsPurchasedRouter = require('./api/routes/lessonsPurchased');
const workingHoursRouter = require('./api/routes/workingHours');
const annotationsRouter = require('./api/routes/annotations');
const sendEmailRouter = require('./api/routes/sendEmail');
const closedTillRouter = require('./api/routes/closedTill');
const businessLogicRouter = require('./api/routes/businessLogic');
const lessonScheduleRouter = require('./api/routes/lessonSchedule');
const kidsRouter = require('./api/routes/kids');
const lessonStudentsRouter = require('./api/routes/lessonStudents');

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(
  cors({
    origin: ['http://localhost:3000', 'https://v-11.vercel.app', 'https://v-11-qa.vercel.app'],
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Auth-Token', 'auth-token-expiration'],
    exposedHeaders: ['Content-Type', 'Auth-Token', 'auth-token-expiration'],
    credentials: true,
  }),
);

app.get('/', (req, res) => {
  res.json({ message: 'ok' });
});

app.use('/users', usersRouter);
app.use('/partners', partnersRouter);
app.use('/trainers', trainersRouter);
app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);
app.use('/brands', brandsRouter);
app.use('/prices', pricesRouter);
app.use('/combos', combosRouter);
app.use('/partnersPayment', partnersPaymentRouter);
app.use('/digitalPayments', digitalPaymentsRouter);
app.use('/storePayments', storePaymentsRouter);
app.use('/boulderPurchases', boulderPurchasesRouter);
app.use('/workingHours', workingHoursRouter);
app.use('/lessonsPurchased', lessonsPurchasedRouter);
app.use('/annotations', annotationsRouter);
app.use('/sendEmail', sendEmailRouter);
app.use('/closedTill', closedTillRouter);
app.use('/businessLogic', businessLogicRouter);
app.use('/lessonSchedule', lessonScheduleRouter);
app.use('/kids', kidsRouter);
app.use('/lessonStudents', lessonStudentsRouter);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  // eslint-disable-next-line no-console
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  next(err);
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening at http://localhost:${port}`);
});

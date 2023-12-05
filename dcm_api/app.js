var createError = require('http-errors');
var express = require('express');
var cors = require('cors')
const connectDb = require('./Config/db')

var agencyRouter = require('./routes/agencyRoute');
var usersRouter = require('./routes/userRoute');
var clientRouter = require('./routes/clientRoute')
var categoryRouter = require('./routes/categoryRoute')
var productRouter = require('./routes/productRoute')
var saleRouter = require('./routes/saleRoute')
var venteRouter = require('./routes/venteRoute')

var app = express();
connectDb()

app.use(cors());
app.use(express.json({ extended: false }));

app.use('/api/v1', usersRouter);
app.use('/api/v1/agency', agencyRouter);
app.use('/api/v1/clients', clientRouter);
app.use('/api/v1/category', categoryRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/sales', saleRouter);
app.use('/api/v1/ventes', venteRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors')
require('dotenv/config');
app.use(express.json());

app.use(cors());
//console.log(process.env);
/* --------------------------- Authencation Router -------------------------- */
const authRouter = require('./src/api/routes/auth');
app.use('/api',authRouter);
/* ------------------------------- Tour router ------------------------------ */
const toursRouter = require('./src/api/routes/tours');
app.use('/api/tours', toursRouter);

/* ------------------------------ Profile router ----------------------------- */
const profileRouter = require('./src/api/routes/profile');
app.use('/api/profile', profileRouter);
/* ------------------------------ Profile router ----------------------------- */
const bookingRouter = require('./src/api/routes/booking');
app.use('/api/booking', bookingRouter);



/* -----------------------------DB CONNECT------------------------------- */
mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true,useFindAndModify:false }
).then(db => console.log('Connect to Db successfully'));
/* -------------------------------------------------------------------------- */
app.use(express.static('./dist/web-app'));
app.get('/*', function (req, res) {
    res.sendFile('index.html', { root: 'web-app' }
    );
});


const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`API server running on port ${port}!`))
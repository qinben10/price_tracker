const express = require('express');
const app = express();
const volleyball = require('volleyball');
const path = require('path');
const { db } = require('./db');


app.use(volleyball)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

app.use('/api', require('./api'));

app.use('*', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });

app.use((err, req, res, next) => {
    if (process.env.NODE_ENV !== 'test') console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error');
  });


const init = async () => {
    try {
      await db.sync();
      app.listen(process.env.PORT || 5000)
    } catch (err) {
      console.log(err);
    }
  };
  
  init();


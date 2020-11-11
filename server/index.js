const express = require('express');
const app = express();
const volleyball = require('volleyball');
const path = require('path');
const Crawler = require("crawler");

app.use(volleyball)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));


let price = ''
const c = new Crawler({
    maxConnections : 10,
    // This will be called for each crawled page
    callback : function (error, res, done) {
        if(error){
            console.log(error);
        }else{
            const $ = res.$;
            // $ is Cheerio by default
            //a lean implementation of core jQuery designed specifically for the server
             price = $("#priceblock_ourprice").text()
            console.log(price);
        }
        done();
    }
});
 
// Queue just one URL, with default callback

c.queue('https://www.amazon.com/Apple-MacBook-13-inch-256GB-Storage/dp/B0863D4XJW/ref=sr_1_1_sspa?dchild=1&keywords=macbook&qid=1605058946&sr=8-1-spons&psc=1&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUExRjNENEpNQktEQk1XJmVuY3J5cHRlZElkPUExMDE0NDIwMlJWSVVFRkZRUEswQyZlbmNyeXB0ZWRBZElkPUEwMzQyNDY0MklJVkUyTzNWNTZaJndpZGdldE5hbWU9c3BfYXRmJmFjdGlvbj1jbGlja1JlZGlyZWN0JmRvTm90TG9nQ2xpY2s9dHJ1ZQ==');
console.log(price)

app.get('/api/price',async (req,res,next) => {
    try{
       res.send(price)
    }
    catch(err){

    }
})

app.use('*', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });

app.use((err, req, res, next) => {
    if (process.env.NODE_ENV !== 'test') console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error');
  });


const init = async () => {
    try {
      app.listen(process.env.PORT || 5000)
    } catch (err) {
      console.log(err);
    }
  };
  
  init();


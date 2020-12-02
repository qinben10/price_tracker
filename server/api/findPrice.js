const router = require('express').Router();
const Crawler = require("crawler"); 
const {Trackers} = require('../db/index').models


let price = ''
const newEggCatch = new Crawler({
    maxConnections : 10,
    // This will be called for each crawled page
    callback : function (error, res, done) {
        if(error){
            console.log(error);
        }else{
            const $ = res.$;
            price = $('.price-current','.product-price').text()
        }
        done();
    }
});

const testpageCatch = new Crawler({
  maxConnections : 10,
  // This will be called for each crawled page
  callback : function (error, res, done) {
      if(error){
          console.log(error);
      }else{
          const $ = res.$;
          price = $("title").text()
      }
      done();
  }
});



router.get('/',async (req,res,next) => {
    try{
        const urlX = req.query.uri
        const option = req.query.option
        if(option === 'test'){
          testpageCatch.queue(urlX)
        }
        else if(option ==='newegg'){
          newEggCatch.queue(urlX)
        };
        await res.send(price)
    }
    catch(err){

    }
})

router.post('/priceupdate',async (req,res,next) => {
    try{
        const {uri,price,user,email} = req.body

        const foundUri = await Trackers.findOne({ where: {uri: uri} })
        if(foundUri === null){
          const newTracker = await Trackers.create({price: price, uri:uri, user:user, email:email})
        }
        else{
        await foundUri.update({
          price: price
        })
        }
        
    }
    catch(err){
        console.log(err)
    }
})

router.post('/settracker',async(req,res,next) => {
    try{
        const {uri,user,email} = req.body
            newEggCatch.queue(uri)
        setInterval(async()=>{
            newEggCatch.queue(uri)
            const foundUri = await Trackers.findOne({ where: {uri: uri} })
            if(foundUri === null){
              await Trackers.create({price: price, uri:uri, user:user, email:email})
            }
            else{
                price = '$1'
            await foundUri.update({
              price: price
            })
            }
        },10*1000)
    }
    catch(err){
        console.log(err)
    }
})

module.exports = router;
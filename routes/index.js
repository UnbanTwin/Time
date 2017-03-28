var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/times');
var Time = mongoose.model('Time', { id: Number, name: String, time: String });
time = 10
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});
router.get('/list',function(req,res,next){
    Time.find().lean().exec(function (err, data) {
        return res.render('list', {timeList: data});
    });
});
router.post('/post/time/:name/:time', function(req, res, next) {
    var currentTime = new Time({id: 1, name: req.params.name, time: req.params.time})
    currentTime.save(function (err) {
        if (err) {
            console.log(err);
            res.end(err)
        } else {
            console.log('Meow Saved! Meow');
            res.end("EVERYTHING IS FINE")
        }
    });

});
module.exports = router;

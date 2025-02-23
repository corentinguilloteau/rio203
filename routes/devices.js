var express = require('express');
var router = express.Router();

var routerDevice = require('./device');

/* GET users listing. */
router.get('/', function(req, res, next) {
    req.db.collection('devices').aggregate([{
        $lookup:{
            from: "rooms",
            localField: "room",
            foreignField: "_id",
            as: "room"
        }
    }]).toArray(function(err, quer)
    {
        if(err)
        {
            res.status(500)
            res.end("{}")
            console.log(err)
            return
        }

        res.status(200)
        res.end(JSON.stringify(quer))
    });
});

router.use('/', routerDevice);


module.exports = router;

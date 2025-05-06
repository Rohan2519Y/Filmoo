var express = require('express');
var router = express.Router();
var pool=require('./pool')
/* GET users listing. */
router.get('/fetch_categories',function(req,res,next){
    try{
        pool.query('select * from category', function (error,result){
            if(error){
                console.log(error)
                res.status(200).json({status:false,message:'Database Error,Pls Contact Backend Team'})
            }
            else{
                res.status(200).json({status:true,message:'Success..',data:result})
            }
        })
    }
    catch(e){
        res.status(200).json({status:false,message:'Critical Error,Pls Contact Server Administrator'})
    }
})

module.exports = router;

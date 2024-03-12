const express = require('express');
const router = express.Router();
var cors = require('cors');

router.use(cors())

router.get("/",(req,res)=>{
    res.send('server is up and running').status(200);
})

module.exports = router;
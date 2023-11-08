const express = require('express');
const router = express.Router();
// const student=require("../models/student");

const {getALL,Add,Update,Delete,getList,Operation,Login,verifyauto}=require("../controller/memberCont");


  router.post('/add', Add)
  router.get('/operation', Operation)
  router.get('/list', getList)
  router.get('/all',verifyauto, getALL)
  // router.get('/one/:id', One);
  router.put('/update/:id', Update)
  router.delete("/delete/:id",Delete)
  router.post('/login', Login)


// Export the router
module.exports = router;

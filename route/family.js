const express = require('express');
const router = express.Router();

const { getList, CreateFamily ,UpdateBatch,Updatefamily,join} = require('../controller/familyCont');

  router.post('/create', CreateFamily);
  router.get('/list', getList);
  router.put('/UpdateBatch', UpdateBatch);
  router.put('/Updatefamily', Updatefamily);
  router.put('/join', join);

module.exports = router;

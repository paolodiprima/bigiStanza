const express = require('express');
const router = new express.Router();
const checkAuth = require('../middleware/checkAuth');
const adminAppartModel = require('../models/appartamentiModel');

// routers that loads data of add or update appartments
// and render interface: adminAddUpdateAppart

// appartment data mangement in mode update = true
router.get('/:appartid', checkAuth, (req, res) => {

  var id = req.params.appartid;

  adminAppartModel.findById(id)
    .then((data) => {
      data.update = true;
      const dataJSON = JSON.parse(JSON.stringify(data));
      res.render('adminAddUpdateAppart', { appart: dataJSON }); //append object appartment list

    })
    .catch((err) => {
      console.log("ERRORE", err);
      res.send('error', err);
    });

});

// appartment data mangement in mode update = false
router.get('/', (req, res) => {
  res.render('adminAddUpdateAppart');
});
module.exports = router;
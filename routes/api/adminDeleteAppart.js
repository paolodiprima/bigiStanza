const express = require('express');
const router = new express.Router();
const appartModel = require('../../models/appartamentiModel');

router.delete('/:id', async (req, res) => {

    // find appartment and delele,
    // if appartment does not exists return 404
  
    try {
        const result = await appartModel.findByIdAndDelete(req.params.id);
        if (result === null) {
             
            res.status(404).send("elemento da cancellare non trovato ");
        } else {
            // return element deleted 
            res.send(result);
        }
    }
    catch (error) {
        res.status(404).send(error);
    };
});
module.exports = router;
const router = require('express').Router();

router.get('/logout',(req,res)=>{
    
    req.session.destroy( (err) => {
        if (!err){
            res.clearCookie('sid');
            return  res.render('login',{error_message:'', confirm_message : 'Logout Effettuato'});
        } else res.render('login',{error_message:'Logout Fallito', confirm_message : ''});
    });
    

});

module.exports = router;
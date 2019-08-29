const checkAuth = (req,res,next) => {
    //  if there is no valid session, redirect to public home page
      if (!req.session.userId){
          res.redirect('/');
      } else next();
     
       
  }
 module.exports = checkAuth ;
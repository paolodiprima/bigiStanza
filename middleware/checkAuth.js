const checkAuth = (req,res,next) => {
    //  console.log('session (dal middleware) : ',req.session);
      if (!req.session.userId){
          res.redirect('/');
      } else next();
     
       
  }
  
  module.exports = checkAuth ;
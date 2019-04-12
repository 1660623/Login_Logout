module.exports.login = (req, res, next)=>{
    if(!req.session.userId){
         res.redirect('/')
    }
    next()
}
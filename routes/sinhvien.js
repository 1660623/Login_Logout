const Router = require('express').Router
const router = new Router()
const  SinhVien  = require('./../models/auth')

router.get('/thong-tin-sinh-vien',(req,res)=>{
    console.log("thong-tin-sinh-vien")
    const {userId} = req.session
    res.render('SinhVien/sinhvien', {userId})
})

router.get('/:id',  async (req,res)=>{
    const {id} = req.params
    console.log(req)
    const {userId} = req.session
    const user = await SinhVien.findOne({
        where:{
            id
        }
    })
    if(!user){
        res.redirect('/thong-tin-sinh-vien')
    }
    console.log(user)
    res.render('SinhVien/editSinhVien', {user, userId})
})

router.post('/update',  async (req,res)=>{
     
    
    const {userId} = req.session
    
    const {email, name} = req.body
    const user = await SinhVien.update({
        email, name
    },{
          where:{
              id : userId
          }
    })
    
    res.redirect('/thong-tin-sinh-vien')
})
module.exports = router
const  SinhVien = require('./../models/auth')
const bcrypt    = require('bcryptjs')

const Router  = require('express').Router
const router = new  Router()

 

 router.get('/login', (req, res)=>{
         res.render('auth/login')
 })
 router.post('/login', async (req, res)=>{
     const {email, password} = req.body
    const user = await SinhVien.findOne({
         where: {
             email
         }
    })
       if(!user){
            res.json({
                erro: true,
                message: "email không tồn tại"
            })
       }
    const comParePassWord = await bcrypt.compare(password,user.password)
    if(!comParePassWord){
        return res.json({
            erro: true,
            message: "mật khẩu không khớp"
        })
    }
     req.session.userId = user.id
     console.log(req.session.userId);
     res.redirect('/thong-tin-sinh-vien')
})

router.get('/signup', (req, res)=>{
         res.render('auth/signup')
})

router.post('/signup', async (req, res)=>{
    const {email, password, name } = req.body
    const user = await SinhVien.findOne({
         where:{
             email
         }
    })
    if(!user){
        await bcrypt.genSalt(10, ( err, salt)=>{
              bcrypt.hash(password, salt, (err, hash)=>{
                  const newUser = SinhVien.create({
                      email,
                      password: hash,
                      name
                  })
                  res.redirect('/auth/login')
              })
        })
    }
    else{
        return res.json({
            erro: true,
            message: "email đã tồn tại"
        })
    }

})

router.get('/logout', (req, res)=>{
    delete req.session.userId
    res.redirect('/')
})
 
module.exports  = router
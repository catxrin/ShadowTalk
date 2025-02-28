import jwt from 'jsonwebtoken'

export const isAuth = (req,res,next)=>{
    const token = req.cookie
    jwt.verify(token, process.env.SECRET, (err)=>{
    if(err) return res.status(403)
    next()
})
}
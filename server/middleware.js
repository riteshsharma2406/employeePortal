// const secret = "Emp10yE3s3cr3t";
const secret = require('./secret')
const jwt = require("jsonwebtoken");

const authenticateJwt = (req,res,next)=>{
    const authHeader = req.headers.authorization;
    if(authHeader)
    {
        const token = authHeader.split(' ')[1];
        jwt.verify(token,secret,(err,admin)=>{
            if(err)
            {
                return res.sendStatus(403)
            }
            req.admin = admin;
            next();
        })
    }else{
        res.sendStatus(403);
    }
}

module.exports = authenticateJwt;
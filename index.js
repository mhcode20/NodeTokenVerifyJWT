const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api',(req,res) =>{
    res.json({
        message: 'welcome to the api'
    });
});

app.post('/api/posts', verifyToken ,(req,res) =>{
    jwt.verify(req.token, 'secretkey', (err,authData) => {
        if(err) {
            res.sendStatus(403);
        }
        else {
            res.json({
                message: 'posts created',
                authData
            });
        }
    });
    
});

app.post('/api/login',(req,res) =>{
    //mock user
    const user = {
        id: 1,
        username: "Hridoy",
        email: "me@hridoymh.com"
    }
    jwt.sign({user}, 'secretkey',(err,token) => {
        res.json({
            token
        });
    });
    
});

//verify token

function verifyToken(req,res,next){
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    }
    else {
        res.sendStatus(403)
    }
}



app.listen(5000, () => console.log('server working fine on port 5000'));
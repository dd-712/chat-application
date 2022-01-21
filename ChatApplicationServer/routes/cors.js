const express=require('express');
const cors=require('cors');

const whitelist=['http://localhost:3000','http://localhost:3001','https://localhost:3443','https://chat-application-dh.herokuapp.com'];
var corsOptionsDelegate=(req,callback)=>{
    var corsOptions;
    if(whitelist.indexOf(req.header('Origin'))!==-1)
    {
        corsOptions={origin:true};
    }
    else{
        corsOptions={origin:false};
    }
    callback(null,corsOptions);
};

exports.cors=cors();
exports.corsWithOptions=cors(corsOptionsDelegate);
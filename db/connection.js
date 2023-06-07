const mongoose = require('mongoose')

const connectionString = process.env.DATABASE

mongoose.connect(connectionString,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>{
    console.log('Mongodb atlas connected successfully');
}).catch((error)=>{
    console.log('Mongodb connection error:'+error);
})
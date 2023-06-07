const users=require('../model/userSchema')

// define logic to resolve client request

// register
exports.register= async (req,res)=>{
    console.log(req.file);
// get other user input from req body
const file = req.file.filename

const {fname,lname,email,mobile,gender,status,location}=req.body
if(!fname || !lname || !email || !mobile || !gender || !status || !location || !file){
    res.status(403).json("All inputs are requied!!!")
}
try{
// check existing employee
const preuser = await users.findOne({email})
if(preuser){
    res.status(406).json("User Already Exist...")
}
else{
    // store the employee detail to atlas db
    const newuser = new users({
        fname,lname,email,mobile,gender,status,profile:file,location
    })

    // db save
   await newuser.save()
    res.status(200).json(newuser)
}
}
catch(error){
    res.status(401).json(error)
}

}


// getusers
exports.getusers = async(req,res)=>{
    // get search query from request
    const search=req.query.search
    const query = {
        fname:{$regex:search,$options:"i"}
    }
    try{
const allusers = await users.find(query)
res.status(200).json(allusers)
    }
    catch(error){
        res.status(401).json(error)
    }
}

// view-profile

exports.viewprofile= async(req,res)=>{
    // get params from req
    const {id} = req.params 

    // get details for the user having the given id
    try{
        const preuser = await users.findOne({_id:id})
        res.status(200).json(preuser)
    }
    catch(error){
        res.status(401).json("Employee not Exist!!!")
    }
}

// delete user
exports.deleteUser = async(req,res)=>{
    // get params from req
    const {id} = req.params 

    // remove details for the user given id
    try{
        const removeitem = await users.findByIdAndDelete({_id:id})
        res.status(200).json(removeitem)
    }
    catch(error){
        res.status(401).json("Employee not Exist!!!")
    }
}

// editUser
exports.editUser= async(req,res)=>{
    const {id} = req.params
    const {fname,lname,email,mobile,gender,status,location,user_profile}=req.body
    const file= req.file?req.file.filename:user_profile
    // mongodb
    try{
const updateUser=await users.findByIdAndUpdate({_id:id},{
    fname,lname,email,mobile,gender,status,profile:file,location
},{
    new:true
})
// to save this in mongodb
await updateUser.save()
// res client
res.status(200).json(updateUser)
    }
    catch(error){
        res.status(401).json(error)
    }
}
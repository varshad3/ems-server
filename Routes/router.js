// import express
const express=require('express')

// import controller
const userController=require('../Controller/userController')

// create router for express
const router = new express.Router()
// import multer upload configuration
const upload=require('../mukterCoding/storageConfig')

// define routes for each http request
router.post('/employee/register',upload.single('user_profile'),userController.register)


// define routes for get all users
router.get('/employee/get-all-employee-details',userController.getusers)

// define routes for view-profile
router.get('/employee/view-profile/:id',userController.viewprofile)

router.delete('/employee/delete-user/:id',userController.deleteUser)

// define route to update user
router.put('/employee/update-user/:id',upload.single('user_profile'),userController.editUser)

//export router
module.exports = router
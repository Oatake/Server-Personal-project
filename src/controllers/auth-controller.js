//Import session

const { createUser, getUser, getRole, createRole } = require("../services/database-service/db-services");
const { hashedPassword, checkedPassword } = require("../services/bcrypt-services");
const createError = require("../utills/createError");
const { createToken } = require("../services/JWT-service");



exports.register = async (req,res,next) =>{
    try {
        const {userName, password, confirmPassword} = req.body;
        //validateuser
        
        //hashPassword
        const newPassword = await hashedPassword(password)
        //create default role
        const defaultRole = {data : {isAdmin:false, isReception : false, isButler:false, isKitchenHand:false}}
        const newRole = await createRole(defaultRole)
        console.log(newRole)    
        const data = {userName:userName,password:newPassword,roleId:newRole.id}
        const newUser = await createUser({data : data})
        //return status
        res.json({message : "register"}).status(200)
    } catch (error) {
        console.log(error)
        next(error)
    }
}

// exports.login = async (req,res,next) =>{
//     try {
//         const {userName, password} = req.body;
//         //validate user
        
//         //CGet User from db
//         const where ={userName}
//         const user = await getUser({where:where})
//         //Cross check user password
//         console.log(password, user.password)
//         const isPWDMatch = await checkedPassword(password, user.password)
//         console.log(isPWDMatch)
//         if(!isPWDMatch)
//         {
//             createError(401, "unauthorized")
//         }
//         //Request Role status
//         const userRole = await getRole({where : {id : user.roleId}})
//         if(!userRole)
//         {console.log("notfound")}
//         //Create Token
//         const payload = {id:user.id, userName : userName, userRole : userRole}
//         // const payload = {id:user.id}
//         const token = await createToken(payload, process.env.SECRET_KEY)
        
//         res.json({message : "login",token : token, role : userRole}).status(200)
//         // res.json({message : "login",token : token}).status(200)
        
//     } catch (error) {
//         console.log(error)
//         next(error)
//     }
// }
exports.login = async (req,res,next) =>{
    try {
        const {userName, password} = req.body;
        //validate user
        
        //CGet User from db
        const where ={userName}
        const user = await getUser({where:where})
        //Cross check user password
        console.log(password, user.password)
        const isPWDMatch = await checkedPassword(password, user.password)
        console.log(isPWDMatch)
        if(!isPWDMatch)
        {
            createError(401, "unauthorized")
        }
        
        //Create Token
        const payload = {id:user.id}
        // const payload = {id:user.id}
        const token = await createToken(payload, process.env.SECRET_KEY)
        
        res.json({message : "login",token : token}).status(200)
        // res.json({message : "login",token : token}).status(200)
        
    } catch (error) {
        console.log(error)
        next(error)
    }
}

exports.getMe = async (req,res,next) =>{
    try {
        const {userName, id,roleId} = req.user;
        //validate user
        
        //Request Role status
        const userRole = await getRole({where : {id : roleId}})
        if(!userRole)
        {createError(500,"Not found role ID")}

        // const payload = {id:id, userName : userName, userRole : userRole}
        
        
        res.json({message : "getMe", id:id, userName : userName, userRole : userRole}).status(200)
        
    } catch (error) {
        console.log(error)
        next(error)
    }
}
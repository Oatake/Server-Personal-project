const {getUsersWithRole, deleteUser, updateRole } = require("../services/database-service/db-services")

exports.getAllUser = async (req,res,next) =>{
    try {
        const resp = await getUsersWithRole()
        res.json(resp).status(200)
    } catch (error) {
        console.log(error)
        next(error)
    }
}

exports.removeUser = async (req,res,next) =>{
    try {
        const {userId}=req.params
        const data = {where:{id:Number(userId)}}
        const resp = await deleteUser(data)
        res.json(resp).status(200)
    } catch (error) {
        console.log(error)
        next(error)
    }
}

exports.updateUserRole = async (req,res,next) =>{
    try {
        const {id,roleId,role} = req.body
        console.log(req.body)
        const data = {where : {id : roleId}, data : role}
        const resp = updateRole(data)
        res.json(resp).status(200)
    } catch (error) {
        console.log(error)
        next(error)
    }
}
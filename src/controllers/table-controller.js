const { getTables, updateTable } = require("../services/database-service/db-services")

exports.getTablestatus = async (req,res,next) =>{
    try {
        const tables = await getTables();
        res.json(tables).status(200)
    } catch (error) {
        console.log(error)
        next(error)
    }
}

exports.updateTableStatus = async(req,res,next)=>{
    try {
        console.log("xxx")
        const {tableName, status} = req.body
        const newdata ={where : {tableName : tableName}, data : {status : status}} 
        const resp = await updateTable(newdata)
        res.status(200).json(resp)
    } catch (error) {
        
    }
}
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express()
const authRouter = require('./routers/auth-router')
const recipeRouter = require("./routers/recipe-router")
const orderRouter = require("./routers/order-router")
const tableRouter = require("./routers/table-router")
const userRouter = require("./routers/user-router")
const handleError = require('./middlewares/error')
const handleNotFound = require('./middlewares/notfound-error')

//Set up session
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//router session
app.use("/auth", authRouter);
app.use("/recipe", recipeRouter);
app.use("/order", orderRouter);
app.use("/table", tableRouter);
app.use("/user", userRouter);
app.use("*", handleNotFound );
app.use(handleError);

//main session
app.listen(process.env.PORT, ()=>console.log(`server is running at port ${process.env.PORT}`))
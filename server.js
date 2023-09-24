// step 1 : run server
const express =require("express");
require("dotenv").config({path:"./config/.env"});
//------OLD Rest API with Mongo
// const connectDB = require('.//config/connectDB');
// const contactRouter = require("./router/contactRouter");

const {errorType} = require('./SQL/constant/constant')

//import SQL Config
const {testDbConnection} = require("./SQL/configSQL/db");
// const ContactsSqls = require("./SQL/model/ContactSQL");

//require and declare graph Schema
const {schema} = require("./graphql/graphqlSchema");
//graph express to build end point
const {graphqlHTTP} = require("express-graphql");

//connect Database MongoDB
// connectDB()

// run dbSQL connection function
testDbConnection();

// step 2 : run server
const app = express();
//middelware to body parse
app.use(express.json());

// Error Fuction
const getErrorCode = errorName => {
    return errorType[errorName]
  }

//use Graph middelware to replace route
// graphqlHTTP function take 2 parameter
app.use("/graphql", (req, res) => {
    graphqlHTTP({
    schema,
    graphiql:true, // like postman to test our request
    context: { req },
    customFormatErrorFn: (err) => {
      const error = getErrorCode(err.message)
      return ({ message: error.message, statusCode: error.statusCode })
    }
})(req, res)})
//create route 
// app.use('/api/contact' , contactRouter);


//  ContactsSqls.create({
//     email: "mike@example.com",
//     name: "mike  Smith",
//     phone: "000000001",
//     // employed: true,
//   });

//  ContactsSqls.findAll().then((res)=>console.log(res));

// step 3 : run server 
const PORT = process.env.PORT || 4006 ;
// step 4 : run server
app.listen(PORT , (err)=>{
    err ? console.log(err)
    : console.log(`server is runnig on port ${PORT}`)
})

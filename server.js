// step 1 : run server
const express =require("express");
require("dotenv").config({path:"./config/.env"});
const connectDB = require('.//config/connectDB');
const contactRouter = require("./router/contactRouter");

//require and declare graph Schema
const {schema} = require("./graphql/graphqlSchema");
//graph express to build end point
const {graphqlHTTP} = require("express-graphql");

//connect Database
connectDB()

// step 2 : run server
const app = express();
//middelware to body parse
app.use(express.json());

//use Graph middelware to replace route
// graphqlHTTP function take 2 parameter
app.use("/graphql",graphqlHTTP({
    schema,
    graphiql:true // like postman to test our request
}))
//create route 
// app.use('/api/contact' , contactRouter);


// step 3 : run server 
const PORT = process.env.PORT || 4006 ;
// step 4 : run server
app.listen(PORT , (err)=>{
    err ? console.log(err)
    : console.log(`server is runnig on port ${PORT}`)
})

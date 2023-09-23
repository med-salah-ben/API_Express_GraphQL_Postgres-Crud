const ContactsSqls = require("../model/ContactSQL");
////--------graph method with Postgres

//insert Contact
exports.graphContactPostPostgres = (user)=>{
    
    return  ContactsSqls.create(user)
}

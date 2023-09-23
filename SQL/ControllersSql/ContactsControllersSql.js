const ContactsSqls = require("../model/ContactSQL");
////--------graph method with Postgres

//insert Contact
exports.graphContactPostPostgres = (user)=>{
    
    return  ContactsSqls.create(user)
}

// select Contacts 
exports.graphContactFindPostgres = ()=>{
    return ContactsSqls.findAll()
}
// select Contact By ID 
exports.graphContactFindByIDPostgres = (id)=>{
    const contact = ContactsSqls.findByPk(id)
    if (contact === null) {
        return "there is no Contact with this id"
      } else {
        return contact
      }
}

exports.graphContactFindByEmailPostgres = async(email)=>{
    const contact =  await ContactsSqls.findOne({ where: { email: email} })
    if (contact === null) {
        return "there is no Contact with this email"
      } else {
        return contact
      }
}


exports.graphContactPutPostgres =async (user)=>{
    console.log(user)
        await ContactsSqls.update({ ...user }, {
        where: {
          id: user.id
        }})
        const contact =  await ContactsSqls.findOne({ where: { id: user.id} })
    return contact
}

exports.graphContactDeletePostgres =async (id)=>{
        await ContactsSqls.destroy({
        where: {
          id: id
        }})
}
const Contact = require("../model/Contact");

exports.postContact = async (req , res)=>{
    // console.log(req.body)
    try {
        const {name , email} = req.body
        // create a new contact with the model Contact
        const newContact = new Contact(req.body)
        // check if the  user has an name & email
        if(!name || !email){
            return res.status(400).send({msg:"name & email required check again!"})
        }
        // check 2 : if the email already exist => email should be unique
        const user = await Contact.findOne({email:req.body.email})
        if(user){
            return res.status(400).send({msg:"email already exist!!"})
        }
        // Save new contact to database
        const response = await newContact.save();
        return res.status(200).send({msg:"user created successfuly" , response:response})
    } catch (error) {
        console.log(error)
        return res.status(500).send({msg:"can not save user !"})
    }
}

exports.getContacts = async (req,res)=>{
    try {
        const result = await Contact.find({});
        return res.status(200).send({msg:"getting contacts successfully" , response:result})
    } catch (error) {
        console.log(error)
        return res.status(500).send("can't get contacts")
    }
}

exports.getContact = async (req,res)=>{
    try {
        const result = await Contact.findById(req.params.id);
        return res.status(200).send({msg:"getting contact successfully" , response:result})
    } catch (error) {
        console.log(error)
        return res.status(500).send("can't get contact")
    }
}

exports.deleteContact = async (req,res)=>{
    try {
        await Contact.deleteOne({_id:req.params.id});
        return res.status(200).send({msg:"delete contact successfully" })
    } catch (error) {
        console.log(error)
        return res.status(500).send("can't delete contact")
    }
}

exports.updateContact = async(req , res)=>{
    try {
        await Contact.updateOne({_id:req.params.id}, {$set:{...req.body}})
        return res.status(200).send({msg:'contact updated...'})
    } catch (error) {
        console.log(error)
        return res.status(500).send('cant update')
    }
}


////--------graph method

exports.graphContactFind = ()=>{
    return Contact.find({})
}

exports.graphContactFindByID = (id)=>{
    return Contact.findById(id)
}

exports.graphContactFindByEmail = (email)=>{
    return Contact.findOne({email:email})
}
const express = require("express");
const router = express.Router();
const contactControlers = require("../controllers/ContactControllers")

// router.get("/testrouter",(req,res)=>{
//     return res.send({msg : "hello from Contact Router"})
// })
// creat new contact
router.post("/",contactControlers.postContact)
// get all contacts
router.get("/" , contactControlers.getContacts)
// get contact by id
router.get("/:id" , contactControlers.getContact)
// delete contact by id
router.delete("/:id" ,contactControlers.deleteContact)
// update contact by id
router.put("/:id" ,contactControlers.updateContact)

module.exports = router
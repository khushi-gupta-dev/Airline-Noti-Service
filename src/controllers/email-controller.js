const {emailService} = require('../services');

async function create(req,res){
    try{
const response = await emailService.createTicket({
    subject:req.body.subject ,
    content: req.body.content,
    recepientEmail: req.body.recepientEmail
});
return res.status(201).json(response);
    }catch(error){
       return res.status(500).json(error); 
    }
}

module.exports = {
    create
}
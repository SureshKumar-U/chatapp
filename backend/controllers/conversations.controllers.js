const conversationModel = require("../models/chatmodel")

const addConversation = async({text,sender,receiver})=>{
    try{  
        const conversation = await conversationModel.findOne({users: {$in:[sender,receiver]}})
        if(!conversation){
            await conversationModel.create({users:[sender,receiver]})
        }
        conversation.msgs.push({text,sender,receiver})
        await conversation.save()
        
    }catch(err){
        console.log({message:"Internal or external server error", error:err?.message})
    }
}


const getConversations = async(req,res)=>{
    try{
        const {sender,receiver} = req.query
        if(!sender || !receiver){
            return res.status(400).json({message:"user emails are required"})
        }
        const conversations = await conversationModel.findOne({users:{$all:[sender,receiver]}})
        
         return res.status(200).json({message:"conversations fetched successfully", data: conversations || []})
    }catch(err){
        return res.status(200).json({message:'Internal or external server Error', error: err?.message})
    }
}

module.exports = {getConversations,addConversation}
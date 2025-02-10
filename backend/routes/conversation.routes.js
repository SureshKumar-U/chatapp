const express = require("express")

const router  = express.Router()
const { getConversations } = require("../controllers/conversations.controllers")
router.get("/",getConversations)

module.exports = router
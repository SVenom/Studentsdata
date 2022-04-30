const express = require("express")
const router = express.Router()
const controller = require("../controller/controller")
const fetchuser = require("../middleware/fatch")

router.post("/",controller.postregistration)
router.get('/fetchallnotes', fetchuser, controller.fetchall)
router.post('/addnote',fetchuser,controller.postnotes)                    
router.post('/getuser', fetchuser,controller.getuser)                    
router.put('/update/:id', fetchuser,controller.updatenote)                    
router.delete('/delete/:id', fetchuser,controller.deletenote)                    



    


module.exports= router
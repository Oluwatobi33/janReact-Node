const express = require("express")
const axios = require("axios")
const { send, display, newPost, deletepost, savepost, editpostmon } = require("../controllers/bloControl")
const multer = require('multer')
const { register, login, dashboard, getUser } = require("../controllers/usercontroller")
const { storage } = require('../upload.js')
const { verifyUser } = require("../middleware/authMiddleware")


// const upload = multer({ dest: 'assests/postimages' })
const upload = multer({ storage })

const router = express.Router()
// router.post('/newpost', newPost)
axios.interceptors.request.use((value) => {
    value.headers = {
        "Authorization": localStorage.token
    }
})
router.post("/newpost", upload.single("picture"), newPost)
router.get('/display', display)
router.get('/newpost', send)
router.post(" / deletepost /: _id", deletepost)
router.post('/savepost/:_id', savepost)
router.post(" / editpost /: _id", editpostmon)
router.post("/register", register)
router.post("/login", login)
router.get('/profile', verifyUser, getUser)
router.get('/dashboard', dashboard)
module.exports = router;
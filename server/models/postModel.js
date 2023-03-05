const mongoose = require("mongoose")
const todoSchema = mongoose.Schema({
    firstname: {
        type: String,
        require: true,
        unique: true
    },
    lastname: String,
    time: {
        type: Date,
        default: Date.now()
    },
    imagePath: String,
    imageLink: String
})
const TodoBlog = mongoose.model("tblog", todoSchema)
module.exports = TodoBlog
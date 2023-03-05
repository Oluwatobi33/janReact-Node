const TodoBlog = require("../models/postModel");
// const multer = require('multer')

const show = (req, res) => {
    TodoBlog.find((error, result) => {
        if (error) {
            res.status(500).json({ success: false, message: "An error occur" })
            console.log("Error ti wa");
        } else {
            res.json({
                success: true,
                data: result,
                message: "it's successfull"
            })
        }
    })
}
const savepost = () => {
    const { _id } = req.params
    const { firstname, lastname } = req.body
    TodoBlog.findByIdAndUpdate(_id, { firstname, lastname }, (err, message) => {
        if (err) {
            console.log("ko le edit");
        } else {
            console.log("edit success");
            res.redirect("/dismon")
        }
    })
}
const deletepost = (req, res) => {
    const { _id } = req.params
    console.log(_id);
    TodoBlog.deleteOne({ _id }, (err, message) => {
        if (err) {
            console.log("ko delete" + err);
        } else {
            console.log("Delete successfull" + message);
            res.redirect("/dismon")
        }
    })
}

const send = (req, res) => {
    res.send("newpost")
}

const display = (req, res) => {
    TodoBlog.find((error, result) => {
        if (error) {
            console.log(error);
        } else {
            console.log(result);
            res.send({ status: true, message: result })

        }
    })
}


// let pull = []
const newPost = (req, res) => {

    const { firstname, lastname } = req.body
    // let filename = ""
    // if (req.file) {
    //     console.log(req.file);
    //     filename = req.file.filename
    // }
    const { filename, path } = req.file
    console.log(filename)
    // pull.push({ firstname, lastname, imagePath: filename })
    TodoBlog.create({ firstname, lastname, imagePath: filename, imageLink: path }, (err, message) => {
        if (err) {
            console.log(err)
            res.send({ status: false, message: "Err exist" })
        } else {
            console.log(message)
            res.send({ status: true, message: "Blog created successful" })

        }
    })
}
const editpostmon = (req, res) => {
    const { _id } = req.params
    TodoBlog.findById(_id, (err, message) => {
        if (err) {
            console.log("ko le edit" + err);
        } else if (message) {
            res.render("update", { posts: message })
        }
        else {
            res.redirect("/dismon")
        }
    })
}
module.exports = { show, newPost, send, display, deletepost, savepost, editpostmon }
const express = require('express')
const app = express()
const dotenv = require('dotenv')
const http = require("http")
const { Server } = require("socket.io")

dotenv.config();
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["POST", "PUT", "GET"]
    }
})
const PORT = process.env.PORT || 5000
// const bodyParser = require('body-parser')
const cors = require('cors')
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
const router = require('./routers/router');
app.use("/", router)
const mongoose = require("mongoose")
const path = require('path')


// const { Socket } = require('net')
// const TodoBlog = require('./models/postModel')
mongoose.set('strictQuery', true)
mongoose.connect(process.env.URI, (error) => {
    if (error) {
        console.log(error);
        console.log("Error  ti wa");
    } else {
        console.log("o ti lo");
    }
})
app.use(express.static(path.join(__dirname + '/assests')))
// app.use('/postimages', express.static('../assets/image'));


io.on('connection', (socket) => {
    console.log("user connected" + socket.id);
    socket.on("user-active", (message) => {
        console.log(message)
    })
    socket.on("send-messsage", (message) => {
        socket.broadcast.emit("message-sent", message)
    })
    // socket.on("join-group", (group) => {
    //     socket.join(group)
    // })
    // socket.on("send-msg-to-group", ({ group, message }) => {
    //     socket.to(group).emit("msg-sent-to-group", chat)
    // })

})

app.set("view engine", "ejs");
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, postimages)
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.originalname)
//     }
// })

// const upload = multer({ dest: 'assests/postimages' })

//     const saveImage = new TodoBlog({
//         filename: req.body.firstname,
//         lastname: req.body.lastname,
//         img: {
//             data: fs.readFileSync('postimages' + req.filename)
//         }

//     })
//     saveImage.save()
//         .the((res) => {
//             console.log("image is saved");

//         }).catch((err) => {
//             console.log(err, "error has occur");
//         })
//     res.send("image is saved")
// })
// app.get("/imageUpload", (req, res) => {
//     res.sendFile(__dirname + '/imageUpload.html')
// })

// let pull = []
// app.get('/newpost', (req, res) => {
//     res.render("newpost")
// })

// const { firstname, lastname } = req.body
// pull.push(req.body)
// try {
//     const post = await TodoBlog.create({ firstname, lastname })
//     if (post) {
//         console.log("o ti lo post", post);
//     }
// } catch (error) {
//     console.log(error);
// }
// const { firstname, lastname } = req.body;
// let information = {}

// res.render('displaypost', { pull })
// console.log(pull);
// Display from mongoose to the frontend
// app.get('/dismon', dislay)
// Display from mongoose to the frontend of our TodoBlog
// app.post('/display', show)

// TodoBlog.find((error, result) => {
//     if (error) {
//         res.status(500).json({ success: false, message: "An error occur" })
//         console.log("Error ti wa " + error);
//         console.log(error);
//     } else {
//         res.json({
//             success: true,
//             data: message,
//             message: "it's successfull"
//         })
//         // console.log(result);
//         // res.render('display', { pull: result })

//     }
// })
//perform delete from mongodb operation
// app.post("/deletepost/:_id", (req, res) => {
//     const { _id } = req.params
//     console.log(_id);
//     TodoBlog.deleteOne({ _id }, (err, message) => {
//         if (err) {
//             console.log("ko delete" + err);
//         } else {
//             console.log("Delete successfull" + message);
//             res.redirect("/dismon")
//         }
//     })
//     //perform update from mongodb operation
// })
// app.post('/savepost/:_id', (req, res) => {
//     const { _id } = req.params
//     const { firstname, lastname } = req.body
//     TodoBlog.findByIdAndUpdate(_id, { firstname, lastname }, (err, message) => {
//         if (err) {
//             console.log("ko le edit");
//         } else {
//             console.log("edit success");
//             res.redirect("/dismon")
//         }
//     })
// })
// app.post("/editpost/:_id", (req, res) => {
//     const { _id } = req.params
//     TodoBlog.findById(_id, (err, message) => {
//         if (err) {
//             console.log("ko le edit" + err);
//         } else if (message) {
//             res.render("update", { posts: message })
//         }
//         else {
//             res.redirect("/dismon")
//         }
//     })
// })
// app.get('/displaypost', (req, res) => {
//     res.render('displaypost', { pull })
// })

// app.use("/delete/index", (req, res, next) => {
//     const { index } = req.params
//     if (index == 0) {
//         res.redirect("/newpost")
//     }
//     else {
//         next()
//     }
// })
// app.get("/show/:index", (req, res) => {
//     res.render("show", { posts, index })
// })
// app.get("/edit/:index", (req, res) => {
//     res.render("displaypost", { posts, index })
// })
app.post('/edit/:index', (req, res) => {
    const { index } = req.params
    console.log(index);
    let posts = pull.find((item, i) =>
        i == index
    )
    console.log(posts);
    res.render("show", { posts, index })
})

app.post('/update', (req, res) => {
    let upadte = req.body
    let updateItems = pull.find((item, i) => item != upadte)
    res.redirect('/displaypost', { updateItems })
})

app.post("/more/:index", (req, res) => {
    const { index } = req.params
    let more = pull.find((item, ind) => ind == index)
    res.render("more", { more, index })
})
app.post("readmore/:_id", (req, res) => {
    const { _id } = req.params
    let readmore = TodoBlog.find((item, ind) => ind == _id)
    console.log(readmore);
    res.render("more", { readmore, _id })
})

app.post("/delete/:index", (req, res, next) => {
    const { index } = req.params
    if (index == 0) {
        res.redirect("/newpost")
    } else {
        next()
    }
},
    (req, res) => {
        const { index } = req.params
        // pull.filter((item, i) => (index != i))
        pull.splice(index, 1)
        res.redirect('/displaypost')
    })

app.get('/edit-post/:index', (req, res) => {
    const { index } = req.params
    const editpost = pull.find((each, i) => i == index)
    if (editpost) {
        res.render("edit-post", { index, editpost })
    } else {
        res.render("newpost")
    }
})
// app.get('save-post/:index', (req, res) => {
//     res.render('save-post')
// })
app.post('/save-post/:index', (req, res) => {
    const { index } = req.params
    const { firstname, lastname } = req.body
    pull[index] = { firstname, lastname }
    res.redirect("/displaypost")
})

server.listen(PORT, () => {
    console.log(`connected successfully${PORT}`);

})

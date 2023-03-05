const { genSalt, hash } = require("bcrypt")
const bcrypt = require('bcrypt')
const mongoose = require("mongoose")
const userSchema = mongoose.Schema(
    {
        firstname: {
            type: String,
            require: true,
        },
        lastname: {
            type: String,
            require: true,
        },
        email: {
            type: String,
            unique: true,
        },
        password: {
            type: String,
            select: false
        },
    }
)
userSchema.pre("save", async function () {
    // let { password } = this;
    // let salt = await bcrypt.genSalt(10);
    // let hashed = await bcrypt.hash(password, salt);
    // this.password = hashed;
    // next()
    const { password } = this
    const salt = await genSalt(10)
    console.log(salt);
    try {
        const hashedPassword = await hash(password, salt)
        this.password = hashedPassword
        // next()
    } catch (error) {
        console.log(error);
    }
})
const user = mongoose.model("user", userSchema)
module.exports = user 
const bcrypt = require("bcrypt")
const {transporter} = require("../util/mailTransporter")
const dotenv = require("dotenv")
const User = require("../model/User")
const saltRounds = 10

dotenv.config()

let createUser = async (req, res)=>{
    try {
        let{name, email, password, address, phoneNumber} = req.body
        
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        

        const newUser = new User({
     name,
     email,
     password: hashedPassword, 
     address,
     phoneNumber,
        })

// function for sending mail
 sendVerificationEmail(newUser)

        await newUser.save()
        res.status(201).json(newUser)
    } catch (error) {
        console.error(error)
        res.status(500).json({message: "internal server error"})
    }
}


let sendVerificationEmail = async (user) => {
const verificationLink = `http://localhost:3000/user/verifyUser?token=${user.verificationToken}`

const mailOptions = {
    from: "Shopping-App <lmipo861@gmail.com>",
    to: user.email,
    subject: "verify your email address",
    text: `
    Hello${user.name},
pLease click on the link below to verify your email address: ${verificationLink},
If you didnt create an account, please disregard this email
Thank you,
The Shopping App team.
    `
}
try {
    transporter.sendMail(mailOptions)
    console.log("verification sent successfully")
} catch (error) {
    console.error(error)
}
}

module.exports = { createUser, }
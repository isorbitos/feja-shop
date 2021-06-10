import mongoose from 'mongoose'

const userScema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique:true
    },
    password:{
        type: String,
        required: true,
    },
    role:{
        type: String,
        default: 'user'
    },
    root:{
        type: Boolean,
        default: true,
    },
    avatar:{
        type: String,
        default: 'https://res.cloudinary.com/zole/image/upload/v1623272538/thumb-97920_jv5bcc.png',
    }
},{
    timestamps:true
})

let Dataset = mongoose.models.user || mongoose.model('user', userScema)
export default Dataset
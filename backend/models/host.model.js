import mongoose from "mongoose";


const  hostSchema = new mongoose.Schema({
    username:{
        type:String,
        true: [true, 'Username is required'],
        unique: true,
        trim: true,
        lowercase: true,
        minLength: [3, 'Username must be at least 3 characters long'],
        maxLength: [30, 'Username must be at most 30 characters long'],      
    },
    email:{
        type:String,
        required: [true, 'User email is required'],
        unique: true,
        trim: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address'],
        lowercase: true,
    },

    password:{
        type: String,
        required: [true, 'Password is required'],
        minLength: [6, 'Password must be at least 6 characters long'],
    },

    boardingAddressForApproval:{
        type: String,
        required: [true, 'Boarding address is required'],
        trim: true,
        minLength: [5, 'Boarding address must be at least 5 characters long'],
    }, 

    boardingImageForApproval:{
        type: String, //URI from Cloudinary
        required: [true, 'Boarding image is required'],
    },

    status:{
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending',
    },

},{timestamps: true,});

const Host = mongoose.model('Host', hostSchema);

export default Host;
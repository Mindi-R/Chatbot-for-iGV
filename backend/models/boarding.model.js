import mongoose from 'mongoose'

const boardingSchema = new mongoose.Schema ({
    hostId: {type:String, required:true},
    address: {type:String, required:true},
    cost: {type:Number, required:true},
    type: {type:String, required:true},
    availableCount: {type:Number, required:true},
    description: {type:String, required:true}, 
}, {minimize: false})

const boardingModel = mongoose.models.boarding || mongoose.model('boarding', boardingSchema);

export default boardingModel;
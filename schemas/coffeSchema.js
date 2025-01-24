import mongoose from "mongoose";

const coffeSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    description: {
        type: String,
        require: [true, 'Description is required'],
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price must be a positive number']
    },
    available: {
        type: Boolean,
        default: true
    }
}, {
    Timestamp: true
});

const coffe = mongoose.model('Coffes', coffeSchema);
export default coffe;
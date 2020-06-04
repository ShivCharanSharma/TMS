const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const packageSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        maxlength: 50
    },
    description: {
        type: String
    },
    locations:{
        type :String
    },
    feature:{
        type:String
    },

    price: {
        type: Number,
        default: 0
    },
    images: {
        type: Array,
	    default:[],
    },
   sold: {
        type: Number,
        maxlength: 100,
        default: 0
    },
    views: {
        type: Number,
        default: 0
    }
}, { timestamps: true })


packageSchema.index({
    title:'text',
    description: 'text',
}, {
    weights: {
        name: 5,
        description: 1,
    }
});
const Package = mongoose.model('Package', packageSchema);

module.exports =  Package 

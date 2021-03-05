const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

const flightSchema = new Schema({
    airline: {
        type: String,
        required: true,
        enum: ['American', 'Delta','Southwest','United']
    },
    airport: {
        type: String,
        required: true,
        enum: ['ATL','DFW','DEN','LAX','SAN'],
        default: 'DEN'

    } ,
    flightNo: {
        type: Number,
        required: true,
        min: 10,
        max: 9999
    } ,
    departs:{
        type: Date,
        default: function() {
            return new Date().getFullYear();
        },
        min: 2021-03-05

    } 
  });

  // Compile the schema into a model and export it
module.exports = mongoose.model('Flight', flightSchema);
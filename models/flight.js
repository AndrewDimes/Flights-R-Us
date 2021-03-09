const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;




const destinationSchema = new Schema({
    airport: {
        type: String,
        enum: ['AUS','DFW','DEN','LAX','SAN']
    },
    arrival: Date
})

const flightSchema = new Schema({
    tickets: [{type: Schema.Types.ObjectId, ref: 'Ticket'}],
    destinations: [destinationSchema],
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
        required: true,
        default: function() {
            return new Date().getFullYear() + 1;
        },
    }   
  }, {
      timestamps: true
  });

  // Compile the schema into a model and export it
module.exports = mongoose.model('Flight', flightSchema);
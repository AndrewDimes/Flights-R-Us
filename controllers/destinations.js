const Flight = require('../models/flight');


module.exports = {
    create,
    delete: deleteDestination
}

async function create(req, res){
    try{
        const flight = await Flight.findById(req.params.id)
        flight.destinations.push(req.body);
        await flight.save()
        res.redirect(`/flights/${flight._id}`);

    } catch(err){
        res.send(err)
        

    }
}

function deleteDestination(req, res){
    console.log('test')
    
}
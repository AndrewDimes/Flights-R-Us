const Flight = require('../models/flight')

module.exports = {
    new: newFlight,
    create,
    index
  };

  function index(req, res){
      Flight.find({}, function(err, flightDocuments){
          res.render('flights/index', {
              flights: flightDocuments
          })
      })
  }

  function create(req, res){
      console.log(req.body.airline)
      const flight = new Flight(req.body);
      flight.save(function(err){
          if (err) return res.render('flights/new');
          console.log(flight)
          res.redirect('/flights/new')
      })
  }


  function newFlight(req, res) {
      const newFlight = new Flight()
      
      res.render('flights/new')

}
const Flight = require('../models/flight')
const Ticket = require('../models/ticket')

module.exports = {
    new: newFlight,
    create,
    index,
    show
  };

  async function show(req, res) {
      try {
          const flight = await Flight.findById(req.params.id);
          const dt = flight.departs
          const departsDate = dt.toISOString().slice(0,16);
          const tickets = await Ticket.find({flight: flight._id})
          const destinations = flight.destinations
          const todaysDate = new Date();
          todaysDate.setHours(0,0,0,0);
          destinations.sort(function(a,b){
              return new Date(a.arrival) - new Date(b.arrival);
          })
          res.render('flights/show', {
            title: 'Flight Detail', flight, tickets, departsDate, todaysDate
          })

      }catch(err){
          res.send(err)
      }
  }

  function index(req, res){
      let todaysDate = new Date();
      todaysDate.setHours(0,0,0,0);

      Flight.find({}, function(err, flightDocuments){
          flightDocuments.sort(function(a,b){
              return new Date(a.departs) - new Date(b.departs);
          })
          res.render('flights/index', {
              flights: flightDocuments,
              today: todaysDate
          })
      })
  }

  function create(req, res){
      
      const flight = new Flight(req.body);
      flight.save(function(err){
          if (err) return res.render('flights/new');
        
          res.redirect(`/flights/${flight._id}`)
      })
  }


  function newFlight(req, res) {
      const newFlight = new Flight()
      const dt = newFlight.departs
      const year = dt.getFullYear();
      const month = dt.getMonth();
      const day = dt.getDate();
      const c = new Date(year+1,month,day);
      console.log('dt', dt)
      const departsDate = c.toISOString().slice(0,16);
      console.log('here',departsDate)
      res.render('flights/new', {departsDate});
}
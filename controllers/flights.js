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
          res.render('flights/show', {
            title: 'Flight Detail', flight, tickets, departsDate
          })

      }catch(err){
          res.send(err)
      }
  }

  function index(req, res){
      Flight.find({}, function(err, flightDocuments){
          res.render('flights/index', {
              flights: flightDocuments
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
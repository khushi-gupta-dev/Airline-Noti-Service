const crudRepository = require("./crud-repository");
const {Ticket} = require("../models");
class ticketRepository extends crudRepository {
    constructor() {
       super(Ticket); 
    }

  async   getPendingTickets(){
        const response = await Ticket.findAll({
            where: {
                status: "PENDING"
    }
}) ;
return response ; 

}
}
    
module.exports = ticketRepository;
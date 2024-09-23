const Bus = require("../models/bus.model")
const Operator = require("../models/operators.model")
const Route = require("../models/route.model")

//add new operator
const addOperator = async(name, contact_info) => {
    const operator = new Operator({name, contact_info})
    return await operator.save()
}
//add new route
const addRoute = async(start_location, end_location, distance) => {
    if(distance<=0) throw new Error(`Distance must be positive`)
    const route = new Route({start_location, end_location, distance})
    return await route.save()
}
//add new bus
const addBus = async(bus_number, capacity, operatorId,  routeId) => {
    const existingBus = await Bus.findOne({bus_number})
    if (existingBus) throw new Error("Bus number must be unique.");

    const bus = new Bus({bus_number, capacity, operator: operatorId, route: routeId})
    await bus.save()
    await Operator.findByIdAndUpdate(operatorId, {$push: {buses: bus._id}})
    await Route.findByIdAndUpdate(routeId, {$push: {bus: bus._id}})
    return Bus
}
//add new passenger
const addPassenger = async (name, email, phone) => {
    const existingPassenger = await Passenger.findOne({ email });
    if (existingPassenger) throw new Error("Email must be unique.");

    const passenger = new Passenger({ name, email, phone });
    return await passenger.save();
};
//make a new reservation
const makeReservation = async (busId, passengerId, seat_number) => {
    const bus = await Bus.findById(busId);
    if (!bus) throw new Error("Bus not found.");
    if (seat_number < 1 || seat_number > bus.capacity) throw new Error("Seat number is out of bus capacity.");

    const reservation = new Reservation({ bus: busId, passenger: passengerId, seat_number });
    await reservation.save();
    await Bus.findByIdAndUpdate(busId, { $push: { reservations: reservation._id } });
    await Passenger.findByIdAndUpdate(passengerId, { $push: { reservations: reservation._id } });
    return reservation;
};


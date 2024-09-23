const Bus = require("../models/bus.model");

const listBusesByOperator = async (operatorId) => {
    return await Bus.find({ operator: operatorId });
};

const getBusesByRoute = async (routeId) => {
    return await Bus.find({ route: routeId });
};

const getReservationDetails = async (reservationId) => {
    return await Reservation.findById(reservationId).populate('bus').populate('passenger');
};

const getReservationsByPassenger = async (passengerId) => {
    return await Reservation.find({ passenger: passengerId });
};



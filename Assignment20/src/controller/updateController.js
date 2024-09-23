const Bus = require("../models/bus.model");
const Operator = require("../models/operators.model");
const Reservation = require("../models/reservation.model");
const Route = require("../models/route.model");

const updateOperator = async (operatorId, updateData) => {
    return await Operator.findByIdAndUpdate(operatorId, updateData, { new: true });
};

const updateRoute = async (routeId, updateData) => {
    return await Route.findByIdAndUpdate(routeId, updateData, { new: true });
};

const updateBus = async (busId, updateData) => {
    return await Bus.findByIdAndUpdate(busId, updateData, { new: true });
};

const updateReservation = async (reservationId, updateData) => {
    return await Reservation.findByIdAndUpdate(reservationId, updateData, { new: true });
};

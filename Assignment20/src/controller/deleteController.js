const removeBusFromOperator = async (operatorId, busId) => {
    await Bus.findByIdAndDelete(busId);
    await Operator.findByIdAndUpdate(operatorId, { $pull: { buses: busId } });
    await Route.updateMany({ bus: busId }, { $pull: { bus: busId } });
};

const deleteRoute = async (routeId) => {
    const route = await Route.findById(routeId);
    if (!route) throw new Error("Route not found.");
    await Bus.updateMany({ route: routeId }, { $pull: { route: routeId } });
    return await Route.findByIdAndDelete(routeId);
};

const cancelReservation = async (reservationId) => {
    const reservation = await Reservation.findById(reservationId);
    if (!reservation) throw new Error("Reservation not found.");
    await Bus.findByIdAndUpdate(reservation.bus, { $pull: { reservations: reservationId } });
    await Passenger.findByIdAndUpdate(reservation.passenger, { $pull: { reservations: reservationId } });
    return await Reservation.findByIdAndDelete(reservationId);
};

const deleteOperator = async (operatorId) => {
    const operator = await Operator.findById(operatorId);
    if (!operator) throw new Error("Operator not found.");
    await Bus.deleteMany({ operator: operatorId });
    return await Operator.findByIdAndDelete(operatorId);
};

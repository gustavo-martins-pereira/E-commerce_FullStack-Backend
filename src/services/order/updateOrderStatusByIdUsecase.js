import { updateOrderStatusById } from "../../repositories/orderRepository.js";
import CustomError from "../../utils/errors/customError.js";

async function updateOrderStatusByIdUsecase(id, status) {
    const [numberOfAffectedRows, affectedRows] = await updateOrderStatusById(id, status);

    if(!numberOfAffectedRows) throw new CustomError(404, "Order not found");

    return [numberOfAffectedRows, affectedRows];
}

export {
    updateOrderStatusByIdUsecase,
};

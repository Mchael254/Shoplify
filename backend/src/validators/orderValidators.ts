import Joi from "joi";


export const orderCreationValidationSchema = Joi.object({
  productId: Joi.string().required(),
  Quantity: Joi.number().integer().min(1).required(),
  address: Joi.string().required(),
});


export const orderUpdateValidationSchema = Joi.object({
  orderId: Joi.string().required(),
  status: Joi.string().valid("Pending", "Shipped", "Delivered").required(),
});

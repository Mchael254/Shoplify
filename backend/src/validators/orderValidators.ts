import Joi from "joi";

// Order creation validation schema
export const orderCreationValidationSchema = Joi.object({
  productId: Joi.string().required(),
  quantity: Joi.number().integer().min(1).required(),
  address: Joi.string().required(),
});

// Order update validation schema
export const orderUpdateValidationSchema = Joi.object({
  orderId: Joi.string().required(),
  status: Joi.string().valid("Pending", "Shipped", "Delivered").required(),
});

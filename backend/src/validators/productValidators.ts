<<<<<<< HEAD
import joi from "joi";

//product creation
export const productValidationSchema = joi.object({
  productName: joi.string().required().min(2).max(30),
  productDescription: joi.string(),
  productPrice: joi.number().required().min(1).max(3000000000),
  productCategory: joi.string().required().min(2).max(30),
  productImage: joi.string(),
  supplierContact: joi.string().required().min(2).max(30),
  Qunatity: joi.number().required().min(1).max(3000000000),
});

//product update
export const productUpdateValidationSchema = joi.object({
  productID: joi.required(),
  productName: joi.string().required().min(2).max(30),
  productDescription: joi.string(),
  productPrice: joi.number().required().min(1).max(3000000000),
  productCategory: joi.string().required().min(2).max(30),
  productImage: joi.string(),
  supplierContact: joi.string().required().min(2).max(30),
  Quantity: joi.number().required().min(1).max(3000000000),
});
=======
import joi from 'joi'

//product creation 
export const productValidationSchema = joi.object({
    productName: joi.string().required().min(2).max(30),
    productDescription: joi.string(),
    productPrice: joi.number().required().min(1).max(3000000000),
    productCategory: joi.string().required().min(2).max(30),
    productImage: joi.string(),
    supplierContact: joi.string().required().min(2).max(30),
    Quantity: joi.number().required().min(1).max(3000000000),
});


//product update
export const productUpdateValidationSchema = joi.object({
    productID: joi.required(),
    productName: joi.string().required().min(2).max(30),
    productDescription: joi.string(),
    productPrice: joi.number().required().min(1).max(3000000000),
    productCategory: joi.string().required().min(2).max(30),
    productImage: joi.string(),
    supplierContact: joi.string().required().min(2).max(30),
    Quantity: joi.number().required().min(1).max(3000000000),
});
>>>>>>> fa2e0f8fa302592d0ae834416a4405abcd659d0f

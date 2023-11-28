<<<<<<< HEAD
import express from "express";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { v4 } from "uuid";
import mssql from "mssql";
import { sqlConfig } from "../config/sqlConfig";
import {
  productUpdateValidationSchema,
  productValidationSchema,
} from "../validators/productValidators";

//create Product
export const createProduct = async (req: Request, res: Response) => {
  try {
    let {
      productName,
      productDescription,
      productPrice,
      productDuration,
      productCategory,
      productImage,
      supplierContact,
      Quantity,
    } = req.body;

    const { error } = productValidationSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    let productID = v4();

    const pool = await mssql.connect(sqlConfig);
    const productDetails = await pool
      .request()
      .input("productID", mssql.VarChar, productID)
      .input("productName", mssql.VarChar, productName)
      .input("productDescription", mssql.VarChar, productDescription)
      .input("productPrice", mssql.Int, productPrice)
      .input("productDuration", mssql.VarChar, productDuration)
      .input("productCategory", mssql.VarChar, productCategory)
      .input("productImage", mssql.VarChar, productImage)
      .input("supplierContact", mssql.VarChar, supplierContact)
      .input("Quantity", mssql.Numeric, Quantity)
      .execute("createProduct");

    return res.status(200).json({
      message: "product created successfully",
      productID,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

//fetch all products
export const getAllproducts = async (req: Request, res: Response) => {
  try {
    const pool = await mssql.connect(sqlConfig);
    const result = await pool.request().execute("fetchAllProducts");

    if (result.recordset && result.recordset.length > 0) {
      const products = result.recordset;
      return res.status(200).json(products);
    } else {
      return res.status(200).json([]);
    }
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

//update product
export const updateProduct = async (req: Request, res: Response) => {
  try {
    let {
      productID,
      productName,
      productDescription,
      productPrice,
      productCategory,
      productImage,
      supplierContact,
      Quantity,
    } = req.body;

    const { error } = productUpdateValidationSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const pool = await mssql.connect(sqlConfig);
    const productDetails = await pool
      .request()
      .input("productID", mssql.VarChar, productID)
      .input("productName", mssql.VarChar, productName)
      .input("productDescription", mssql.VarChar, productDescription)
      .input("productPrice", mssql.Int, productPrice)
      .input("productCategory", mssql.VarChar, productCategory)
      .input("productImage", mssql.VarChar, productImage)
      .input("supplierContact", mssql.VarChar, supplierContact)
      .input("Quantity", mssql.Numeric, Quantity)
      .execute("updateProduct");

    const assignmentResult = productDetails.recordset[0].updateResult;

    if (assignmentResult === -1) {
      return res.status(400).json({ error: "product does not exist" });
    } else {
      const updatedproductID = productDetails.recordset[0].UpdatedproductID;
      return res.status(200).json({
        message: "product updated successfully",
        updatedproductID,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};


//delete product
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productID } = req.body;

    // Validate if productID is provided
    if (!productID) {
      return res
        .status(400)
        .json({ error: "Product ID is required for deletion." });
    }

    const pool = await mssql.connect(sqlConfig);
    const productDetails = await pool
      .request()
      .input("productID", mssql.VarChar, productID)
      .execute("deleteProduct");

    const deletionResult = productDetails.recordset[0].deleteResult;

    if (deletionResult === -1) {
      return res.status(400).json({ error: "Product does not exist." });
    } else {
      return res.status(200).json({
        message: "Product deleted successfully",
        deletedProductID: productID,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error || "Internal server error",
    });
  }
};
=======
import express from 'express'
import jwt from 'jsonwebtoken'
import { Request, Response } from 'express';
import { v4 } from 'uuid';
import mssql from 'mssql';
import { sqlConfig } from '../config/sqlConfig';
import { productUpdateValidationSchema, productValidationSchema } from '../validators/productValidators';


//create Product
export const createProduct = async (req: Request, res: Response) => {
    try {
        let { productName, productDescription, productPrice, 
            productCategory, productImage, supplierContact, 
            Quantity } = req.body;

        const { error } = productValidationSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        let productID = v4();

        const pool = await mssql.connect(sqlConfig);
        const productDetails = await pool.request()
            .input("productID", mssql.VarChar, productID)
            .input("productName", mssql.VarChar, productName)
            .input("productDescription", mssql.VarChar, productDescription)
            .input("productPrice", mssql.Int, productPrice)
            .input("productCategory", mssql.VarChar, productCategory)
            .input("productImage", mssql.VarChar, productImage)
            .input("supplierContact", mssql.VarChar, supplierContact)
            .input("Quantity", mssql.Numeric, Quantity)
            .execute("createProduct");

        return res.status(200).json({
            message: 'product created successfully',
            productID,
        });

    } catch (error) {
        return res.status(500).json({
            message: error
        });
    }
};

//fetch all products
export const getAllproducts = async (req: Request, res: Response) => {
    try {
        const pool = await mssql.connect(sqlConfig);
        const result = await pool.request().execute("fetchAllProducts");

        if (result.recordset && result.recordset.length > 0) {
            const products = result.recordset;
            return res.status(200).json(products);
        } else {
            return res.status(200).json([]);
        }
    } catch (error) {
        return res.status(500).json({
            message: error
        });
    }
}

//update product
export const updateProduct = async (req: Request, res: Response) => {
    try {
        let { productID, productName, productDescription, productPrice, 
             productCategory, productImage, supplierContact, 
          Quantity } = req.body;

        const { error } = productUpdateValidationSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const pool = await mssql.connect(sqlConfig);
        const productDetails = await pool.request()
            .input("productID", mssql.VarChar, productID)
            .input("productName", mssql.VarChar, productName)
            .input("productDescription", mssql.VarChar, productDescription)
            .input("productPrice", mssql.Int, productPrice)
            .input("productCategory", mssql.VarChar, productCategory)
            .input("productImage", mssql.VarChar, productImage)
            .input("supplierContact", mssql.VarChar, supplierContact)
            .input("Quantity", mssql.Numeric, Quantity)
            .execute("updateProduct");

        const assignmentResult = productDetails.recordset[0].updateResult;

        if (assignmentResult === -1) {
            return res.status(400).json({ error: 'product does not exist' });
        } else {
            const updatedproductID = productDetails.recordset[0].UpdatedproductID;
            return res.status(200).json({
                message: 'product updated successfully',
                updatedproductID,
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: error
        });
    }
}
>>>>>>> fa2e0f8fa302592d0ae834416a4405abcd659d0f

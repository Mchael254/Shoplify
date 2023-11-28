import { Request, Response } from "express";
import mssql from "mssql";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 } from "uuid";
import { sqlConfig } from "../config/sqlConfig";
import {
  userLoginValidationSchema,
  userRegisterValidationSchema,
} from "../validators/userValidators";
import { ExtendedUser } from "../middleware/tokenVerify";

//register user
export const registerUser = async (req: Request, res: Response) => {
  try {
    let { userName, email, password, phone_no } = req.body;

    const { error } = userRegisterValidationSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    let userID = v4();
    const hashedPwd = await bcrypt.hash(password, 5);

    const pool = await mssql.connect(sqlConfig);

    const checkEmailQuery = `SELECT 1 FROM Users WHERE email = @email`;
    const emailCheckResult = await pool
      .request()
      .input("email", mssql.VarChar, email)
      .query(checkEmailQuery);

    const checkPhoneQuery = `SELECT 1 FROM Users WHERE phone_no = @phone_no`;
    const phoneCheckResult = await pool
      .request()
      .input("phone_no", mssql.VarChar, phone_no)
      .query(checkPhoneQuery);

    if (
      emailCheckResult.recordset.length > 0 &&
      phoneCheckResult.recordset.length > 0
    ) {
      return res
        .status(400)
        .json({ error: "Email and phone number already exist." });
    } else if (emailCheckResult.recordset.length > 0) {
      return res.status(400).json({ error: "Email already exists" });
    } else if (phoneCheckResult.recordset.length > 0) {
      return res.status(400).json({ error: "Phone number already exists." });
    }

    const data = await pool
      .request()
      .input("userID", mssql.VarChar, userID)
      .input("userName", mssql.VarChar, userName)
      .input("email", mssql.VarChar, email)
      .input("phone_no", mssql.VarChar, phone_no)
      .input("password", mssql.VarChar, hashedPwd)
      .execute("registerUser");

    return res.status(200).json({
      message: "User registered successfully",
    });
  } catch (error) {
    return res.json({
      error: error,
    });
  }
};

//login user
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const { error } = userLoginValidationSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const pool = await mssql.connect(sqlConfig);

    let user = await (
      await pool
        .request()
        .input("email", mssql.VarChar, email)
        .input("password", mssql.VarChar, password)
        .execute("loginUser")
    ).recordset;

    if (user.length === 1) {
      const correctPwd = await bcrypt.compare(password, user[0].password);

      if (!correctPwd) {
        return res.status(401).json({
          error: "Incorrect password",
        });
      }
      const loginCredentials = user.map((record) => {
        const { phone_no, id_no, password, ...rest } = record;
        return rest;
      });

      const token = jwt.sign(
        loginCredentials[0],
        process.env.SECRET as string,
        {
          expiresIn: "3600s",
        }
      );

      return res.status(200).json({
        message: "Logged in successfully",
        token,
      });
    } else {
      return res.status(401).json({
        error: "Email not found",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

//checkUser Details
export const checkUserDetails = async (req: ExtendedUser, res: Response) => {
  if (req.info) {
    return res.json({
      info: req.info,
    });
  }
};

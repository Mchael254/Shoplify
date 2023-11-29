import mssql from "mssql";
import bcrypt from "bcrypt";
import { registerUser } from "./userControllers";
import { Request } from "express";

describe("User Registration", () => {
  let res: any;

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });


  it("registers a user using dbhelpers", async () => {
    const req = {
      body: {
        userName: "Robin",
        email: "devngecu@gmail.com",
        password: "I@mrich24",
        phone_no: "0707583092",
      },
    };

    jest
      .spyOn(bcrypt, "hash")
      .mockResolvedValueOnce("HashedPass@word123" as never);

    const mockedInput = jest.fn().mockReturnThis();

    const mockedExecute = jest.fn().mockResolvedValue({ rowsAffected: [1] });

    const mockedRequest = {
      input: mockedInput,
      execute: mockedExecute,
    };

    const mockedPool = {
      request: jest.fn().mockReturnValue(mockedRequest),
    };

    jest.spyOn(mssql, "connect").mockResolvedValue(mockedPool as never);

    await registerUser(req as Request, res as never);

        expect(res.json).toHaveBeenCalledWith({
          message: "User registered successfully",
        });
        expect(res.status).toHaveBeenCalledWith(200)
  });
  
    it("failed to register", async () => {
    const req = {
      body: {
        // userName: "Robin",
        email: "devngecu@gmail.com",
        password: "I@mrich24",
        phone_no: "0707583092",
      },
    };

    jest
      .spyOn(bcrypt, "hash")
      .mockResolvedValueOnce("HashedPass@word123" as never);

    const mockedInput = jest.fn().mockReturnThis();

    const mockedExecute = jest.fn().mockResolvedValue({ rowsAffected: [1] });

    const mockedRequest = {
      input: mockedInput,
      execute: mockedExecute,
    };

    const mockedPool = {
      request: jest.fn().mockReturnValue(mockedRequest),
    };

    jest.spyOn(mssql, "connect").mockResolvedValue(mockedPool as never);

    await registerUser(req as Request, res as never);

        expect(res.json).toHaveBeenCalledWith({
          error: '"userName" is required',
        });
        expect(res.status).toHaveBeenCalledWith(400)
  });

});

describe("User Login",()=>{

      let res: any;
      let req:any;

      beforeEach(() => {
        res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn().mockReturnThis(),
        };
      });

    it("Logs user successfully",()=>{
         req = {
           body: {
             email: "devngecu@gmail.com",
             password: "I@mrich24",
            
           },
         };

             jest
               .spyOn(bcrypt, "hash")
               .mockResolvedValueOnce("HashedPass@word123" as never);


              const mokedInput = jest.fn().mockReturnThis();

              const mockedExecute = jest.fn().mockResolvedValue

    }
    )
})

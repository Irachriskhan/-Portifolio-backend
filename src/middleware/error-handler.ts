import { Request, Response, NextFunction } from "express";
import { CustomAPIError } from "../errors/custom-errors";

const errorHandlerMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof CustomAPIError) {
    console.log('CustAPIError', err)
    return res.status(err.statusCode).json({ msg: err.message });
  }
  console.log(err)
  return res.status(500).json({ msg: `Something went wrong. Please try again later` });
};

export default errorHandlerMiddleware;

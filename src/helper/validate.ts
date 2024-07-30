import { NextFunction, query, Request, Response } from "express";
import { AnyZodObject } from "zod";

const validate =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error: any) {
      const errorMessage = JSON.parse(error.message);
      res.status(400).json({
        status: "Bad Request 2313",
        message: errorMessage[0].message,
      });
    }
  };

export default validate;

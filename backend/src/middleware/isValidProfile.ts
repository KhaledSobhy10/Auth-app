import { NextFunction, Request, Response } from "express";
import { ProfileCreateInputSchema } from "../../prisma/generated/zod";
import { getKeysWithError } from "../util/zodErrorFormater";

export const isValidProfileInputs = (req: Request, res: Response, next: NextFunction)=>{
    const data = { ...req.body };
    const validate = ProfileCreateInputSchema.safeParse(data);
    
    if (!validate.success)
       res.status(400).json({
        success: false,
        errors: getKeysWithError(validate.error.issues),
        message: "Incorrect form data !",
      });
      else {
        req.body = validate.data;
        next();
    }

}

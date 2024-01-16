import { Injectable, NestMiddleware, Req } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class Logging implements NestMiddleware{
    use(req: Request, res: Response, next: NextFunction){
        console.log("This should work before any request enters the Student Controller");
        next();
    }
}
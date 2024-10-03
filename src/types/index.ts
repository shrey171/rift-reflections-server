import { Request, RequestHandler, Response } from "express";

// General
declare global {
  namespace Express {
    export interface Request {
      input?: any;
      protected: boolean;
      user: any;
    }
    export interface Response {
      sendRefreshToken: (token: string) => this
    }
  }
}

export interface IObject {
  [key: string]: any
}


// utils
export interface IContext {
  req: Request
  res: Response
}
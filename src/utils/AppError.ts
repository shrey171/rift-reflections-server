import { IObject } from "types";

export class AppError extends Error {
  status: number;
  message: string;
  type?: string;
  [key: string]: any;

  constructor(error: IObject) {
    super();
    const { status, message, name, ...details } = error
    this.status = status;
    this.message = message;
    this.type = name;
    Object.keys(details).forEach(key => {
      this[key] = details[key];
    });

  }
}
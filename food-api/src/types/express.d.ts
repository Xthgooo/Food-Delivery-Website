import "express";

declare namespace Express {
  export interface Request {
    userId: string;
    isAdmin: boolean;
  }
}

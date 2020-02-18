import { Request, Response, NextFunction } from "express";
interface Error {
  status?: number;
  message?: string;
}

/**
 * GET /healthcheck
 */
export let errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  // Only send a response if we haven't already
  if (!res.headersSent) {
    res.status(err.status || 500);
    res.json({
      type: "InternalError",
      message: err.message,
      error: err,
    });
  }

  next(err);
};

import { Request, Response, NextFunction } from "express";

export function authorizeRequest(req: Request, res: Response): Boolean {
  const requestIP: string = req.header("X-Forwarded-For");

  const internalAccessToken: string = req.header("Internal-Access-Token");
  const validAccessToken: string = process.env.INTERNAL_ACCESS_TOKEN;

  if (internalAccessToken !== validAccessToken) {
    res.status(401).json({
      error: {
        type: "InvalidAccess",
        message: "You are not authorized to call this API.",
      },
    });

    return true;
  } else {
    return false;
  }
}

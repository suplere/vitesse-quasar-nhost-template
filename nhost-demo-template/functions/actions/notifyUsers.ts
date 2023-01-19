import { Request, Response } from "express";
import { notifyUsersHandler } from "../_utils/helpers";
import { notifyUsersArgs } from "../_utils/types";

const handler = async (req: Request, res: Response) => {
  if (
    req.headers["nhost-webhook-secret"] !== process.env.NHOST_WEBHOOK_SECRET
  ) {
    return res.status(401).send("Unauthorized");
  }
  // get request input
  const params: notifyUsersArgs = req.body.input;

  try {
    // console.log(params);
    const result = await notifyUsersHandler(params);
    // success
    return res.json(result);
  } catch (error) {
    return res.status(400).json({
      message: `error happened ${error}`,
    });
  }
};

export default handler;

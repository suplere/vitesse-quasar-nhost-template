import { Users } from "./../_utils/__generated__/graphql";
import { Request, Response } from "express";
import { updateUserNotification } from "../_utils/helpers";
import { getHash } from "../_utils/oneSignal";

const handler = async (req: Request, res: Response) => {
  if (
    req.headers["nhost-webhook-secret"] !== process.env.NHOST_WEBHOOK_SECRET
  ) {
    return res.status(401).send("Unauthorized");
  }
  const out = {
    message: "",
    status: 200,
  };
  try {
    let {
      event: { data },
    } = req.body;
    const user = data.new as Users;
    const os_idHash = getHash(user.id);
    const os_emailHash = getHash(user.email);
    const response = await updateUserNotification({
      user_id: user.id,
      os_emailHash,
      os_idHash,
    });
    // console.log(response);
    out.message = "User hash updated";
    if (response.data)
      out.message = response.data.insert_user_notification_one.user_id;
    return res.status(out.status).json(out);
  } catch (e) {
    out.status = 400;
    out.message = "error hasura event";
    return res.status(out.status).json(out);
  }
};

export default handler;

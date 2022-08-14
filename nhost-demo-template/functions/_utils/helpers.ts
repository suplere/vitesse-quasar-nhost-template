import { nhost } from "./nhost";
import { UPDATE_USER_DATA } from "./query";
import { Users_Data_Insert_Input } from "./__generated__/graphql";

export const updateUserNotification = (object: Users_Data_Insert_Input) =>
  nhost.graphql.request(
    UPDATE_USER_DATA,
    { object },
    {
      headers: {
        "x-hasura-admin-secret": process.env.NHOST_ADMIN_SECRET as string,
      },
    }
  );

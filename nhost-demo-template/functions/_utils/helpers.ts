import { nhost } from "./nhost";
import { sendNotification } from "./oneSignal";
import { GET_ALL_USERS, UPDATE_USER_DATA } from "./query";
import { NotifyResult, notifyUsersArgs } from "./types";
import { Users, Users_Data_Insert_Input } from "./__generated__/graphql";

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

export const notifyUsersHandler = async (
  params: notifyUsersArgs
): Promise<NotifyResult> => {
  if (params.userIds && params.webpush_notify) {
    // userIds and webpush exist
    let ids = params.userIds as string[];
    if (params.userIds.length === 0) {
      // notify all users
      const res = await nhost.graphql.request(
        GET_ALL_USERS,
        {},
        {
          headers: {
            "x-hasura-admin-secret": process.env.NHOST_ADMIN_SECRET as string,
          },
        }
      );
      if (!res.error) {
        ids = (res.data.users as Users[]).map((u) => u.id);
      }
    }
    await sendNotification({
      contents: {
        en: params.webpush_notify.contents.en,
        cs: params.webpush_notify.contents.cs,
      },
      url: params.webpush_notify.url,
      include_external_user_ids: ids,
      subtitle: {
        en: params.webpush_notify.subtitle?.en,
        cs: params.webpush_notify.subtitle?.cs,
      },
      headings: {
        en: params.webpush_notify.headings.en,
        cs: params.webpush_notify.headings.cs,
      },
    });
    return {
      numIds: ids.length,
    };
  } else {
    // no notify
    return {
      numIds: 0,
    };
  }
};

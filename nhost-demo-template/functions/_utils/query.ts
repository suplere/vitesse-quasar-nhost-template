export const UPDATE_USER_DATA = `
mutation addUserData($object: users_data_insert_input!) {
  insert_users_data_one(object: $object, on_conflict: {constraint: users_data_pkey, update_columns: [os_idHash, os_emailHash]}) {
    user_id
    os_idHash
    os_emailHash
  }
}
`;

export const GET_ALL_USERS = `
query allUsers {
  users {
    id
    metadata
  }
}
`;

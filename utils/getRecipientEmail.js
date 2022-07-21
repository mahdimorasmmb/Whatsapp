const getRecipientEmail = (user, userLoggedin) =>
  user?.filter((userToFilter) => userToFilter !== userLoggedin?.email)[0];

export default getRecipientEmail;

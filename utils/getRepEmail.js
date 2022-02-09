const getRepEmail = (users, userLoggedIn) => {
  return users?.filter(filter => filter !== userLoggedIn?.email)[0];
}



export default getRepEmail;

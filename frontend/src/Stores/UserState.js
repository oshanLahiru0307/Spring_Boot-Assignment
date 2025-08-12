import { proxy } from 'valtio';

let user = null;
let token = null;

try {
  const storedUser = localStorage.getItem("user");
  const storedToken = localStorage.getItem("token");

  user = storedUser;
  token = storedToken; // Token is likely a string, no need to parse as JSON

} catch (error) {
  console.error("Error retrieving or parsing data from localStorage:", error);
}

const usrState = proxy({
  user: user,
  token: token,
});

export default usrState;
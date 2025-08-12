import {proxy} from 'valtio'

let storedUser = null;
let token = null;

try {
  const user = localStorage.getItem("user");
  const tokenValue = localStorage.getItem("token");
  storedUser = user ? JSON.parse(user) : null;
  token = tokenValue ? JSON.parse(tokenValue) : null;
  console.log("Stored token:", token);
  console.log("Stored user:", storedUser);
} catch (error) {
  console.error("Error parsing user from localStorage:", error);
}

const usrState = proxy({
    user: storedUser,
    token: token,
})

export default usrState
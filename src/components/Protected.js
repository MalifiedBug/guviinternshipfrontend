import { useEffect, useState } from "react";
import { serverUrl } from "../App";
import axios from "axios";
import { MainContext } from "../App";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function Protected() {
  const [data, setData] = useState([]);
  const email = localStorage.getItem("user");
  const [error, setError] = useState(false);
  const {user,setUser,token, login, setLogin} = useContext(MainContext)
  const navigate = useNavigate();
  console.log(user)

  async function sendToken() {
    await axios
      .get(`${serverUrl}/profile/${email}`, {
        headers: { Authorization: token },
        withCredentials: true,
      })
      .then((response) => setData(response.data))
      .catch((error) => setError(true));
  }
  async function newToken() {
    const instance = axios.create({
      withCredentials: true,
    });
    await instance
      .post(`${serverUrl}/refresh`)
      .then((response) => console.log(response));
  }

  if (error) {
    newToken();
  }

  function LogOut(){
    setUser(null);
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    setLogin(false)
    navigate('/signin')
  }

  useEffect(() => {
    sendToken();
  }, [token, email, error]);

  console.log(data);

  return (
    <div>
      {login?<div>
        <button onClick={()=>LogOut()} className="border-2 rounded-lg bg-orange-400 hover:bg-orange-500 active:bg-orange-600 p-2 text-orange-200">Logout</button>
        {!error ? (
          <div>
            <h1 className="text-3xl font-bold">{data.name}</h1>
            <div class="relative overflow-x-auto">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Key
                </th>
                <th scope="col" class="px-6 py-3">
                  Value
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Name
                </th>
                <td class="px-6 py-4">{data.name}</td>
              </tr>
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Date of Birth
                </th>
                <td class="px-6 py-4">{data.dob}</td>
              </tr>
              <tr class="bg-white dark:bg-gray-800">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Contact
                </th>
                <td class="px-6 py-4">{data.contact}</td>
              </tr>
              <tr class="bg-white dark:bg-gray-800">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Email
                </th>
                <td class="px-6 py-4">{data.email}</td>
              </tr>
            </tbody>
          </table>
        </div>
          </div>
        ) : (
          <h1 className="text-3xl font-bold">token expired</h1>
        )}
      </div>:
      <div>
      Login to get details.
      <button onClick={()=>navigate('/signin')} className="border-2 rounded-lg bg-orange-400 hover:bg-orange-500 active:bg-orange-600 p-2 text-orange-200">Login</button>
      
    </div>
    }

    <div>
      <p className="text-xl font-semibold font-serif">Made with MERN and MongoDB for database</p>
      <p className="text-xl font-semibold font-serif">Expirey time of JWT is 60 seconds</p>
    </div>
      
      
    </div>
  );
}

import './App.css';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import {Routes,Route} from 'react-router-dom'
import Protected from './components/Protected';
import { useState } from 'react';
import { createContext } from 'react';


export const serverUrl = "https://guviinternshipbackend.onrender.com"

export const MainContext = createContext()
function App() {
  const [user,setUser] = useState('')
  const [token,setToken] = useState('')
  const [login,setLogin] = useState(false)
  return (
    <MainContext.Provider value={{user,setUser,token,setToken, login, setLogin}}>
      <div className="App min-h-screen w-screen">
        <Routes>
          <Route path="/" element={<SignUp />}/>
          <Route path="/signin" element={<SignIn />}/>
          <Route path="/protected" element={<Protected />}/>
        </Routes>
      </div>
    </MainContext.Provider>
  );
}

export default App;

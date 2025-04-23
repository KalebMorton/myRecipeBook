import { useState } from 'react'
import { Routes, Route, Link } from "react-router-dom";
import Home from './components/Home';
import AllRecipes from './components/allRecipes'
import SignUpForm from './components/SignUpForm'
import Favorites from './components/Favorites';
import SignInForm from './components/SignInForm'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [userData, setUserData] = useState(null);

  return (
    <>
    <h1>Recipe Book</h1>
    {userData ? <>Welcome {userData.username}!</> : <>You are not signed in.</>}
    <div id="navbar">
    <Link to="/SignUp">Create New Account</Link>
    <Link to="/SignIn">Log In</Link>
    <Link to="/Recipes">Veiw Recipes</Link>
    <Link to="/Favorites">Veiw Favorites</Link>
    </div>
    <div>
      <Routes>
        <Route path="/SignIn" element={<SignInForm setUserData={setUserData}/>} />
        <Route path="/SignUp" element={<SignUpForm setUserData={setUserData}/>} />
        <Route path="/Recipes" element={<AllRecipes userData={userData}/>} />
        <Route path="/Favorites" element={<Favorites userData={userData}/>} />
        <Route path="/" element={<Home/>} />
      </Routes>
    </div>
    </>
  )
}

export default App

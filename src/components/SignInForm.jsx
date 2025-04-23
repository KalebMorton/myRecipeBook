import { useState } from "react";

export default function SignInForm(setUserData){
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    async function handleSubmit(event) {
        event.preventDefault();

            try { 
                const response = await fetch("https://fsa-recipe.up.railway.app/api/auth/login",{ 
                    method: "POST", 
                    headers: { 
                    "Content-Type": "application/json" 
                    }, 
                    body: JSON.stringify({ 
                    username: username, 
                    password: password
                    }) 
                })
                const rawData = await response.json()
                
                if(rawData.token){
                    setUserData.setUserData(rawData)
                    setError(null)
                }else{
                    setError("Incorrect username or password")
                }

            } catch (error) {
                console.log(error)
            }
    }

    return (
        <>
        <h2>Log In</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label id="formContent">
                    Username: <input value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <br></br>
                <label id="formContent">
                    Password: <input value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <br></br>
                <button id="formContent">Submit</button>
            </form>
        </>
    )

}
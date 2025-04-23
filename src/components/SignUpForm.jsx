import { useState } from "react";

export default function SignUpForm(setUserData){
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    async function handleSubmit(event) {
        event.preventDefault();
        if (password.length > 6){
            try { 
                const response = await fetch("https://fsa-recipe.up.railway.app/api/auth/register",{ 
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
                    setError(null)
                    setUserData.setUserData(rawData)
                }else{
                    setError("Username is taken")
                }

            } catch (error) {
                console.log(error)
            }
        }else{
            setError("password must be longer than six characters")
        }
    }

    return (
        <>
        <h2>Create New Account</h2>
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
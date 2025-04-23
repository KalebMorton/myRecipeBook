import { useEffect, useState } from "react"

export default function Favorites(userData){

    const [error, setError] = useState(null);
    const [favRecipes, setFavRecipes] = useState(null);

    async function getRecipes() {
        try {
            const response = await fetch("https://fsa-recipe.up.railway.app/api/favorites", {
                headers: {
                  Authorization: `Bearer ${userData.userData.token}`
                }
            })
            const rawData = await response.json()
            setFavRecipes(rawData.data.map((item) => {
                return <div id="recipeListing" key={item.idMeal}>
                    <p>{item.strMeal}</p>
                    {userData.userData && <button id={item.id} onClick={deleteFavorite}>Remove from Favorites</button>}
                </div>
            }))
            
        } catch (error) {
            console.log(error)
        }
    }

    

    async function deleteFavorite(event) {
        await fetch(`https://fsa-recipe.up.railway.app/api/favorites/${event.target.id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${userData.userData.token}`
            }
        });
        await getRecipes()
    }

    useEffect(() => {
        let ignore = false;
        
        if (!ignore)  getRecipes()
        return () => { ignore = true; }
    },[]);

    return (
        <>
        <h2>Favorite Recipes</h2>
        {favRecipes ? <>{favRecipes}</> : <>You have no favorite recipes</>}
        </>
    )
}
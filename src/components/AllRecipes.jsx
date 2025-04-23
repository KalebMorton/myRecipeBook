import { useEffect, useState } from "react"

export default function AllRecipes(userData){

    const [error, setError] = useState(null);
    const [allRecipes, setAllRecipes] = useState(null);

    async function checkFavs() {
        let output = []
        try {
            const response2 = await fetch("https://fsa-recipe.up.railway.app/api/favorites", {
                headers: {
                  Authorization: `Bearer ${userData.userData.token}`
                }
            });
            const favRef = await response2.json()

            output = favRef.data.map((item) => {
                return item.idMeal
            })
        } catch (error) {
            console.log(error)
        }

        return output
    }

    async function getRecipes() {
        try {
            
            const favRecipeIds = await checkFavs()

            const response = await fetch("https://fsa-recipe.up.railway.app/api/recipes")
            const rawData = await response.json()
            setAllRecipes(rawData.map((item) => {
                return <div id="recipeListing" key={item.idMeal}>
                    <p>{item.strMeal}</p>
                    {(userData.userData && !favRecipeIds.includes(item.idMeal)) ? <button id={item.idMeal} onClick={addFavorite}>Add to Favorites</button> : <></>}
                </div>
            }))
            
        } catch (error) {
            console.log(error)
        }
    }

    async function addFavorite(event){

        if((await checkFavs()).includes(event.target.id)){
            console.log("stop spamming the button!")
        }else{

        try {
            const response = await fetch(`https://fsa-recipe.up.railway.app/api/recipes/${event.target.id}`)
            const recipeRef = await response.json()

            await fetch("https://fsa-recipe.up.railway.app/api/favorites", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userData.userData.token}`
                },
                body: JSON.stringify({
                mealId: recipeRef.idMeal,
                name: recipeRef.strMeal,
                imageUrl: recipeRef.strMealThumb,
                strArea: recipeRef.strArea
                })
            });
            getRecipes()
        } catch (error) {
            console.log(error)
        }
        }
    }

    useEffect(() => {
        let ignore = false;
        
        if (!ignore)  getRecipes()
        return () => { ignore = true; }
    },[]);
    

    return (
        <>
        <h2>Recipes</h2>
        {allRecipes && <>{allRecipes}</>}
        </>
    )
}
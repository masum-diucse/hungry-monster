const searchMeal = () => {
    const meal = document.getElementById('meal').value;
    if(isNaN(meal)){
        const api = `https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`;
    fetch(api)
        .then(res => res.json())
        .then(data => displaySearchResult(data.meals));
    document.getElementById('meal').value = "";
    document.getElementById('display-meal-details').innerHTML = "";
    }else{
        alert("Please enter correct value.");
    }
    
}

const displaySearchResult = meals => {
    const mealsContainer = document.getElementById('display-search-result');
    mealsContainer.innerHTML = "";
    meals.forEach(meal => {
        // console.log(meal);
        const mealDiv = document.createElement('div');
        mealDiv.className = "card";
        mealDiv.innerHTML = `
        <img src="${meal.strMealThumb}">
        <div class="card-body text-center">
          <h5 class="card-title">${meal.strMeal}</h5>
        </div>
        <button onclick="displayMealDetails(${meal.idMeal})" class="btn btn-success">Details</button>
      `;
        mealsContainer.appendChild(mealDiv);
    })
}

const displayMealDetails = (mealId) => {
    const detailsContainer = document.getElementById('display-meal-details');
    detailsContainer.innerHTML = "";
    const api = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    fetch(api)
        .then(res => res.json())
        .then(data => {
            const mealObj = data.meals[0];
            const mealDetailsDiv = document.createElement('div');
            mealDetailsDiv.className = "card mealDeatils";

            const ingredients = [];
            for (let i = 1; i <= 20; i++) {
                if (mealObj[`strIngredient${i}`]) {
                    ingredients.push(
                        `${mealObj[`strIngredient${i}`]} - ${mealObj[`strMeasure${i}`]
                        }`
                    );
                } else {
                    break;
                }
            }

            mealDetailsDiv.innerHTML = `
        <img src="${mealObj.strMealThumb}">
        <div class="card-body">
          <h3 class="card-title">${mealObj.strMeal}</h3>
          <h5>Ingredients</h5> 
          <ul>
           ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
          </ul>         
        </div>
        `;
            detailsContainer.appendChild(mealDetailsDiv);

        });
}




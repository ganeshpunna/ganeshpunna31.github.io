const ingredientInput = document.getElementById('ingredientInput');
const recipeResults = document.getElementById('recipeResults');
const searchBtn = document.getElementById('searchBtn');

// Recipe database with images and procedures
const recipes = [
    {
        name: "Chicken Tomato Pasta",
        ingredients: ["chicken", "tomato", "pasta", "garlic"],
        image: "images/chicken-pasta.JPG",
        procedure: [
            "Boil pasta according to package instructions.",
            "Cook chicken in a pan until golden.",
            "Add garlic and tomato, cook until soft.",
            "Mix pasta with chicken and sauce, serve hot."
        ]
    },
    {
        name: "Vegetable Stir Fry",
        ingredients: ["carrot", "broccoli", "bell pepper", "soy sauce"],
        image: "images/veg-stirfry.JPG",
        procedure: [
            "Chop all vegetables into bite-size pieces.",
            "Heat oil in a wok and stir fry vegetables for 5-7 minutes.",
            "Add soy sauce and stir until evenly coated.",
            "Serve immediately with rice or noodles."
        ]
    },
    {
        name: "Tomato Soup",
        ingredients: ["tomato", "onion", "garlic", "cream"],
        image: "images/tomato-soup.JPG",
        procedure: [
            "Saute onions and garlic until soft.",
            "Add tomatoes and cook for 10 minutes.",
            "Blend until smooth and add cream.",
            "Simmer for 5 minutes and serve hot."
        ]
    },
    {
        name: "Fried Rice",
        ingredients: ["rice", "egg", "carrot", "peas"],
        image: "images/fried-rice.JPG",
        procedure: [
            "Cook rice and let it cool.",
            "Scramble eggs in a pan and set aside.",
            "Stir fry vegetables, then add rice and eggs.",
            "Season with soy sauce and serve."
        ]
    },
    {
        name: "Grilled Chicken Salad",
        ingredients: ["chicken", "lettuce", "tomato", "cucumber"],
        image: "images/grilled-salad.JPG",
        procedure: [
            "Grill chicken until cooked.",
            "Chop lettuce, tomato, and cucumber.",
            "Mix chicken with vegetables and dressing.",
            "Serve chilled or at room temperature."
        ]
    }
];

// Highlight matched ingredients
function highlightIngredients(recipeIngredients, userIngredients) {
    return recipeIngredients.map(ingredient => {
        if (userIngredients.includes(ingredient.toLowerCase())) {
            return `<span class="highlight">${ingredient}</span>`;
        } else {
            return ingredient;
        }
    }).join(', ');
}

// Filter recipes and display
function findRecipes() {
    const userIngredients = ingredientInput.value.toLowerCase()
        .split(',')
        .map(i => i.trim())
        .filter(Boolean);

    if (userIngredients.length === 0) {
        recipeResults.innerHTML = '<p>Please enter ingredients to find recipes.</p>';
        return;
    }

    const matchedRecipes = recipes.filter(recipe =>
        recipe.ingredients.some(ingredient => userIngredients.includes(ingredient.toLowerCase()))
    );

    recipeResults.innerHTML = '';

    if (matchedRecipes.length === 0) {
        recipeResults.innerHTML = '<p>No recipes found. Try different ingredients.</p>';
        return;
    }

    matchedRecipes.forEach(recipe => {
        const div = document.createElement('div');
        div.classList.add('recipe-card');
        div.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.name}">
            <h3>${recipe.name}</h3>
            <p><strong>Ingredients:</strong> ${highlightIngredients(recipe.ingredients, userIngredients)}</p>
            <div class="recipe-procedure">
                <h4>Procedure:</h4>
                <ol>
                    ${recipe.procedure.map(step => `<li>${step}</li>`).join('')}
                </ol>
            </div>
        `;

        // Click event to toggle procedure visibility
        div.addEventListener('click', () => {
            const procedureDiv = div.querySelector('.recipe-procedure');
            procedureDiv.style.display = procedureDiv.style.display === 'none' ? 'block' : 'none';
        });

        recipeResults.appendChild(div);
    });
}

// Event listeners
searchBtn.addEventListener('click', findRecipes);
ingredientInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        findRecipes();
    }
});

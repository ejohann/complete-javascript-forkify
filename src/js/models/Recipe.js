import axios from 'axios';
import { recipeURL, baseURL, apiAppID, apiKey } from '../config'; 

export default class Recipe{
    constructor(id){
        this.id = id;
    }

    async getRecipe(){
        try{
            const recipeID = encodeURIComponent(`${recipeURL}${this.id}`)
            const results = await axios(`${baseURL}/search?r=${recipeID}&app_id=${apiAppID}&app_key=${apiKey}`);
            this.title = results.data[0].label;
            this.author = results.data[0].source;
            this.image = results.data[0].image;
            //this.url = results.data[0].url;
            this.url = results.data[0].shareAs;
            this.ingredients = results.data[0].ingredientLines;
            this.parseIngredients ();
           console.log(results);
        }catch(error){
            console.log(error);
            alert('Something went wrong :(');
        }
    }

    calcTime(){
        // estimate 15 minutes for every 3 ingredients
        const totalIngredients = this.ingredients.length;
        const periods = Math.ceil(totalIngredients / 3);
        this.time = periods * 15;
    }

    calcServings(){
        this.servings = 4;
    }

    parseIngredients (){
        const unitsLong = ['tablespoons', 'tablespoon', 'ounce', 'ounces', 'teaspoon', 'teaspoons', 'cups', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];

        const newIngredients = this.ingredients.map(el => {
            // 1. Uniform units
            let ingredient = el.toLowerCase();
            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitsShort[i]);
            });

            // 2.  Remove parenthesis
            ingredient = ingredient.replace(/ *\([^)]*\) */g, "");
           
            // 3. parse ingredients into count, unit and ingredient
            return ingredient;
        });
        this.ingredients = newIngredients;
    }

}
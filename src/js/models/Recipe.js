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
        const newIngredients = this.ingredients.map(el => {
            // 1. Uniform units

            // 2.  Remove parenthesis

            // 3. parse ingredients into count, unit and ingredient
        });
        this.ingredients = newIngredients;
    }

}
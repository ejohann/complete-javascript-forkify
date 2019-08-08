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
        }
    }
}
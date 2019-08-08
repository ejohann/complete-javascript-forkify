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
            console.log(results);
        }catch(error){
            console.log(error);
        }
    }
}
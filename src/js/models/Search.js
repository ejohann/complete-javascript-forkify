import axios from 'axios'; 
import { baseURL, apiAppID, apiKey } from '../config';

export default class Search{
    constructor(query){
        this.query = query;
    }

    async getResults(){  
        try{
            const results = await axios(`${baseURL}/search?q=${this.query}&from=0&to=50&app_id=${apiAppID}&app_key=${apiKey}`);
            this.recipes = results.data.hits;
         //   console.log(this.recipes);
        }catch(error){
            alert(error);
        }
    }
}

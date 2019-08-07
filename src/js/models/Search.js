import axios from 'axios'; 

export default class Search{
    constructor(query){
        this.query = query;
    }

    async getResults(){
        const baseURL = 'http://cors-anywhere.herokuapp.com/https://api.edamam.com';
        const apiKey = 'de17a4d06f14b98217ee495612544deb';
        const apiAppID = 'bbf6d6db';
    
        try{
            const results = await axios(`${baseURL}/search?q=${this.query}&from=0&to=50&app_id=${apiAppID}&app_key=${apiKey}`);
            this.recipes = results.data.hits;
         //   console.log(this.recipes);
        }catch(error){
            alert(error);
        }
    }
}

import axios from 'axios'; 

async function getResults(query){
    const baseURL = 'http://cors-anywhere.herokuapp.com/https://api.edamam.com';
    const apiKey = 'de17a4d06f14b98217ee495612544deb';
    const apiAppID = 'bbf6d6db';

    const results = await axios(`${baseURL}/search?q=${query}&from=0&to=50&app_id=${apiAppID}&app_key=${apiKey}`);
    console.log(results);
}
getResults();
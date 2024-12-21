interface MyData {
    name: string,
    language: string,
    id: string,
    bio: string,
    version: number
}

export default function GifGetter(query: string | null) {
    if (query){
        let searchQuery = query;
        searchQuery = query.split(' ').join('+');
        // const response = fetch(`https://microsoftedge.github.io/Demos/json-dummy-data/64KB.json`)
        // const data =  response;
        // console.log(data)
        return `http://api.giphy.com/v1/gifs/search?q=${searchQuery}&api_key=ToSTBQTRvlcLz8eo4BuHOH87NvrGplGS&limit=18`
    }
    else {
        return 'no gif'
    }
        
}
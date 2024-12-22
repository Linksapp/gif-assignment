export default function GifGetter(query: string | null) {
    if (query){
        let searchQuery = query;
        searchQuery = query.split(' ').join('+');
        return `http://api.giphy.com/v1/gifs/search?q=${searchQuery}&api_key={api}&limit=18`
    }
    else {
        return 'no gif'
    }
        
}
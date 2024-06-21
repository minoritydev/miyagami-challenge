/**
 * This function is an async function that handles the GET request to the API endpoint 
 * '/api/getFeed'. 
 *
 * @param {any} req - The request object that contains information about the request.
 * @return {Promise<Response>} A Promise that resolves to a Response object.
 */
export async function GET(req : any ) {

    /**
     * Extract the search parameters from the request URL and store them in the 'params' variable.
     */
    let params = req.nextUrl.searchParams

    /**
     * Construct the URL for the Flickr API feed by concatenating the base URL with the search parameters.
     */
    const feedURL = "https://www.flickr.com/services/feeds/photos_public.gne?format=json&nojsoncallback=1&" + params;

    /**
     * Send a GET request to the Flickr API feed URL and wait for the response.
     */
    const response = await fetch(feedURL);

    /**
     * Wait for the response to be received and parsed as text.
     */
    const data = await response.text();

    /**
     * Return a new Response object with the parsed data and a status code of 200.
     */
    return new Response(data, { status: 200 });
    
}

/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
const fetch = require('node-fetch');

async function getData(url, data=null) {
    if(data == null){
        const response = await fetch(url);
    }
    else{
        const response = await fetch(url, data);
    }

    return response.json();
}

exports.MapController = async (req, res) => {
    //expecting req.location, req.type, rec.minScore, rec.vibe


    //url to call NLP model
    let url = `matthews url`;
    const vibe = req.vibe;

    //get lat and long from req.location
    const locURL = `https://maps.googleapis.com/maps/api/geocode/json?key=` + process.env.MAPKEY + `&address=Dallas`;
    const resData = await getData(locURL);
    let latLong = resData.results[0].geometry.location.lat + `,` + resData.results[0].geometry.location.lng;

    //maps call based on req.location and rec.type
    const mapsURL = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=`  + process.env.MAPKEY +`&location=` + latLong + `&type=` + req.type + `radius=10000`;

    let mapsCall = await getData(mapsURL);
    let mapsRes = mapsCall.json();
    if(mapsRes.status != 'OK' || mapsRes.results == null || typeof(mapsRes.results) == 'undefined'){
        res.status(406).send("Invalid Location");
    }


    //endpoint for getting reviews
    const reviewsURL = `https://maps.googleapis.com/maps/api/place/details/json?key=` + process.env.MAPKEY + `&fields=review` + `&place_id=`;

    //get place reviews by id and put them into object to transfer to NLP
    const sendNLP = {};
    sendNLP.vibe = vibe;
    sendNLP.reviews = {};
    for (const idx in mapsRes.results){
        if(idx > 5){break;}
        const place = mapsRes.results[idx]
        let ID = place.place_id;

        //get reviews
        let reviewsRes = await getData(reviewsURL + ID);
        const revJson = reviewsRes.json();
        const name = place.name;
        
        //add reviews to an array
        let arrRev = [];
        revJson.results.reviews.array.forEach(rev => {
            arrRev.push(rev.text);
        });
        //put array in NLP json under place name
        sendNLP.reviews[name] = arrRev;
    }

    //send request to NLP with sendOBJ
    let NLPRes = await getData(`https://vibe-server2-fvbdgenooq-vp.a.run.app/getSimilarity?`, sendNLP);
    
    const NLPJSON = NLPRes.json();



    //get response and create obj with NLP score and other info if its >= than minScore
    //then return that object in res.json()
    let returnJson = {};
    for (const loc in NLPJSON){
        if(NLPJSON[loc][0][1] >= req.minScore){
            returnJson[loc] = NLPJSON[loc][0][1];
        }
    }

    res.send(returnJson);
};
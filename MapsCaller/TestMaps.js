/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
const fetch = require('node-fetch');

async function getData(url) {
    const response = await fetch(url);

    return response.json();
}

exports.MapController = async (req, res) => {

    const locURL = `https://maps.googleapis.com/maps/api/geocode/json?key=` + process.env.MAPKEY + `&address=Dallas`;
    const resData = await getData(locURL);
    console.log(resData.results.geometry.location.lat);
    let latLong = resData.results[0].geometry.location.lat + `,` + resData.results[0].geometry.location.lng;


    res.send(latLong);
};
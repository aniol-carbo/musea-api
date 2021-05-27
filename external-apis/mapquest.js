const axios = require('axios')

async function getCoordinatesInfo (address) {
  try {
    const fullAddress = encodeURIComponent(address)
    const key = process.env.MAPQUEST_API
    const url = `http://open.mapquestapi.com/geocoding/v1/address?key=${key}&location=${fullAddress}`
    const { data } = await axios.get(url)
    const coordinates = {
      latitude: data.results[0].locations[0].displayLatLng.lat,
      longitude: data.results[0].locations[0].displayLatLng.lng
    }
    return (coordinates)
  } catch (err) {
    return null
  }
}

module.exports = {
  getCoordinatesInfo: getCoordinatesInfo
}

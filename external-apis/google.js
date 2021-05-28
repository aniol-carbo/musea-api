const axios = require('axios')

async function getGoogleInfo (param) {
  try {
    const name = param.name
    const city = param.city
    const key = process.env.GOOGLE_API_KEY
    const bestTimeKey = process.env.BESTTIME_API_KEY
    const { data } = await axios.get(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${name}%20${city}&inputtype=textquery&fields=place_id,photos,formatted_address,name,rating,opening_hours,geometry&key=${key}`
    )
    const placeId = data.candidates[0].place_id
    const address = data.candidates[0].formatted_address
    const details = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,opening_hours,rating,formatted_phone_number&key=${key}`
    )
    const fullName = details.data.result.name
    const horari = details.data.result.opening_hours.weekday_text
    const isOpen = details.data.result.opening_hours.open_now
    const afluence = await axios.post(`https://besttime.app/api/v1/forecasts?api_key_private=${bestTimeKey}&venue_name=${fullName}&venue_address=${address}`
    )
    const days = afluence.data.analysis
    const afluenceInfo = []
    for (const day of days) {
      const dayName = day.day_info.day_text
      const hours = day.day_raw
      const fullDay = {
        dayName: dayName,
        hours: hours
      }
      afluenceInfo.push(fullDay)
    }
    return ({ info: { name: fullName, horari: horari, isOpen: isOpen, afluence: afluenceInfo } })
  } catch (err) {
    return ('External API server error')
  }
}

module.exports = {
  getGoogleInfo: getGoogleInfo
}

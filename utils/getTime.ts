const clientTime = new Date(Date.now())
const isAm = clientTime.getHours() < 12
const hour = clientTime.getHours()
const time = (isAm ? hour : hour - 12) + ':' + clientTime.getMinutes().toString() + (isAm ? ' am' : ' pm')

export default time

// Path: convertHour.js
const transformHour = (hour) => {
    const date = new Date(hour)
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()
    const milliseconds = date.getMilliseconds()
    return `${hours}:${minutes}:${seconds}:${milliseconds}`
}
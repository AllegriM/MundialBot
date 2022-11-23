const transformHour = (date) => {
    console.log
    if (date.includes('Hoy')) return Date.now()
    if (date.includes('Mañana')) return Date.now() + 86400000
    const day = date.slice(22, date.length).slice(0, 2)
    const month = 11
    return new Date(2022, month, day).getTime()
}

module.exports = { transformHour }
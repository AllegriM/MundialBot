require("dotenv").config();
const DB_URL = process.env.DB_URL

const getActualDate = (dateMatch) => {
    if (dateMatch === "Hoy") {
        const date = new Date();
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${month}/${day}/${year}`;
    }
    else if (dateMatch === "Mañana") {
        const date = new Date();
        const day = date.getDate() + 1;
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${month}/${day}/${year}`;
    }
}

const makeLogin = async () => {
    try {
        const EMAIL = process.env.EMAIL;
        const PASSWORD = process.env.PASSWORD;

        const response = await fetch(`${DB_URL}/user/login`, {
            method: "POST",
            body: JSON.stringify({
                email: EMAIL,
                password: PASSWORD,
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const { data } = await response.json()
        return data.token
    } catch (error) {
        console.log(error)
    }

}
const getAllMatchesByDate = async (dateInput) => {
    try {
        const date = getActualDate(dateInput)
        const token = await makeLogin()
        console.log(token)
        const response = await fetch(`${DB_URL}/bydate`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                date
            })
        })
        const { data } = await response.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

const getDate = async (dateInput) => {
    try {
        const matches = await getAllMatchesByDate(dateInput)
        // Add 6 hours to match hour
        const datesHours = matches.map(match => new Date(match.local_date))
        const dates = datesHours.map(hour => new Date(hour.setTime(hour.getTime() - 6 * 60 * 60 * 1000)))
        // Transfrom form Qatar date To Argentina date
        return { matchHours: dates, matchesData: matches }
    }
    catch (error) {
        console.log(error)
    }
}

const transformHours = (dateInput) => {
    const dateHour = new Date(dateInput)
    const date = new Date(dateHour.setTime(dateHour.getTime() - 6 * 60 * 60 * 1000))
    return date
}

const getMatchAlert = async (dateInput) => {
    try {
        const { matchHours, matchesData } = await getDate(dateInput)
        const actualHour = new Date()
        const matches = matchHours.map(hour => {
            // add 90 minutes to hour.setTime(hour.getTime() + 90 * 60 * 1000)
            if (actualHour > hour && actualHour < hour.getTime() + 90 * 60 * 1000) {
                return { status: "jugando", index: matchHours.indexOf(hour), hour: hour.toLocaleTimeString(), matchesInfo: matchesData }
            }
            if (actualHour < hour) return { status: "proximo", index: matchHours.indexOf(hour), hour: hour.toLocaleTimeString(), matchesInfo: matchesData }
            else {
                return { status: "finalizado", index: matchHours.indexOf(hour), hour: hour.toLocaleTimeString(), matchesInfo: matchesData }
            }
        })
        return matches
    } catch (error) {
        console.log(error)
    }
}

module.exports = { getMatchAlert, transformHours }

























































































// const { chromium } = require("playwright")


// async function researchDate() {
//     const URL = "https://www.google.com/search?q=fixture+mundial+2022&oq=fixture&aqs=chrome.0.0i131i433i512l6j0i131i433j0i131i433i512j0i131i433l2.737j1j7&sourceid=chrome&ie=UTF-8#sie=lg;/m/0fp_8fm;2;/m/030q7;mt;fp;1;;;"
//     const browser = await chromium.launch();
//     const page = await browser.newPage();
//     await page.goto(URL)
//     await page.waitForTimeout(2000)

//     const fullDayElement = await page.$$eval('div.OcbAbf', arrayOfDayBoxes => {
//         const matchesPerDay = []
//         arrayOfDayBoxes.forEach(async box => {
//             // Getting All matches Day
//             const dayElement = box.querySelector('.GVj7ae')
//             const dayText = dayElement.innerText
//             const day = dayText.slice(17, dayText.length)
//             const dayTransfrom = (day) => {
//                 if (day.includes('Hoy')) return new Date().setHours(0, 0, 0, 0)
//                 if (day.includes('Mañana')) return new Date().setHours(0, 0, 0, 0) + 86400000
//                 const date = day.slice(5, 7)
//                 const month = 11
//                 return new Date(2022, month, date).getTime()
//             }
//             const dateTransform = dayTransfrom(day)

//             // Getting all matches per day
//             const matchElement = box.querySelectorAll('.KAIX8d')
//             const matchHour = []
//             const gamePerTable = []
//             matchElement.forEach(match => {
//                 const hourElement = match.querySelector('.imspo_mt__ndl-p')
//                 const hourText = hourElement.innerText
//                 const hours = hourText.slice(0, 2)
//                 const minutes = hourText.slice(3, 5)
//                 const milliseconds = (h, m) => ((h * 60 * 60 + m * 60) * 1000);
//                 const hourTransform = milliseconds(hours, minutes)
//                 const date = hourTransform + dateTransform
//                 // const dateTransform = new Date(date).getTime()
//                 matchHour.push(date)
//                 const matchTextElement = match.querySelectorAll('.liveresults-sports-immersive__hide-element')
//                 matchTextElement.forEach(team => {
//                     const teams = team.innerText
//                     return gamePerTable.push(teams)
//                 })
//             })
//             const matches = []
//             for (let i = 0; i < gamePerTable.length; i++) {
//                 if (i % 2 !== 0) return i++
//                 const match = gamePerTable.slice(i, i + 2)
//                 return matches.push(match)
//             }
//             const allMatches = matches.filter(match => match.length > 0)
//             matchesPerDay.push({ dateTransform, allMatches, matchHour })
//         })
//         return matchesPerDay
//     })
//     return fullDayElement
// }

// const matchesOfToday = researchDate()

// matchesOfToday.then(matches => {
//     console.log(matches)
// })













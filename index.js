require("dotenv").config();
const DB_URL = process.env.DB_URL

const makeLogin = async () => {
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
}

const getAllMatchesByDate = async () => {
    const date = getActualDate()
    const token = await makeLogin()
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
}

const getDate = async () => {
    const matches = await getAllMatchesByDate()
    // Add 6 hours to match hour
    const datesHours = matches.map(match => new Date(match.local_date))
    const dates = datesHours.map(hour => new Date(hour.setTime(hour.getTime() - 6 * 60 * 60 * 1000)))
    // Transfrom form Qatar date To Argentina date
    return { matchHours: dates, matchesData: matches }
}

const getActualDate = () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
}

const getMatchAlert = async () => {
    const { matchHours, matchesData } = await getDate()
    const actualHour = new Date()
    const matchAlert = matchHours.findIndex(hour => hour > actualHour)
    const hourOfProxMatch = matchHours[matchAlert].toLocaleTimeString().slice(0, 5)
    return { index: matchAlert, hour: hourOfProxMatch, matchesData }
}

module.exports = getMatchAlert

























































































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













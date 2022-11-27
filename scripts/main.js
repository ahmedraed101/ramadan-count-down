"use strict"
const mainCalling = "اللهم بلغنا رمضان"
const duringRamadanCalling = "اللهم اتمم علينا رمضان"

const callingEl = document.querySelector(".calling")
const dayEl = document.querySelector(".day")
const hoursEl = document.querySelector(".hour")
const minuteEl = document.querySelector(".minute")
const secondEl = document.querySelector(".second")
const daysNumberEl = document.querySelector(".days-left > .number")
const hoursNumberEl = document.querySelector(".hours-left")
const minutesNumberEl = document.querySelector(".minutes-left")
const secondsNumberEl = document.querySelector(".seconds-left")

const updateView = (ramadan, m) => {
    const totalSecond = (ramadan - m) / 1000
    const daysLeft = Math.trunc(totalSecond / 3600 / 24)
    const hoursInDay = Math.floor(totalSecond / 3600) % 24
    const minutesInHour = Math.floor(totalSecond / 60) % 60
    const secondsInminutes = Math.floor(totalSecond) % 60
    // ui
    dayEl.textContent = daysLeft === 2 ? "يومان" : daysLeft > 10 | daysLeft === 1 ? "يوم" : `ايام`
    hoursEl.textContent = hoursInDay === 2 ? "ساعتان" : hoursInDay > 10 | hoursInDay === 1 ? "ساعة" : "ساعات"
    minuteEl.textContent = minutesInHour === 2 ? "دقيقتان" : minutesInHour > 10 | minutesInHour === 1 ? "دقيقة" : "دقائق"
    secondEl.textContent = secondsInminutes === 2 ? "ثانيتان" : secondsInminutes > 10 | secondsInminutes === 1 ? "ثانية" : "ثوان"
    daysNumberEl.textContent = daysLeft.toLocaleString("ar-sa")
    hoursNumberEl.textContent = hoursInDay.toLocaleString("ar-sa")
    minutesNumberEl.textContent = minutesInHour.toLocaleString("ar-sa")
    secondsNumberEl.textContent = secondsInminutes.toLocaleString("ar-sa")
}

const main = () => {
    const m = moment()
    const hijriYear = m.iYear()
    const ramadan = moment(`${hijriYear}/9/1`, 'iYYYY/iM/iD')
    const ramadanEnd = moment(`${hijriYear}/10/1`, 'iYYYY/iM/iD')
    const beforeRamadan = (ramadan - m) > 0
    const duringRamadan = (ramadanEnd - m) > 0 && (ramadan - m) < 0
    const afterRamadan = (ramadanEnd - m) < 0
    callingEl.textContent = duringRamadan ? duringRamadanCalling : mainCalling
    if (beforeRamadan) {
        updateView(ramadan, m)
        return
    }
    if (duringRamadan || afterRamadan){
        const nextHijriYear = hijriYear + 1
        const nextRamadan = moment(`${nextHijriYear}/9/1`, 'iYYYY/iM/iD')
        updateView(nextRamadan, m)
    }
}
main()
setInterval(main, 1000)

const days = document.querySelector('.days')
const hours = document.querySelector('.hours')
const minutes = document.querySelector('.minutes')
const seconds = document.querySelector('.seconds')
const input = document.querySelector('input')
const box = document.querySelector('.box')
const h1 = document.querySelector('h1')

const second = 1000
const minute = second * 60
const hour = minute * 60
const day = hour * 24

let isPaused = false;

refresh()

input.addEventListener('input', () => {
    isPaused = false
})



function caclDate() {
    let dateItem = document.querySelector('input').value.split('-')
    let dateItem2 = dateItem[2].split('T')
    let dateItem3 = dateItem2[1].split(':')

    let [YY, MM] = dateItem
    let DD = dateItem2[0]
    let [hh, mm] = dateItem3

    const targetDate = new Date(YY, MM - 1, DD, hh, mm).getTime()
    const currentDate = new Date().getTime()
    const time = targetDate - currentDate

    return time 
}

function count() {
    const time = caclDate()

    const timeDay = Math.floor(time / day)
    const timeHour = Math.floor((time % day) / hour)
    const timeMinute = Math.floor((time % hour) / minute)
    const timeSecond = Math.floor((time % minute) / second)

    days.innerText = timeDay
    hours.innerText = timeHour
    minutes.innerText = timeMinute
    seconds.innerText = timeSecond
}

function checks() {
    if (isPaused == false) {
        let time = caclDate()
        count()

        if (time > 0) {
            if (box.classList.contains('_hide')) {
                box.classList.remove('_success')
                box.classList.remove('_hide')
                h1.style.color = 'rgba(255, 255, 255, 1)';
                isPaused = false
            }
        } else {
            box.classList.add('_hide')
            box.classList.remove('_success')
            h1.style.color = 'rgba(255, 255, 255, 0.5)';
            isPaused = true
        }  

        if (time < 1000 && time > 0) {
            box.classList.remove('_hide')
            box.classList.add('_success')
            isPaused = true
        }
    }
}

function refresh() {
    setInterval(checks, 1000)
}

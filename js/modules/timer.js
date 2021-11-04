"use strict";
function timer(id, deadline) {
    // timer

    // const deadLine = new Date("2021-12-31");
    // console.log('deadLine: ', deadLine);

    function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - new Date();
    // console.log('new Date(): ', new Date());
    // console.log('t: ', t);

    let days = Math.floor(t / (1000 * 60 * 60 * 24)),
        hours = Math.floor((t / (1000 * 60 * 60)) % 24),
        minutes = Math.floor((t / (1000 * 60)) % 60),
        seconds = Math.floor((t / 1000) % 60);
        // console.log('days: ', days);
        // console.log('hours: ', hours);
        // console.log('minutes: ', minutes);
        // console.log('seconds: ', seconds);
    
    return {
        "total": t,
        "days": days,
        "hours": hours,
        "minutes": minutes,
        "seconds": seconds,
    };
    }

    function getZero(num) {
    if (num > 0 && num < 10) {
        return `0${num}`;
    } else {
        return num;
    }
    }

    function setClock(selector, endtime) {

    const timer = document.querySelector(selector),
        days = timer.querySelector("#days"),
        hours = timer.querySelector("#hours"),
        minutes = timer.querySelector("#minutes"),
        seconds = timer.querySelector("#seconds"),
        interval = setInterval(updateClock, 1000);
    
    updateClock();
    
    function updateClock() {
        const t = getTimeRemaining(endtime);
        // console.log('t: ', t);

        days.innerHTML = getZero(t.days);
        hours.innerHTML = getZero(t.hours);
        minutes.innerHTML = getZero(t.minutes);
        seconds.innerHTML = getZero(t.seconds);

        if (t.total <= 0) {
        clearInterval(interval);
        }
    }
    }

    // getTimeRemaining(deadLine);
    setClock(id, deadline);
}

export default timer;
randomNumberGenerator()

function randomNumberGenerator() {

    function getDay() {
        const day = new Date().getDay();
        return day;
    }

    function getHour() {
        const hour = new Date().getHours();
        return hour;
    }

    function getMinute() {
        const minute = new Date().getMinutes();
        return minute;
    }

    function getMonth() {
        const month = new Date().getUTCMonth();
        return month;
    }

    function getMilli() {
        const milli = new Date().getUTCMilliseconds();
        return milli;
    }

    function getYear() {
        const year = new Date().getUTCFullYear();
        return year;
    }

    function getSec() {
        const sec = new Date().getUTCSeconds();
        return sec;
    }

    function getDate() {
        const date = new Date().getDate();
        return date;
    }

    function getTime() {
        const time = new Date().getTime();
        return time;
    }

    function negYear() {
        if (yearIntC < 0) {
            yearIntC = yearIntC * -20;
            yearIntC = Math.round(yearIntC);
            console.log(yearIntC, "''third negative if' year'")
        }
    }
    let ranInt;
    let lowInt;
    let highInt;

    let secIntB;
    const secIntA = getSec();

    let yearIntC = 0;
    let yearIntB;
    const yearIntA = getYear();

    let dayIntB;
    const dayIntA = getDate();

    let milliIntB;
    const milliIntA = getMilli();

    let hourIntB;
    const hourIntA = getHour();

    let minIntB;
    const minIntA = getMinute();

    let monthIntB;
    const monthIntA = getMonth();

    hourIntB = parseInt(hourIntA);
    if (hourIntB > 12) {
        hourIntB = hourIntB - 12;
    }

    let amPM;

    if (hourIntB > 12) {
        amPM = " AM"
    } else {
        amPM = " PM"
    }

    let zeroPlace = "";

    if (secIntA < 10) {
        zeroPlace = "0";
    }

    let datetimeIntA = `${getMonth()}/${getDate()}/${getYear()}<br>${hourIntB}:${getMinute()}:${zeroPlace}${getSec()}${amPM}`;

    alert(`Retrieving todays date and time`);
    let datetimeDisplay = `Today's date and time:<br>${datetimeIntA}`;
    document.getElementById('datetime').innerHTML = datetimeDisplay;

    alert(`Retrieving year`);
    yearIntB = parseInt(yearIntA) - Math.floor(Math.random() * 2200 + 1) - Math.floor(Math.random() * 1000 + 1);
    let yearDisplaya = `Year:<br>${yearIntA}`;
    document.getElementById('yeara').innerHTML = yearDisplaya;
    console.log(yearIntA, "'before math year'", yearIntB, "'after math year'");
    let yearDisplayb = `(Year minus random number) - minus random number):<br>${yearIntB}`;
    document.getElementById('yearb').innerHTML = yearDisplayb;

    if (yearIntB >= 200) {
        yearIntB = yearIntB / 20;
        yearIntC = Math.round(yearIntB);
        console.log(yearIntC, "''positive if' year'");
        let yearDisplayc = `(Positive Year) divided by 20:<br>${yearIntC}`;
        document.getElementById('yearc').innerHTML = yearDisplayc;
    } else if (yearIntB < 0) {
        yearIntB = yearIntB / 20;
        yearIntC = Math.round(yearIntB);
        console.log(yearIntC, "''negative if' year'");
        let yearDisplayc = `(Negative year) divided by 20:<br>${yearIntC}`;
        document.getElementById('yearc').innerHTML = yearDisplayc;
    }

    if (yearIntC < 0) {
        negYear();
        let yearDisplayd = `(Negative year) times -20: ${yearIntC}`;
        document.getElementById('yeard').innerHTML = yearDisplayd;
    }

    alert(`Retrieving month`);
    monthIntB = parseInt(monthIntA);
    console.log(monthIntB, "'month'");
    let monthDisplay = `Month<Br> ${monthIntB}`;
    document.getElementById('month').innerHTML = monthDisplay;

    alert(`Retrieving day`)
    dayIntB = parseInt(dayIntA);
    console.log(dayIntB, "'day'");
    let dayDisplayb = `Day<br>${dayIntB}`;
    document.getElementById('day').innerHTML = dayDisplayb;

    alert(`Retrieving hour`)
    hourIntB = parseInt(hourIntA);
    console.log(hourIntB, "'hour'");
    let hourDisplaya = `Hour<Br>${hourIntA}`;
    document.getElementById('houra').innerHTML = hourDisplaya;
    if (hourIntB > 12) {
        hourIntB = hourIntB - 12;
        console.log(hourIntB, "'converted hour'");
        let hourDisplayb = `Standard format:<br>${hourIntB} o'clock`;
        document.getElementById('hourb').innerHTML = hourDisplayb;
    }

    alert(`Retrieving minutes`);
    minIntB = parseInt(minIntA);
    console.log(minIntB, "'minute'");
    let minDisplay = `Minute<br>${minIntB}`;
    document.getElementById('min').innerHTML = minDisplay;

    alert(`Retrieving Seconds`)
    secIntB = parseInt(secIntA);
    console.log(secIntB, "'seconds'");
    let secDisplayb = `Second<br>${secIntB}`;
    document.getElementById('sec').innerHTML = secDisplayb;

    alert(`Retrieving milliseconds`)
    milliIntB = parseFloat(milliIntA);
    console.log(milliIntB, "'milliseconds'");
    let milliDisplaya = `Millisecond<br>${milliIntA}`;
    document.getElementById('millia').innerHTML = milliDisplaya;

    if (milliIntB >= 100) {
        milliIntB = milliIntB / 90;
        milliIntB = Math.round(milliIntB);
        console.log(milliIntB, "''after if' milliseconds'");
        let milliDisplayb = `(millisecond total over 100) divide by 90:<br>${milliIntB}`;
        document.getElementById('millib').innerHTML = milliDisplayb;
    }

    lowInt = milliIntB + dayIntB + hourIntB;
    let lMathDisplay = `${Math.round(milliIntB)}+${Math.round(dayIntB)}+${Math.round(hourIntB)}`;
    document.getElementById('lMath').innerHTML = lMathDisplay;
    let lowDisplay = `Lowest number: ${lowInt}`;
    document.getElementById('low').innerHTML = lowDisplay;
    let highIntA;
    highIntA = yearIntB + yearIntC + monthIntB - minIntB;
    let highIntB = Math.round(highIntA);
    let hMathDisplay = `${Math.round(yearIntB)}+${Math.round(yearIntC)}+${Math.round(monthIntB)}+${Math.round(minIntB)}`;
    document.getElementById('hMath').innerHTML = hMathDisplay;
    let highDisplay = `Highest number: ${highIntB}`;
    document.getElementById('high').innerHTML = highDisplay;
    ranInt = Math.floor(Math.random() * (highIntB - lowInt + 1)) + lowInt;
    console.log(ranInt, "'random number output'", lowInt, "'user low input'", highIntB, "'user high input'");

    if (lowInt > highIntB) {
        alert(`Lowest number higher than highest number. Recalculating.`)
        randomNumberGenerator();
    }

    if (ranInt >= 0) {
        alert(`Calculating random number`)
        let ranDisplay = `Random number: ${ranInt}`
        document.getElementById('ran').innerHTML = ranDisplay;
    } else {
        alert(`Lowest number less than zero. Recalculating.`)
        randomNumberGenerator();
    }
}

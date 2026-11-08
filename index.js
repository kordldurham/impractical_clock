'use strict';

// One local-time snapshot keeps every field consistent at date boundaries.
function randomNumberGenerator(now = new Date(), random = Math.random) {
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const hour = now.getHours();
    const standardHour = hour % 12 || 12;
    const minute = now.getMinutes();
    const second = now.getSeconds();
    const millisecond = now.getMilliseconds();
    const pad = value => String(value).padStart(2, '0');
    const show = (id, ...lines) => {
        const element = document.getElementById(id);
        element.replaceChildren();
        lines.forEach((line, index) => {
            if (index) element.append(document.createElement('br'));
            element.append(document.createTextNode(String(line)));
        });
        element.hidden = false;
    };

    show('datetime', `${month}/${day}/${year}`,
        `${standardHour}:${pad(minute)}:${pad(second)} ${hour < 12 ? 'AM' : 'PM'}`);
    const subtractedYear = year - Math.floor(random() * 2200 + 1) - Math.floor(random() * 1000 + 1);
    // Preserve the original whimsical arithmetic, including its small-year branch.
    const divideYear = subtractedYear >= 200 || subtractedYear < 0;
    const workingYear = divideYear ? subtractedYear / 20 : subtractedYear;
    const roundedYear = divideYear ? Math.round(workingYear) : 0;
    const adjustedYear = roundedYear < 0 ? roundedYear * -10 : roundedYear;
    const workingMilli = millisecond >= 100 ? Math.round(millisecond / 60) : millisecond;

    show('yeara', 'Year:', year);
    show('yearb', '(Year minus random number) minus random number:', subtractedYear);
    show('yearc', 'Year ÷ 20 (rounded):', divideYear ? roundedYear : null);
    show('yeard', 'Negative result × -10:', roundedYear < 0 ? adjustedYear : null);
    show('month', 'Month', month);
    show('day', 'Day', day);
    show('houra', 'Hour', hour);
    show('hourb', 'Standard format:', `${standardHour} ${hour < 12 ? 'AM' : 'PM'}`);
    show('min', 'Minute', minute);
    show('sec', 'Second', second);
    show('millia', 'Millisecond', millisecond);
    show('millib', 'Milliseconds ≥ 100 divided by 60 (rounded; null when not applied):', millisecond >= 100 ? workingMilli : null);

    const firstBound = workingMilli + day - standardHour - month;
    const secondBound = Math.round(workingYear + adjustedYear + minute);
    const low = Math.min(firstBound, secondBound);
    const high = Math.max(firstBound, secondBound);
    show('lMath', `${workingMilli} + ${day} − ${standardHour} − ${month} = ${firstBound}`);
    show('hMath', `${workingYear} + ${adjustedYear} + ${minute} ≈ ${secondBound}`);
    show('low', `Lowest number: ${low}`);
    show('high', `Highest number: ${high}`);
    // Sorting the bounds eliminates retries; both endpoints are valid results.
    show('ran', `Random number: ${Math.floor(random() * (high - low + 1)) + low}`);
}

randomNumberGenerator();
setInterval(randomNumberGenerator, 100);

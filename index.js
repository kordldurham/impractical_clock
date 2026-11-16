'use strict';

// Live clock updates continuously. Random calculations only run on button presses.
const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const pad = value => String(value).padStart(2, '0');
function showClockValue(id, ...lines) {
    const element = document.getElementById(id);
    if (!element) return;
    element.replaceChildren();
    lines.forEach((line, index) => {
        if (index) element.append(document.createElement('br'));
        element.append(document.createTextNode(String(line)));
    });
    element.hidden = false;
}
function weekdayInfo(now) {
    const dayIndex = now.getDay();
    const percentage = (dayIndex + 1) * 5; // Sunday 5%, Monday 10%, ... Saturday 35%.
    return { name: WEEKDAYS[dayIndex], dayNumber: dayIndex + 1, percentage, factor: 1 + percentage / 100 };
}
function updateClock(now = new Date()) {
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const hour = now.getHours();
    const standardHour = hour % 12 || 12;
    const minute = now.getMinutes();
    const second = now.getSeconds();
    const millisecond = now.getMilliseconds();
    const weekday = weekdayInfo(now);

    showClockValue('datetime', `${month}/${day}/${year}`,
        `${standardHour}:${pad(minute)}:${pad(second)} ${hour < 12 ? 'AM' : 'PM'}`);
    showClockValue('yeara', 'Year:', year);
    showClockValue('month', 'Month', month);
    showClockValue('day', 'Day', day);
    showClockValue('weekdayName', 'Day of the week:', weekday.name);
    showClockValue('weekdayMultiplier', `Day number: ${weekday.dayNumber} (Sunday = 1)`,
        `Random number multiplier: +${weekday.percentage}% (×${weekday.factor.toFixed(2)})`);
    showClockValue('houra', 'Hour', hour);
    showClockValue('hourb', 'Standard format:', `${standardHour} ${hour < 12 ? 'AM' : 'PM'}`);
    showClockValue('min', 'Minute', minute);
    showClockValue('sec', 'Second', second);
    showClockValue('millia', 'Millisecond', millisecond);
}
function generateRandomNumber(now = new Date(), random = Math.random) {
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const standardHour = now.getHours() % 12 || 12;
    const minute = now.getMinutes();
    const millisecond = now.getMilliseconds();
    const weekday = weekdayInfo(now);
    const firstYearSubtraction = Math.floor(random() * 2200 + 1);
    const secondYearSubtraction = Math.floor(random() * 1000 + 1);
    const subtractedYear = year - firstYearSubtraction - secondYearSubtraction;
    const divideYear = subtractedYear >= 200 || subtractedYear < 0;
    const workingYear = divideYear ? subtractedYear / 20 : subtractedYear;
    const roundedYear = divideYear ? Math.round(workingYear) : 0;
    const adjustedYear = roundedYear < 0 ? roundedYear * -10 : roundedYear;
    const workingMilli = millisecond >= 100 ? Math.round(millisecond / 60) : millisecond;

    showClockValue('yearb', 'Year minus two random numbers:',
        `${year} − ${firstYearSubtraction} − ${secondYearSubtraction} = ${subtractedYear}`);
    showClockValue('yearc', divideYear
        ? 'Adjusted year ÷ 20 (rounded):'
        : 'Adjusted year ÷ 20 (not applied for values 0–199):',
        divideYear
            ? `(${year} − ${firstYearSubtraction} − ${secondYearSubtraction}) ÷ 20 = ${(subtractedYear / 20).toFixed(2)} → ${roundedYear}`
            : `${subtractedYear} (division skipped)`);
    showClockValue('yeard', 'Negative result × -10:', roundedYear < 0 ? adjustedYear : null);
    showClockValue('millib', 'Milliseconds ≥ 100 divided by 60 (rounded; null when not applied):',
        millisecond >= 100 ? workingMilli : null);

    const firstBound = workingMilli + day - standardHour - month;
    const secondBound = Math.round(workingYear + adjustedYear + minute);
    const low = Math.min(firstBound, secondBound);
    const high = Math.max(firstBound, secondBound);
    const baseRandom = Math.floor(random() * (high - low + 1)) + low;
    const result = Math.round(baseRandom * weekday.factor);

    showClockValue('lMath', `${workingMilli} + ${day} − ${standardHour} − ${month} = ${firstBound}`);
    showClockValue('hMath', `${workingYear} + ${adjustedYear} + ${minute} ≈ ${secondBound}`);
    showClockValue('low', `Lowest number: ${low}`);
    showClockValue('high', `Highest number: ${high}`);
    showClockValue('ran',
        `Base random number: ${baseRandom}`,
        `${weekday.name} bonus: +${weekday.percentage}% (×${weekday.factor.toFixed(2)})`,
        `Adjusted random number: ${result}`);
}
updateClock();
setInterval(updateClock, 100);
document.getElementById('generate-random').addEventListener('click', () => generateRandomNumber());

/* The quick links float over the clock; they never alter its layout. */
const quickLinksDrawer = document.getElementById('quick-links-drawer');
const quickLinksPanel = document.getElementById('quick-links-panel');
const quickLinksToggle = document.getElementById('quick-links-toggle');
let quickLinksOpen = false;

function setQuickLinksOpen(open) {
    quickLinksOpen = open;
    quickLinksDrawer.classList.toggle('is-open', open);
    quickLinksToggle.setAttribute('aria-expanded', String(open));
    quickLinksToggle.setAttribute('aria-label', open ? 'Close quick links' : 'Open quick links');
    quickLinksPanel.setAttribute('aria-hidden', String(!open));
    quickLinksPanel.inert = !open;
}

quickLinksToggle.addEventListener('click', () => setQuickLinksOpen(!quickLinksOpen));
document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && quickLinksOpen) {
        setQuickLinksOpen(false);
        quickLinksToggle.focus();
    }
});
document.addEventListener('pointerdown', event => {
    if (quickLinksOpen && !quickLinksDrawer.contains(event.target)) {
        setQuickLinksOpen(false);
    }
});

/* Show the existing frog website over the clock on local Wednesdays only.
   FormSubmit redirects successful submissions to ?wednesday=complete.
   The completion marker lasts until the viewer's next local Wednesday. */
const wednesdayGate = document.getElementById('wednesday-gate');
const wednesdayFrame = document.getElementById('wednesday-gate-frame');
const WEDNESDAY_PAGE = 'https://kordldurham.github.io/SparkyArcingPotato/';
const WEDNESDAY_COMPLETE_KEY = 'wednesday-form-completed';
let wednesdayGateVisible = false;
let justCompletedWednesdayForm = false;

function localDayStamp(date = new Date()) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function syncWednesdayGate() {
    const isWednesday = new Date().getDay() === 3;
    let completedToday = false;
    try {
        completedToday = sessionStorage.getItem(WEDNESDAY_COMPLETE_KEY) === localDayStamp();
    } catch (_) {
        // Storage may be disabled; the URL redirect still dismisses the gate.
    }

    const shouldShow = isWednesday && !completedToday && !justCompletedWednesdayForm;
    if (shouldShow === wednesdayGateVisible) return;

    wednesdayGateVisible = shouldShow;
    wednesdayGate.hidden = !shouldShow;
    document.body.classList.toggle('wednesday-gated', shouldShow);
    if (shouldShow) {
        wednesdayFrame.src = WEDNESDAY_PAGE;
    } else {
        wednesdayFrame.removeAttribute('src');
    }
}

const wednesdayParams = new URLSearchParams(window.location.search);
if (wednesdayParams.get('wednesday') === 'complete') {
    justCompletedWednesdayForm = true;
    try {
        sessionStorage.setItem(WEDNESDAY_COMPLETE_KEY, localDayStamp());
    } catch (_) { /* Private browsing can block storage. */ }
    // Hide the overlay even if storage is unavailable, on this landing page.
    if (new Date().getDay() === 3) {
        wednesdayGateVisible = false;
    }
    wednesdayParams.delete('wednesday');
    const cleanQuery = wednesdayParams.toString();
    history.replaceState(null, '', window.location.pathname +
        (cleanQuery ? '?' + cleanQuery : '') + window.location.hash);
}
syncWednesdayGate();
setInterval(syncWednesdayGate, 60000);

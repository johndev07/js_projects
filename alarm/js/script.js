let hours = document.querySelector("#hours");
let minutes = document.querySelector("#minutes");
let currentTime = document.querySelector("#current_time");
let setAlarmButton = document.querySelector("#set-alarm");
let content = document.querySelector(".content");
let ringtone = new Audio("/alarm/audio/ringtone.mp3");
let max_hours = 12;
let max_minutes = 60;
let isAlarmset = false;
let hoursOption =
  "<option value='hours' selected disabled hidden>Hours</option>";
let setAlarmtime;
let day;
for (let i = 1; i <= max_hours; i++) {
  i = i < 10 ? "0" + i : i;
  hoursOption += `<option value="${i}">${i}</option>`;
}

hours.innerHTML = hoursOption;

let minutesOption =
  "<option value='minutes' selected disabled hidden>Minutes</option>";
for (let i = 0; i < max_minutes; i++) {
  i = i < 10 ? "0" + i : i;
  minutesOption += `<option value="${i}">${i}</option>`;
}

minutes.innerHTML = minutesOption;

setInterval(() => {
  let date = new Date();
  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();

  if (h >= 12) {
    h -= 12;
    day = "PM";
  } else {
    day = "AM";
  }

  h = h == 0 ? (h = 12) : h;
  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;

  currentTime.textContent = `${h}:${m}:${s}  ${day}`;
  if (setAlarmtime === `${h}:${m}:${day}`) {
    ringtone.play();
    ringtone.loop = true;
    console.log("ringing.....");
  }
}, 1000);

setAlarmButton.addEventListener("click", setAlarm);

function setAlarm() {
  if (isAlarmset) {
    setAlarmtime = "";
    ringtone.pause();
    content.classList.remove("disabled");
    setAlarmButton.textContent = "set alarm";
    return (isAlarmset = false);
  }
  setAlarmtime = `${hours.value}:${minutes.value}:${day}`;

  if (setAlarmtime.includes("hours") || setAlarmtime.includes("minutes")) {
    alert("pls select a valid time");
  }
  content.classList.add("disabled");
  setAlarmButton.textContent = "clear alarm";
  isAlarmset = true;
}

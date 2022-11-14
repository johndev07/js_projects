let clock = document.querySelector(".display");
setInterval(() => {
  let time = new Date();
  let hrs = time.getHours();
  let minutes = time.getMinutes();
  let seconds = time.getSeconds();
  let day;

  hrs = hrs < 10 ? "0" + hrs : hrs;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  day = hrs > 12 ? "PM" : "AM";
  let timeFormat = `${hrs} : ${minutes} : ${seconds}  ${day}`;

  clock.textContent = timeFormat;
}, 1000);

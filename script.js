var events = [
  {
    startdate: 9,
    days: 1,
    eventName: "Maths",
    channelid: "",
    // booking: false,
  },
  {
    startdate: 12,
    days: 1,
    eventName: "Physics",
    channelid: "",
    // booking: false,
  },
  {
    startdate: 14,
    days: 1,
    eventName: "English",
    channelid: "",
    // booking: true,
  },
  {
    startdate: 17,
    days: 1,
    eventName: "Electrical",
    channelid: "",
    // booking: true,
  },
  {
    startdate: 19,
    days: 1,
    eventName: "Civil",
    channelid: "",
    // booking: true,
  },
  {
    startdate: 21,
    days: 1,
    eventName: "DT",
    channelid: "",
    booking: false,
  },
];

function assignStartDate() {
  var today = new Date();
  var month = today.getMonth() + 2;
  var year = today.getFullYear();
  var checkDate = new Date("" + month + " 05, " + year + "");
  startDate = checkDate.getDay() + 1;
}
function daysInThisMonth() {
  var now = new Date();
  return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
}
assignStartDate();

var startDate;
var totalDays = daysInThisMonth();
console.log(totalDays);
var totalViewDates = document.querySelectorAll(".date").length;
var viewDates = document.querySelectorAll(".date");
var lastcol = [];
var bookeddates = [];
var eventclick = false;

function assignDates() {
  for (i = 0; i < totalViewDates; i++) {
    var dateValue = i + 1 - startDate + 1;
    viewDates[i].textContent = dateValue;
    if (dateValue < 1) {
      viewDates[i].parentNode.style.opacity = 0;
    }
    if (dateValue > totalDays) {
      viewDates[i].parentNode.style.opacity = 0;
    }
  }
}

assignDates();

function checkLastCol() {
  for (i = 0; i < 5; i++) {
    var local = i * 7 + 6;
    var value = viewDates[local].textContent;
    lastcol.push(value);
  }
}

checkLastCol();

function assignchannel(value, item) {
  switch (value) {
    case 1:
      item.classList.add("booking-com");
      break;
    case 2:
      item.classList.add("airbnb");
      break;
  }
}

function setDetails(el, eventname, eventduration, booking, i) {
  el.setAttribute("data-eventname", "" + eventname + "");
  el.setAttribute("data-duration", "" + eventduration + "");
  el.setAttribute("data-booking", "" + booking + "");
  el.setAttribute("data-index", i);
}

// function createEvent() {
//   var newEvent = new Object();
//   newEvent.startdate = 21;
//   newEvent.days = 4;
//   newEvent.eventName = "";
//   newEvent.booking = false;
//   newEvent.channelid = "";
//   events.push(newEvent);
//   removeEvents();
//   assignEvents(events);
// }

// function removeEvent(el) {
//   var i = el.getAttribute("data-index");
//   events.splice(i, 1);
//   removeEvents();
//   assignEvents(events);
//   document.getElementById("pop-up").style.display = "none";
// }

function removeEvents() {
  var uievents = document.querySelectorAll(".event");
  var uieventscount = document.querySelectorAll(".event").length;
  for (i = 0; i < uieventscount; i++) {
    uievents[i].remove();
  }
  for (i = 0; i < totalViewDates; i++) {
    viewDates[i].parentNode.classList.remove("blocked");
  }
}

function assignEvents(el) {
  var eventsTotal = el.length;
  for (i = 0; i < eventsTotal; i++) {
    bookeddates = [];
    var temp = document.getElementById("eventTemplate");
    var clon = document.importNode(temp.content, true);
    item = clon.querySelector(".event");
    var DateStart = el[i]["startdate"];
    var Days = el[i]["days"];
    var EventName = el[i]["eventName"];
    var booking = el[i]["booking"];
    var channel = el[i]["channelid"];
    var lastDate = DateStart + Days - 1;
    var Duration = DateStart + " - " + lastDate;
    for (j = 0; j < Days; j++) {
      viewDates[DateStart + startDate - 2 + j].parentNode.classList.add(
        "blocked"
      );
      if (booking) {
        viewDates[DateStart + startDate - 2 + j].parentNode.classList.add(
          "booked"
        );
        assignchannel(channel, item);
      } else {
        setDetails(item, EventName, Duration, booking, i);
      }
      var dividerDate = viewDates[DateStart + startDate - 2 + j].textContent;
      bookeddates.push(dividerDate);
      if (lastcol.includes(dividerDate)) {
        if (j + 1 != Days) {
          item.style.width = (j + 1) * 100 + "%";
          item.querySelector(".event-text").textContent = EventName;
          item.classList.add("open-end");
          viewDates[DateStart + startDate - 2].parentNode.appendChild(
            clon.cloneNode(true)
          );
          var difference = Days - (j + 1);
          viewDates[DateStart + startDate - 2 + j + 1].parentNode.appendChild(
            clon
          );

          item.style.width = difference * 100 + "%";
          item.classList.add("open-start");

          if (booking) {
            assignchannel(channel, item);
          } else {
            setDetails(item, EventName, Duration, booking, i);
          }
        } else {
          item.style.width = Days * 100 + "%";
          item.querySelector(".event-text").textContent = EventName;
          viewDates[DateStart + startDate - 2].parentNode.appendChild(
            clon.cloneNode(true)
          );

          if (booking) {
            assignchannel(channel, item);
          } else {
            setDetails(item, EventName, Duration, booking, i);
          }
        }
      }
    }
    if (!bookeddates.some((r) => lastcol.includes(r))) {
      item.style.width = Days * 100 + "%";
      item.querySelector(".event-text").textContent = EventName;
      viewDates[DateStart + startDate - 2].parentNode.appendChild(
        clon.cloneNode(true)
      );

      if (booking) {
        assignchannel(channel, item);
      } else {
        setDetails(item, EventName, Duration, booking, i);
        console.log("i have been used");
      }
    }
  }
}

assignEvents(events);
createEvent();

// removeEvent();

function showPopUp(el, event) {
  eventclick = true;
  var booking = el.getAttribute("data-booking");
  var name = el.getAttribute("data-eventname");
  var duration = el.getAttribute("data-duration");
  var popUp = document.getElementById("pop-up");
  var index = el.getAttribute("data-index");
  document.getElementById("unlock").setAttribute("data-index", index);
  if (booking == "false") {
    popUp.style.display = "inline-block";
    popUp.querySelector(".duration").textContent = "";
    popUp.querySelector(".event-name").textContent = "🥳🎉";
    var Wx = window.innerWidth;
    var position = el.getBoundingClientRect();
    var x = position.left;
    var y = position.top + 30;
    if (x + 240 < Wx) {
      popUp.classList.add("left");
      popUp.classList.remove("right");
      popUp.style.top = y + "px";
      popUp.style.left = x + "px";
    } else {
      x = x - 120;
      popUp.classList.remove("left");
      popUp.classList.add("right");
      popUp.style.top = y + "px";
      popUp.style.left = x + "px";
    }
  }
}

function hidePopUp() {
  document.getElementById("pop-up").style.display = "none";
}

window.addEventListener("click", function (e) {
  if (eventclick == true) {
    document.getElementById("pop-up").style.display = "inline-block";
    eventclick = false;
  } else {
    document.getElementById("pop-up").style.display = "none";
  }
});

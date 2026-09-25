// Get HTML elements
const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");
const attendeeList = document.getElementById("attendeeList");

// Attendance counters
let totalAttendees = Number(localStorage.getItem("totalAttendees")) || 0;
let waterCount = Number(localStorage.getItem("waterCount")) || 0;
let zeroCount = Number(localStorage.getItem("zeroCount")) || 0;
let powerCount = Number(localStorage.getItem("powerCount")) || 0;

const attendanceGoal = 50;

// Display saved attendance counts
document.getElementById("attendeeCount").textContent = totalAttendees;
document.getElementById("waterCount").textContent = waterCount;
document.getElementById("zeroCount").textContent = zeroCount;
document.getElementById("powerCount").textContent = powerCount;

// Display saved progress
const savedProgressPercentage = (totalAttendees / attendanceGoal) * 100;
document.getElementById("progressBar").style.width =
  savedProgressPercentage + "%";

// Restore saved attendees on page load
const savedAttendees = JSON.parse(localStorage.getItem("attendees")) || [];

savedAttendees.forEach(function (attendee) {
  const attendeeItem = document.createElement("li");
  attendeeItem.textContent = attendee;
  attendeeList.appendChild(attendeeItem);
});

// Listen for form submission
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const attendeeName = nameInput.value;
  const selectedTeam = teamSelect.value;

  console.log(attendeeName);
  console.log(selectedTeam);

  // Increase total attendance
totalAttendees++;

// Update attendance count on the page
const attendeeCountElement = document.getElementById("attendeeCount");
attendeeCountElement.textContent = totalAttendees;
// Update the selected team's count
if (selectedTeam === "water") {
  waterCount++;
  document.getElementById("waterCount").textContent = waterCount;
} else if (selectedTeam === "zero") {
  zeroCount++;
  document.getElementById("zeroCount").textContent = zeroCount;
} else if (selectedTeam === "power") {
  powerCount++;
  document.getElementById("powerCount").textContent = powerCount;
}

// Update progress bar
const progressBar = document.getElementById("progressBar");

const progressPercentage = (totalAttendees / attendanceGoal) * 100;

progressBar.style.width = progressPercentage + "%";
// Create full team name
let teamName = "";

if (selectedTeam === "water") {
  teamName = "Team Water Wise";
} else if (selectedTeam === "zero") {
  teamName = "Team Net Zero";
} else if (selectedTeam === "power") {
  teamName = "Team Renewables";
}

// Show personalized greeting
const greeting = document.getElementById("greeting");

greeting.textContent =
  "Welcome, " + attendeeName + "! You checked in with " + teamName + ".";

greeting.classList.add("success-message");
greeting.style.display = "block";

if (totalAttendees >= attendanceGoal) {
  let winningTeam = "Team Water Wise";

  if (zeroCount > waterCount && zeroCount > powerCount) {
    winningTeam = "Team Net Zero";
  } else if (powerCount > waterCount && powerCount > zeroCount) {
    winningTeam = "Team Renewables";
  }

  greeting.textContent =
    "🎉 Attendance goal reached! " + winningTeam + " has the highest turnout!";
}

// Add attendee to the attendee list
const attendeeItem = document.createElement("li");
attendeeItem.textContent = attendeeName + " — " + teamName;
attendeeList.appendChild(attendeeItem);

const savedAttendeeEntries = JSON.parse(localStorage.getItem("attendees")) || [];
savedAttendeeEntries.push(attendeeName + " — " + teamName);
localStorage.setItem("attendees", JSON.stringify(savedAttendeeEntries));

// Save attendance counts in localStorage
localStorage.setItem("totalAttendees", totalAttendees);
localStorage.setItem("waterCount", waterCount);
localStorage.setItem("zeroCount", zeroCount);
localStorage.setItem("powerCount", powerCount);

// Reset the form for the next attendee
form.reset();
});
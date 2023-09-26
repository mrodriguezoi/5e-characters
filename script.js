// Create a character:

// Getting stats
function createNewStats() {
  let stats = [];
  let sum = 0;
  while (sum < 70) {
    stats = [];
    for (let i = 0; i <= 5; i++) {
      let roll1 = Math.ceil(Math.random() * 6),
        roll2 = Math.ceil(Math.random() * 6),
        roll3 = Math.ceil(Math.random() * 6),
        roll4 = Math.ceil(Math.random() * 6);
      stat = roll1 + roll2 + roll3 + roll4 - Math.min(roll1, roll2, roll3, roll4);
      stats.push(stat);
    }
    sum = stats.reduce((accumulator, currentValue) => accumulator + currentValue);
  }
  return stats;
}
document.querySelector(".reroll-stats-button button").addEventListener("click", () => {
  let statsPage = document.querySelectorAll(".stats-selector-stat .stat-value p");
  let newStats = createNewStats();
  for (let i = 0; i <= 5; i++) {
    statsPage[i].innerText = newStats[i];
  }
});
document.querySelector(".reroll-stats-button button").click();

// Selecting stats
function hideSelectedStatsOptions() {
  let selectedOptions = [];
  for (let j = 0; j <= 5; j++) {
    selectedOptions.push(document.querySelectorAll(".stats-selector-stat select")[j].value);
  }
  let optionsStr = document.querySelectorAll(".option-str");
  let optionsDex = document.querySelectorAll(".option-dex");
  let optionsCon = document.querySelectorAll(".option-con");
  let optionsInt = document.querySelectorAll(".option-int");
  let optionsWis = document.querySelectorAll(".option-wis");
  let optionsCha = document.querySelectorAll(".option-cha");
  if (selectedOptions.includes("str")) {
    for (let i = 0; i <= 5; i++) {
      optionsStr[i].classList.add("hidden");
    }
  } else {
    for (let i = 0; i <= 5; i++) {
      optionsStr[i].classList.remove("hidden");
    }
  }
  if (selectedOptions.includes("dex")) {
    for (let i = 0; i <= 5; i++) {
      optionsDex[i].classList.add("hidden");
    }
  } else {
    for (let i = 0; i <= 5; i++) {
      optionsDex[i].classList.remove("hidden");
    }
  }
  if (selectedOptions.includes("con")) {
    for (let i = 0; i <= 5; i++) {
      optionsCon[i].classList.add("hidden");
    }
  } else {
    for (let i = 0; i <= 5; i++) {
      optionsCon[i].classList.remove("hidden");
    }
  }
  if (selectedOptions.includes("int")) {
    for (let i = 0; i <= 5; i++) {
      optionsInt[i].classList.add("hidden");
    }
  } else {
    for (let i = 0; i <= 5; i++) {
      optionsInt[i].classList.remove("hidden");
    }
  }
  if (selectedOptions.includes("wis")) {
    for (let i = 0; i <= 5; i++) {
      optionsWis[i].classList.add("hidden");
    }
  } else {
    for (let i = 0; i <= 5; i++) {
      optionsWis[i].classList.remove("hidden");
    }
  }
  if (selectedOptions.includes("cha")) {
    for (let i = 0; i <= 5; i++) {
      optionsCha[i].classList.add("hidden");
    }
  } else {
    for (let i = 0; i <= 5; i++) {
      optionsCha[i].classList.remove("hidden");
    }
  }
}

let statAllocators = document.querySelectorAll(".stats-selector-stat select");
for (let i = 0; i <= 5; i++) {
  statAllocators[i].addEventListener("change", () => hideSelectedStatsOptions());
}

function showRaceDetails(race) {
  let allRaces = document.querySelectorAll(".race-details");
  for (let i = 0; i <= allRaces.length - 1; i++) {
    if (Array.from(allRaces[i].classList).includes(race)) {
      allRaces[i].classList.remove("hidden");
    } else {
      allRaces[i].classList.add("hidden");
    }
  }
}

let raceListItems = document.querySelectorAll(".race-list > div > button");
for (let i = 0; i <= raceListItems.length - 1; i++) {
  raceListItems[i].addEventListener("click", () => {
    for (let j = 0; j <= raceListItems.length - 1; j++) {
      raceListItems[j].removeAttribute("id");
    }
    event.target.setAttribute("id", "selected-race");
    showRaceDetails(event.target.innerText.toLowerCase());
  });
}

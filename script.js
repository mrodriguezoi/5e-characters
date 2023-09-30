// Create a character:

// Function to create new stats and event to trigger it
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

// Logic for Selecting Stats on the Stat container
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

// Function to show selected option only on a list
function showListOptionDetails(listContainer, option, idToSet) {
  for (let i = 0; i <= listContainer.length - 1; i++) {
    if (Array.from(listContainer[i].classList).includes(option)) {
      listContainer[i].classList.remove("hidden");
      listContainer[i].removeAttribute("id");
    } else {
      listContainer[i].classList.add("hidden");
      listContainer[i].setAttribute("id", idToSet);
    }
  }
}

// Race Details functions:

// Auxiliary functions to create content
function createListFromOptions(array) {
  let select = document.createElement("select");
  let defaultOption = document.createElement("option");
  let defaultOptionText = document.createTextNode("Select an option");
  defaultOption.appendChild(defaultOptionText);
  defaultOption.disabled = true;
  defaultOption.selected = true;
  defaultOption.value = "";
  select.appendChild(defaultOption);
  array.forEach((option) => {
    let optionElement = document.createElement("option");
    optionElement.value = option[0];
    let optionText = document.createTextNode(option[1]);
    optionElement.appendChild(optionText);
    select.appendChild(optionElement);
  });
  return select;
}
function createRadioSelector(array) {
  let radioUlContainer = document.createElement("ul");
  array.forEach((option) => radioUlContainer.appendChild(constructLiWithTitle(option)));
  return radioUlContainer;
}
function createCheckboxSelector(array) {
  let checkboxContainer = document.createElement("div");
  let form = document.createElement("form");
  array.forEach((option) => {
    let optionLabel = document.createElement("label");
    let optionInput = document.createElement("input");
    optionInput.value = option[0];
    optionInput.type = "checkbox";
    optionLabel.appendChild(optionInput);
    let optionText = document.createTextNode(option[1]);
    optionLabel.appendChild(optionText);
    form.appendChild(optionElement);
  });
  checkboxContainer.appendChild(form);
  return checkboxContainer;
}
function constructLiWithTitle(feature) {
  let li = document.createElement("li");
  let strong = document.createElement("strong");
  let featureDescription = document.createTextNode(" " + feature.text + " ");
  let liFeatureName = document.createTextNode(feature.featureName);
  strong.appendChild(liFeatureName);
  li.appendChild(strong);
  li.appendChild(featureDescription);
  if (feature.dependency !== undefined) {
    li.classList.add(feature.dependency, "hidden");
  }
  if (feature.type === "list") {
    li.appendChild(createListFromOptions(feature.listOptions));
  }
  if (feature.type === "radio") {
    li.appendChild(createRadioSelector(feature.options));
  }

  if (feature.type === "checkbox") {
    li.appendChild(createCheckboxSelector(feature.options));
  }
  if (feature.type === "subfeature") {
    let subfeatureContainer = document.createElement("ul");
    feature.options.forEach((option) => subfeatureContainer.appendChild(constructLiWithTitle(option)));
    li.appendChild(subfeatureContainer);
  }

  return li;
}
function constructRaceDetails(races) {
  let raceList = document.querySelector(".race-list");
  races.forEach((raceDetails) => {
    // Adding Element to the Races list
    let raceListContainer = document.createElement("div");
    raceListContainer.classList.add(`race-selector-${raceDetails.name}`);
    let raceListButton = document.createElement("button");
    let raceListButtonText = document.createTextNode(raceDetails.name);
    raceListButton.appendChild(raceListButtonText);
    raceListContainer.appendChild(raceListButton);
    raceList.appendChild(raceListContainer);

    // Creating Race Details containers
    let raceDetailsContainer = document.createElement("div");
    let raceDetailsContentContainer = document.createElement("div");
    raceDetailsContainer.classList.add("race-details", raceDetails.name, "hidden");
    raceDetailsContentContainer.classList.add("race-details-content");
    // Adding race description
    let raceDescriptionP = document.createElement("p");
    let raceDescriptionText = document.createTextNode(raceDetails.description);
    raceDescriptionP.appendChild(raceDescriptionText);
    raceDetailsContentContainer.appendChild(raceDescriptionP);
    // Adding header for features
    let featuresHeader = document.createElement("header");
    let featuresHeaderH2 = document.createElement("h2");
    let featuresHeaderText = document.createTextNode("Features");
    featuresHeaderH2.appendChild(featuresHeaderText);
    featuresHeader.appendChild(featuresHeaderH2);
    raceDetailsContentContainer.appendChild(featuresHeader);
    // Adding container for features
    let featuresList = document.createElement("ul");
    featuresList.classList.add("race-details-features");
    // Appending each race-level feature to the list
    raceDetails.features.forEach((feature) => {
      featuresList.appendChild(constructLiWithTitle(feature));
    });
    // Appending a Sub-race selector to the list
    let capitalizedRaceName = raceDetails.name.charAt(0).toUpperCase() + raceDetails.name.slice(1);
    let subraceObject = {
      featureName: "Sub-races:",
      text: ` Select a sub-race for your ${capitalizedRaceName}.`,
      type: "list",
      listOptions: raceDetails.subraces,
    };
    constructLiWithTitle(subraceObject);
    featuresList.appendChild(constructLiWithTitle(subraceObject));
    // Language selector
    let languagesFeature = {
      featureName: "Languages",
      text: "You can speak, read, and write Common and one other language that you and your DM agree is appropriate for the character.",
      type: "list",
      listOptions: languages,
    };
    featuresList.appendChild(constructLiWithTitle(languagesFeature));
    // Append whole race container to the modal
    raceDetailsContentContainer.appendChild(featuresList);
    raceDetailsContainer.appendChild(raceDetailsContentContainer);
    const raceSelector = document.querySelector(".race-selector");
    raceSelector.appendChild(raceDetailsContainer);
  });
  // Adding Event Listener to Buttons
  let raceListItems = document.querySelectorAll(".race-list > div > button");
  let allRaces = document.querySelectorAll(".race-details");
  for (let i = 0; i <= raceListItems.length - 1; i++) {
    raceListItems[i].addEventListener("click", () => {
      for (let j = 0; j <= raceListItems.length - 1; j++) {
        raceListItems[j].removeAttribute("id");
      }
      event.target.setAttribute("id", "selected-race");
      showListOptionDetails(allRaces, event.target.innerText.toLowerCase(), "selected-race");
    });
  }
}

let languages = [];
fetch("/languages.json")
  .then((response) => response.json())
  .then((data) => (languages = data.languages));
let races = {};
fetch("/races.json")
  .then((response) => response.json())
  .then((data) => {
    races = data;
    constructRaceDetails(races);
  });

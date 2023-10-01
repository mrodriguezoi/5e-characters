const baseURI = document.baseURI;
let languages = [];
fetch(baseURI + "languages.json")
  .then((response) => response.json())
  .then((data) => (languages = data.languages));
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
function hideSelectedStatsOptions(containerClass) {
  let selectedOptions = [];
  let targetSelects = document.querySelectorAll(containerClass + " select");
  for (let j = 0; j < targetSelects.length; j++) {
    selectedOptions.push(targetSelects[j].value);
  }
  let optionsStr = document.querySelectorAll(containerClass + " .option-str");
  let optionsDex = document.querySelectorAll(containerClass + " .option-dex");
  let optionsCon = document.querySelectorAll(containerClass + " .option-con");
  let optionsInt = document.querySelectorAll(containerClass + " .option-int");
  let optionsWis = document.querySelectorAll(containerClass + " .option-wis");
  let optionsCha = document.querySelectorAll(containerClass + " .option-cha");
  if (selectedOptions.includes("str")) {
    for (let i = 0; i < optionsStr.length; i++) {
      optionsStr[i].classList.add("hidden");
    }
  } else {
    for (let i = 0; i < optionsStr.length; i++) {
      optionsStr[i].classList.remove("hidden");
    }
  }
  if (selectedOptions.includes("dex")) {
    for (let i = 0; i < optionsDex.length; i++) {
      optionsDex[i].classList.add("hidden");
    }
  } else {
    for (let i = 0; i < optionsDex.length; i++) {
      optionsDex[i].classList.remove("hidden");
    }
  }
  if (selectedOptions.includes("con")) {
    for (let i = 0; i < optionsCon.length; i++) {
      optionsCon[i].classList.add("hidden");
    }
  } else {
    for (let i = 0; i < optionsCon.length; i++) {
      optionsCon[i].classList.remove("hidden");
    }
  }
  if (selectedOptions.includes("int")) {
    for (let i = 0; i < optionsInt.length; i++) {
      optionsInt[i].classList.add("hidden");
    }
  } else {
    for (let i = 0; i < optionsInt.length; i++) {
      optionsInt[i].classList.remove("hidden");
    }
  }
  if (selectedOptions.includes("wis")) {
    for (let i = 0; i < optionsWis.length; i++) {
      optionsWis[i].classList.add("hidden");
    }
  } else {
    for (let i = 0; i < optionsWis.length; i++) {
      optionsWis[i].classList.remove("hidden");
    }
  }
  if (selectedOptions.includes("cha")) {
    for (let i = 0; i < optionsCha.length; i++) {
      optionsCha[i].classList.add("hidden");
    }
  } else {
    for (let i = 0; i < optionsCha.length; i++) {
      optionsCha[i].classList.remove("hidden");
    }
  }
}
let statAllocators = document.querySelectorAll(".stats-selector-stat select");
for (let i = 0; i <= 5; i++) {
  statAllocators[i].addEventListener("change", () => hideSelectedStatsOptions(".stats-selector"));
}
// For Race-asi
let raceStatAllocators = document.querySelectorAll(".race-asi select");
for (let i = 0; i <= 1; i++) {
  raceStatAllocators[i].addEventListener("change", () => {
    hideSelectedStatsOptions(".race-asi");
  });
}

// Function to show selected option only on a list
function showListOptionDetails(listContainer, option, idToSet) {
  for (let i = 0; i < listContainer.length; i++) {
    if (!Array.from(listContainer[i].classList).includes(option)) {
      listContainer[i].classList.add("fade-off");
    }
  }
  setTimeout(() => {
    for (let i = 0; i < listContainer.length; i++) {
      if (Array.from(listContainer[i].classList).includes(option)) {
        listContainer[i].classList.remove("hidden");
        listContainer[i].setAttribute("id", idToSet);
      } else {
        listContainer[i].classList.add("hidden");
        listContainer[i].removeAttribute("id");
      }
    }
  }, 500);
  setTimeout(() => {
    for (let i = 0; i < listContainer.length; i++) {
      if (Array.from(listContainer[i].classList).includes(option)) {
        listContainer[i].classList.remove("fade-off");
      }
    }
  }, 1000);
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
function createRadioSelector(array, featureName) {
  let radioUlContainer = document.createElement("ul");
  radioUlContainer.classList.add("radio-ul-container");
  array.forEach((option) => {
    let radioLi = constructLiWithTitle(option);
    let transformedFeatureName = featureName.replaceAll(" ", "-");
    let transformedOptionName = option.featureName.replaceAll(" ", "-");
    let radioButton = document.createElement("input");
    radioButton.setAttribute("type", "radio");
    radioButton.setAttribute("value", transformedOptionName);
    radioButton.setAttribute("name", transformedFeatureName);
    radioLi.prepend(radioButton);
    radioUlContainer.appendChild(radioLi);
  });
  return radioUlContainer;
}
function createCheckboxSelector(array, limit, featureName) {
  let transformedFeatureName = featureName.replaceAll(" ", "-");
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
    optionLabel.addEventListener("change", () => {
      let relevantCheckbox = document.querySelector(".checkbox-form." + transformedFeatureName).children;
      let checkedCounter = 0;
      for (let v = 0; v < relevantCheckbox.length; v++) {
        if (relevantCheckbox[v].children[0].checked === true) {
          checkedCounter++;
        }
        if (checkedCounter > limit) {
          event.target.checked = false;
        }
      }
    });
    form.appendChild(optionLabel);
  });
  form.classList.add("checkbox-form", transformedFeatureName);
  checkboxContainer.appendChild(form);
  return checkboxContainer;
}
function createTable()
// HERE
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
    li.appendChild(createRadioSelector(feature.options, feature.featureName));
  }

  if (feature.type === "checkbox") {
    li.appendChild(createCheckboxSelector(feature.options, feature.limit, feature.featureName));
  }
  if (feature.type === "subfeature") {
    let subfeatureContainer = document.createElement("ul");
    feature.options.forEach((option) => subfeatureContainer.appendChild(constructLiWithTitle(option)));
    li.appendChild(subfeatureContainer);
  }
  if (feature.type === "table") {
    li.appendChild(createTable(feature.table))
  } 

  return li;
}
function createImage(source, altText) {
  let image = document.createElement("img");
  image.setAttribute("src", source);
  image.setAttribute("alt", altText);
  return image;
}
function constructRaceDetails(races) {
  let raceList = document.querySelector(".race-list");
  let raceAsiSidebar = document.querySelector(".race-asi");
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
    raceDetailsContainer.classList.add("race-details", raceDetails.name, "hidden", "fade-off");
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
    if (raceDetails.subRaceFeatures !== undefined) {
      let subraceDisplay = constructLiWithTitle(subraceObject);
      subraceDisplay.classList.add("subclass-select");
      featuresList.appendChild(subraceDisplay);
    }
    // Language selector
    let languagesFeature = {
      featureName: "Languages",
      text: "You can speak, read, and write Common and one other language that you and your DM agree is appropriate for the character.",
      type: "list",
      listOptions: languages,
    };
    featuresList.appendChild(constructLiWithTitle(languagesFeature));
    // Construct Sub-race features
    if (raceDetails.subRaceFeatures !== undefined) {
      raceDetails.subRaceFeatures.forEach((feature) => {
        featuresList.appendChild(constructLiWithTitle(feature));
      });
    }
    // Append whole race container to the modal
    raceDetailsContentContainer.appendChild(featuresList);
    raceDetailsContainer.appendChild(raceDetailsContentContainer);
    const raceSelector = document.querySelector(".race-selector");
    raceSelector.appendChild(raceDetailsContainer);
    // Adding image to sidebar
    let raceImage = createImage(raceDetails.imgLink, `${raceDetails.name} portrait`);
    raceImage.classList.add(raceDetails.name, "hidden", "fade-off");
    raceAsiSidebar.prepend(raceImage);
  });
  // Adding Event Listener to Buttons
  let raceImages = document.querySelectorAll(".race-asi > img");
  let raceListItems = document.querySelectorAll(".race-list > div > button");
  let allRaces = document.querySelectorAll(".race-details");
  for (let i = 0; i <= raceListItems.length - 1; i++) {
    raceListItems[i].addEventListener("click", () => {
      for (let j = 0; j <= raceListItems.length - 1; j++) {
        raceListItems[j].removeAttribute("id");
      }
      event.target.setAttribute("id", "selected-race-button");
      showListOptionDetails(allRaces, event.target.innerText.toLowerCase(), "selected-race");
      showListOptionDetails(raceImages, event.target.innerText.toLowerCase(), "selected-race-image");
    });
  }

  // Adding event to hide/unhide subclass features
  let subclassSelectors = document.querySelectorAll(".subclass-select > select");
  for (let j = 0; j < subclassSelectors.length; j++) {
    subclassSelectors[j].addEventListener("change", () => {
      let raceDetailsFeatures = document.querySelector("#selected-race .race-details-features").children;
      for (let i = 0; i < raceDetailsFeatures.length; i++) {
        if (
          raceDetailsFeatures[i].classList.length >= 1 &&
          !Array.from(raceDetailsFeatures[i].classList).includes("subclass-select")
        ) {
          if (Array.from(raceDetailsFeatures[i].classList).includes(event.target.value)) {
            raceDetailsFeatures[i].classList.remove("hidden");
          } else {
            raceDetailsFeatures[i].classList.add("hidden");
          }
        }
      }
    });
  }
}

let races = {};
fetch(baseURI + "races.json")
  .then((response) => response.json())
  .then((data) => {
    races = data;
    constructRaceDetails(races);
  });

// CLASS PAGE

function constructClassDetails(classes) {
  let classList = document.querySelector(".class-list");
  // let raceAsiSidebar = document.querySelector(".race-asi");
  classes.forEach((individualClass) => {
    // Adding Element to the Class List
    let classListContainer = document.createElement("div");
    classListContainer.classList.add(`list-${individualClass.name}`);
    let classListButton = document.createElement("button");
    let classListButtonText = document.createTextNode(individualClass.name);
    classListButton.appendChild(classListButtonText);
    classListContainer.appendChild(classListButton);
    classList.appendChild(raceListContainer);

    // Creating Class Details containers
    let classDetailsContainer = document.createElement("div");
    // let classDetailsContentContainer = document.createElement("div");
    classDetailsContainer.classList.add("class-details", raceDetails.name, "hidden" , "fade-off");
    // classDetailsContentContainer.classList.add("class-details-content");
    // Adding race description
    let classDescriptionP = document.createElement("p");
    let classDescriptionText = document.createTextNode(individualClass.description);
    classDescriptionP.appendChild(classDescriptionText);
    classDetailsContainer.appendChild(classDescriptionP);
    // Adding container for features
    let featuresList = document.createElement("ul");
    featuresList.classList.add("class-features");
    individualClass.features.forEach((feature) => {
      featuresList.appendChild(constructLiWithTitle(feature));
    });
    // define table constructor
    // Appending a Sub-race selector to the list
    let capitalizedRaceName = raceDetails.name.charAt(0).toUpperCase() + raceDetails.name.slice(1);
    let subraceObject = {
      featureName: "Sub-races:",
      text: ` Select a sub-race for your ${capitalizedRaceName}.`,
      type: "list",
      listOptions: raceDetails.subraces,
    };
    if (raceDetails.subRaceFeatures !== undefined) {
      let subraceDisplay = constructLiWithTitle(subraceObject);
      subraceDisplay.classList.add("subclass-select");
      featuresList.appendChild(subraceDisplay);
    }
    // Language selector
    let languagesFeature = {
      featureName: "Languages",
      text: "You can speak, read, and write Common and one other language that you and your DM agree is appropriate for the character.",
      type: "list",
      listOptions: languages,
    };
    featuresList.appendChild(constructLiWithTitle(languagesFeature));
    // Construct Sub-race features
    if (raceDetails.subRaceFeatures !== undefined) {
      raceDetails.subRaceFeatures.forEach((feature) => {
        featuresList.appendChild(constructLiWithTitle(feature));
      });
    }
    // Append whole race container to the modal
    raceDetailsContentContainer.appendChild(featuresList);
    raceDetailsContainer.appendChild(raceDetailsContentContainer);
    const raceSelector = document.querySelector(".race-selector");
    raceSelector.appendChild(raceDetailsContainer);
    // Adding image to sidebar
    let raceImage = createImage(raceDetails.imgLink, `${raceDetails.name} portrait`);
    raceImage.classList.add(raceDetails.name, "hidden");
    raceAsiSidebar.prepend(raceImage);
  });
  // Adding Event Listener to Buttons
  let raceImages = document.querySelectorAll(".race-asi > img");
  let raceListItems = document.querySelectorAll(".race-list > div > button");
  let allRaces = document.querySelectorAll(".race-details");
  for (let i = 0; i <= raceListItems.length - 1; i++) {
    raceListItems[i].addEventListener("click", () => {
      for (let j = 0; j <= raceListItems.length - 1; j++) {
        raceListItems[j].removeAttribute("id");
      }
      event.target.setAttribute("id", "selected-race-button");
      showListOptionDetails(allRaces, event.target.innerText.toLowerCase(), "selected-race");
      showListOptionDetails(raceImages, event.target.innerText.toLowerCase(), "selected-race-image");
    });
  }

  // Adding event to hide/unhide subclass features
  let subclassSelectors = document.querySelectorAll(".subclass-select > select");
  for (let j = 0; j < subclassSelectors.length; j++) {
    subclassSelectors[j].addEventListener("change", () => {
      let raceDetailsFeatures = document.querySelector("#selected-race .race-details-features").children;
      for (let i = 0; i < raceDetailsFeatures.length; i++) {
        if (
          raceDetailsFeatures[i].classList.length >= 1 &&
          !Array.from(raceDetailsFeatures[i].classList).includes("subclass-select")
        ) {
          if (Array.from(raceDetailsFeatures[i].classList).includes(event.target.value)) {
            raceDetailsFeatures[i].classList.remove("hidden");
          } else {
            raceDetailsFeatures[i].classList.add("hidden");
          }
        }
      }
    });
  }
}

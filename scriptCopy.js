const baseURI = document.baseURI;
// let languages = [];
// fetch("languages.json")
//   .then((response) => response.json())
//   .then((data) => (languages = data.languages));
// Create a character:

// Function to create new stats and event to trigger it
// function createNewStats() {
//   let stats = [];
//   let sum = 0;
//   while (sum < 70) {
//     stats = [];
//     for (let i = 0; i <= 5; i++) {
//       let roll1 = Math.ceil(Math.random() * 6),
//         roll2 = Math.ceil(Math.random() * 6),
//         roll3 = Math.ceil(Math.random() * 6),
//         roll4 = Math.ceil(Math.random() * 6);
//       stat = roll1 + roll2 + roll3 + roll4 - Math.min(roll1, roll2, roll3, roll4);
//       stats.push(stat);
//     }
//     sum = stats.reduce((accumulator, currentValue) => accumulator + currentValue);
//   }
//   return stats;
// }
// document.querySelector(".reroll-stats-button button").addEventListener("click", () => {
//   let statsPage = document.querySelectorAll(".stats-selector-stat .stat-value p");
//   let newStats = createNewStats();
//   for (let i = 0; i <= 5; i++) {
//     statsPage[i].innerText = newStats[i];
//   }
// });
// document.querySelector(".reroll-stats-button button").click();

// Logic for Selecting Stats on the Stat container
// function hideSelectedStatsOptions(containerClass) {
//   let selectedOptions = [];
//   let targetSelects = document.querySelectorAll(containerClass + " select");
//   for (let j = 0; j < targetSelects.length; j++) {
//     selectedOptions.push(targetSelects[j].value);
//   }
//   let optionsStr = document.querySelectorAll(containerClass + " .option-str");
//   let optionsDex = document.querySelectorAll(containerClass + " .option-dex");
//   let optionsCon = document.querySelectorAll(containerClass + " .option-con");
//   let optionsInt = document.querySelectorAll(containerClass + " .option-int");
//   let optionsWis = document.querySelectorAll(containerClass + " .option-wis");
//   let optionsCha = document.querySelectorAll(containerClass + " .option-cha");
//   if (selectedOptions.includes("str")) {
//     for (let i = 0; i < optionsStr.length; i++) {
//       optionsStr[i].classList.add("hidden");
//     }
//   } else {
//     for (let i = 0; i < optionsStr.length; i++) {
//       optionsStr[i].classList.remove("hidden");
//     }
//   }
//   if (selectedOptions.includes("dex")) {
//     for (let i = 0; i < optionsDex.length; i++) {
//       optionsDex[i].classList.add("hidden");
//     }
//   } else {
//     for (let i = 0; i < optionsDex.length; i++) {
//       optionsDex[i].classList.remove("hidden");
//     }
//   }
//   if (selectedOptions.includes("con")) {
//     for (let i = 0; i < optionsCon.length; i++) {
//       optionsCon[i].classList.add("hidden");
//     }
//   } else {
//     for (let i = 0; i < optionsCon.length; i++) {
//       optionsCon[i].classList.remove("hidden");
//     }
//   }
//   if (selectedOptions.includes("int")) {
//     for (let i = 0; i < optionsInt.length; i++) {
//       optionsInt[i].classList.add("hidden");
//     }
//   } else {
//     for (let i = 0; i < optionsInt.length; i++) {
//       optionsInt[i].classList.remove("hidden");
//     }
//   }
//   if (selectedOptions.includes("wis")) {
//     for (let i = 0; i < optionsWis.length; i++) {
//       optionsWis[i].classList.add("hidden");
//     }
//   } else {
//     for (let i = 0; i < optionsWis.length; i++) {
//       optionsWis[i].classList.remove("hidden");
//     }
//   }
//   if (selectedOptions.includes("cha")) {
//     for (let i = 0; i < optionsCha.length; i++) {
//       optionsCha[i].classList.add("hidden");
//     }
//   } else {
//     for (let i = 0; i < optionsCha.length; i++) {
//       optionsCha[i].classList.remove("hidden");
//     }
//   }
// }
// let statAllocators = document.querySelectorAll(".stats-selector-stat select");
// for (let i = 0; i <= 5; i++) {
//   statAllocators[i].addEventListener("change", () => hideSelectedStatsOptions(".stats-selector"));
// }
// For Race-asi
// let raceStatAllocators = document.querySelectorAll(".race-asi select");
// for (let i = 0; i <= 1; i++) {
//   raceStatAllocators[i].addEventListener("change", () => {
//     hideSelectedStatsOptions(".race-asi");
//   });
// }

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
//Details functions:
// Auxiliary functions to create content
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
    li.appendChild(createTable(feature.table));
  }

  return li;
}
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
function createTable() {}

function createImage(source, altText) {
  let image = document.createElement("img");
  image.setAttribute("src", source);
  image.setAttribute("alt", altText);
  return image;
}
// Details Constructors
function constructDetails(inputArray, listContainerClass, contentContainerClass) {
  let listContainer = document.querySelector(listContainerClass);
  inputArray.forEach((input) => {
    // Adding Element to the List
    let listElementContainer = document.createElement("div");
    let listElementButton = document.createElement("button");
    let listElementButtonText = document.createTextNode(input.name);
    listElementButton.appendChild(listElementButtonText);
    listElementContainer.appendChild(listElementButton);
    listContainer.appendChild(listElementContainer);

    // Creating Details containers
    let inputContainer = document.createElement("div");
    let inputContentContainer = document.createElement("div");
    inputContainer.classList.add(input.glossaryType + "-details", input.name, "hidden", "fade-off");
    inputContentContainer.classList.add(input.glossaryType + "-details-content");
    // Adding Input Description
    let inputDescriptionP = document.createElement("p");
    let inputDescriptionText = document.createTextNode(input.description);
    inputDescriptionP.appendChild(inputDescriptionText);
    inputContentContainer.appendChild(inputDescriptionP);
    // Adding header for features
    let featuresHeader = document.createElement("header");
    let featuresHeaderH2 = document.createElement("h2");
    let featuresHeaderText = document.createTextNode("Features");
    featuresHeaderH2.appendChild(featuresHeaderText);
    featuresHeader.appendChild(featuresHeaderH2);
    inputContentContainer.appendChild(featuresHeader);
    // Adding container for features
    let featuresList = document.createElement("ul");
    featuresList.classList.add(input.glossaryType + "-details-features");
    // Appending each feature to the list
    input.features.forEach((feature) => {
      featuresList.appendChild(constructLiWithTitle(feature));
    });
    if (input.glossaryType === "race") {
      // Appending a Sub-race selector to the list
      let raceAsiSidebar = document.querySelector(".race-asi");
      let capitalizedRaceName = input.name.charAt(0).toUpperCase() + input.name.slice(1);
      let subraceObject = {
        featureName: "Sub-races:",
        text: ` Select a sub-race for your ${capitalizedRaceName}.`,
        type: "list",
        listOptions: input.subraces,
      };
      if (input.subRaceFeatures !== undefined) {
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
      if (input.subRaceFeatures !== undefined) {
        input.subRaceFeatures.forEach((feature) => {
          featuresList.appendChild(constructLiWithTitle(feature));
        });
      }
      // Adding image to sidebar
      let raceImage = createImage(input.imgLink, `${input.name} portrait`);
      raceImage.classList.add(input.name, "hidden", "fade-off");
      raceAsiSidebar.prepend(raceImage);
    }
    // Append whole container to the modal
    inputContentContainer.appendChild(featuresList);
    inputContainer.appendChild(inputContentContainer);
    const contentContainer = document.querySelector(contentContainerClass);
    contentContainer.appendChild(inputContainer);
  });
}
function addRaceEventListeners() {
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
// Trigger construction
// let races = {};
// fetch(baseURI + "races.json")
//   .then((response) => response.json())
//   .then((data) => {
//     races = data;
//     constructDetails(races, ".race-list", ".race-selector");
//     addRaceEventListeners();
//   });
let classes = [];
fetch("/classes.json")
  .then((response) => response.json())
  .then((data) => {
    classes = data;
    constructDetails(classes, ".class-list", ".class-container");
  });

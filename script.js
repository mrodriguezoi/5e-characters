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

// let raceListItems = document.querySelectorAll(".race-list > div > button");
// for (let i = 0; i <= raceListItems.length - 1; i++) {
//   raceListItems[i].addEventListener("click", () => {
//     for (let j = 0; j <= raceListItems.length - 1; j++) {
//       raceListItems[j].removeAttribute("id");
//     }
//     event.target.setAttribute("id", "selected-race");
//     showRaceDetails(event.target.innerText.toLowerCase());
//   });
// }
let placeHolderRaceDetails = {
  name: "Race",
  description: "placeholder",
  subraces: ["subrace-1", "subrace-2"],
  features: [
    {
      // This is a the normal feature, consists of a feature name and description
      featureName: "age",
      text: "Placeholder",
    },
    {
      // This type of feature is a list where the user selects one option from a list
      featureName: "tool-proficiency",
      text: "You gain proficiency with the artisan's tools of your choice.",
      dependecy: "subrace-1",
      type: "list",
      listOptions: [
        // In this case the first element is the value, and the second is the text
        ["option-1", "This is option 1"],
        ["option-2", "This is option 2"],
      ],
    },
    {
      // This is a kind of feature that requests you to pick one of the available options, like Half-Elves Skill Versatility
      featureName: "half-elf-versatility",
      text: "Choose one of the following traits:",
      type: "radio",
      options: [
        { featureName: "Radio Feature 1", text: "This is radio feature one", featureId: "radio-feature-1" },
        {
          featureName: "Radio Feature 2",
          text: "This is radio feature two",
          featureId: "radio-feature-2",
          type: "list",
          options: [
            ["radio-list-1", "First option on the list of the radio selector"],
            ["radio-list-2", "Second option on the list of the radio selector"],
          ],
        },
      ],
    },
    {
      // This is a kind of feature that requests you to pick one of the available options, like Half-Elves Skill Versatility
      featureName: "half-elf-versatility",
      text: "Choose one of the following traits:",
      type: "checkbox",
      options: [
        ["option-1", "This is option 1"],
        ["option-2", "This is option 2"],
      ],
    },
  ],
};
function createListFromOptions(array) {
  let select = document.createElement("select");
  let defaultOption = document.createElement("option");
  let defaultOptionText = document.createTextNode("");
  defaultOption.appendChild(defaultOptionText);
  defaultOption.disabled = true;
  defaultOption.selected = true;
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
  let featureDescription = document.createTextNode(" " + feature.text);
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

  return li;
}

function constructRaceDetails(races) {
  let raceList = document.querySelector(".race-list");
  races.forEach((raceDetails) => {
    // Adding Element to the Races list
    let raceListContainer = document.createElement("div");
    let raceListButton = document.createElement("button");
    let raceListButtonText = document.createTextNode(raceDetails.name);
    raceListButton.appendChild(raceListButtonText);
    raceListContainer.appendChild(raceListButton);
    raceList.appendChild(raceListContainer);
    // Si algo se rompe es porque no agregue las clases aca

    // Creating Race Details containers
    let raceDetailsContainer = document.createElement("div");
    raceDetailsContainer.classList.add("race-details", raceDetails.name, "hidden");
    let raceDetailsContentContainer = document.createElement("div");
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
    raceDetails.features.forEach((feature) => {
      raceDetailsContentContainer.appendChild(constructLiWithTitle(feature));
    });
    // TO-DO: Add language and subrace selector
  });
  // Adding Event Listener to said element
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
}

// Escribir un componente para los detalles de la raza, que le puedas pasar un json con un array de features,
//  y las features pueden tener dependecias entre si, de modo que si una feature tiene opciones al seleccionar una opcion se muestra la correcta

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
      listContainer[i].removeAttribute("_id");
    } else {
      listContainer[i].classList.add("hidden");
      listContainer[i].setAttribute("_id", idToSet);
    }
  }
}

// Race Details functions:
//
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
    // Si algo se rompe es porque no agregue las clases aca

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
    console.log("did subraces");
    constructLiWithTitle(subraceObject);
    featuresList.appendChild(constructLiWithTitle(subraceObject));
    // Language selector
    console.log("what");
    let languagesFeature = {
      featureName: "Languages",
      text: "You can speak, read, and write Common and one other language that you and your DM agree is appropriate for the character.",
      type: "list",
      listOptions: languagesJson,
    };
    console.log("did langs");
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

let languagesJson =
  '[["dwarvish", "Dwarvish"],["elvish", "Elvish"],["giant", "Giant"],["gnomish", "Gnomish"],["goblin", "Goblin"],["halfling", "Halfling"],["orc", "Orc"],["abyssal", "Abyssal"],["celestial", "Celestial"],["deep-speech", "Deep Speech"],["infernal", "Infernal"],["primordial", "Primordial"],["sylvan", "Sylvan"],["undercommon", "Undercommon"]]';
languagesJson = JSON.parse(languagesJson);
let dragonbornArray = [
  {
    glossaryType: "race",
    name: "dragonborn",
    description:
      "The dragonborn walk proudly through a world that greets them with fearful incomprehension. Shaped by the dragons themselves, dragonborn originally hatched from dragon eggs as a unique race, combining the best attributes of dragons and humanoids.",
    subraces: [
      ["metallic", "Metallic"],
      ["chromatic", "Chromatic"],
      ["gem", "Gem"],
    ],
    features: [
      {
        featureName: "Age",
        text: "Young dragonborn grow quickly. They walk hours after hatching, attain the size and development of a 10-year-old human child by the age of 3, and reach adulthood by 15. They live to be around 80.",
      },
      {
        featureName: "Size",
        text: "Dragonborn are taller and heavier than humans, standing well over 6 feet tall and averaging almost 250 pounds. Your size is Medium.",
      },
      {
        featureName: "Speed",
        text: "Your walking speed is 30 feet.",
      },
    ],
    subRaceFeatures: [
      {
        featureName: "Chromatic Ancestry",
        text: "You trace your ancestry to a chromatic dragon, granting you a special magical affinity. Choose one type of dragon from the Chromatic Ancestry table. This determines the damage type for your other traits as shown in the table.",
        type: "list",
        options: [
          ["acid", "Black (Acid)"],
          ["lightning", "Blue (Lightning)"],
          ["poison", "Green (Poison)"],
          ["fire", "Red (Fire)"],
          ["cold", "White (Cold)"],
        ],
        dependency: "chromatic",
      },
      {
        featureName: "Breath Weapon",
        text: "When you take the Attack action on your turn, you can replace one of your attacks with an exhalation of magical energy in a 30-foot line that is 5 feet wide. Each creature in that area must make a Dexterity saving throw (DC = 8 + your Constitution modifier + your proficiency bonus). On a failed save, the creature takes 1d10 damage of the type associated with your Chromatic Ancestry. On a successful save, it takes half as much damage. This damage increases by 1d10 when you reach 5th level (2d10), 11th level (3d10), and 17th level (4d10). You can use your Breath Weapon a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.",
        dependency: "chromatic",
      },
      {
        featureName: "Draconic Resistance",
        text: "You have resistance to the damage type associated with your Chromatic Ancestry.",
        dependency: "chromatic",
      },
      {
        featureName: "Chromatic Warding",
        text: "Starting at 5th level, as an action, you can channel your draconic energy to protect yourself. For 1 minute, you become immune to the damage type associated with your Chromatic Ancestry. Once you use this trait, you can’t do so again until you finish a long rest.",
        dependency: "chromatic",
      },
      {
        featureName: "Gem Ancestry",
        text: "You trace your ancestry to a Gem dragon, granting you a special magical affinity. Choose one type of dragon from the Gem Ancestry table. This determines the damage type for your other traits as shown in the table.",
        type: "list",
        options: [
          ["force", "Amethyst (Force)"],
          ["radiant", "Crystal (Radiant)"],
          ["psychic", "Emerald (Psychic)"],
          ["thunder", "Sapphire (Thunder)"],
          ["necrotic", "Topaz (Necrotic)"],
        ],
        dependency: "gem",
      },
      {
        featureName: "Breath Weapon",
        text: "When you take the Attack action on your turn, you can replace one of your attacks with an exhalation of magical energy in a 15-foot cone. Each creature in that area must make a Dexterity saving throw (DC = 8 + your Constitution modifier + your proficiency bonus). On a failed save, the creature takes 1d10 damage of the type associated with your Gem Ancestry. On a successful save, it takes half as much damage. This damage increases by 1d10 when you reach 5th level (2d10), 11th level (3d10), and 17th level (4d10). You can use your Breath Weapon a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.",
        dependency: "gem",
      },
      {
        featureName: "Draconic Resistance",
        text: "You have resistance to the damage type associated with your Gem Ancestry.",
        dependency: "gem",
      },
      {
        featureName: "Psionic Mind",
        text: "You can telepathically speak to any creature you can see within 30 feet of you. You don’t need to share a language with the creature, but the creature must be able to understand at least one language.",
        dependency: "gem",
      },
      {
        featureName: "Gem Flight",
        text: "Starting at 5th level, you can use a bonus action to manifest spectral wings on your body. These wings last for 1 minute. For the duration, you gain a flying speed equal to your walking speed and can hover. Once you use this trait, you can’t do so again until you finish a long rest.",
        dependency: "gem",
      },
      {
        featureName: "Metallic Ancestry",
        text: "You trace your ancestry to a metallic dragon, granting you a special magical affinity. Choose one type of dragon from the Metallic Ancestry table. This determines the damage type for your other traits as shown in the table.",
        type: "list",
        options: [
          ["fire", "Brass (Fire)"],
          ["lightning", "Bronze (Lightning)"],
          ["acid", "Copper (Acid)"],
          ["fire", "Gold (Fire)"],
          ["cold", "Silver (Cold)"],
        ],
        dependency: "metallic",
      },
      {
        featureName: "Breath Weapon",
        text: "When you take the Attack action on your turn, you can replace one of your attacks with an exhalation of magical energy in a 15-foot cone. Each creature in that area must make a Dexterity saving throw (DC = 8 + your Constitution modifier + your proficiency bonus). On a failed save, the creature takes 1d10 damage of the type associated with your Metallic Ancestry. On a successful save, it takes half as much damage. This damage increases by 1d10 when you reach 5th level (2d10), 11th level (3d10), and 17th level (4d10). You can use your Breath Weapon a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.",
        dependency: "metallic",
      },
      {
        featureName: "Draconic Resistance",
        text: "You have resistance to the damage type associated with your Metallic Ancestry.",
        dependency: "metallic",
      },
      {
        featureName: "Metallic Breath Weapon",
        text: "At 5th level, you gain a second breath weapon. When you take the Attack action on your turn, you can replace one of your attacks with an exhalation in a 15-foot cone. The save DC for this breath is 8 + your Constitution modifier + your proficiency bonus. Once you use your Metallic Breath Weapon, you can’t do so again until you finish a long rest. Whenever you use this trait, choose one:",
        dependency: "metallic",
        type: "subfeature",
        options: [
          {
            featureName: "Enervating Breath",
            text: "Each creature in the cone must succeed on a Constitution saving throw or become incapacitated until the start of your next turn.",
          },
          {
            featureName: "Repulsion Breath",
            text: "Each creature in the cone must succeed on a Strength saving throw or be pushed 20 feet away from you and be knocked prone.",
          },
        ],
      },
    ],
  },
];
constructRaceDetails(dragonbornArray);

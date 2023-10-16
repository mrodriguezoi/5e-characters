// Create a character:

// Function to create new stats and event to trigger it
function createNewStats() {
  let stats = [];
  let sum = 0;
  while (sum <= 70) {
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
      listContainer[i].removeAttribute("id");
    }
    if (Array.from(listContainer[i].classList).includes(option)) {
      listContainer[i].classList.remove("fade-off");
      listContainer[i].setAttribute("id", idToSet);
    }
  }
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
    li.classList.add(feature.dependency, "hidden", "subrace-feature");
  }
  if (feature.type === "list") {
    li.appendChild(createListFromOptions(feature.listOptions));
    li.classList.add("ui-input-" + feature.featureName.toLowerCase().replaceAll(" ", ""));
  }
  if (feature.type === "radio") {
    li.appendChild(createRadioSelector(feature.options, feature.featureName));
    li.classList.add("ui-input-" + feature.featureName.toLowerCase().replaceAll(" ", ""));
  }

  if (feature.type === "checkbox") {
    li.appendChild(createCheckboxSelector(feature.options, feature.limit, feature.featureName));
    li.classList.add("ui-input-" + feature.featureName.toLowerCase().replaceAll(" ", ""));
  }
  if (feature.type === "subfeature") {
    let subfeatureContainer = document.createElement("ul");
    feature.options.forEach((option) => subfeatureContainer.appendChild(constructLiWithTitle(option)));
    li.appendChild(subfeatureContainer);
  }
  if (feature.type === "table") {
    li.appendChild(createTable(feature.table, [feature.featureName.toLowerCase().replaceAll(" ", "")]));
  }
  if (feature.featureName === "" && feature.text === "" && feature.type === undefined) {
    li.classList.add("hidden");
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
  let i = 0;
  let transformedFeatureName;
  if (featureName === "") {
    transformedFeatureName = i;
    i++;
  } else {
    transformedFeatureName = featureName.replaceAll(" ", "");
  }
  array.forEach((option) => {
    let radioLi = constructLiWithTitle(option);
    let transformedOptionName;
    if (option.featureName !== "") {
      transformedOptionName = option.featureName.replaceAll(" ", "");
    } else {
      transformedOptionName = option.text.replaceAll(" ", "");
      transformedOptionName = transformedOptionName.replaceAll("A-", "");
      transformedOptionName = transformedOptionName.replaceAll("An-", "");
    }
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
  let transformedFeatureName = featureName.replaceAll(" ", "");
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
function createTable(tableArray, tableClassesArray) {
  let table = document.createElement("table");
  tableClassesArray.forEach((htmlClass) => table.classList.add(htmlClass));
  let tableBody = document.createElement("tbody");
  tableArray.forEach((rowArray) => {
    let tableRow = document.createElement("tr");
    let rowHtmlElement;
    rowArray.forEach((rowElement) => {
      if (rowElement.type === "header") {
        rowHtmlElement = document.createElement("th");
      } else {
        rowHtmlElement = document.createElement("td");
      }
      let elementText = document.createTextNode(rowElement.content);
      if (rowElement.span !== undefined) {
        rowHtmlElement.setAttribute("colspan", rowElement.span);
      }
      rowHtmlElement.appendChild(elementText);
      tableRow.appendChild(rowHtmlElement);
    });
    tableBody.appendChild(tableRow);
  });
  table.appendChild(tableBody);
  return table;
}
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
    inputContainer.classList.add(
      input.glossaryType + "-details",
      input.name.toLowerCase().replaceAll(" ", ""),
      "fade-off"
    );
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
        featureName: "Sub-races",
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
        characterImpact: { language: "$feature.selectedValue" },
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
      raceImage.classList.add(input.name, "fade-off");
      raceAsiSidebar.prepend(raceImage);
    }
    let triggerClass = input.name + "-subclass-selector";
    if (input.glossaryType === "class") {
      let subclassSelector = document.querySelector(".subclass-selector");
      let classSubclassSelector = document.createElement("div");
      classSubclassSelector.classList.add(triggerClass, "fade-off");
      subclassSelector.appendChild(classSubclassSelector);
      constructDetails(input.subclasses, "." + triggerClass, ".class-container");
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
  for (let i = 0; i < raceListItems.length; i++) {
    raceListItems[i].addEventListener("click", () => {
      for (let j = 0; j <= raceListItems.length - 1; j++) {
        raceListItems[j].removeAttribute("id");
      }
      event.target.setAttribute("id", "selected-race-button");
      showListOptionDetails(allRaces, event.target.innerText.toLowerCase().replaceAll(" ", ""), "selected-race");
      showListOptionDetails(
        raceImages,
        event.target.innerText.replaceAll(" ", "").toLowerCase(),
        "selected-race-image"
      );
    });
  }
  // Adding event to hide/unhide subclass features
  let subclassSelectors = document.querySelectorAll(".subclass-select > select");
  for (let j = 0; j < subclassSelectors.length; j++) {
    subclassSelectors[j].addEventListener("change", () => {
      let raceDetailsFeatures = document.querySelector("#selected-race .race-details-features").children;
      for (let i = 0; i < raceDetailsFeatures.length; i++) {
        if (Array.from(raceDetailsFeatures[i].classList).filter((cls) => !cls.includes("ui-input")).length >= 1) {
          if (Array.from(raceDetailsFeatures[i].classList).includes(event.target.value)) {
            raceDetailsFeatures[i].classList.remove("hidden");
          } else {
            raceDetailsFeatures[i].classList.add("hidden");
          }
        }
      }
      let nonHideableLi = document.querySelectorAll(".subclass-select , .ui-input-languages");
      for (let i = 0; i < nonHideableLi.length; i++) {
        nonHideableLi[i].classList.remove("hidden");
      }
    });
  }
}
function addClassEventListeners() {
  // Adding Event Listener to Buttons
  let classListItems = document.querySelectorAll(".class-list > div > button");
  let allClasses = document.querySelectorAll(".class-details , .subclass-details");
  let subclassSelector = document.querySelector(".subclass-selector").children;
  let subclassListItems = document.querySelectorAll(".subclass-selector > div > div");
  for (let i = 0; i < classListItems.length; i++) {
    classListItems[i].addEventListener("click", () => {
      for (let j = 0; j < classListItems.length; j++) {
        classListItems[j].removeAttribute("id");
      }
      for (let j = 0; j < subclassListItems.length; j++) {
        subclassListItems[j].children[0].removeAttribute("id");
      }
      event.target.setAttribute("id", "selected-class-button");
      showListOptionDetails(allClasses, event.target.innerText.toLowerCase().replaceAll(" ", ""), "selected-class");
      showListOptionDetails(
        subclassSelector,
        event.target.innerText.toLowerCase().replaceAll(" ", "") + "-subclass-selector",
        ""
      );
    });
  }
  for (let i = 0; i < subclassListItems.length; i++) {
    subclassListItems[i].addEventListener("click", (event) => {
      for (let j = 0; j < subclassListItems.length; j++) {
        subclassListItems[j].firstElementChild.removeAttribute("id");
      }
      event.target.setAttribute("id", "selected-subclass-button");
      showListOptionDetails(allClasses, event.target.innerText.toLowerCase().replaceAll(" ", ""), "selected-class");
    });
  }
}
function addBackgroundEventListeners() {
  // Adding Event Listener to Buttons
  let backgroundListItems = document.querySelectorAll(".background-list > div > button");
  let allBackgrounds = document.querySelectorAll(".background-details");
  for (let i = 0; i < backgroundListItems.length; i++) {
    backgroundListItems[i].addEventListener("click", () => {
      for (let j = 0; j <= backgroundListItems.length - 1; j++) {
        backgroundListItems[j].removeAttribute("id");
      }
      event.target.setAttribute("id", "selected-background-button");
      showListOptionDetails(
        allBackgrounds,
        event.target.innerText.toLowerCase().replaceAll(" ", ""),
        "selected-background"
      );
    });
  }
}
let modalForwardButtons = document.querySelectorAll(".continue-button-container > button");
for (let i = 0; i < modalForwardButtons.length; i++) {
  modalForwardButtons[i].addEventListener("click", () => {
    let modal = event.target.parentElement.parentElement;
    modal.classList.add("fade-off");
    modal.nextElementSibling.classList.remove("fade-off");
  });
}
let modalBackwardButtons = document.querySelectorAll(".previous-button-container > button");
for (let i = 0; i < modalBackwardButtons.length; i++) {
  modalBackwardButtons[i].addEventListener("click", () => {
    let modal = event.target.parentElement.parentElement;
    modal.classList.add("fade-off");
    modal.previousElementSibling.classList.remove("fade-off");
  });
}
const baseURI = document.baseURI + "mongoDb/";
let languages = [];
let classes = [];
let races = [];
let subclasses = [];
let backgrounds = [];

const fetchLanguages = fetch(baseURI + "languages.json").then((response) => response.json());
const fetchRaces = fetch(baseURI + "races.json").then((response) => response.json());
const fetchBackgrounds = fetch(baseURI + "backgrounds.json").then((response) => response.json());
const fetchClasses = fetch(baseURI + "classes.json")
  .then((response) => response.json())
  .then((classData) => {
    const fetchSubclasses = classData.map((individualClass) => {
      return fetch(baseURI + individualClass.name + "-subclasses.json").then((response) => response.json());
    });
    return Promise.all(fetchSubclasses).then((subclassLists) => {
      for (let i = 0; i < classData.length; i++) {
        classData[i].subclasses = subclassLists[i];
      }
      return classData;
    });
  });

Promise.all([fetchLanguages, fetchRaces, fetchClasses, fetchBackgrounds]).then(
  ([languagesData, racesData, classesData, backgroundsData]) => {
    languages = languagesData.languages;
    races = racesData;
    classes = classesData.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
    backgrounds = backgroundsData.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });

    constructDetails(classes, ".class-list", ".class-container");
    addClassEventListeners();
    constructDetails(races, ".race-list", ".race-selector");
    addRaceEventListeners();
    constructDetails(backgrounds, ".background-list", ".background-container");
    addBackgroundEventListeners();
  }
);

let character = {
  name: "Placeholder",
  progression: [{ class: "wizard" }],
  classes: [
    { class: "wizard", subclass: "school of abjuration", level: 3 },
    { class: "wizard", subclass: "school of abjuration", level: 3 },
  ],
  stats: [],
  savingThrows: [],
  skills: [],
  health: { max: 10, current: 5, temporary: 2 },
  classFeatures: [],
  raceFeatures: [],
  subclassFeatures: [],
  backgroundFeatures: [],
  proficiencies: [],
  skills: [],
  speedBase: 0,
  speedIncrease: [],
};
function addSelectedFeature(feature) {
  if (feature.type === undefined || feature.type === "table") {
    if (feature.characterImpact) {
      characterImpact[Object.keys(feature.characterImpact)[0]].push(
        feature.characterImpact[Object.keys(feature.characterImpact)[0]]
      );
    }
    return feature;
  }
  if (feature.type === "list") {
    if (
      document.querySelector(".ui-input-" + feature.featureName.toLowerCase().replaceAll(" ", "") + " select").value
    ) {
      feature.selectedValue = document.querySelector(
        ".ui-input-" + feature.featureName.toLowerCase().replaceAll(" ", "") + " select"
      ).value;
      if (feature.characterImpact) {
        characterImpact[Object.keys(feature.characterImpact)[0]].push(feature.selectedValue);
      }
      return feature;
    } else {
      // parent hasta que sea un strong no vacio
      featuresErrorArray.push(feature.featureName);
    }
  }
  if (feature.type === "subfeature") {
    feature.options.forEach((option) => addSelectedFeature(option));
    return feature;
  }
  if (feature.type === "radio") {
    let checkedCounter = 0;
    document
      .querySelectorAll(".ui-input-" + feature.featureName.toLowerCase().replaceAll(" ", "") + " input")
      .forEach((input) => {
        if (input.checked) {
          checkedCounter++;
          feature.selectedValue = input.value;
          addSelectedFeature(
            feature.options.filter((option) => option.featureName.replaceAll(" ", "") === feature.selectedValue)
          );
          if (feature.characterImpact) {
            characterImpact[Object.keys(feature.characterImpact)[0]].push(input.value);
          }
        }
      });
    if (checkedCounter) {
      feature.options.forEach((option) => addSelectedFeature(option));
      return feature;
    } else {
      featuresErrorArray.push(feature.featureName);
    }
  }
  if (feature.type === "checkbox") {
    feature.selectedValue = [];
    let checkedCounter = 0;
    document
      .querySelectorAll(".checkbox-form." + feature.featureName.replaceAll(" ", "") + " input")
      .forEach((input) => {
        if (input.checked) {
          checkedCounter++;
          feature.selectedValue.push(input.value);
          if (feature.characterImpact) {
            characterImpact[Object.keys(feature.characterImpact)[0]].push(input.value);
          }
        }
      });
    if (checkedCounter === feature.limit) {
      return feature;
    } else {
      featuresErrorArray.push(feature.featureName);
    }
  }
}
let characterImpact, featuresErrorArray, errorArray;
function createCharacter() {
  errorArray = [];
  featuresErrorArray = [];
  // Checking that all required options were selected
  let selectedClassName = "";
  let selectedSubclassName = "";
  let selectedRaceName = "";
  let selectedBackgroundName = "";
  let selectedSubraceName;
  if (document.querySelector("#selected-race .ui-input-sub-races select")) {
    if ((selectedSubraceName = document.querySelector("#selected-race .ui-input-sub-races select").value)) {
      selectedSubraceName = document.querySelector("#selected-race .ui-input-sub-races select").value;
    } else {
      errorArray.push("Subrace");
    }
  }
  if (document.querySelector("#selected-class-button") !== null) {
    selectedClassName = document.querySelector("#selected-class-button").innerText.toLowerCase();
  } else {
    errorArray.push("Class");
  }
  if (document.querySelector("#selected-subclass-button") !== null) {
    selectedSubclassName = document.querySelector("#selected-subclass-button").innerText;
  } else {
    errorArray.push("Subclass");
  }
  if (document.querySelector("#selected-race-button") !== null) {
    selectedRaceName = document.querySelector("#selected-race-button").innerText.toLowerCase();
  } else {
    errorArray.push("Race");
  }
  if (document.querySelector("#selected-background-button") !== null) {
    selectedBackgroundName = document.querySelector("#selected-background-button").innerText.toLowerCase();
  } else {
    errorArray.push("Background");
  }
  if (errorArray.length) {
    let errorArrayResult = "Please select your ";
    errorArray.forEach((err, index) => {
      if (index === errorArray.length - 1 && errorArray.length === 1) {
        errorArrayResult = errorArrayResult + err + ".";
      } else if (index === errorArray.length - 1) {
        errorArrayResult = errorArrayResult + "and " + err + ".";
      } else {
        errorArrayResult = errorArrayResult + err + ", ";
      }
    });
    return errorArrayResult;
  }
  // Filter each array to keep the selected data
  const selectedClass = classes.filter((individualClass) => individualClass.name === selectedClassName);
  const selectedSubclass = selectedClass[0].subclasses.filter((subclass) => subclass.name === selectedSubclassName);
  const selectedRace = races.filter((race) => race.name === selectedRaceName);
  const selectedBackground = backgrounds.filter((background) => background.name === selectedBackgroundName);
  // Adding the features to the character object
  //Adding Character Impact to Character:
  characterImpact = {
    speedBase: [],
    resistance: [],
    attack: [],
    proficiency: [],
    tool: [],
    health: [],
    skill: [],
    spells: [],
    spellPicker: [],
    language: [],
    consumables: [],
    gold: [],
    savingThrow: [],
    equipment: [],
  };
  selectedClass[0].features.forEach((feature) => character.classFeatures.push(addSelectedFeature(feature)));
  selectedSubclass[0].features.forEach((feature) => character.subclassFeatures.push(addSelectedFeature(feature)));
  selectedRace[0].features.forEach((feature) => character.raceFeatures.push(addSelectedFeature(feature)));
  if (selectedSubraceName) {
    selectedRace[0].subRaceFeatures.forEach((feature) => {
      if (feature.dependency === selectedSubraceName) {
        character.raceFeatures.push(addSelectedFeature(feature));
      }
    });
  }
  selectedBackground[0].features.forEach((feature) => character.backgroundFeatures.push(addSelectedFeature(feature)));
  if (featuresErrorArray.length) {
    let featuresErrorArrayResult = "Please finish your selection of the following features: ";
    featuresErrorArray.forEach((err, index) => {
      if (index === featuresErrorArray.length - 1) {
        featuresErrorArrayResult = featuresErrorArrayResult + err + ".";
      } else {
        featuresErrorArrayResult = featuresErrorArrayResult + err + ", ";
      }
    });
    return featuresErrorArrayResult;
  }

  // Showing the character details on the main page
  document.querySelector(".character-name p").textContent = character.name;
  let levelText = `${character.classes[0].subclass} ${character.classes[0].class} (${character.classes[0].level})`;
  if (character.classes.length > 1) {
    let additionalClasses = character.classes;
    additionalClasses.shift();
    additionalClasses.forEach((cls) => (levelText = levelText + `, ${cls.subclass} ${cls.class} (${cls.level})`));
  }
  document.querySelector(".level p").textContent = levelText;
}

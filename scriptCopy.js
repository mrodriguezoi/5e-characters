const baseURI = document.baseURI;
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
let classes = [];
fetch("/classes.json")
  .then((response) => response.json())
  .then((data) => {
    classes = data;
    constructDetails(classes, ".class-list", ".class-container");
  });

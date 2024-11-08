// From elements
const fromSelect = document.getElementById("from");
const fromIcon = document.getElementById("fromIcon");
const fromInput = document.getElementById("fromInput");

// Buttons
const clearButton = document.getElementById("clear");
const swapButton = document.getElementById("swap");
const resetButton = document.getElementById("reset");

// To elements
const toSelect = document.getElementById("to");
const toIcon = document.getElementById("toIcon");
const toInput = document.getElementById("toInput");

// Class JSON
let iconClasses = {};
let currencyRates = {};

// Initialize and fetch JSON data
// Initialize and fetch JSON data
const init = async () => {
  try {
    // Fetch icon classes
    iconClasses = await fetch('./class.json')
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => data);

    // Fetch currency rates
    currencyRates = await fetch('http://localhost:8080/api/v1/exchange/all')
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => data);

    // Now that the data is fetched, log the currency rates
    console.log(currencyRates);  // This will now print after the data is available

  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

init();


// Function to change icon
const changeIcon = (element, icon) => {
  const currency = element.value;
  const iconClass = iconClasses[currency];
  icon.className = `fa-solid ${iconClass}`;
};

// Function to convert currency
const convertCurrency = (forward=true) => {
  const fromCurrency = fromSelect.value;
  const toCurrency = toSelect.value;

  if(forward){
    const rate = Object.values(currencyRates).find(rate => rate.type === fromCurrency).value;
    const betweenValue = fromInput.value / rate;

    const toRate = Object.values(currencyRates).find(rate => rate.type === toCurrency).value;
    toInput.value = betweenValue * toRate;
  }
  else {
    const rate = Object.values(currencyRates).find(rate => rate.type === toCurrency).value;
    const betweenValue = toInput.value / rate;

    const fromRate = Object.values(currencyRates).find(rate => rate.type === fromCurrency).value;
    fromInput.value = betweenValue * fromRate;
  }
};

// Clear button
clearButton.addEventListener("click", () => {
  fromInput.value = "";
  toInput.value = "";
});

// Swap button
swapButton.addEventListener("click", () => {
  const fromValue = fromSelect.value;
  fromSelect.value = toSelect.value;
  toSelect.value = fromValue;

  changeIcon(fromSelect, fromIcon);
  changeIcon(toSelect, toIcon);
  
});

// Reset button
resetButton.addEventListener("click", () => {
  fromSelect.value = "USD";
  toSelect.value = "INR";

  changeIcon(fromSelect, fromIcon);
  changeIcon(toSelect, toIcon);

  fromInput.value = "";
  toInput.value = "";
});


// Event listeners
fromSelect.addEventListener("change", () => {
  changeIcon(fromSelect, fromIcon);
  convertCurrency();
});

toSelect.addEventListener("change", () => {
  changeIcon(toSelect, toIcon);
  convertCurrency();
});

fromInput.addEventListener("input", () => {
  convertCurrency();
});

toInput.addEventListener("input", () => {
  convertCurrency(false);
});

console.log(currencyRates);
const getForm = document.getElementById("form");
const clearAll = document.getElementById("clear-all");

function inputValidation(event) {
  event.preventDefault();

  const getInputElement = document.querySelectorAll(
    "#form input[type ='text'] "
  );
  const spanElement = document.querySelectorAll(".mortage-span");
  const getRequiredField = document.querySelectorAll(".required-field");
  const radioRequiredField = document.querySelector(".radiorequired-field");
  const emptyResult = document.querySelector(".empty-result");

  // console.log(getRequiredField)

  //to track form validation
  let isValid = true;

  //error state
  getInputElement.forEach((input, index) => {
    const span = spanElement[index];
    const requiredField = getRequiredField[index];
    if (!input.value) {
      input.style.border = "1px solid hsl(4, 69%, 50%)";
      span.style.backgroundColor = "hsl(4, 69%, 50%)";
      span.style.color = "white";
      span.style.border = "1px solid hsl(4, 69%, 50%)";
      requiredField.classList.remove("hidden");
      isValid = false;
    } else if (input.value.length > 0) {
      input.style.border = "1px solid hsl(61, 70%, 52%)";
    } else {
      input.style.border = "";
      span.style.backgroundColor = "";
      span.style.color = "";
      span.style.border = "";
      requiredField.classList.add("hidden");
    }

    // console.log(requiredField)
  });

  const radioButtons = document.querySelectorAll("#form input[type='radio']");
  const radioChecked = Array.from(radioButtons).some((radio) => radio.checked);
  if (!radioChecked) {
    radioRequiredField.classList.remove("hidden");
    isValid = false;
  } else {
    radioRequiredField.classList.add("hidden");
  }

  //show result
  if (isValid) {
    emptyResult.classList.add("hidden");
    showResult();
  }
}

//function to clear all input field
function clear() {
  let getInputElement = document.querySelectorAll("#form input[type ='text'] ");
  let radioButtons = document.querySelectorAll('input[name="Mortgage-type"]');
  const emptyResult = document.querySelector(".empty-result");
  const section = document.querySelector(".section");

  getInputElement.forEach((input) => {
    input.value = "";
  });

  radioButtons.forEach((radio) => {
    radio.checked = false;
  });

  emptyResult.classList.remove("hidden");
  section.innerHTML = "";
}

function showResult() {
  const getPrincipal = Number(document.getElementById("mortgage-amount").value);
  const getMortageTerm = Number(document.getElementById("mortgage-term").value);
  const getInterestRate = Number(
    document.getElementById("interest-rate").value
  );
  const section = document.querySelector(".section");

  //check if what user input is not a number
  if (isNaN(getPrincipal) || isNaN(getMortageTerm) || isNaN(getInterestRate)) {
    console.log("Invalid input values. Please enter valid numbers.");
    return;
  }

  // Convert annual interest rate to a monthly rate
  const monthlyInterestRate = getInterestRate / 100 / 12;

  // Total number of payments
  const numberOfPayments = getMortageTerm * 12;

  if (monthlyInterestRate <= 0 || numberOfPayments <= 0) {
    console.log("Interest rate and mortgage term must be greater than zero.");
    return;
  }

  //calculate the monthly payment
  const monthlyPayment =
    (getPrincipal *
      (monthlyInterestRate *
        Math.pow(1 + monthlyInterestRate, numberOfPayments))) /
    (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

  //calculate total repayment

  const totalRepayment = monthlyPayment * numberOfPayments;

  // Function to format numbers with commas
  function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  section.innerHTML = `
      <h2 class="text-white100 font-semibold text-2xl">Your results</h2>
            <p class="text-slate300 mt-4">Your results are shown below based on the information you provided. To adjust the results, edit the form and click “calculate repayments” again.</p>
            <div class="bg-slate-950 mt-6 border-t-4 border-bgLime rounded-xl">
              <div class="p-8">
                <p class="text-slate300">Your monthly repayment</p>
                <h1 class="text-bgLime text-5xl font-medium mt-4">€${formatNumberWithCommas(
                  monthlyPayment.toFixed(2)
                )}</h1>
                <hr class="my-9 border-slate700"/>
                <p class="text-slate300">Total you'll repay over the term</p>
                <h3 class="text-Slate100 mt-3 font-bold">€${formatNumberWithCommas(
                  totalRepayment.toFixed(2)
                )}</h3>
              </div>
            </div>
      `;
  console.log(monthlyPayment.toFixed(2));
}

clearAll.addEventListener("click", clear);
getForm.addEventListener("submit", inputValidation);

const form = document.querySelector(".l-form");

const dayInput = document.querySelector(".m-input-box__input--day");
const monthInput = document.querySelector(".m-input-box__input--month");
const yearInput = document.querySelector(".m-input-box__input--year");

const dayInputBox = document.querySelector(".m-input-box--day");
const monthInputBox = document.querySelector(".m-input-box--month");
const yearInputBox = document.querySelector(".m-input-box--year");

const dayInputErr = document.querySelector(".m-error__message--day");
const monthInputErr = document.querySelector(".m-error__message--month");
const yearInputErr = document.querySelector(".m-error__message--year");

const resultDays = document.querySelector(".l-results__mark--days");
const resultMonths = document.querySelector(".l-results__mark--months");
const resultYears = document.querySelector(".l-results__mark--years");

let isValid;

const inputMask = (input, length) => {
  let value = input.value;
  value = value.replace(/\D/g, "");
  value = value.slice(0, length);
  input.value = value;
};

dayInput.addEventListener("input", () => inputMask(dayInput, 2));
monthInput.addEventListener("input", () => inputMask(monthInput, 2));
yearInput.addEventListener("input", () => inputMask(yearInput, 4));

const getCurrentDate = async () => {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const response = await fetch(
    `https://worldtimeapi.org/api/timezone/${timezone}`
  );

  const data = await response.json();

  const date = new Date(data.utc_datetime);

  return date;
};

const checkDay = (day, month, year) => {
  if (day === "") {
    dayInputBox.classList.add("m-error");
    dayInputErr.textContent = "This field is required";
    isValid = false;
    return;
  }

  if (parseInt(day) > 31 || parseInt(day) <= 0 || day.length !== 2) {
    dayInputBox.classList.add("m-error");
    dayInputErr.textContent = "Must be a valid day";
    isValid = false;
    return;
  }

  const userDate = new Date(`${year}-${month}-${day}`);

  if (
    userDate.getMonth() + 1 !== parseInt(month) &&
    month.length === 2 &&
    year.length === 4
  ) {
    dayInputBox.classList.add("m-error");
    dayInputErr.textContent = "Must be a valid day";
    isValid = false;
    return;
  }

  isValid = true;
};

const checkMonth = (month) => {
  if (month === "") {
    monthInputBox.classList.add("m-error");
    monthInputErr.textContent = "This field is required";
    isValid = false;
    return;
  }

  if (parseInt(month) > 12 || parseInt(month) <= 0 || month.length !== 2) {
    monthInputBox.classList.add("m-error");
    monthInputErr.textContent = "Must be a valid month";
    isValid = false;
    return;
  }

  isValid = true;
};

const checkYear = async (year) => {
  if (year === "") {
    yearInputBox.classList.add("m-error");
    yearInputErr.textContent = "This field is required";
    isValid = false;
    return;
  }

  const maxYear = (await getCurrentDate()).getFullYear();

  if (year > maxYear || parseInt(year) <= 0 || year.length !== 4) {
    yearInputBox.classList.add("m-error");
    yearInputErr.textContent = "Must be a valid year";
    isValid = false;
    return;
  }

  isValid = true;
};

const results = (day, month, year) => {
  const userDate = new Date(`${year}-${month}-${day}`);
  const now = new Date();

  const difference = now.getTime() - userDate.getTime();
  const ageDate = new Date(difference);
  const ageDay = ageDate.getUTCDate() - 1;
  const ageMonth = ageDate.getUTCMonth();
  const ageYear = ageDate.getUTCFullYear() - 1970;

  resultDays.textContent = ageDay;
  resultMonths.textContent = ageMonth;
  resultYears.textContent = ageYear;
};

const removeErrors = () => {
  const inputBoxes = [...document.querySelectorAll(".m-input-box")];
  const errorMessages = [...document.querySelectorAll(".m-error__message")];
  inputBoxes.forEach((inputBox) => {
    inputBox.classList.remove("m-error");
  });
  errorMessages.forEach((errorMessage) => {
    errorMessage.textContent = "";
  });
};

const validateInputs = async () => {
  const day = dayInput.value.trim();
  const month = monthInput.value.trim();
  const year = yearInput.value.trim();

  checkDay(day, month, year);
  checkMonth(month);
  await checkYear(year);

  if (isValid) {
    console.log("Obtendo resultados");
    results(day, month, year);
  } else {
    resultDays.textContent = "--";
    resultMonths.textContent = "--";
    resultYears.textContent = "--";
  }
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  removeErrors();
  validateInputs();
});

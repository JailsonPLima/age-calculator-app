const form = document.querySelector(".l-form");

const dayInput = document.querySelector(".m-input-box__input--day");
const monthInput = document.querySelector(".m-input-box__input--month");
const yearInput = document.querySelector(".m-input-box__input--year");

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
    console.log("This field is required: day");
    return false;
  }

  if (parseInt(day) > 31 || parseInt(day) <= 0 || day.length !== 2) {
    console.log("Must be a valid day");
    return false;
  }

  const userDate = new Date(`${year}-${month}-${day}`);

  if (userDate.getMonth() + 1 !== parseInt(month)) {
    console.log("Must be a valid day");
    return false;
  }

  return true;
};

const checkMonth = (month) => {
  if (month === "") {
    console.log("This field is required: month");
    return false;
  }

  if (parseInt(month) > 12 || parseInt(month) <= 0 || month.length !== 2) {
    console.log("Must be a valid month");
    return false;
  }

  return true;
};

const checkYear = async (year) => {
  if (year === "") {
    console.log("This field is required: year");
    return false;
  }

  const maxYear = (await getCurrentDate()).getFullYear();

  if (year > maxYear || parseInt(year) <= 0 || year.length !== 4) {
    console.log("Must be a valid year");
    return false;
  }

  return true;
};

const validateInputs = async () => {
  const day = dayInput.value.trim();
  const month = monthInput.value.trim();
  const year = yearInput.value.trim();

  if (
    checkDay(day, month, year) &&
    checkMonth(month) &&
    (await checkYear(year))
  ) {
    console.log("Obtendo resultados");
  }
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  validateInputs();
});

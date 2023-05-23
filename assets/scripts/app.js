const getCurrentDate = async () => {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const response = await fetch(
    `https://worldtimeapi.org/api/timezone/${timezone}`
  );

  const data = await response.json();

  const date = new Date(data.utc_datetime);

  return date;
};

console.log(getCurrentDate());

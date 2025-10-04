function getRandomDateFromAprilToSeptemberLast3Years() {
  const currentYear = new Date().getFullYear();
  const years = [currentYear - 2, currentYear - 1, currentYear];

  // Random year from the last 3 years
  const randomYear = years[Math.floor(Math.random() * years.length)];

  // Random month between April (3) and September (8)
  const randomMonth = Math.floor(Math.random() * 6) + 3; // 3-8 (April-September)

  // Random day based on the month
  const daysInMonth = new Date(randomYear, randomMonth + 1, 0).getDate();
  const randomDay = Math.floor(Math.random() * daysInMonth) + 1;

  return new Date(randomYear, randomMonth, randomDay);
}

export default getRandomDateFromAprilToSeptemberLast3Years;


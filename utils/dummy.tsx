export function generateDummyData(
  startDate: any,
  endDate: any,
  minPrice: number = 100,
  maxPrice: number = 150
) {
  const dummyData = [];

  // Parse the start and end dates
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Loop through each day and create an object
  for (
    let date = new Date(start);
    date <= end;
    date.setDate(date.getDate() + 1)
  ) {
    const randomPetrolPrice =
      Math.floor(Math.random() * (maxPrice - minPrice + 1)) + minPrice;
    dummyData.push({
      date: `${date.toLocaleDateString('en-US', {
        weekday: 'short',
      })} ${date.getDate()}`,
      'Petrol Price': randomPetrolPrice,
    });
  }

  return dummyData;
}

export function generateLinearData(
  startDate: any,
  endDate: any,
  initialPrice: number = 100,
  priceIncrement: number = 5
) {
  const linearData = [];

  // Parse the start and end dates
  const start = new Date(startDate);
  const end = new Date(endDate);

  let currentPrice = initialPrice;

  // Loop through each day and create an object
  for (
    let date = new Date(start);
    date <= end;
    date.setDate(date.getDate() + 1)
  ) {
    linearData.push({
      date: `${date.toLocaleDateString('en-US', {
        weekday: 'short',
      })} ${date.getDate()}`,
      'Petrol Price': currentPrice,
    });

    currentPrice += priceIncrement;
  }

  return linearData;
}

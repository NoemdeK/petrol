const data = [
  { region: 'NORTH CENTRAL', lpg: 290, period: '3-Jan-20' },
  { region: 'NORTH CENTRAL', lpg: 400, period: '3-Jan-20' },
  { region: 'SOUTH SOUTH', lpg: 300, period: '3-Jan-20' },
  { region: 'SOUTH WEST', lpg: 290, period: '3-Jan-20' },
  { region: 'SOUTH WEST', lpg: 300, period: '3-Jan-20' },
  { region: 'NORTH CENTRAL', lpg: 295, period: '3-Jan-20' },
  { region: 'NORTH CENTRAL', lpg: 335, period: '3-Jan-20' },
  { region: 'SOUTH SOUTH', lpg: 290, period: '7-Jan-20' },
  { region: 'SOUTH SOUTH', lpg: 400, period: '7-Jan-20' },
  { region: 'SOUTH WEST', lpg: 300, period: '7-Jan-20' },
];

// Create an object to store sums and counts for each period
const periodData: any = {};

// Loop through the data array to calculate sums and counts for each period
data.forEach((item) => {
  const { region, lpg, period } = item;

  if (!periodData[period]) {
    // Initialize sums and counts for the period
    periodData[period] = { sum: 0, count: 0, averages: [] };
  }

  // Add lpg value to the sum
  periodData[period].sum += lpg;
  // Increment the count
  periodData[period].count += 1;

  // Store the region and lpg for later calculation of averages
  periodData[period].averages.push({ region, lpg });
});

// Calculate averages for each period
const result = Object.entries(periodData).map(
  ([period, { sum, count, averages }]) => {
    const average = sum / count;
    return { period, average, regions: averages };
  }
);

console.log(result);

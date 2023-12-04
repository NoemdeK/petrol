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

// export function generateDummyDataX(startDate: any, endDate: any) {
//   const dummyData = [];

//   // Parse the start and end dates
//   const start = new Date(startDate);
//   const end = new Date(endDate);

//   // Loop through each day and create an object
//   for (
//     let date = new Date(start);
//     date <= end;
//     date.setDate(date.getDate() + 1)
//   ) {
//     // const randomPetrolPrice =
//     //   Math.floor(Math.random() * (maxPrice - minPrice + 1)) + minPrice;
//     dummyData.push({
//       period: `${date.toLocaleDateString('en-US', {
//         weekday: 'short',
//       })} ${date.getDate()}`,
//       average: '0',
//     });
//   }

//   return dummyData;
// }

export function generateDummyDataX(startDate: any, endDate: any) {
  const dummyData = [];

  // Parse the start and end dates
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Array of month names for formatting
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  // Loop through each day and create an object
  for (
    let date = new Date(start);
    date <= end;
    date.setDate(date.getDate() + 1)
  ) {
    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear().toString().slice(-2);

    dummyData.push({
      date: `${day}-${month}-${year}`,
      average: '0',
    });
  }

  return dummyData;
}

// // Function to generate an array of periods for the last five years until today
// const generatePeriods = (): string[] => {
//   const currentDate = new Date();
//   const currentYear = currentDate.getFullYear();
//   const periods: string[] = [];

//   for (let year = currentYear - 4; year <= currentYear; year++) {
//     for (let month = 1; month <= 12; month++) {
//       const formattedMonth = month < 10 ? `0${month}` : `${month}`;
//       const period = `${formattedMonth}-Dec-${year}`;
//       periods.push(period);
//     }
//   }

//   return periods;
// };

// Your existing data array
const data = [
  { period: '4-Dec-20', average: '315.96' },
  { period: '8-Dec-20', average: '315.96' },
  { period: '11-Dec-20', average: '316.21' },
  { period: '15-Dec-20', average: '325.58' },
];

// Function to fill in missing periods with average '0'
export const fillMissingPeriods = (
  existingData: any[],
  startDate: any,
  endDate: any,
  regions: string[]
): any[] => {
  // const periodsSet = new Set(existingData.map((item) => item.period));

  const allPeriods = generateDummyDataX(startDate, endDate);

  const filledData: any = [];

  let currentNorthEast: any = '0'; // Initial value
  let currentNorthWest: any = '0';
  let currentNorthCentral: any = '0';
  let currentSouthWest: any = '0';
  let currentSouthEast: any = '0';
  let currentSouthSouth: any = '0';

  let tamp: any = {};
  allPeriods.forEach((date) => {
    const existingItem = existingData.find((item) => item.date === date.date);

    const north_east = regions?.includes('NORTH EAST');
    if (north_east) {
      tamp['NORTH EAST'] = currentNorthEast;
    }
    if (existingItem) {
      if (north_east) {
        currentNorthEast = existingItem['NORTH EAST'];
        tamp['NORTH EAST'] = currentNorthEast;
      }
    }

    const north_west = regions?.includes('NORTH WEST');
    if (north_west) {
      tamp['NORTH WEST'] = currentNorthWest;
    }
    if (existingItem) {
      if (north_west) {
        currentNorthWest = existingItem['NORTH WEST'];
        tamp['NORTH WEST'] = currentNorthWest;
      }
    }

    const north_central = regions?.includes('NORTH CENTRAL');
    if (north_central) {
      tamp['NORTH CENTRAL'] = currentNorthCentral;
    }
    if (existingItem) {
      if (north_central) {
        currentNorthCentral = existingItem['NORTH CENTRAL'];
        tamp['NORTH CENTRAL'] = currentNorthCentral;
      }
    }
    const south_south = regions?.includes('SOUTH SOUTH');
    if (south_south) {
      tamp['SOUTH SOUTH'] = currentSouthSouth;
    }
    if (existingItem) {
      if (south_south) {
        currentSouthSouth = existingItem['SOUTH SOUTH'];
        tamp['SOUTH SOUTH'] = currentSouthSouth;
      }
    }

    const south_east = regions?.includes('SOUTH EAST');
    if (south_east) {
      tamp['SOUTH EAST'] = currentSouthEast;
    }
    if (existingItem) {
      if (south_east) {
        currentSouthEast = existingItem['SOUTH EAST'];
        tamp['SOUTH EAST'] = currentSouthEast;
      }
    }

    const south_west = regions?.includes('SOUTH WEST');
    if (south_west) {
      tamp['SOUTH WEST'] = currentSouthWest;
    }
    if (existingItem) {
      if (south_west) {
        currentSouthWest = existingItem['SOUTH WEST'];
        tamp['SOUTH WEST'] = currentSouthWest;
      }
    }
    filledData.push({
      date: date.date,
      ...tamp,
    });
  });

  return filledData;
};

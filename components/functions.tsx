export function filterDataByRegions(data: any, selectedRegion: string[]) {
  // Specify the region you want to filter by
  const targetRegions = selectedRegion;

  // Use the filter method to filter the array based on the specified region
  const filteredData = data.filter((item: any) =>
    targetRegions.includes(item.region)
  );

  return filteredData;
}

export const transformTipToChartData = (tip: any) => {
  // Initialize an object to store aggregated data
  const aggregatedData: any = {};

  // Loop through each region in the tip
  Object.keys(tip).forEach((region) => {
    // Loop through each entry in the region
    tip[region].forEach(
      ({
        period,
        average,
        regions,
      }: {
        period: any;
        average: any;
        regions: any;
      }) => {
        // Convert the period to a date format (you may need to customize this based on your actual needs)
        // const date = `Jan ${period.split('-')[0]}`;

        // Initialize the entry for the date if not exists
        if (!aggregatedData[period]) {
          aggregatedData[period] = {};
        }

        // Add or update the value for the region on that period
        aggregatedData[period][region] = parseFloat(average);
      }
    );
  });

  // Convert the aggregated data to the final format
  const chartData2 = Object.entries(aggregatedData).map(([date, values]) => ({
    date,
    ...(values as { [key: string]: number }),
  }));

  return chartData2;
};

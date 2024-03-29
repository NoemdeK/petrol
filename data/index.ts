const labels: string[] = [
  'Jan 2023',
  'Feb 2023',
  'Mar 2023',
  'Apr 2023',
  'May 2023',
  'June 2023',
];

export const regionalOptions = [
  { label: 'National', value: 'National' },
  { label: 'South East', value: 'South East' },
  { label: 'South West', value: 'South West' },
  { label: 'South South', value: 'South South' },
  { label: 'North Central', value: 'North Central' },
  { label: 'North East', value: 'North East' },
  { label: 'North West', value: 'North West' },
];

export const six_months_data = {
  labels,
  datasets: [
    {
      label: 'South East',
      data: [100, 122, 31, 404, 1, 295],
      borderColor: 'red',
      backgroundColor: 'red',
    },
    {
      label: 'South West',
      data: [100, 2, 203, 34, 500, 200],
      borderColor: 'orange',
      backgroundColor: 'orange',
    },
    {
      label: 'South South',
      data: [100, 200, 12, 3, 400, 50],
      borderColor: 'yellow',
      backgroundColor: 'yellow',
    },
    {
      label: 'North Central',
      data: [10, 12, 303, 1124, 225, 230],
      borderColor: 'green',
      backgroundColor: 'green',
    },
    {
      label: 'North East',
      data: [12, 223, 43, 44, 235, 20],
      borderColor: 'rgba(0, 0, 0, 0.2)', // Set a semi-transparent color for the line
      backgroundColor: 'rgba(0, 0, 0, 0.1)', // Set a semi-transparent color for the area under the line

      borderWidth: 2, // Set the width of the line
      pointRadius: 0, // Set the radius of the points on the line
      pointHoverRadius: 0, // Set the radius of the points on hover
    },
    {
      label: 'North West',
      data: [112, 231, 233, 34, 12, 32],
      borderColor: 'purple',
      backgroundColor: 'purple',
    },
  ],
};

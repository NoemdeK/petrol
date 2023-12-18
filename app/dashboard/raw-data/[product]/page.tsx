import React from 'react'


async function getAnalytics (params: string) {
    const product = params
    try {
      const regions = [
        'NORTH EAST',
        'NORTH WEST',
        'SOUTH SOUTH',
        'SOUTH WEST',
        'SOUTH EAST',
        'NORTH CENTRAL',
      ];

      const url = 'https://petrodata.zainnovations.com/api/v1/petro-data/analysis';
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // headers.append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTc4N2QzMTI1NWIxYTA1ZGZhZDQ4MTIiLCJyb2xlIjoicnd4X3VzZXIiLCJpYXQiOjE3MDIzOTUyMDF9.iZXOHmjSEBIG-kBJscRKMCd9WpZZEdRXGzN7_yDxTIg');

      const requestOptions = {
        method: 'POST',
        headers,
        body: JSON.stringify({
          product,
          regions,
        }),
      };

      const response = await fetch(`${url}?period=MAX`, requestOptions);
      // console.log(response.json()), "repso"
      const result = await response.json();

      return result.data;
      
      
    } catch (error: any) {
      console.error('Error:', error.message);
    }
  }
  

const Productpage = async ({params}: any) => {
    const data = await getAnalytics(params.product) 
    console.log(params)

    // console.log(data);
  return (
    <div>Productpage</div>
  )
}

export default Productpage
"use client"
import React, { Component } from 'react';
//@ts-ignore
import CanvasJSReact from '@canvasjs/react-charts';
//var CanvasJSReact = require('@canvasjs/react-charts');
 
;

const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Canvas = () => {
  const options = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "dark2", // "light1", "dark1", "dark2"
    title: {
      text: "PMS Expenses"
    },
    data: [{
      type: "pie",
      indexLabel: "{label}: {y}%",
      startAngle: -90,
      dataPoints: [
        { y: 20, label: "Oil" },
        { y: 24, label: "Petroleum Gas" },
        { y: 20, label: "Kerosene" },
        { y: 14, label: "Diesel" },
        { y: 12, label: "ICE Brent" },
        { y: 10, label: "Aviation Fuel" }
      ]
    }]
  };

  return (
    <div>
      <CanvasJSChart options={options} />
    </div>
  );
};

export default Canvas;

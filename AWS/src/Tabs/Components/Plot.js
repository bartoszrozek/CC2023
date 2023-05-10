import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

function LineChart({ data }) {
  const canvasRef = useRef(null);
  let chartRef = useRef(null);

  useEffect(() => {
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: "Grid Line Settings",
        },
      },
      scales: {
        x: {
          border: {
            display: true,
            color: "rgba(204, 204, 204, 0.2)",
            dash: [8, 4],
          },
          grid: {
            display: true,
            color: "rgba(204, 204, 204, 0.2)",
            drawTicks: false,
          },
        },
        y: {
          border: {
            display: true,
            color: "rgba(204, 204, 204, 0.2)",
            dash: [8, 4],
          },
          grid: {
            display: true,
            color: "rgba(204, 204, 204, 0.2)",
            drawTicks: false,
          },

          beginAtZero: true,
        },
      },
    };

    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      // Get the device pixel ratio, falling back to 1 if unavailable
      const dpr = window.devicePixelRatio || 1;

      // Set canvas dimensions to scaled values
      canvasRef.current.width = canvasRef.current.offsetWidth * dpr;
      canvasRef.current.height = canvasRef.current.offsetHeight * dpr;

      ctx.scale(dpr, dpr);

      chartRef.current = new Chart(canvasRef.current, {
        type: "line",
        data: data,
        options: options,
      });
    }
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [data]);

  return (
    <canvas
      id="myChart"
      style={{ width: "90%", height: "400px" }}
      ref={canvasRef}
    />
  );
}

export default LineChart;

import React, { useEffect, useRef } from "react";
import echarts from "echarts";

function LineChart({ data }) {
  const chartRef = useRef(null);

  useEffect(() => {
    const myChart = echarts.init(chartRef.current);

    const option = {
      xAxis: {
        type: "category",
        data: data.xValues,
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: data.yValues,
          type: "line",
        },
      ],
    };

    myChart.setOption(option);

    return () => {
      myChart.dispose();
    };
  }, [data]);

  return <div ref={chartRef} style={{ width: "100%", height: "400px" }} />;
}

export default LineChart;

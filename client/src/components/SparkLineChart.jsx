import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
} from 'chart.js';
import { useRef, useEffect } from 'react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler
);

const SparkLineChart = ({duLieu}) => {
  const chartRef = useRef(null);
  const data = {
    labels: duLieu?.labels,
    datasets: [
      {
        data: duLieu?.datas,
        borderColor: duLieu.percent >= 0 ? 'green' : 'red', // Color of the line
        fill: true, // Enable the fill under the line
        tension: 0, // Smooth the line
        pointRadius: 0, // Remove the dots on the line
      },
    ],
  };

  const options = {
    maintainAspectRatio: false, // Don't maintain the aspect ratio
    scales: {
      x: {
        display: false, // Hide the X-axis
      },
      y: {
        display: false, // Hide the Y-axis
      },
    },
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
      tooltip: {
        enabled: true, // Enable tooltips
        intersect: false, // Show tooltip even when not intersecting a data point
        callbacks: {
          label: (context) => {
            return `${context.parsed.y} ${duLieu.unit}`;
          },
        },
      },
    },
    interaction: {
      mode: 'nearest', // Trigger tooltip based on the nearest data point
      axis: 'x', // Interact with the X-axis
      intersect: false, // Ensure the tooltip shows even if not directly over a data point
    },
    elements: {
      line: {
        borderWidth: 2,
      },
    },
  };

  useEffect(() => {
    if (chartRef.current) {
      const chart = chartRef.current;
      const gradient = chart.ctx.createLinearGradient(0, 0, 0, chart.height);
      // green color gradient
      gradient.addColorStop(0, duLieu.percent >= 0 ? 'rgba(0, 255, 0, 0.5)' : 'rgba(255, 0, 0, 0.5)'); // Start color
      gradient.addColorStop(1, duLieu.percent >= 0 ? 'rgba(0, 255, 0, 0)' : 'rgba(255, 0, 0, 0)'); // End color

      chart.data.datasets[0].backgroundColor = gradient;
      chart.update();
    }
  }, [duLieu.datas]);

  return <Line ref={chartRef} data={data} options={options} />
};

export default SparkLineChart;

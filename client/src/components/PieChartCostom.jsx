import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

export default function PieChartCostom() {
  return (
    <PieChart
      slotProps={
        {
          legend: {
            hidden: true,
          },
        }
      }
      series={[
        {
          data: [
            { id: 0, value: 10, label: 'series A' },
            { id: 1, value: 15, label: 'series B' },
            { id: 2, value: 20, label: 'series C' },
            { id: 3, value: 25, label: 'series D' },
            { id: 4, value: 30, label: 'series E' },
          ],
          innerRadius: 70,
          outerRadius: 100,
          paddingAngle: 1,
          cornerRadius: 2,
          highlightScope: { fade: 'global', highlight: 'item' },
          faded: { innerRadius: 70, additionalRadius: -5, color: 'gray' },
        },
      ]}
    />
  );
}

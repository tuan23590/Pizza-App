import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

export default function BarChartCustom() {
  return (
    <BarChart
      xAxis={[
        {
          scaleType: "band",
          data: [
            "Sản phẩm A",
            "Sản phẩm B",
            "Sản phẩm C",
            "Sản phẩm D",
            "Sản phẩm E",
            "Sản phẩm F",
            "Sản phẩm G",
            "Sản phẩm H",
            "Sản phẩm I",
            "Sản phẩm J",
          ],
        },
      ]}
      series={[
        { 
          data: [4, 3, 5, 2, 4, 3, 5, 2, 4, 3], 
          label: "Đơn hàng",
          color: "url(#gradientColor)"  // Tham chiếu đến gradient SVG
        },
      ]}
      grid={{ horizontal: true }}
    >
      <svg>
        <defs>
          <linearGradient id="gradientColor" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#01579b", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "#039be5", stopOpacity: 1 }} />
          </linearGradient>
        </defs>
      </svg>
    </BarChart>
  );
}

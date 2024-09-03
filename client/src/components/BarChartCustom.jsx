import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

export default function BarChartCustom({ duLieuThongKe,loaiThongKe }) {
  console.log("[duLieuThongKe]: ", duLieuThongKe);
  return (
    <BarChart
      xAxis={[
        {
          scaleType: "band",
          data: duLieuThongKe.labels || [],
          reverse: true,
        },
      ]}
      series={[
        { 
          data: duLieuThongKe.datas || [], 
          label: loaiThongKe === 1 ? "Giá trị bán ra" : "Số lượng bán ra",
          color: "url(#gradientColor1)"  // Tham chiếu đến gradient đầu tiên
        },
        { 
          data: duLieuThongKe.oldDatas || [], 
          label: loaiThongKe === 1 ? "Giá trị nhập vào" : "Số lượng nhập vào",
          color: "url(#gradientColor2)"  // Tham chiếu đến gradient thứ hai
        },
      ]}
      grid={{ horizontal: true }}
    >
      <svg>
        <defs>
          <linearGradient id="gradientColor1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#01579b", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "#039be5", stopOpacity: 1 }} />
          </linearGradient>
          <linearGradient id="gradientColor2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#f57c00", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "#ffb74d", stopOpacity: 1 }} />
          </linearGradient>
        </defs>
      </svg>
    </BarChart>
  );
}

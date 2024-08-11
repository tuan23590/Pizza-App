import React, { createContext, useEffect, useState } from 'react'


export const GioHangContext = createContext()

export default function GioHangProvider({ children }) {
    const [gioHang, setGioHang] = useState(() => {
        return JSON.parse(localStorage.getItem('gioHang')) || []
      });
      useEffect(() => {
        localStorage.setItem('gioHang', JSON.stringify(gioHang));
      }, [gioHang]);
    return (
        <GioHangContext.Provider value={{ gioHang, setGioHang }}>
            {children}
        </GioHangContext.Provider>
    )
}

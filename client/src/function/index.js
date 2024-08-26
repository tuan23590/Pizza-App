export const FOMATDATE = (date) => {
    const d = new Date(parseFloat(date));

    const hours = d.getHours().toString().padStart(2, '0');
    const minutes = d.getMinutes().toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0'); // Tháng trong JavaScript bắt đầu từ 0
    const year = d.getFullYear();

    return `${hours}:${minutes} ${day}/${month}/${year}`;
}
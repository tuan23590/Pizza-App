export const FOMATDATE = (date) => {
    const d = new Date(parseFloat(date));

    const hours = d.getHours().toString().padStart(2, '0');
    const minutes = d.getMinutes().toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0'); // Tháng trong JavaScript bắt đầu từ 0
    const year = d.getFullYear();

    return `${hours}:${minutes} ${day}/${month}/${year}`;
}

export const TIMEAGO = (timestamp) => {
    const now = Date.now();
    const diffInSeconds = Math.floor((now - timestamp) / 1000);

    const years = Math.floor(diffInSeconds / (60 * 60 * 24 * 365));
    if (years > 0) return `${years} năm trước`;

    const months = Math.floor(diffInSeconds / (60 * 60 * 24 * 30));
    if (months > 0) return `${months} tháng trước`;

    const weeks = Math.floor(diffInSeconds / (60 * 60 * 24 * 7));
    if (weeks > 0) return `${weeks} tuần trước`;

    const days = Math.floor(diffInSeconds / (60 * 60 * 24));
    if (days > 0) return `${days} ngày trước`;

    const hours = Math.floor(diffInSeconds / (60 * 60));
    if (hours > 0) return `${hours} giờ trước`;

    const minutes = Math.floor(diffInSeconds / 60);
    if (minutes > 0) return `${minutes} phút trước`;

    return "Đang hoạt động";
  };
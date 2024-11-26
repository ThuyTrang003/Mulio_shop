//từ 2024-10-28T00:00:00.000Z hoặc 2024-10-28 -> 28-10-2024
//2024-10-28T14:30:00.000Z -> 28-10-2024 14:30:00
export function dateFormatter(dateString) {
    if (!dateString) return dateString;

    const [datePart, timePart] = dateString.split("T");
    const [year, month, day] = datePart.split("-");

    if (timePart) {
        const time = timePart.split(".")[0]; // Bỏ phần mili giây nếu có
        return `${day}-${month}-${year} ${time}`;
    }

    return `${day}-${month}-${year}`;
}

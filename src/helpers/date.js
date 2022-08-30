function formatStartAndEndDate(start, end) {
    const startDate = new Date(start);
    const endDate = new Date(end);

    let startDay = startDate.getDate();
    let endDay = endDate.getDate();

    if (startDay < 10) {
        startDay = '0' + startDay;
    }

    if (endDay < 10) {
        endDay = '0' + endDay;
    }

    let month = endDate.getMonth();
    const monthName = getMonthName(month);

    return `${startDay} - ${endDay} ${monthName}`;
}

function formatStartDate(start) {
    const startDate = new Date(start);

    let startDay = startDate.getDate();

    if (startDay < 10) {
        startDay = '0' + startDay;
    }

    let month = startDate.getMonth();
    const monthName = getMonthName(month);

    return `${startDay} ${monthName}`;
}

function formatDateToTime(dateTime) {
    const startDate = new Date(dateTime);
    let hours = startDate.getHours();

    if (hours < 10) {
        hours = '0' + hours;
    }

    let minutes = startDate.getMinutes();

    if (minutes < 10) {
        minutes = '0' + minutes;
    }

    return `${hours}:${minutes}`;
}

function getMonthName(month) {
    let monthName = '';

    switch(month) {
        case 0:
            monthName = 'січня';
            break;
        case 1:
            monthName = 'лютого';
            break;
        case 2:
            monthName = 'березня';
            break;
        case 3:
            monthName = 'квітня';
            break;
        case 4:
            monthName = 'травня';
            break;
        case 5:
            monthName = 'червня';
            break;
        case 6:
            monthName = 'липня';
            break;
        case 7:
            monthName = 'серпня';
            break;
        case 8:
            monthName = 'вересня';
            break;
        case 9:
            monthName = 'жовтня';
            break;
        case 10:
            monthName = 'листопада';
            break;
        case 11:
            monthName = 'грудня';
            break;
    }

    return monthName;
}

export {
    formatStartAndEndDate,
    formatStartDate,
    formatDateToTime
}
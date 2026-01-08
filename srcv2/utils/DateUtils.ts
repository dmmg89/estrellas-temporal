// utils/dateUtils.ts

const formatDate = (date: Date) =>
    new Intl.DateTimeFormat('es-MX', { day: '2-digit', month: '2-digit', year: '2-digit' }).format(date);

function getStartDateOfWeek(w: number, y: number) {
    const simple = new Date(y, 0, 1 + (w - 1) * 7);
    const dow = simple.getDay();
    const ISOweekStart = simple;
    if (dow <= 4)
        ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
    else
        ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
    return ISOweekStart;
}

export const getCurrentWeekNumber = (): number => {
    const d = new Date();
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
};

export const getQ = ( weekNumber: number , year: number ) => {
    const startDate = getStartDateOfWeek(weekNumber, year);
    return  Math.floor((startDate.getMonth() + 3) / 3);

}

export const generateLabelFromWeek = (weekNumber: number, year: number = new Date().getFullYear()) => {
    const startDate = getStartDateOfWeek(weekNumber, year);

    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);

    const quarter = getQ(weekNumber, year);

    return `Q${quarter} S${weekNumber} ${formatDate(startDate)} | ${formatDate(endDate)}`;
};
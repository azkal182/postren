import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function dateFormat(tanggal: any) {
    const date = new Date(tanggal);
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    // @ts-ignore
    const formattedDate = new Intl.DateTimeFormat('id-ID', options).format(date);
    return formattedDate;
}

export function calculateDaysFromNow(givenDate: string): number {
    // Convert the given date into a Date object
    const givenDateObj: Date = new Date(givenDate);

    // Current date
    const currentDate: Date = new Date();

    // Calculate the time difference in milliseconds between the two dates
    const timeDifference: number = currentDate.getTime() - givenDateObj.getTime();

    // Calculate the number of days from the time difference in milliseconds
    const numberOfDays: number = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    return numberOfDays;
}

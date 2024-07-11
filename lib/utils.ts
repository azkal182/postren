import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import _ from "lodash"
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

    return numberOfDays + 1;
}

export function calculateDays(from: string, to: string): number {
    // Convert the given date into a Date object
    const givenDateObj: Date = new Date(from);

    // Current date
    const currentDate: Date = new Date(to);

    // Calculate the time difference in milliseconds between the two dates
    const timeDifference: number = currentDate.getTime() - givenDateObj.getTime();

    // Calculate the number of days from the time difference in milliseconds
    const numberOfDays: number = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    return numberOfDays + 1;
}

export const getKeluhanGroup = (data: any) => {
    const keluhanGrouped = _.chain(data)
        .flatMap('keluhans')
        .groupBy('name')
        .map((value, key) => ({
            name: key,
            count: value.length,
        }))
        .value();

    // console.log({ keluhanGrouped });


    const keluhanCounts = _.reduce(
        keluhanGrouped,
        (result: any, value: any) => {
            result.count.push(value.count);
            result.categories.push(value.name);
            return result;
        },
        { count: [], categories: [] }
    );

    return keluhanCounts
}

export const getAsramaGroup = (data: any) => {
    const groupedByAsrama = _.groupBy(data, 'asramaId');

    // Menghitung jumlah kemunculan setiap asramaId
    const asramaCounts = _.reduce(
        groupedByAsrama,
        (result: any, value: any, key: any) => {
            result.count.push(value.length);
            result.categories.push(key);
            return result;
        },
        { count: [], categories: [] }
    );

    return asramaCounts
}

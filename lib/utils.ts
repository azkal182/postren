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

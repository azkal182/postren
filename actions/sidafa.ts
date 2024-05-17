"use server";
import axios, { AxiosRequestConfig, CancelToken, CancelTokenSource } from "axios";
import https from "https";
import cheerio from "cheerio";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

interface Result {
    balance?: string;
    transactions?: ITransactions[];
    totalAmount?: any;
}

interface ITransactions {
    number: string;
    type: string;
    description: string;
    amount: string;
    balance: string;
    teller: string;
    date: string;
}
let cook: any;
async function getCookie(): Promise<string | null> {
    const url = "https://yayasan.amtsilatipusat.com/";
    try {
        const agent = new https.Agent({
            rejectUnauthorized: false,
        });
        const response = await axios.get(url, {
            httpsAgent: agent,
        });

        const cookies = response.headers["set-cookie"];
        const phpSessId = extractPhpSessId(cookies);
        cook = phpSessId;

        return phpSessId;
    } catch (error: any) {
        console.error("Error:", error.message);
        return null;
    }
}

function extractPhpSessId(cookies: any) {
    if (cookies) {
        const phpSessIdCookie = cookies.find((cookie: any) =>
            cookie.includes("PHPSESSID")
        );
        if (phpSessIdCookie) {
            const matches = phpSessIdCookie.match(/PHPSESSID=([^;]+)/);
            if (matches) {
                return matches[1];
            }
        }
    }
    return null;
}

async function login(): Promise<void> {
    const cook = await getCookie();
    if (!cook) {
        return;
    }

    const url = "https://yayasan.amtsilatipusat.com/login/";
    const headers = {
        accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "accept-language":
            "en-ID,en;q=0.9,id-ID;q=0.8,id;q=0.7,en-GB;q=0.6,en-US;q=0.5",
        "cache-control": "max-age=0",
        "content-type": "application/x-www-form-urlencoded",
        "sec-ch-ua": '"Chromium";v="107", "Not=A?Brand";v="24"',
        "sec-ch-ua-mobile": "?1",
        "sec-ch-ua-platform": '"Android"',
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "same-origin",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
        Referer: "https://yayasan.amtsilatipusat.com/login/",
        "Referrer-Policy": "strict-origin-when-cross-origin",
        Cookie: "PHPSESSID=" + cook,
    };
    const data = "i0=kesehatan+putra&i1=kesehatanputra";

    try {
        await axios.post(url, data, {
            headers,
        });
    } catch (error) {
        console.error(error);
    }
}



async function getBalance(rek: string): Promise<Result> {
    await login();
    const url =
        "https://yayasan.amtsilatipusat.com/?x=YUdsemRHOXlhVjkwWVdKMWJtZGhiZz09";
    const headers = {
        accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "accept-language":
            "en-ID,en;q=0.9,id-ID;q=0.8,id;q=0.7,en-GB;q=0.6,en-US;q=0.5",
        "content-type": "application/x-www-form-urlencoded",
        "upgrade-insecure-requests": "1",
        cookie: "PHPSESSID=" + cook,
    };
    const data = `id=&i0=${rek}&cari=`;

    try {
        const response = await axios.post(url, data, {
            headers,
        });

        const $ = cheerio.load(response.data);
        const transactions: any = [];
        $("table.table-bordered tbody tr").each((index, element) => {
            const $columns = $(element).find("td");

            const transaction = {
                number: $($columns[0]).text(),
                type: $($columns[1]).text(),
                date: $($columns[2]).text(),
                teller: $($columns[3]).text(),
                description: $($columns[4]).text(),
                amount: $($columns[5]).text(),
                balance: $($columns[6]).text(),
            };

            transactions.push(transaction);
        });

        const lastTr = $(
            "body > div.container > table.table.table-bordered > tbody"
        )
            .find("tr")
            .last()
            .find("td")
            .last();

        const filter = transactions.filter(
            (data: any) => data.type === "Setor Tabungan Dari Transfer Bank"
        );

        let totalAmount = 0;

        filter.forEach((item: any) => {
            const amountWithoutCommas = parseFloat(
                item.amount.replace(/[^0-9.-]+/g, "")
            );
            totalAmount += amountWithoutCommas;
        });


        const result: Result = {
            balance: lastTr.html() || undefined,
            transactions: transactions.reverse(),
            totalAmount
        };


        return result;
    } catch (error) {
        console.error(error);
        return {};
    }
}

async function getBalance2(rek: string): Promise<Result> {
    const url =
        "https://yayasan.amtsilatipusat.com/?x=YUdsemRHOXlhVjkwWVdKMWJtZGhiZz09";
    const headers = {
        accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "accept-language":
            "en-ID,en;q=0.9,id-ID;q=0.8,id;q=0.7,en-GB;q=0.6,en-US;q=0.5",
        "content-type": "application/x-www-form-urlencoded",
        "upgrade-insecure-requests": "1",
        cookie: "PHPSESSID=f3s8fbdb0a95eu4j5q4df3sgtd",
    };
    const data = `id=&i0=${rek}&cari=`;

    try {
        const response = await axios.post(url, data, {
            headers,
        });

        console.log(response.data);

        const $ = cheerio.load(response.data);
        const transactions: any = [];
        $("table.table-bordered tbody tr").each((index, element) => {
            const $columns = $(element).find("td");

            const transaction = {
                number: $($columns[0]).text(),
                type: $($columns[1]).text(),
                date: $($columns[2]).text(),
                teller: $($columns[3]).text(),
                description: $($columns[4]).text(),
                amount: $($columns[5]).text(),
                balance: $($columns[6]).text(),
            };

            transactions.push(transaction);
        });

        const lastTr = $(
            "body > div.container > table.table.table-bordered > tbody"
        )
            .find("tr")
            .last()
            .find("td")
            .last();

        const result: Result = {
            balance: lastTr.html() || undefined,
            transactions: transactions.reverse(),
        };

        return result;
    } catch (error) {
        console.error(error);
        return {};
    }
}

type namesOption = {
    value: string;
    label: string;
    name: string;
    address: string;
};

let cancelTokenSource: CancelTokenSource | null = null;

async function searchUser(
    name: string,
): Promise<namesOption[]> {
    if (cancelTokenSource) {
        cancelTokenSource.cancel('Request dibatalkan karena ada request baru.');
    }

    cancelTokenSource = axios.CancelToken.source();
    const url = "https://yayasan.amtsilatipusat.com/get_rekening_tabungan.php";
    const term = name || "";

    const headers = {
        accept: "application/json, text/javascript, */*; q=0.01",
        "accept-language":
            "en-ID,en;q=0.9,id-ID;q=0.8,id;q=0.7,en-GB;q=0.6,en-US;q=0.5",
        "sec-ch-ua": '"Chromium";v="107", "Not=A?Brand";v="24"',
        "sec-ch-ua-mobile": "?1",
        "sec-ch-ua-platform": '"Android"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-requested-with": "XMLHttpRequest",
        cookie: "PHPSESSID=0v5nsdnrqj2a9c2ibvl9k6lb26",
        Referer:
            "https://yayasan.amtsilatipusat.com/?x=YUdsemRHOXlhVjkwWVdKMWJtZGhiZz09",
        "Referrer-Policy": "strict-origin-when-cross-origin",
    };

    try {
        const response = await axios.get(url, {
            headers,
            params: {
                term,
            },
            cancelToken: cancelTokenSource.token,
        });

        const list: namesOption[] = response.data.map((data: any) =>
            parseString(data.label)
        );
        //console.log({list})
        return list;
    } catch (error) {
        if (axios.isCancel(error)) {
            console.log('permintaan dibatalkan', error.message);

        }
        console.error(error);
        return [];
    }
}

function parseString(inputString: string): namesOption {
    let data: namesOption = {
        address: '',
        value: '',
        label: '',
        name: ''
    };
    const accountNumberPattern = /^([^,]+)/;
    const accountNumberMatch = inputString.match(accountNumberPattern);
    data.value = accountNumberMatch ? accountNumberMatch[1].trim() : "" as string;




    const namePattern = /<b>(.*?)<\/b>/;
    const nameMatch = inputString.match(namePattern);
    // data.label = nameMatch ? nameMatch[1] : "";

    const addressPattern = /, ([^<]+)/;
    const addressMatch = inputString.match(addressPattern);

    data.address = addressMatch ? addressMatch[1] : "";
    data.name = nameMatch ? nameMatch[1] : ""
    data.label = `${nameMatch ? nameMatch[1] : ""} ( ${addressMatch ? addressMatch[1] : ""} )`;

    return data;
}

//searchUser("dani").then(data => console.log(data));
//getBalance("2.1.1.A2100373890").then(data => console.log(data));
export { searchUser, getBalance, getBalance2 };

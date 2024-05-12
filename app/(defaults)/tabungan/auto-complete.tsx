'use client';
import { searchUser, getBalance } from '@/actions/sidafa';
import React, { useRef, useState } from 'react';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';

type TBalance = {
    balance?: string;
    totalAmount?: any;
    transactions?: TTransactions[];
};

type TTransactions = {
    amount: string;
    balance: string;
    date: string;
    description: string;
    number: string;
    teller: string;
    type: string;
};

type namesOption = {
    value: string;
    label: string;
    address: string;
};

export const AutoComplete = () => {
    const [controller, setController] = useState<AbortController | null>(null);
    const [balances, setBalances] = useState<TBalance | null>(null);
    const [selectedValue, setSelectedValue] = useState<namesOption | null>(null);
    const [loading, setLoading] = useState(false);
    const controllerRef = useRef<AbortController>();
    const namesOptions = (inputValue: string) =>
        new Promise<namesOption[]>((resolve) => {
            resolve(searchUser(inputValue));
        });

    const balance = async (accountNumner: string) => {
        setLoading(true);
        const balance = await getBalance(accountNumner);
        setBalances(balance);
        setLoading(false);
    };

    const formatNumber = (value: any) => {
        const amountWithoutCommas = parseFloat(value.replace(/[^0-9.-]+/g, ''));
        return amountWithoutCommas.toLocaleString('id-ID');
    };
    return (
        <div>
            <h1 className="text-center text-lg font-bold">CEK TABUNGAN</h1>
            <div className="panel custom-select mt-4">
                <label>Masukan Nama yang akan di cari :</label>
                {/* <Select defaultValue={options[0]} options={options} isSearchable={true} /> */}
                <AsyncSelect
                    onChange={(value) => {
                        setSelectedValue(value);
                        balance(value?.value as string);
                    }}
                    cacheOptions
                    defaultOptions
                    loadOptions={namesOptions}
                />
            </div>
            {balances && !loading && (
                <div className="panel mt-4">
                    <div className="grid grid-cols-4">
                        <div>Name</div>
                        <div className="col-span-3 font-bold">: {selectedValue?.label || ''}</div>
                        <div>Alamat</div>
                        <div className="col-span-3 font-bold">: {selectedValue?.address || ''}</div>
                        <div>Saldo</div>
                        <div className="col-span-3 font-bold">
                            : {/*@ts-ignore*/}
                            Rp. {balances?.balance ? formatNumber(balances?.balance) : 0}{' '}
                        </div>

                        <div>Jumlah</div>
                        <div className="col-span-3 font-bold">
                            : {/*@ts-ignore*/}
                            Rp. {balances?.totalAmount ? balances?.totalAmount.toLocaleString('id-ID') : 0}{' '}
                        </div>
                    </div>
                    <div className="table-responsive mb-5 mt-6">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>type</th>
                                    <th>description</th>
                                    <th>date</th>
                                    <th>amount</th>
                                    <th>saldo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {balances?.transactions?.slice(0, 21).map((item: TTransactions) => (
                                    <tr className={item.type === 'Penarikan Tabungan' ? 'border-success/20 bg-success/20 dark:border-success/10 dark:bg-success/10' : ''} key={item.number}>
                                        <td>{item.number}</td>
                                        <td>{item.type}</td>
                                        <td>{item.description}</td>
                                        <td>{item.date}</td>
                                        <td>{item.amount}</td>
                                        <td>{item.balance}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {loading && (
                <div className="mt-14 flex w-full items-center">
                    <div className="mx-auto">
                        <svg width="64" height="64" viewBox="0 0 135 135" xmlns="http://www.w3.org/2000/svg" fill="#4361ee">
                            <path d="M67.447 58c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10zm9.448 9.447c0 5.523 4.477 10 10 10 5.522 0 10-4.477 10-10s-4.478-10-10-10c-5.523 0-10 4.477-10 10zm-9.448 9.448c-5.523 0-10 4.477-10 10 0 5.522 4.477 10 10 10s10-4.478 10-10c0-5.523-4.477-10-10-10zM58 67.447c0-5.523-4.477-10-10-10s-10 4.477-10 10 4.477 10 10 10 10-4.477 10-10z">
                                <animateTransform attributeName="transform" type="rotate" from="0 67 67" to="-360 67 67" dur="2.5s" repeatCount="indefinite" />
                            </path>
                            <path d="M28.19 40.31c6.627 0 12-5.374 12-12 0-6.628-5.373-12-12-12-6.628 0-12 5.372-12 12 0 6.626 5.372 12 12 12zm30.72-19.825c4.686 4.687 12.284 4.687 16.97 0 4.686-4.686 4.686-12.284 0-16.97-4.686-4.687-12.284-4.687-16.97 0-4.687 4.686-4.687 12.284 0 16.97zm35.74 7.705c0 6.627 5.37 12 12 12 6.626 0 12-5.373 12-12 0-6.628-5.374-12-12-12-6.63 0-12 5.372-12 12zm19.822 30.72c-4.686 4.686-4.686 12.284 0 16.97 4.687 4.686 12.285 4.686 16.97 0 4.687-4.686 4.687-12.284 0-16.97-4.685-4.687-12.283-4.687-16.97 0zm-7.704 35.74c-6.627 0-12 5.37-12 12 0 6.626 5.373 12 12 12s12-5.374 12-12c0-6.63-5.373-12-12-12zm-30.72 19.822c-4.686-4.686-12.284-4.686-16.97 0-4.686 4.687-4.686 12.285 0 16.97 4.686 4.687 12.284 4.687 16.97 0 4.687-4.685 4.687-12.283 0-16.97zm-35.74-7.704c0-6.627-5.372-12-12-12-6.626 0-12 5.373-12 12s5.374 12 12 12c6.628 0 12-5.373 12-12zm-19.823-30.72c4.687-4.686 4.687-12.284 0-16.97-4.686-4.686-12.284-4.686-16.97 0-4.687 4.686-4.687 12.284 0 16.97 4.686 4.687 12.284 4.687 16.97 0z">
                                <animateTransform attributeName="transform" type="rotate" from="0 67 67" to="360 67 67" dur="8s" repeatCount="indefinite" />
                            </path>
                        </svg>
                    </div>
                </div>
            )}
        </div>
    );
};

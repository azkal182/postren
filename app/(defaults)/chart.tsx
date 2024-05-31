'use client';
import { IRootState } from '@/store';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';

const ChartComponent = () => {
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';
    const [isMounted, setIsMounted] = useState(false);
    const simpleColumnStacked: any = {
        series: [
            {
                name: 'SAKIT',
                data: [44, 55, 41, 67, 22, 43],
            },
        ],
        options: {
            chart: {
                height: 300,
                type: 'bar',
                stacked: true,
                zoom: {
                    enabled: false,
                },
                toolbar: {
                    show: false,
                },
            },
            colors: ['#2196f3', '#3b3f5c'],
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        legend: {
                            position: 'bottom',
                            offsetX: -10,
                            offsetY: 5,
                        },
                    },
                },
            ],
            plotOptions: {
                bar: {
                    horizontal: false,
                },
            },
            xaxis: {
                type: 'string',
                categories: ['Batuk', 'Demam', 'Gatal', 'Bisuk', 'Jahit', 'Pusing'],
                axisBorder: {
                    color: isDark ? '#191e3a' : '#e0e6ed',
                },
            },
            yaxis: {
                opposite: isRtl ? true : false,
                labels: {
                    offsetX: isRtl ? -20 : 0,
                },
            },
            grid: {
                borderColor: isDark ? '#191e3a' : '#e0e6ed',
            },
            legend: {
                position: 'right',
                offsetY: 40,
            },
            tooltip: {
                theme: isDark ? 'dark' : 'light',
            },
            fill: {
                opacity: 0.8,
            },
        },
    };

    const simpleColumnAsrama: any = {
        series: [
            {
                name: 'ASRAMA',
                data: [44, 55, 41, 67, 22, 43],
            },
        ],
        options: {
            chart: {
                height: 300,
                type: 'bar',
                stacked: true,
                zoom: {
                    enabled: false,
                },
                toolbar: {
                    show: false,
                },
            },
            colors: ['#2196f3', '#3b3f5c'],
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        legend: {
                            position: 'bottom',
                            offsetX: -10,
                            offsetY: 5,
                        },
                    },
                },
            ],
            plotOptions: {
                bar: {
                    horizontal: false,
                },
            },
            xaxis: {
                type: 'string',
                categories: [`Na'im`, `Illiyyin`, 'Musa', `Ma'wa`, 'Darussalam', 'Tasawuf'],
                axisBorder: {
                    color: isDark ? '#191e3a' : '#e0e6ed',
                },
            },
            yaxis: {
                opposite: isRtl ? true : false,
                labels: {
                    offsetX: isRtl ? -20 : 0,
                },
            },
            grid: {
                borderColor: isDark ? '#191e3a' : '#e0e6ed',
            },
            legend: {
                position: 'right',
                offsetY: 40,
            },
            tooltip: {
                theme: isDark ? 'dark' : 'light',
            },
            fill: {
                opacity: 0.8,
            },
        },
    };

    useEffect(() => {
        setIsMounted(true);
    }, []);
    return (
        <div className="panel">
            <h1 className="text-center font-semibold">Grafik sakit</h1>
            <div className="">
                {isMounted && (
                    <ReactApexChart series={simpleColumnStacked.series} options={simpleColumnStacked.options} className="overflow-hidden rounded-lg bg-white dark:bg-black" type="bar" height={300} />
                )}
            </div>
        </div>
    );
};

export default ChartComponent;
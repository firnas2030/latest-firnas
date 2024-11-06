'use client';
import dynamic from 'next/dynamic';
import React, { useEffect, useRef, useState } from 'react';
import '@/components/TicketForm/TicketStyle.css';
import '@/components/local/rtl.css';
import { useTranslation } from 'react-i18next';
import { dataref } from '@/utils/firebase';
import DashboardLayout from '@/components/DashboardLayout';
import MyBarChart from '@/components/MyBarChart';
import MyLineChart from '@/components/MyLineChart';
import MyPieChart from '@/components/MyPieChart';
import ExpandableTable from '@/components/ExpandableTable';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Loading from '@/components/Loading';

const MyHeatmap = dynamic(() => import('@/components/MyHeatMap'), {
    ssr: false,
});

const MadinahDashboard = ({ locale }) => {
    const router = useRouter();
    const [t] = useTranslation();
    const categoryRef = useRef([]);
    const [pieData, setPieData] = useState([]);
    const [lineData, setLineData] = useState([]);
    const [barData, setBarData] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const { currentUser, madinahTickets } = useAuth();
    const [data, setData] = useState([]);
    const [TransformedData, setTransformedData] = useState(null);

    if (!currentUser) {
        router.push('/');
    }

    const getData = async () => {
        dataref.ref(`Sheet3`).on('value', (snapshot) => {
            let responselist = snapshot.val();
            const flattenedArray = Object.entries(responselist).map(
                ([key, value]) => ({ ...value })
            );
            setData(flattenedArray);
        });
    };

    const getlineDataArray = () => {
        const counts = {};
        madinahTickets.forEach((item) => {
            const date = item.IncidentStartDate;
            if (counts[date]) {
                counts[date]++;
            } else {
                counts[date] = 1;
            }
        });
        const dateArray = Object.entries(counts).map(([date, count]) => ({
            date,
            count,
        }));
        setLineData(dateArray);
    };

    const getPieDataArray = () => {
        const counts = {};
        madinahTickets.forEach((item) => {
            const status = item.status.toUpperCase();
            if (counts[status]) {
                counts[status]++;
            } else {
                counts[status] = 1;
            }
        });
        const statusArray = Object.entries(counts).map(([status, count]) => ({
            status,
            count,
        }));
        setPieData(statusArray);
    };

    const getbarDataArray = () => {
        const counts = {};
        madinahTickets.forEach((item) => {
            const category = item.SplClassificationID;
            if (counts[category]) {
                counts[category]++;
            } else {
                counts[category] = 1;
            }
        });
        const categoryArray = Object.entries(counts).map(([category, count]) => ({
            category,
            count,
        }));
        setBarData(categoryArray);
    };

    function transformData(data) {
        const transformedData = {};
        let categories = categoryRef.current;
        data.forEach((item) => {
            const { LocationDirection, status, prediction } = item;
            if (!transformedData[LocationDirection]) {
                transformedData[LocationDirection] = {
                    TOTAL: 0,
                    statusData: {},
                };
                categories.forEach((cat) => {
                    transformedData[LocationDirection][cat] = 0;
                });
            }
            prediction.forEach((pred) => {
                transformedData[LocationDirection][pred]++;
                transformedData[LocationDirection].TOTAL++;
            });
            if (!transformedData[LocationDirection].statusData[status]) {
                transformedData[LocationDirection].statusData[status] = {
                    TOTAL: 0,
                };
                categories.forEach((cat) => {
                    transformedData[LocationDirection].statusData[status][cat] = 0;
                });
            }
            prediction.forEach((pred) => {
                transformedData[LocationDirection].statusData[status][pred]++;
                transformedData[LocationDirection].statusData[status].TOTAL++;
            });
        });
        setTransformedData(transformedData);
    }

    useEffect(() => {
        transformData(madinahTickets);
        getbarDataArray();
        getlineDataArray();
        getPieDataArray();
    }, [madinahTickets]);

    const dashboard = () => (
        <div className="grid grid-cols-4 gap-6 p-6">
            {/* Dashboard Header */}
            <div className="col-span-4 bg-white rounded-xl shadow-lg p-6 text-center flex items-center justify-around hover:shadow-2xl transition-shadow duration-300">
                <div>
                    <h1 className="text-green-600 text-5xl font-semibold">{madinahTickets?.length}</h1>
                    <p className="text-gray-600 text-lg">{t('count_of_rakam')}</p>
                </div>
            </div>
            
            {/* Row for Charts */}
            <div className="col-span-2 bg-white rounded-xl shadow-lg h-[300px] hover:shadow-2xl transition-shadow duration-300">
                <MyLineChart data={lineData} />
            </div>
            <div className="col-span-2 bg-white rounded-xl shadow-lg h-[300px] flex items-center justify-between hover:shadow-2xl transition-shadow duration-300">
                <div className="w-[60%]">
                    <MyPieChart data={pieData} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
                </div>
                <ul className="p-4 list-disc">
                    {pieData.map((item, i) => (
                        <li
                            key={`pie_${i}`}
                            className={`my-2 cursor-pointer ${i === activeIndex ? 'text-[#025F5F] font-bold' : 'text-gray-500'} hover:text-[#025F5F]'}`}
                            onClick={() => setActiveIndex(i)}
                        >
                            {item.status}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Bar Chart */}
            <div className="col-span-4 bg-white rounded-xl shadow-lg h-[350px] hover:shadow-2xl transition-shadow duration-300">
                <MyBarChart data={barData} />
            </div>

            {/* Table and Heatmap Row */}
            <div className="col-span-2 bg-white rounded-xl shadow-lg min-h-[400px] overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                <ExpandableTable categories={categoryRef.current} data={TransformedData} />
            </div>
            <div className="col-span-2 bg-white rounded-xl shadow-lg min-h-[400px] overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                <MyHeatmap data={madinahTickets} />
            </div>
        </div>
    );

    return (
        <>
            {currentUser ? (
                <div>
                    <DashboardLayout
                        dashboard={t('dashboard')}
                        map={t('map')}
                        display_data={t('display_data')}
                        contact_us={t('contact_us')}
                        locale={locale}
                    >
                        {dashboard()}
                    </DashboardLayout>
                </div>
            ) : (
                <Loading />
            )}
        </>
    );
};

export default MadinahDashboard;

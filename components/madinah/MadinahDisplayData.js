'use client';
import DashboardLayout from '@/components/DashboardLayout';
import DataTable from '@/components/DataTable/DataTable';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';
import { CSVLink } from 'react-csv';

const MadinahDisplayData = ({ locale }) => {
    const [data, setData] = useState([]);
    const [t] = useTranslation();
    const { madinahTickets } = useAuth();

    const headers = [
        { label: 'Ticket', key: '_id' },
        { label: 'FirstName', key: 'FirstName' },
        { label: 'Date', key: 'IncidentStartDate' },
        { label: 'LocationDirection', key: 'LocationDirection' },
        { label: 'SubClassificationID', key: 'SubClassificationID' },
        { label: 'Category', key: 'SplClassificationID' },
        { label: 'Longitude', key: 'Longitude' },
        { label: 'Latitude', key: 'Latitude' },
        { label: 'Status', key: 'status' },
        { label: 'ImgSource', key: 'ImgSource' },
    ];

    const getData = () => setData(madinahTickets);

    const downloadTxtFile = async () => {
        const textContent = data.map((ticket, index) => 
            `Ticket: ${ticket._id}, FirstName: ${ticket.FirstName}, Date: ${ticket.IncidentStartDate}, LocationDirection: ${ticket.LocationDirection}, SubClassificationID: ${ticket.SubClassificationID}, Category: ${ticket.SplClassificationID}, Longitude: ${ticket.Longitude}, Latitude: ${ticket.Latitude}, Status: ${ticket.status}, ImgSource: image_${index + 1}.txt`
        ).join('\n\n');

        const blob = new Blob([textContent], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'madinah_tickets.txt';
        link.click();
        URL.revokeObjectURL(link.href);

        for (let index = 0; index < data.length; index++) {
            const imageBlob = new Blob([data[index].IncidentImage || ''], { type: 'text/plain' });
            const imageLink = document.createElement('a');
            imageLink.href = URL.createObjectURL(imageBlob);
            imageLink.download = `image_${index + 1}.txt`;
            await new Promise(resolve => setTimeout(resolve, 100));
            imageLink.click();
            URL.revokeObjectURL(imageLink.href);
        }
    };

    const handleCsvDownload = () => data.map((ticket, index) => ({
        ...ticket,
        ImgSource: `image_${index + 1}.txt`,
    }));

    return (
        <DashboardLayout
            locale={locale}
            dashboard={t('dashboard')}
            map={t('map')}
            display_data={t('display_data')}
            contact_us={t('contact_us')}
        >
            <div className="container mx-auto py-8 px-6 bg-gradient-to-r from-teal-50 to-white shadow-lg rounded-lg">
                <div className="flex justify-center mb-6 space-x-4">
                    <button
                        className="bg-teal-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-teal-600 transition-all"
                        onClick={getData}
                    >
                        {t('display_data')}
                    </button>
                    <CSVLink
                        data={handleCsvDownload()}
                        headers={headers}
                        separator=";"
                        filename="madinah_tickets.csv"
                    >
                        <button className="bg-teal-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-teal-600 transition-all">
                            {t('download_excel')}
                        </button>
                    </CSVLink>
                    <button
                        className="bg-teal-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-teal-600 transition-all"
                        onClick={downloadTxtFile}
                    >
                        {t('Download Txt')}
                    </button>
                </div>
                {data.length > 0 ? (
                    <DataTable data={data} />
                ) : (
                    <p className="text-center text-gray-500">{t('no_data_available')}</p>
                )}
                <footer className="text-center mt-8 text-gray-500">
                    <p className="text-sm">
                        {t('firnas_aero')} © 2023
                    </p>
                </footer>
            </div>
        </DashboardLayout>
    );
};

export default MadinahDisplayData;

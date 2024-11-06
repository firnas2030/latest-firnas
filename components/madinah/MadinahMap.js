'use client';
import dynamic from 'next/dynamic';
import { useTranslation } from 'react-i18next';
const DashboardLayout = dynamic(() => import('@/components/DashboardLayout'), {
    ssr: false,
});
const IntMap = dynamic(() => import('@/components/intmap/intMap'), {
    ssr: false,
});

const MadinahMap = ({ locale }) => {
    const [t, i18n] = useTranslation();
    return (
        <DashboardLayout
            locale={locale}
            dashboard={t('dashboard')}
            map={t('map')}
            display_data={t('display_data')}
            contact_us={t('contact_us')}
        >
            <div className="container">
                <section className="mb-3">
                    <div>
                        <h2
                            className="fw-bold mb-2"
                            style={{
                                fontFamily: 'Raleway, sans-serif',
                                fontSize: 30,
                                color: '#327777',
                            }}
                        >
                            <strong>{t('interactive_map')}</strong>
                        </h2>
                    </div>
                </section>
                <IntMap alfirnas={false} />
            </div>
        </DashboardLayout>
    );
};
export default MadinahMap;

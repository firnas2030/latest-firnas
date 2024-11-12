import React from 'react';
import Header from '@/components/Header';
import Titel from '@/components/Title';
import TranslationsProvider from '@/components/TranslationsProvider';
import initTranslations from '@/app/i18n';
import Section1 from '@/components/usertype/Section1';
const i18nNamespaces = ['usertype'];
const UserType = async ({ params: { locale } }) => {
  const { t } = await initTranslations(locale, i18nNamespaces);

  return (
    <TranslationsProvider namespaces={i18nNamespaces} locale={locale}>
      <div className="bg-white" style={{ minHeight: 'calc(100vh)' }}>
        <Titel />
        <Header />
        <Section1
          mem_option={t('mem_option')}
          firnas_user={t('firnas_user')}
          med_user={t('User')}
          firnas_aero={t('firnas_aero')}
        />
      </div>
    </TranslationsProvider>
  );
};

export default UserType;

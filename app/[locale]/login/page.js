import Titel from '@/components/Title';
import Header from '@/components/Header';
import Section1 from '@/components/login/Section1';
import TranslationsProvider from '@/components/TranslationsProvider';
import initTranslations from '@/app/i18n';
const i18nNamespaces = ['login'];
const Login = async ({ params: { locale } }) => {
  const { t } = await initTranslations(locale, i18nNamespaces);
  return (
    <TranslationsProvider namespaces={i18nNamespaces} locale={locale}>
      <div className="bg-white" style={{ minHeight: 'calc(100vh)' }}>
        <Titel />
        <Header />
        <Section1
          locale={locale}
          login={t('login')}
          _email={t('email')}
          _password={t('password')}
          go_back={t('go_back')}
          firnas_aero={t('firnas_aero')}
        />
      </div>
    </TranslationsProvider>
  );
};

export default Login;

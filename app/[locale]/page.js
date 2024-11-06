import Dashboard from '@/components/Dashboard';
import PrivateRoute from '@/components/PrivateRoute';
import TranslationsProvider from '@/components/TranslationsProvider';
const i18nNamespaces = ['home'];
const Home = async ({ params: { locale } }) => {
  return (
    <TranslationsProvider namespaces={i18nNamespaces} locale={locale}>
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    </TranslationsProvider>
  );
};

export default Home;

import AlfirnasNewUser from '@/components/alfirnas/AlfirnasNewUser';
import TranslationsProvider from '@/components/TranslationsProvider';
const i18nNamespaces = ['users'];

const Users = async ({ params: { locale } }) => {
  return (
    <TranslationsProvider namespaces={i18nNamespaces} locale={locale}>
      <AlfirnasNewUser locale={locale} />
    </TranslationsProvider>
  );
};

export default Users;

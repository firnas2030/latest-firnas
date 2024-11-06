import AlfirnasUsers from '@/components/alfirnas/AlfirnasUsers'
import TranslationsProvider from '@/components/TranslationsProvider';
const i18nNamespaces = ['users'];

const Users = async ({ params: { locale } }) => {
  return (
    <TranslationsProvider namespaces={i18nNamespaces} locale={locale}>
      <AlfirnasUsers
        locale={locale}
      />
    </TranslationsProvider>
  )
}

export default Users
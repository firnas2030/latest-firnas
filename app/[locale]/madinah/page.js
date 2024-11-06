import MadinahDashboard from '@/components/madinah/MadinahDashboard'
import TranslationsProvider from '@/components/TranslationsProvider';
const i18nNamespaces = ['madinah'];

const Madinah = async ({ params: { locale } }) => {
  return (
    <TranslationsProvider namespaces={i18nNamespaces} locale={locale}>
      <MadinahDashboard
        locale={locale}
      />
    </TranslationsProvider>
  )
}

export default Madinah
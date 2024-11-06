import MadinahDisplayData from '@/components/madinah/MadinahDisplayData'
import TranslationsProvider from '@/components/TranslationsProvider';
const i18nNamespaces = ['displaydata'];

const DisplayData = ({ params: { locale } }) => {
  return (
    <TranslationsProvider namespaces={i18nNamespaces} locale={locale}>
      <MadinahDisplayData locale={locale} />
    </TranslationsProvider>
  )
}

export default DisplayData
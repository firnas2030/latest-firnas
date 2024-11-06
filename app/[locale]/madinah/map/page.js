import MadinahMap from '@/components/madinah/MadinahMap'
import TranslationsProvider from '@/components/TranslationsProvider';
const i18nNamespaces = ['map'];

const Map = ({ params: { locale } }) => {
  return (
    <TranslationsProvider namespaces={i18nNamespaces} locale={locale}>
      <MadinahMap locale={locale} />
    </TranslationsProvider>
  )
}

export default Map
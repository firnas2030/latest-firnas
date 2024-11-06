import MadinahContactUs from '@/components/madinah/MadinahContactUs'
import TranslationsProvider from '@/components/TranslationsProvider';
const i18nNamespaces = ['contactus'];

const ContactUs = ({ params: { locale } }) => {
  return (
    <TranslationsProvider namespaces={i18nNamespaces} locale={locale}>
      <MadinahContactUs locale={locale} />
    </TranslationsProvider>
  )
}

export default ContactUs
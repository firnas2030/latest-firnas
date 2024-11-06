import AlfirnasMessages from '@/components/alfirnas/AlfirnasMessages'
import TranslationsProvider from '@/components/TranslationsProvider';
const i18nNamespaces = ['messages'];

const Messages = async ({ params: { locale } }) => {
  return (
    <TranslationsProvider namespaces={i18nNamespaces} locale={locale}>
      <AlfirnasMessages
        locale={locale}
      />
    </TranslationsProvider>
  )
}

export default Messages
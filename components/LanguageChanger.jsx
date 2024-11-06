'use client';

import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import i18nConfig from '@/i18nConfig';

export default function LanguageChanger() {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  const router = useRouter();
  const currentPathname = usePathname();

  const handleChange = (e) => {
    const newLocale = e.target.value;

    // Set cookie for next-i18n-router
    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = '; expires=' + date.toUTCString();
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`;

    // Redirect to the new locale path
    if (
      currentLocale === i18nConfig.defaultLocale &&
      !i18nConfig.prefixDefault
    ) {
      router.push('/' + newLocale + currentPathname);
    } else {
      router.push(
        currentPathname.replace(`/${currentLocale}`, `/${newLocale}`)
      );
    }

    router.refresh();
  };

  return (
    <select
      onChange={handleChange}
      value={currentLocale}
      style={{
        padding: '10px 15px',
        fontSize: '16px',
        color: '#025F5F',
        backgroundColor: '#FFFFFF',
        borderRadius: '15px', // Rounded edges
        boxShadow: '0px 4px 15px rgba(0, 95, 95, 0.2)', // Soft shadow for glow effect
        border: '2px solid #0D9488 ', //#0D9488 025F5F
        outline: 'none',
        cursor: 'pointer',
        appearance: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 20 20'%3E%3Cpath fill='%23025F5F' d='M10 15l-6-6h12z'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'calc(100% - 1px) center', // Adjust arrow position
        backgroundSize: '15px 15px',
        transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
      }}
      onMouseOver={(e) => {
        e.target.style.boxShadow = '0px 4px 20px rgba(0, 95, 95, 0.4)';
        e.target.style.borderColor = '#03a9a0'; // Glow border on hover
      }}
      onMouseOut={(e) => {
        e.target.style.boxShadow = '0px 4px 15px rgba(0, 95, 95, 0.2)';
        e.target.style.borderColor = '#0D9488';
      }}
    >
      <option value="en">English</option>
      <option value="ar">Arabic</option>
    </select>
  );
}

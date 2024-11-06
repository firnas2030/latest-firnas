/* eslint-disable jsx-a11y/no-redundant-roles */
import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {
  Bars3Icon,
  HomeIcon,
  XMarkIcon,
  MapIcon,
  TableCellsIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { dir } from 'i18next';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import LanguageChanger from './LanguageChanger';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const DashboardLayout = ({
  dashboard,
  map,
  display_data,
  contact_us,
  locale,
  children,
  handleDirectionChange,
}) => {
  const prevData = useRef([]);
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigation = [
    {
      name: dashboard,
      icon: HomeIcon,
      href: dir(locale) === 'rtl' ? '/ar/madinah' : '/madinah',
      subLinks: [],
    },
    {
      name: map,
      icon: MapIcon,
      href: dir(locale) === 'rtl' ? '/ar/madinah/map' : '/madinah/map',
      subLinks: [],
    },
    {
      name: display_data,
      icon: TableCellsIcon,
      href:
        dir(locale) === 'rtl'
          ? '/ar/madinah/displaydata'
          : '/madinah/displaydata',
      subLinks: [],
    },
    {
      name: contact_us,
      icon: EnvelopeIcon,
      href:
        dir(locale) === 'rtl' ? '/ar/madinah/contactus' : '/madinah/contactus',
      subLinks: [],
    },
  ];
  const { logout, setMadinahTickets } = useAuth();

  const fetchPost = useCallback(async () => {
    try {
      const response = await fetch('/api/tickets');
      const data = await response.json();
      console.log('tickets', data.tickets);
      var newData;

      newData = data.tickets;

      if (JSON.stringify(prevData.current) !== JSON.stringify(newData)) {
        setMadinahTickets(newData);
        prevData.current = newData;
        console.log('Calld');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await fetchPost();
    };
    fetchData();

    const intervalId = setInterval(fetchData, 50000);

    return () => clearInterval(intervalId);
  }, [fetchPost]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };
  return (
    <>
        <div className="bg-white min-h-screen overflow-auto">
            {/* Header */}
            <div
                className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 py-3 shadow-lg"
                style={{
                    backgroundColor: '#0D9488', // Lighter green header color
                    boxShadow: '0 0 10px #0D9488, 0 0 20px #0D9488',
                }}
            >
                <div className="flex items-center space-x-4">
                    {/* Logo */}
                    <Link href="/" className="flex items-center">
                        <img
                            className="h-8 w-auto transition-transform transform hover:scale-110"
                            src={'/assets/images/logo.png'}
                            alt="Your Company"
                        />
                    </Link>

                    {/* Toggle for Mobile */}
                    <button
                        type="button"
                        className="text-white lg:hidden"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex space-x-6">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={classNames(
                                    item.href === pathname
                                        ? 'bg-[#00544D] text-white shadow-lg'
                                        : 'text-gray-200 hover:bg-[#00544D] hover:text-white',
                                    'flex items-center gap-x-2 px-3 py-2 rounded-md text-sm font-semibold'
                                )}
                                style={{
                                    boxShadow: item.href === pathname ? '0 0 6px rgba(255, 255, 255, 0.8)' : '',
                                    transition: 'box-shadow 0.2s ease-in-out',
                                }}
                            >
                                <item.icon className="h-5 w-5" aria-hidden="true" />
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Language and Logout */}
                <div className="flex items-center space-x-4">
                    <LanguageChanger />
                    <button
                        onClick={handleLogout}
                        className="text-gray-200 hover:text-white px-3 py-2 rounded-full font-medium"
                        style={{
                            backgroundColor: '#4aa6e8',
                            color: '#FFFFFF',
                            boxShadow: '0 0 10px #4aa6e8, 0 0 20px #4aa6e8',
                            transition: 'box-shadow 0.2s ease-in-out, background-color 0.2s ease-in-out',
                        }}
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* Mobile Sidebar */}
            <Transition.Root show={sidebarOpen} as={Fragment}>
                <Dialog as="div" className="relative z-40 lg:hidden" onClose={setSidebarOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <Transition.Child
                        as={Fragment}
                        enter="transition ease-in-out duration-300 transform"
                        enterFrom="-translate-x-full"
                        enterTo="translate-x-0"
                        leave="transition ease-in-out duration-300 transform"
                        leaveFrom="translate-x-0"
                        leaveTo="-translate-x-full"
                    >
                        <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-primary-teal py-5">
                            <div className="absolute top-0 right-0 -mr-12 pt-2">
                                <button
                                    type="button"
                                    className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                    onClick={() => setSidebarOpen(false)}
                                >
                                    <span className="sr-only">Close sidebar</span>
                                    <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                </button>
                            </div>
                            <nav className="mt-5 px-2 space-y-1">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={classNames(
                                            item.href === pathname
                                                ? 'bg-[#00544D] text-white'
                                                : 'text-gray-200 hover:bg-[#00544D] hover:text-white',
                                            'flex items-center gap-x-2 px-3 py-2 rounded-md text-base font-medium'
                                        )}
                                    >
                                        <item.icon className="h-5 w-5" aria-hidden="true" />
                                        {item.name}
                                    </Link>
                                ))}
                            </nav>
                        </Dialog.Panel>
                    </Transition.Child>
                </Dialog>
            </Transition.Root>

            {/* Main Content */}
            <main className="pt-16">
                <div className="px-4 py-8">{children}</div>
            </main>
        </div>
    </>
);

};
export default DashboardLayout;

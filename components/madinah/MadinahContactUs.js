'use client';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import emailjs from '@emailjs/browser';
import { useTranslation } from 'react-i18next';
import DashboardLayout from '@/components/DashboardLayout';

const MadinahContactUs = ({ locale }) => {
  const [firstName, setFirst] = useState('');
  const [lastName, setLast] = useState('');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [phonenumber, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [t] = useTranslation();

  const onSubmit = async () => {
    setLoading(true);
    if (!firstName || !lastName || !message || !email || !phonenumber) {
      toast.error(t("input_fields_null"), {
        position: 'bottom-center',
        autoClose: 5000,
        theme: 'light',
      });
      setLoading(false);
    } else {
      try {
        const templateParams = { firstName, lastName, email, phonenumber, message };
        await emailjs.send('service_rikcmhh', 'template_jhf63ta', templateParams, '6asEOrXlJfXCZmq_2');
        
        const response = await fetch('/api/messages/new', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(templateParams),
        });

        if (response.status === 201) {
          toast.success(t("message_sent"), { position: 'bottom-center', autoClose: 5000, theme: 'light' });
          setFirst(''); setLast(''); setEmail(''); setPhone(''); setMessage('');
        }
      } catch (e) {
        toast.error(t("try_again"), { position: 'bottom-center', autoClose: 5000, theme: 'light' });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <DashboardLayout
      locale={locale}
      dashboard={t('dashboard')}
      map={t('map')}
      display_data={t('display_data')}
      contact_us={t('contact_us')}
    >
      <div className="bg-gradient-to-b from-teal-100 to-white px-8 py-10 rounded-lg shadow-lg max-w-2xl mx-auto mt-10">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-teal-700">{t('contact_us')}</h2>
          <p className="text-gray-600 mt-2">{t('reach')}</p>
        </div>

        <div className="mt-8 grid gap-6 grid-cols-1 sm:grid-cols-2">
          <InputField label={t('first_name')} value={firstName} setValue={setFirst} />
          <InputField label={t('last_name')} value={lastName} setValue={setLast} />
          <InputField label={t('email')} value={email} setValue={setEmail} type="email" />
          <InputField label={t('phone_number')} value={phonenumber} setValue={setPhone} type="tel" />
          <TextAreaField label={t('message')} value={message} setValue={setMessage} />
        </div>

        <button
          onClick={onSubmit}
          disabled={loading}
          className={`w-full mt-8 py-2.5 rounded-md text-white font-semibold shadow-md 
                      transition-all duration-300 ${loading ? 'bg-teal-300' : 'bg-teal-600 hover:bg-teal-700'}`}
        >
          {loading ? t('sending') : t('send')}
        </button>

        <div className="mt-8 text-center text-teal-600">
          <p>{t('email')} : admin@firnas.aero</p>
        </div>

        <footer className="mt-8 text-center text-gray-500">
          <p className="text-sm">{t('firnas_aero')} © 2023</p>
        </footer>

        <ToastContainer position="bottom-center" autoClose={5000} hideProgressBar={false} closeOnClick pauseOnHover theme="light" />
      </div>
    </DashboardLayout>
  );
};

const InputField = ({ label, value, setValue, type = "text" }) => (
  <div>
    <label className="block text-sm font-semibold text-gray-700">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 shadow focus:ring-2 focus:ring-teal-600 transition-all"
      placeholder={label}
    />
  </div>
);

const TextAreaField = ({ label, value, setValue }) => (
  <div className="sm:col-span-2">
    <label className="block text-sm font-semibold text-gray-700">{label}</label>
    <textarea
      value={value}
      onChange={(e) => setValue(e.target.value)}
      rows={4}
      className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 shadow focus:ring-2 focus:ring-teal-600 transition-all"
      placeholder={label}
    />
  </div>
);

export default MadinahContactUs;

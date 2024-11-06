//adding user in firnas user
'use client';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Input from '@/components/Input';
import Select from '@/components/Select';
import cities from '@/data/cities.json';
import { Alert } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import AlfirnasDashboard from '@/components/AlfirnasLayout/AlfirnasDashboard';

const AlfirnasNewUser = ({ locale }) => {
  const router = useRouter();
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    city: 'Riyadh',
    role: 'Admin',
    status: 'Active',
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [t] = useTranslation();

  const handleField = (e) => {
    setError('');
    setSuccess('');
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const CreateUser = async (e) => {
    e.preventDefault();
    if (
      user.name === '' ||
      user.email === '' ||
      user.password === '' ||
      user.city === '' ||
      user.role === '' ||
      user.status === ''
    ) {
      setError("Input Fields Can't be null");
    } else {
      try {
        const response = await fetch('/api/users/new', {
          cache: 'no-store',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        });
        const data = await response.json();
        if (response.status === 201) {
          toast.success(data.message, {
            position: 'bottom-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
          router.push('/alfirnas/users');
        } else if (response.status === 409) {
          toast.error(data.message, {
            position: 'bottom-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
        }
      } catch (error) {
        toast.error(error.response.data.message, {
          position: 'bottom-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }
    }
  };

  return (
    <AlfirnasDashboard
      main_page={t('main_page')}
      users={t('users')}
      messages={t('messages')}
      locale={locale}
    >
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-teal-200 via-teal-100 to-white rounded-2xl">
        <form
          onSubmit={CreateUser}
          className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-3xl transform transition-all duration-300 hover:shadow-2xl"
        >
          {/* Form Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-[#0D9488]">{t('new_user')}</h2>
            <button
              type="button"
              className="px-3 py-1.5 rounded-md bg-[#0D9488] text-white font-semibold hover:bg-[#0B7A74] transition-transform transform hover:scale-105"
              onClick={() => router.push('/alfirnas/users')}
            >
              {t('go_back')}
            </button>
          </div>
  
          {/* Alert Messages */}
          {error && <Alert variant="danger" className="mb-4">{error}</Alert>}
          {success && (
            <p className="mb-4 text-sm text-green-600">{success}</p>
          )}
  
          {/* Form Fields */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Input
              label={t('name')}
              name="name"
              type="text"
              value={user.name}
              onChange={handleField}
              className="rounded-md border-gray-300 focus:border-teal-500 focus:ring-teal-500"
            />
            <Input
              label={t('email')}
              name="email"
              type="email"
              value={user.email}
              onChange={handleField}
              className="rounded-md border-gray-300 focus:border-teal-500 focus:ring-teal-500"
            />
            <Input
              label={t('password')}
              name="password"
              type="password"
              value={user.password}
              onChange={handleField}
              className="rounded-md border-gray-300 focus:border-teal-500 focus:ring-teal-500"
            />
            <Select
              label={t('role')}
              name="role"
              value={user.role}
              onChange={handleField}
              options={['Admin', 'User', 'Manager']}
              className="rounded-md border-gray-300 focus:border-teal-500 focus:ring-teal-500"
            />
            <Select
              label={t('status')}
              name="status"
              value={user.status}
              onChange={handleField}
              options={['Active', 'Inactive']}
              className="rounded-md border-gray-300 focus:border-teal-500 focus:ring-teal-500"
            />
            <div>
              <label className="block text-sm font-medium text-gray-700">{t('city')}</label>
              <select
                name="city"
                value={user.city}
                onChange={handleField}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
              >
                {cities.map((c) => (
                  <option key={c.city} value={c.city}>
                    {c.city}
                  </option>
                ))}
              </select>
            </div>
          </div>
  
          {/* Form Actions */}
          <div className="flex justify-end gap-4 mt-8">
            <button
              type="button"
              className="text-sm font-medium text-gray-600 hover:text-gray-800"
              onClick={() => router.push('/alfirnas/users')}
            >
              {t('cancel')}
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#0D9488] text-white font-semibold rounded-lg hover:bg-[#0B7A74] transition-transform transform hover:scale-105"
            >
              {t('save')}
            </button>
          </div>
        </form>
      </div>
    </AlfirnasDashboard>
  );
  
};

export default AlfirnasNewUser;

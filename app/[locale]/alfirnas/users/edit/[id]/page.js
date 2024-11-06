'use client';
import React, { useState, useEffect } from 'react';
import Input from '@/components/Input';
import Select from '@/components/Select';
import cities from '@/data/cities.json';
import { Alert } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import AlfirnasDashboard from '@/components/AlfirnasLayout/AlfirnasDashboard';

const EditUser = ({ setUsers, params }) => {
  const router = useRouter();
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    city: 'Riyadh',
    role: 'Admin',
    status: 'Active',
  });
  const [error, setError] = useState('');
  const [t, i18n] = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/users/${params.id}`, {
          cache: 'no-store',
        });
        const data = await response.json();
        console.log(data);
        setUser({ ...data.user, password: '' });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [params.id]);

  const handleField = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const CreateUser = async (e) => {
    e.preventDefault();
    if (
      user.name === '' ||
      user.email === '' ||
      user.city === '' ||
      user.role === '' ||
      user.status === ''
    ) {
      toast.error("Input Fields Can't be null", {
        position: 'bottom-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    } else {
      try {
        const response = await fetch(`/api/users/${params.id}`, {
          cache: 'no-store',
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        });
        const data = await response.json();
        if (response.status === 200) {
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
        } else if (response.status === 404) {
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
    <AlfirnasDashboard id={params.id}>
      <form onSubmit={CreateUser}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-2">
            <h2 className="flex justify-between items-center text-base font-semibold leading-7 text-primary-teal1">
              <span>{t('Edit_User')}</span>
              <button
                type="button"
                className="@apply block rounded-md bg-primary-teal px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-teal-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-teal;"
                onClick={() => router.push('/alfirnas/users')}
              >
                {t('Gobak')}
              </button>
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              {t('Acc_Create')}
            </p>
          </div>
          <div>{error && <Alert variant="danger">{error}</Alert>}</div>

          <div className="border-b border-gray-900/10 pb-8">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <Input
                  label={'Name'}
                  name={'name'}
                  type={'text'}
                  value={user.name}
                  onChange={handleField}
                />
              </div>
              <div className="sm:col-span-3">
                <Input
                  label={'Email'}
                  name={'email'}
                  type={'email'}
                  value={user.email}
                  onChange={handleField}
                />
              </div>
              <div className="sm:col-span-3">
                <Input
                  label={'Password'}
                  name={'password'}
                  type={'password'}
                  value={user.password}
                  onChange={handleField}
                />
              </div>
              <div className="sm:col-span-3">
                <Select
                  label={'Role'}
                  name={'role'}
                  value={user.role}
                  onChange={handleField}
                  options={['Admin', 'User', 'Manager']}
                />
              </div>
              <div className="sm:col-span-3">
                <Select
                  label={'Status'}
                  name={'status'}
                  value={user.status}
                  onChange={handleField}
                  options={['Active', 'Inactive']}
                />
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  {t('City')}
                </label>
                <div className="mt-2">
                  <select
                    id="city"
                    name="city"
                    value={user.city}
                    onChange={handleField}
                    autoComplete="city-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-teal sm:text-sm sm:leading-6"
                  >
                    {cities.map((c, i) => (
                      <option key={c.city}>{c.city}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
            onClick={() => router.push('/alfirnas/users')}
          >
            {t('Cancel')}
          </button>
          <button
            type="submit"
            className="@apply block rounded-md bg-primary-teal px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-teal-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-teal;"
          >
            {t('Save')}
          </button>
        </div>
      </form>
    </AlfirnasDashboard>
  );
};

export default EditUser;

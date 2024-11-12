'use client';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { useRouter } from 'next/navigation';
import { Alert } from 'react-bootstrap';
import {
  EnvelopeIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
} from '@heroicons/react/20/solid';
import { useAuth } from '@/contexts/AuthContext';
import Input from '@/components/Input';

const Section1 = ({
  locale,
  login,
  _email,
  _password,
  go_back,
  firnas_aero,
}) => {
  const { i18n } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { getCurrentUser } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      toast.error('Please fill all the fields', {
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
      setLoading(true);
      try {
        const user = { email, password };
        const response = await fetch(`/api/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        });
        const data = await response.json();
        if (response.status === 200) {
          localStorage.setItem('token', data.token);
          getCurrentUser();
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
          setLoading(false);
          router.push(`/${i18n.language}`);
        } else {
          setLoading(false);
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
        setLoading(false);
        toast.error('Something went wrong', {
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
    <section className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-teal-100 to-teal-50">
      <div className="container mx-auto text-center p-12 md:p-16 lg:p-20 bg-white rounded-xl shadow-2xl">
        <div className="bg-teal-50 rounded-xl p-8 md:p-12">
          <h1
            className="text-4xl md:text-5xl font-extrabold text-teal-700 mb-6"
            style={{ fontFamily: 'Raleway, sans-serif' }}
          >
            <span style={{ color: 'rgb(3,94,95)' }}>{login}</span>
          </h1>

          {error && <Alert variant="danger">{error}</Alert>}

          <Input
            locale={locale}
            type="email"
            leftIcon={<EnvelopeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />}
            label={_email}
            name="email"
            value={email}
            placeholder={_email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            locale={locale}
            type={showPassword ? 'text' : 'password'}
            leftIcon={<LockClosedIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />}
            rightIcon={
              showPassword ? (
                <EyeSlashIcon className="h-5 w-5 text-gray-400" aria-hidden="true" onClick={togglePasswordVisibility} />
              ) : (
                <EyeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" onClick={togglePasswordVisibility} />
              )
            }
            label={_password}
            name="password"
            value={password}
            placeholder={_password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="mt-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-shadow duration-200" disabled={loading} onClick={handleLogin}>
              {login}
            </button>
            <button className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-shadow duration-200" onClick={() => router.push('/usertype')}>
              {go_back}
            </button>
          </div>
        </div>
      </div>

      <footer className="text-teal-700 text-center mt-8">
        <p className="text-sm" style={{ fontFamily: 'Raleway, sans-serif' }}>
          {firnas_aero} © 2023
        </p>
      </footer>
    </section>
  );
};

export default Section1;

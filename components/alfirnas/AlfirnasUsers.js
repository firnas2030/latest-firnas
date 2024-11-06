//list of the users in firnas page
'use client';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { useRouter } from 'next/navigation';
import AlfirnasDashboard from '@/components/AlfirnasLayout/AlfirnasDashboard';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/20/solid';

const AlfirnasUsers = ({ locale }) => {
  const router = useRouter();
  const [t] = useTranslation();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/users', {
          cache: 'no-store',
        });
        const data = await response.json();
        console.log(data);
        setUsers(data.users);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const deleteUser = async (id) => {
    const result = confirm('Are you sure you want to delete this item?');
    if (result) {
      try {
        const response = await fetch(`/api/users/${id}`, {
          cache: 'no-store',
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        if (response.status === 200) {
          setUsers((prev) => {
            return [...prev.filter((item) => item._id !== id)];
          });
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
        }
      } catch (error) {
        console.error('Error:', error);
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
      <div className="p-8 space-y-8 bg-[#F0F4F8] rounded-2xl shadow-xl">
        {/* Header with Add User Button */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-extrabold text-[#0D9488]">{t('user_management')}</h1>
            <p className="mt-2 text-base text-gray-600">{t('list_of_user')}</p>
          </div>
          <button
            type="button"
            className="py-2 px-4 bg-[#0D9488] hover:bg-[#0B7A74] text-white font-semibold rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
            onClick={() => router.push('/alfirnas/users/new')}
          >
            {t('add_user')}
          </button>
        </div>
  
        {/* Card Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {users?.length > 0 &&
            users.map((user, i) => (
              <div key={i} className="relative bg-white p-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105">
                {/* User Information */}
                <div className="space-y-3">
                  <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
                  <p className="text-sm text-gray-600">{t('role')}: {user.role}</p>
                  <p className="text-sm text-gray-600">{t('email')}: {user.email}</p>
                  <p className="text-sm text-gray-500">{t('created_date')}: {user.createdAt}</p>
                </div>
  
                {/* Action Icons */}
                <div className="absolute top-4 right-4 flex space-x-2">
                  <PencilSquareIcon
                    className="w-5 h-5 text-[#0D9488] hover:text-teal-700 cursor-pointer transition-transform transform hover:scale-110"
                    onClick={() => router.push(`/alfirnas/users/edit/${user._id}`)}
                  />
                  <TrashIcon
                    className="w-5 h-5 text-red-500 hover:text-red-700 cursor-pointer transition-transform transform hover:scale-110"
                    onClick={() => deleteUser(user._id)}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </AlfirnasDashboard>
  );
  
};

export default AlfirnasUsers;

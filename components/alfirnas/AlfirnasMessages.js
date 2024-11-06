'use client';
import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, deleteDoc, doc } from 'firebase/firestore';
import { Circles } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { useTranslation } from 'react-i18next';
import { db } from '@/utils/firebase';
import AlfirnasDashboard from '@/components/AlfirnasLayout/AlfirnasDashboard';

const AlfirnasMessages = ({ locale }) => {
  const [messages, setMessages] = useState({});
  const [loading, setLoading] = useState(false);
  const [t, i18n] = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const query1 = collection(db, 'userMessages');
        const q = query(query1);
        const querySnapshot = await getDocs(q);

        const response = await fetch('/api/messages', {
          cache: 'no-store',
        });

        const data = await response.json();
        console.log('data', data.messages);
        setMessages(data.messages);
      } catch (error) {
        console.error('Error getting user data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const deleteMessage = async (id) => {
    const result = confirm('Are you sure you want to delete this item?');
    if (result) {
      try {
        const response = await fetch(`/api/messages/${id}`, {
          cache: 'no-store',
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        if (response.status === 200) {
          setMessages((prev) => {
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
      <section className="body-font text-gray-600">
        <div className="container mx-auto px-5 py-10">
          
          {/* Header Section */}
          <div className="text-center w-full mb-10">
            <h2 className="text-lg font-medium text-[#025F5F] tracking-widest mb-2 uppercase">
              {t('customer_messages')}
            </h2>
            <h1 className="text-3xl font-bold text-gray-900">
              {t('resolve_these_issues')}
            </h1>
          </div>
  
          {/* Loading Indicator */}
          {loading ? (
            <div className="flex justify-center items-center mt-10">
              <Circles
                height="80"
                width="80"
                color="#025F5F"
                ariaLabel="circles-loading"
                visible={true}
              />
            </div>
          ) : Object.keys(messages).length > 0 ? (
            
            // Message Cards
            <div className="flex flex-wrap -m-4">
              {messages.map((message, i) => (
                <div className="p-4 w-full sm:w-1/2 lg:w-1/3" key={i}>
                  <div className="flex flex-col p-6 bg-gradient-to-br from-teal-100 to-white rounded-2xl shadow-lg transition transform hover:shadow-2xl hover:scale-105">
                    
                    {/* Icon and Email */}
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#025F5F] text-white shadow-lg">
                        <svg
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="w-6 h-6"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                      </div>
                      <h2 className="ml-4 text-xl font-semibold text-gray-900">
                        {message.email}
                      </h2>
                    </div>
                    
                    {/* Message Content */}
                    <p className="flex-grow text-gray-700 mb-4 leading-relaxed">{message.message}</p>
                    
                    {/* Delete Button */}
                    <button
                      onClick={() => deleteMessage(message._id)}
                      className="mt-3 text-teal-700 hover:text-red-500 font-semibold inline-flex items-center"
                    >
                      Delete Message
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-4 h-4 ml-2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // No Messages Found
            <div className="text-center mt-10">
              <h1 className="text-lg font-medium text-gray-500">
                {t('no_messages_found')}
              </h1>
            </div>
          )}
        </div>
      </section>
    </AlfirnasDashboard>
  );
  
};

export default AlfirnasMessages;

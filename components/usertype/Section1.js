//first page, to choosse the type of the user
'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

const Section1 = ({ mem_option, firnas_user, med_user, firnas_aero }) => {
  const router = useRouter();

  const navigateToAlfirnasLogin = () => {
    router.push(`/login?type=alfirnas`);
  };

  const navigateToMadinahLogin = () => {
    router.push(`/login?type=madinah`);
  };

  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-teal-100 to-teal-50">
      <div className="container mx-auto text-center p-12 md:p-16 lg:p-20 bg-white rounded-xl shadow-2xl transition-transform transform hover:scale-105">
        <div className="bg-teal-50 rounded-xl p-8 md:p-12 transition-shadow shadow-md hover:shadow-lg">
          <h1
            className="text-4xl md:text-5xl font-extrabold text-teal-700 mb-6"
            style={{ fontFamily: 'Raleway, sans-serif' }}
          >
            {mem_option}
          </h1>

          <p className="text-teal-600 mb-8">
            Choose your login option below:
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-8 rounded-lg transition-shadow shadow-md hover:shadow-lg transform transition-transform duration-200"
              onClick={navigateToAlfirnasLogin}
            >
              {firnas_user}
            </button>

            <button
              className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-8 rounded-lg transition-shadow shadow-md hover:shadow-lg transform transition-transform duration-200"
              onClick={navigateToMadinahLogin}
            >
              {med_user}
            </button>
          </div>
        </div>
      </div>

      <footer className="text-teal-700 text-center mt-8">
        <p
          className="text-sm"
          style={{ fontFamily: 'Raleway, sans-serif' }}
        >
          {firnas_aero} © 2023
        </p>
      </footer>
    </section>
  );
};

export default Section1;

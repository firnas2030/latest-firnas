import React from 'react';
import LanguageChanger from '@/components/LanguageChanger';

function Header({ currentUser, logout, user }) {
  return (
    <header
      className="py-4 shadow-lg z-100 relative"
      style={{ backgroundColor: '#0D9488' }} // Lighter green header color #03a9a0
    >
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center px-5 space-y-3 sm:space-y-0">
        <LanguageChanger />

        <div className="flex justify-center items-center my-4 sm:my-0">
          <img
            className="w-[120px] md:w-[180px] transition-transform transform hover:scale-110"
            src="/assets/images/logo.png"
            alt="logo"
          />
        </div>

        <div className="flex flex-col justify-center items-end text-right space-y-1">
          {currentUser && (
            <span
              className="text-lg font-semibold tracking-wider"
              style={{
                color: '#FFFFFF',
                textShadow: '0 0 6px rgba(255, 255, 255, 0.8)',
              }}
            >
              {user}
            </span>
          )}
          {currentUser && (
            <button
              onClick={logout}
              className="logout-button"
              style={{
                padding: '8px 16px',
                backgroundColor: '#4aa6e8',
                color: '#FFFFFF',
                fontWeight: '500',
                borderRadius: '9999px',
                boxShadow: '0 0 10px #4aa6e8, 0 0 20px #4aa6e8',
                transition: 'box-shadow 0.2s ease-in-out, background-color 0.2s ease-in-out',
              }}
            >
              Logout
            </button>
          )}
        </div>
      </div>

    </header>
  );
}

export default Header;

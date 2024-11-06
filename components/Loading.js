'use client'
import React from 'react';
import Header from '@/components/Header';
import { Circles } from 'react-loader-spinner';

function Loading() {
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 50,
        }}
      >
        <Circles
          height="80"
          width="80"
          color="#00544D"
          ariaLabel="circles-loading"
          wrapperClass=""
          visible={true}
        />
      </div>
    </div>
  );
}

export default Loading;

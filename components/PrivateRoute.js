'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
// import { useAuth } from "@/contexts/AuthContext";

export default function PrivateRoute({ children }) {
  const router = useRouter();
  const { currentUser } = useAuth();

  return currentUser ? children : router.push('/usertype');
}

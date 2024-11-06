'use client';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

function Dashboard() {
  const router = useRouter();
  const { currentUser } = useAuth();
  return (
    <>
      {currentUser.role === 'Admin'
        ? router.push('/alfirnas')
        : router.push('/madinah')}
    </>
  );
}

export default Dashboard;

'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const OnBroadingPage = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/exchange');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen bg-[url('/project/bg_tg.png')]">
      <div className="w-64 h-1.5 bg-gray-300 rounded">
        <div className="h-full bg-white animate-pulse" style={{ animationDuration: '3s' }}></div>
      </div>
    </div>
  );
};

export default OnBroadingPage;

'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/countdowns'); // 或 router.replace() 不保留历史记录
  }, []);

  return <div>正在重定向……</div>;
}
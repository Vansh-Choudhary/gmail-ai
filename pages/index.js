// pages/index.js
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
    if (token) {
      router.push('/emails');
    }
  }, [router]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <button 
        onClick={() => router.push('/api/auth')}
        style={{
          padding: '10px 20px',
          backgroundColor: '#4285F4',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px',
          transition: 'background-color 0.3s ease'
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#357ae8'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#4285F4'}
      >
        Sign in with Google
      </button>
    </div>
  );
}

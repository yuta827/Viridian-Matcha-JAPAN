'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Props {
  productId: string;
  field: 'is_orderable' | 'is_featured' | 'is_published';
  value: boolean;
}

export default function AdminProductToggle({ productId, field, value }: Props) {
  const [current, setCurrent] = useState(value);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const toggle = async () => {
    setLoading(true);
    const newValue = !current;
    setCurrent(newValue);

    await fetch(`/api/admin/products/${productId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ [field]: newValue }),
    });

    setLoading(false);
    router.refresh();
  };

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className={`w-10 h-5 rounded-full transition-colors relative ${
        current ? 'bg-[#2D5016]' : 'bg-gray-200'
      } ${loading ? 'opacity-50' : ''}`}
      aria-label={current ? 'ON' : 'OFF'}
    >
      <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${
        current ? 'left-[calc(100%-18px)]' : 'left-0.5'
      }`} />
    </button>
  );
}

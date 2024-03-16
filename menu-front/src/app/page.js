'use client'

import { useState, useEffect } from 'react';
import Cards from "../components/cards";
import Link from 'next/link';

export default function Home() {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://10.0.0.127:8000/api/product');
        const jsonData = await res.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-16">
      <div className="h-auto w-2/3 box-content rounded-md shadow-xl bg-[#ffb703]">
        <h1 className="text-center text-4xl text-white pt-4">Web Menu</h1>
        <Link href="/cart" className='px-4'>
          <button type='button' className='btn bg-[#390099] hover:bg-[#380099c4] text-white font-bold py-2 px-4 mr-8 rounded float-right'>Cart</button>
        </Link>        
        <br/>
        {data ? (
          <Cards products={data}/>
        ) : (
          <div className='text-center'>Loading...</div>
        )}
      </div>
    </main>
  );
}

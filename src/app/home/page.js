"use client"
import React from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { AboutUs, Chef, FindUs, Footer, Gallery, Header, Intro, Laurels, SpecialMenu } from '@/container';
import { Navbar } from '@/components';
import './app.css';

const App = () => {
  const router = useRouter()
  useEffect(() => {
  router.refresh()
  }, []);
  return (
    <div>
      <Navbar />
      <Header />
      <AboutUs />
      <SpecialMenu />
      <Chef />
      <Intro />
      <Laurels />
      <Gallery />
      <FindUs />
      <Footer />
    </div>
  )
};

export default App;

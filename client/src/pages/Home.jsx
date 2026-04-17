import React from 'react'

import Banner from '../components/home/Banner.jsx'
import Hero from '../components/home/Hero.jsx'
import Features from '../components/home/Features.jsx'
import Testimonials from '../components/home/Testimonals.jsx'
import CallToAction from '../components/home/CallToAction.jsx'
import Footer from '../components/home/Footer.jsx'

const Home = () => {
  return (
    <>
      <Banner />
      <Hero />
      <Features />
      <Testimonials />
      <CallToAction />
      <Footer />
    </>
  )
}

export default Home
import React from 'react'
import Hero from '../components/Hero'
import SupportedConversions from '../components/SupportedConversions'
import HowItWorks from '../components/HowItWorks'
import WhyChooseUs from '../components/WhyChooseUs'
import Pricing from '../components/PricingList'
import FAQ from '../components/FAQ'

const Home = () => {
  return (
    <div>
      <Hero/>
      <SupportedConversions/>
      <HowItWorks/>
      <WhyChooseUs/>
      <Pricing/>
      <FAQ/>
    </div>
  )
}

export default Home
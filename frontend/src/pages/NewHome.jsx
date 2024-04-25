import React from 'react'
import Header from '../components/componentes_new_home/HeaderHome'
import Hero from '../components/componentes_new_home/Hero'
import FirstSection from '../components/componentes_new_home/FirstSection'
import SecondSection from '../components/componentes_new_home/SecondSection'
import ThirdSection from '../components/componentes_new_home/ThirdSection'
import FooterHome from '../components/componentes_new_home/FooterHome'

function NewHome() {
  return (
    <>
      <Header />
      <Hero />
      <FirstSection />
      <SecondSection />
      <ThirdSection />
      <FooterHome />
    </>
  )
}

export default NewHome
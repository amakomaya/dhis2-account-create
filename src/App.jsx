import { Outlet } from 'react-router-dom'
import './App.css'
import CustomizeSection from './components/home/CustomizeSection'
import FAQSection from './components/home/FAQSection'
import Footer from './components/home/Footer'
import Header from './components/home/Header'
import Hero from './components/home/Hero'
import PlanSection from './components/home/PlanSection'
import SupportSection from './components/home/SupportSection'
import WhySection from './components/home/WhySection'
import Home from './components/home/Home'

function App() {
  return (
    <>
      {/* <Header/> */}

      <Outlet/>
      <Footer/>
    </>
  )
}

export default App

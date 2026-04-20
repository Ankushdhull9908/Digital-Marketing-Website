import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { Route, Router, Routes } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import ResumeBuilder from './Pages/ResumeBuilder'
import TemplateSelect from './Pages/TemplatesSelect'
import AboutUs from './Pages/AboutUs'
import JobPortal from './Pages/JobPortal'
import PortfolioMaker from './Pages/PortfolioMaker'
import AuthPage from './Pages/AuthPage'
import Dashboard from './Pages/Dashboard'
import InfluencerPage from './Pages/InfluencerPage'
import LandingPage from './Pages/LandingPage'
import PortfolioTemplates from './Pages/PortfolioTemplates'

function App() {


  return (
    <>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} /> 
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path='/resume-builder' element={<ResumeBuilder/>}></Route>
        <Route path='/TemplateSelect' element={<TemplateSelect/>}></Route>
        <Route path='/PortfolioTemplates' element={<PortfolioTemplates/>}></Route>
        <Route path="/portfolio-maker/:templateId" element={<PortfolioMaker />} />
        <Route path='/jobportal' element={<JobPortal/>}></Route>
        <Route path='/about' element={<AboutUs/>}/>
        <Route path='/influencer-form' element={<InfluencerPage/>}/>
        <Route path='/landingpage' element={<LandingPage/>}/>
      </Routes>
    </>
  )
}

export default App

import './App.css'
import { Route, Router, Routes } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import ResumeBuilder from './Pages/ResumeBuilder' 
import TemplateSelect from './Pages/TemplatesSelect'
import AboutUs from './Pages/AboutUs'
import JobPortal from './Pages/JobPortal'
import ResumeMaker from './Pages/ResumeMaker'
import AuthPage from './Pages/AuthPage'
import Dashboard from './Pages/Dashboard'
import InfluencerPage from './Pages/InfluencerPage'
import LandingPage from './Pages/LandingPage'
import PortfolioTemplates from './Pages/PortfolioTemplates'
import SipCalculator from './Pages/SipCalculator'
import Footer from './Components/Footer'
import OurServices from './Pages/OurServices'
import WhySEO from './Pages/WhySEO'
import ScrollToTop from './Components/ScrollToTop'
import Contact from './Pages/Contact'
import IndustriesWeWorkWith from './Pages/IndustriesWeWorkWith'
import Blog from './Pages/Blog'
import UserDashboard from './Pages/UserDashboard'
import Career from './Pages/Carrer'
import BlogList from './Pages/BlogList'


function App() {
  //


  return (
    <>
    <Navbar />
    <ScrollToTop/>
      <Routes>
        <Route path="/" element={<Home/>} /> 
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path='/resume-builder' element={<ResumeMaker/>}></Route>
        <Route path='/TemplateSelect' element={<TemplateSelect/>}></Route>
        <Route path='/PortfolioTemplates' element={<ResumeBuilder/>}></Route>
        <Route path="/portfolio-maker/:templateId" element={<ResumeBuilder />} />
        <Route path='/jobportal' element={<JobPortal/>}></Route>
        <Route path='/OurServices' element={<OurServices/>}></Route>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/about' element={<AboutUs/>}/>
        <Route path='/influencer-form' element={<InfluencerPage/>}/>
        <Route path='/landingpage' element={<LandingPage/>}/>
        <Route path='/SIPCalculator' element={<SipCalculator/>}/>
        <Route path='/WhySEO' element={<WhySEO/>}/>
        <Route path='/industries' element={<IndustriesWeWorkWith/>}/>
        <Route path='/blog/:id' element={<Blog/>}/>
        <Route path="/blog" element={<BlogList />} />
        <Route path='/UserDashboard' element={<UserDashboard/>}/>
        <Route path='/Career' element={<Career/>}/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App

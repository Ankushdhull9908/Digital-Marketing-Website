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
import Hrportal from './Components/Hrportal'
import TermsAndConditions from './Pages/TermsCondition'
import PrivacyPolicy from './Pages/PrivacyPolicy'
import HomepageAdmin from './Pages/admin/HomepageAdmin'
import AdminLayout from "./Pages/admin/AdminLayout";
import OverviewPage from "./Pages/admin/OverviewPage";
import ResumesAdmin from "./Pages/admin/ResumesAdmin";
import FAQAdmin from "./Pages/admin/FAQAdmin";
import ClientsAdmin from "./Pages/admin/ClientsAdmin";
import PackagesAdmin from "./Pages/admin/PackagesAdmin";
import TestimonialsAdmin from "./Pages/admin/TestimonialsAdmin";
import ContactsAdmin from "./Pages/admin/ContactsAdmin";
import JobsAdmin from "./Pages/admin/JobsAdmin";
import InfluencerAdmin from "./Pages/admin/InfluencerAdmin";
import BlogsAdmin from "./Pages/admin/BlogsAdmin";
import AnalyticsAdmin from "./Pages/admin/AnalyticsAdmin";
import IndustriesAdmin from './Pages/admin/IndustriesAdmin'

function App() {
  //


  return (
    <>
    <Navbar />
    <ScrollToTop/>
      <Routes>
        <Route path="/" element={<Home/>} /> 
        <Route path="/auth" element={<AuthPage />} />
        
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
        <Route path='/Hrportal' element={<Hrportal/>}/>
        <Route path='/terms-and-conditions' element={<TermsAndConditions/>}/>
        <Route path='/privacy-policy' element={<PrivacyPolicy/>}/>
        <Route path="/dashboard" element={<AdminLayout />}>
  <Route index element={<OverviewPage />} />
  <Route path="homepage" element={<HomepageAdmin />} />
  <Route path="resumes" element={<ResumesAdmin />} />
  <Route path="faqs" element={<FAQAdmin />} />
  <Route path="clients" element={<ClientsAdmin />} />
  <Route path="packages" element={<PackagesAdmin />} />
  <Route path="testimonials" element={<TestimonialsAdmin />} />
  <Route path="contacts" element={<ContactsAdmin />} />
  <Route path="jobs" element={<JobsAdmin />} />
  <Route path="influencer" element={<InfluencerAdmin />} />
  <Route path="blogs" element={<BlogsAdmin />} />
  <Route path="analytics" element={<AnalyticsAdmin />} />
  <Route path="industries" element={<IndustriesAdmin />} />
</Route>
      </Routes>
      <Footer/>
    </>
  )
}

export default App

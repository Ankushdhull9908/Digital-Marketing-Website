import { createContext, useContext, useState, useEffect } from "react";

//const API = "http://localhost:5000/api";
var API = "https://digital-marketing-temp.onrender.com/api" ? "https://digital-marketing-temp.onrender.com/api": "http://localhost:5000/api"
const get  = (url) => fetch(API + url).then(r => r.json());

const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // ── public homepage data ──────────────────────────────────────────────────
  const [faqs,     setFaqs]     = useState([]);
  const [packages, setPackages] = useState([]);
  const [clients,  setClients]  = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [Testimonials,setTestimonials] = useState([])

  // check token on reload
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log('data came from localstorage',token)
    if (token) setUser({ token});
  }, []);
 
  console.log('user data',user)
  // fetch all public homepage data once on mount
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [faqData, pkgData, clientData,test] = await Promise.all([
          get("/faqs"),          // only active FAQs (no ?all=true)
          get("/packages"),      // only active packages
          get("/clients"),
          get("/testimonials")      // only active clients
        ]);
        setFaqs(Array.isArray(faqData)     ? faqData     : []);
        setPackages(Array.isArray(pkgData) ? pkgData     : []);
        setClients(Array.isArray(clientData) ? clientData : []);
        setTestimonials(Array.isArray(test) ? test : [])
      } catch (err) {
        console.error("Failed to load homepage data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);


  console.log('faq',faqs)
  console.log('test',Testimonials)
  

  // ── auth helpers ──────────────────────────────────────────────────────────
  const login = (token) => {
    localStorage.setItem("token", token);
    setUser({ token });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <Context.Provider value={{ user, login, logout, faqs, packages, clients, loading,Testimonials }}>
      {children}
    </Context.Provider>
  );
};

// custom hook — used everywhere
export const useAuth = () => useContext(Context);

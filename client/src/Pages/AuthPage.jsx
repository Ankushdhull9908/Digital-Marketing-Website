import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Context";
function AuthPage() {
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  // State to trigger the entrance animation after the component mounts
  const [isLoaded, setIsLoaded] = useState(false);

  var API = "https://digital-marketing-temp.onrender.com" ? "https://digital-marketing-temp.onrender.com": "http://localhost:5000"

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  // Trigger animation on component mount
  useEffect(() => {
    // A micro-delay makes the animation feel deliberate
    const timer = setTimeout(() => setIsLoaded(true), 50);
    return () => clearTimeout(timer); // Clean up
  }, []);

  const handleSubmit = async () => {
    try {
      const url = isLogin
        ? `${API}/api/auth/login`
        :`${API}/api/auth/signup`;

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      if (isLogin) {
        login(data.token);
        navigate("/dashboard");
      } else {
        alert("Signup successful! Please login");
        setIsLogin(true);
      }
    } catch (error) {
      alert("Something went wrong");
    }
  };

  // Define the image source and alt text based on the auth state.
  const imageSrc = isLogin
    ? "https://cdni.iconscout.com/illustration/premium/thumb/network-nodes-connecting-illustration-download-in-svg-png-gif-file-formats--abstract-technology-connection-iot-web3-digital-transformation-pack-illustrations-5763523.png" // Minimal abstract connection visual
    : "https://cdni.iconscout.com/illustration/premium/thumb/abstract-cloud-technology-illustration-download-in-svg-png-gif-file-formats--server-storage-big-data-web-network-transformation-pack-illustrations-5384661.png"; // Abstract growth visual
  const imageAlt = isLogin ? "Secure Access Network" : "Grow and Connect Platform";

  return (
    // Advanced Gradient and Blurry Background
    <div className="min-h-screen flex items-center justify-center bg-base-100 relative overflow-hidden">
      
      {/* Background Decorative Blurs for Depth */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-base-100 rounded-full blur-3xl opacity-60"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-base-100 rounded-full blur-3xl opacity-50"></div>

      {/* The Card with Dynamic Entrance Animation:
        The `transition-all` and `duration-1000` handle the smooth change.
        `isLoaded` determines the opacity, blur, and scale.
      */}
      <div 
        className={`bg-base-100 rounded-3xl shadow-2xl shadow-base-200 w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 overflow-hidden border border-base-200 backdrop-blur-sm 
        transition-all duration-1000 ease-out transform
        ${isLoaded ? 'opacity-100 scale-100 blur-none' : 'opacity-0 scale-95 blur-sm'}`}
      >
        
        {/* === Left Side: Image & Call to Action (Hidden on mobile) === */}
        <div className="bg-blue-600 p-16 flex-col justify-between text-white hidden md:flex relative overflow-hidden">
          
          {/* Subtle Background Pattern (Optional) */}
          <div className="absolute inset-0 bg-blue-700 opacity-20" style={{ backgroundImage: "radial-gradient(#ffffff20 2px, transparent 2px)", backgroundSize: "30px 30px" }}></div>

          <div className="relative z-10">
            {/* The Brand/Logo Area */}
            <div className="flex items-center gap-3 mb-10">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center font-black text-white text-2xl">V</div>
              <h1 className="text-3xl font-bold tracking-tight">WEB Tech</h1>
            </div>

            {/* The dynamic imagery that changes with state */}
            <div className="flex justify-center mb-10">
              <img 
                src={imageSrc} 
                alt={imageAlt}
                className="h-80 w-auto opacity-90 drop-shadow-lg"
              />
            </div>

            {/* Sub-text that also changes with state */}
            <h2 className="text-2xl font-semibold leading-snug">
              {isLogin ? "Your control center for distributed teams." : "Build your future with intelligent tools."}
            </h2>
            <p className="text-base-300 mt-4 text-sm max-w-sm">
              {isLogin ? "Log in to streamline your operations and connect with your colleagues." : "Sign up for an advanced workflow that scales with your ambition."}
            </p>
          </div>

          <div className="text-xs text-base-300/70 relative z-10">
            © 2026 WEB Tech Platform. Professional UI Edition.
          </div>
        </div>


        {/* === Right Side: The Form (Clean, Modern Blue/White) === */}
        <div className="p-10 md:p-16 bg-base-100 flex items-center justify-center relative overflow-hidden">
          <div className="w-full max-w-md mx-auto">
            
            {/* Header with improved typography */}
            <div className="mb-12">
              <h2 className="text-4xl font-extrabold text-base-900 tracking-tight">
                {isLogin ? "Sign In" : "Create Account"}
              </h2>
              <p className="text-slate-500 mt-3 text-base">
                {isLogin ? "Welcome back! Enter your details to access your secure dashboard." : "Join thousands of teams. Let's get you set up and growing."}
              </p>
            </div>

            <div className="space-y-6">
              
              {/* Name Field (Signup Only) - with subtle transition */}
              {!isLogin && (
                <div className="transition-all duration-500 ease-in-out">
                  <label className="block text-sm font-semibold text-slate-800 mb-1.5">Full Name</label>
                  <input
                    type="text"
                    className="w-full px-5 py-3.5 rounded-xl border border-base-300 bg-base-100 focus:ring-2 focus:ring-blue-500 focus:border-base-300 focus:bg-base-100 outline-none transition-all placeholder:text-base-300 text-base-700"
                    placeholder="E.g. John Doe"
                    onChange={e => setForm({ ...form, name: e.target.value })}
                  />
                </div>
              )}

              {/* Email Field */}
              <div>
                <label className="block text-sm font-semibold text-base-800 mb-1.5">Work Email Address</label>
                <input
                  type="email"
                  className="w-full px-5 py-3.5 rounded-xl border border-base-300 bg-base-100 focus:ring-2 focus:ring-white focus:border-base-300 focus:bg-base-100 outline-none transition-all placeholder:text-base-300 text-base-700"
                  placeholder="name@company.com"
                  onChange={e => setForm({ ...form, email: e.target.value })}
                />
              </div>

              {/* Password Field */}
              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="block text-sm font-semibold text-base-800">Password</label>
                  {isLogin && <span className="text-xs text-blue-600 hover:text-blue-800 hover:underline cursor-pointer font-medium">Forgot your password?</span>}
                </div>
                <input
                  type="password"
                  className="w-full px-5 py-3.5 rounded-xl border border-base-300 bg-base-100 focus:ring-2 focus:ring-white focus:border-base-300 focus:bg-base-100 outline-none transition-all placeholder:text-base-300 text-base-700"
                  placeholder="••••••••"
                  onChange={e => setForm({ ...form, password: e.target.value })}
                />
              </div>

              {/* Terms Checkbox (Signup Only) */}
              {!isLogin && (
                <div className="flex items-start gap-3 pt-2">
                  <input type="checkbox" className="mt-1 w-4 h-4 rounded border-base-300 text-blue-600 focus:ring-blue-500" required />
                  <p className="text-sm text-base-600">I agree to the <span className="text-blue-600 underline font-medium cursor-pointer">Terms of Service</span> and <span className="text-blue-600 underline font-medium cursor-pointer">Privacy Policy</span>.</p>
                </div>
              )}

              {/* Advanced Submit Button (with hover depth) */}
              <button
                onClick={handleSubmit}
                className="w-full py-4 mt-6 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 active:scale-[0.98] transition-all shadow-xl shadow-base-200 "
              >
                {isLogin ? "Sign In to WEB Tech" : "Complete Registration"}
              </button>
            </div>

            {/* Minimal Footer Toggle */}
            <div className="mt-12 text-center pt-8 border-t border-slate-100">
              <p className="text-slate-600 text-sm">
                {isLogin ? "New to WEB Tech?" : "Already managing your team?"}
                <button
                  className="ml-2 font-bold text-blue-600 hover:text-blue-800 transition-colors"
                  onClick={() => setIsLogin(!isLogin)}
                >
                  {isLogin ? "Create an account for free" : "Sign in to your account"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;

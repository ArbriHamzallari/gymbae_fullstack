import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import MyAccount from "./components/Account/MyAccount";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Checkout from "./components/Checkout";
import ProtectedRoute from "./components/ProtectedRoute";
import AboutUs from "./components/AboutUs";
import Language from "./components/Language";
import Support from "./components/Support";
import Terms from "./components/Terms";

function App() {
  return (
    <div className="min-h-screen bg-rose-50 text-gray-800">
      <Navbar />
      <div className="pt-20 px-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/checkout/:tier" element={<Checkout />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/support" element={<Support />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/language" element={<Language />} />
          <Route
            path="/account/*"
            element={
              <ProtectedRoute>
                <MyAccount />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;

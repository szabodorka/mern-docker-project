import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

import Navbar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Welcome from "./components/Welcome/Welcome.jsx";
import SignIn from "./components/Sign-in-up/SignIn.jsx";
import SignUp from "./components/Sign-in-up/SignUp.jsx";
import MyProfile from "./components/Navbar/MyProfile.jsx";
import ChosenToken from "./components/TokenInfo/ChosenToken.jsx";
import CryptoTable from "./components/CryptoTable/CryptoTable.jsx";

export default function App() {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  const [selectedToken, setSelectedToken] = useState(null);
  const [portfolio, setPortfolio] = useState([]);

  return (
    <BrowserRouter>
      <Shell
        user={user}
        setUser={setUser}
        selectedToken={selectedToken}
        setSelectedToken={setSelectedToken}
        portfolio={portfolio}
        setPortfolio={setPortfolio}
      />
    </BrowserRouter>
  );
}

function Shell({
  user,
  setUser,
  selectedToken,
  setSelectedToken,
  portfolio,
  setPortfolio,
}) {
  const navigate = useNavigate();
  const userHandlers = {
    setIsRegistering: (on) => {
      if (on) navigate("/register");
    },
    setIsLoggingIn: (on) => {
      if (on) navigate("/login");
    },
    setIsOnProfile: (on) => {
      navigate(on ? "/profile" : "/");
    },
    user,
    handleLogOut: () => {
      setUser(null);
      setPortfolio([]);
      navigate("/");
    },
  };

  const wrappedSetSelectedToken = (token) => {
    setSelectedToken(token);
    if (token?.id) navigate(`/token/${token.id}`);
  };

  const handleToMainPage = () => navigate("/");

  return (
    <>
      <Navbar
        userHandlers={userHandlers}
        setSelectedToken={wrappedSetSelectedToken}
        handleToMainPage={handleToMainPage}
      />
      <Routes>
        <Route path="/" element={user ? <CryptoTable /> : <Welcome />} />
        <Route path="/login" element={<SignIn setUser={setUser} />} />
        <Route path="/register" element={<SignUp setUser={setUser} />} />
        <Route
          path="/profile"
          element={
            user ? (
              <MyProfile
                user={user}
                setUser={setUser}
                portfolio={portfolio}
                setPortfolio={setPortfolio}
              />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/token/:id"
          element={
            <ChosenToken
              user={user}
              selectedToken={selectedToken}
              portfolio={portfolio}
              setPortfolio={setPortfolio}
            />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </>
  );
}

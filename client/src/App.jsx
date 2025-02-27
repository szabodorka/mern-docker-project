import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import SignIn from "./components/Sign-in-up/SignIn";
import SignUp from "./components/Sign-in-up/SignUp";
import Footer from "./components/Footer/Footer";
import MyProfile from "./components/Navbar/MyProfile";
import CryptoTable from "./components/CryptoTable/CryptoTable";
import Welcome from "./components/Welcome/Welcome";
import ChosenToken from "./components/TokenInfo/ChosenToken";

function App() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isOnProfile, setIsOnProfile] = useState(false);
  const [user, setUser] = useState(null);
  const [selectedToken, setSelectedToken] = useState(null);

  const [portfolio, setPortfolio] = useState([]);
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    if (user && user.tokens.length > 0) {
      localStorage.setItem("user", JSON.stringify(user));
      fetchPortfolio();
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  async function fetchPortfolio() {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1`,
        {
          headers: {
            "x-cg-demo-api-key": "CG-uBfevfq9VNo4mH54FXXjS4vK",
          },
        }
      );
      const data = await response.json();

      const userPortfolio = user.tokens.map((t) => {
        const tokenData = data.find((token) => token.id === t.name);
        const price = tokenData?.current_price || 0;
        const value = price * t.amount;
        return { ...t, price, value };
      });

      setPortfolio(userPortfolio);
      setTotalValue(
        userPortfolio.reduce((total, token) => total + token.value, 0)
      );
    } catch (error) {
      console.error("Error fetching portfolio:", error);
    }
  }

  function handleLogOut() {
    setUser(null);
    setPortfolio([]);
    setTotalValue(0);
  }

  function handleToMainPage() {
    setIsLoggingIn(false);
    setIsRegistering(false);
    setIsOnProfile(false);
    setSelectedToken(false);
  }

  return (
    <>
      <Navbar
        userHandlers={{
          setIsRegistering,
          setIsLoggingIn,
          setIsOnProfile,
          user,
          handleLogOut,
        }}
        setSelectedToken={setSelectedToken}
        handleToMainPage={handleToMainPage}
      />
      {isLoggingIn ? (
        <SignIn
          setIsLoggingIn={setIsLoggingIn}
          setUser={setUser}
          setIsRegistering={setIsRegistering}
        />
      ) : isRegistering ? (
        <SignUp setIsRegistering={setIsRegistering} setUser={setUser} />
      ) : selectedToken ? (
        <ChosenToken
          user={user}
          selectedToken={selectedToken}
          portfolio={portfolio}
          setPortfolio={setPortfolio}
        />
      ) : user ? (
        <ProfileOrDashboard />
      ) : (
        <Welcome />
      )}
      <Footer />
    </>
  );

  function ProfileOrDashboard() {
    if (isOnProfile) {
      return (
        <MyProfile
          user={user}
          portfolio={portfolio}
          setPortfolio={setPortfolio}
        />
      );
    }

    if (selectedToken) {
      return (
        <ChosenToken selectedToken={selectedToken} portfolio={portfolio} />
      );
    }
    return <CryptoTable />;
  }
}

export default App;

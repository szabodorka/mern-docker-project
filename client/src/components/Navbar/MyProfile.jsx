import { useEffect, useState } from "react";
import "./MyProfile.css";

export default function MyProfile({ user }) {
  const [portfolio, setPortfolio] = useState([]);
  const [totalValue, setTotalValue] = useState(0);
  const [tokenInput, setTokenInput] = useState("");
  const [amountInput, setAmountInput] = useState("");

  useEffect(() => {
    if (user && user.tokens.length > 0) {
      fetchPortfolio();
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
        const price = data[t.name]?.usd || 0;
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

  async function addToken() {
    if (!tokenInput || !amountInput) return;

    try {
      const tokenExists = portfolio.find((token) => token.name === tokenInput);
      const newAmount = parseInt(amountInput);

      if (tokenExists) {
        const updatedPortfolio = portfolio.map((token) => {
          if (token.name === tokenInput) {
            const updatedToken = {
              ...token,
              amount: token.amount + newAmount,
              value: (token.amount + newAmount) * token.price,
            };
            return updatedToken;
          }
          return token;
        });

        setPortfolio(updatedPortfolio);

        let total = 0;
        updatedPortfolio.forEach((token) => {
          total += token.value;
        });
        setTotalValue(total);
      } else {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${tokenInput}&vs_currencies=usd`
        );
        const priceData = await response.json();
        const price = priceData[tokenInput]?.usd || 0;
        const value = price * newAmount;

        const newToken = {
          name: tokenInput,
          amount: newAmount,
          price,
          value,
        };

        setPortfolio((prevPortfolio) => [...prevPortfolio, newToken]);

        setTotalValue((prevTotal) => prevTotal + value);
      }

      setTokenInput("");
      setAmountInput("");
    } catch (error) {
      console.error("Error adding token:", error);
    }
  }

  return (
    <div className="myProfile">
      <h2>{user.username}'s Portfolio</h2>
      <h3>Total Portfolio Value: ${totalValue.toFixed(2)}</h3>

      <ul>
        {portfolio.map((token, index) => (
          <li key={index}>
            {token.name}: {token.amount} - ${token.value.toFixed(2)} (Price: $
            {token.price})
          </li>
        ))}
      </ul>

      <h3>Add Cryptocurrency</h3>
      <input
        type="text"
        placeholder="Token (e.g., bitcoin)"
        value={tokenInput}
        onChange={(e) => setTokenInput(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amountInput}
        onChange={(e) => setAmountInput(e.target.value)}
      />
      <button onClick={addToken}>Add Token</button>
    </div>
  );
}

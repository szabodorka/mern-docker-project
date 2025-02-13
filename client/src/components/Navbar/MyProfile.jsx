import { useEffect, useState } from "react";

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
      const tokenNames = user.tokens.map((t) => t.name);
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1`);
      const data = await response.json();
      
      let total = 0;
      const userPortfolio = user.tokens.map((t) => {
        const price = data[t.name]?.usd || 0;
        const value = price * t.amount;
        total += value;
        return { ...t, price, value };
      });

      setPortfolio(userPortfolio);
      setTotalValue(total);
    } catch (error) {
      console.error("Error fetching portfolio:", error);
    }
  }

  async function addToken() {
    if (!tokenInput || !amountInput) return;

    try {
      const response = await fetch("/api/add-token", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: user.username,
          token: { name: tokenInput, amount: parseInt(amountInput) }
        })
      });

      if (response.ok) {
        setTokenInput("");
        setAmountInput("");
        fetchPortfolio(); 
      }
    } catch (error) {
      console.error("Error adding token:", error);
    }
  }

  return (
    <div>
      <h2>{user.username}'s Portfolio</h2>
      <h3>Total Portfolio Value: ${totalValue.toFixed(2)}</h3>

      <ul>
        {portfolio.map((token, index) => (
          <li key={index}>
            {token.name}: {token.amount} - ${token.value.toFixed(2)} (Price: ${token.price})
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

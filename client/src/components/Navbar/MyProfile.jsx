import { useState } from "react";
import "./MyProfile.css";

export default function MyProfile({ user, portfolio, setPortfolio }) {
  const [tokenInput, setTokenInput] = useState("");
  const [amountInput, setAmountInput] = useState("");

  async function addToken() {
    if (!tokenInput || !amountInput) return;

    try {
      const newAmount = parseInt(amountInput);
      const tokenExists = portfolio.find((token) => token.name === tokenInput);

      let updatedPortfolio;

      if (tokenExists) {
        updatedPortfolio = portfolio.map((token) =>
          token.name === tokenInput
            ? { ...token, amount: token.amount + newAmount, value: (token.amount + newAmount) * token.price }
            : token
        );
      } else {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${tokenInput}&vs_currencies=usd`
        );
        const priceData = await response.json();
        const price = priceData[tokenInput]?.usd || 0;
        const value = price * newAmount;

        if (price === 0) {
          alert("Invalid token name! Try again.");
          return;
        }

        updatedPortfolio = [...portfolio, { name: tokenInput, amount: newAmount, price, value }];
      }

      setPortfolio(updatedPortfolio);

      const response = await fetch("/api/add-token", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: user.username,
          token: { name: tokenInput, amount: newAmount },
        }),
      });

      if (!response.ok) throw new Error("Failed to update backend");

      alert(`${tokenInput} successfully added with amount: ${amountInput}`)

      setTokenInput("")
      setAmountInput("")
    } catch (error) {
      console.error("Error adding token:", error);
      alert("An error occurred while adding the token.");
    }
  }

  return (
    <div className="myProfile">
      <h2>{user.username}'s Portfolio</h2>
      <h3>Total Portfolio Value: ${portfolio.reduce((total, token) => total + token.value, 0).toFixed(2)}</h3>

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
        onChange={(e) => setTokenInput(e.target.value.toLowerCase())}
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

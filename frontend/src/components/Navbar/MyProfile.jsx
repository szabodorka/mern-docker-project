import { useState, useEffect } from "react";
import "./MyProfile.css";

export default function MyProfile({ user, portfolio, setPortfolio }) {
  const [tokenInput, setTokenInput] = useState("");
  const [amountInput, setAmountInput] = useState("");

  useEffect(() => {
    if (!user?.username) {
      setPortfolio([]);
      return;
    }

    let isActive = true;

    (async () => {
      try {
        const response = await fetch(
          `/api/portfolio/${encodeURIComponent(user.username)}`
        );
        if (!response.ok) throw new Error("Failed to load portfolio");
        const tokens = await response.json();

        if (!Array.isArray(tokens) || tokens.length === 0) {
          if (isActive) setPortfolio([]);
          return;
        }

        const ids = tokens.map((t) => t.name).join(",");
        let prices = {};
        if (ids) {
          const priceResponse = await fetch(
            `/api/prices?ids=${encodeURIComponent(ids)}`
          );
          if (!priceResponse.ok) throw new Error("Failed to load prices");
          prices = await priceResponse.json();
        }

        const tokenData = tokens.map((t) => {
          const price = prices?.[t.name]?.usd ?? 0;
          const amount = Number(t.amount) || 0;
          return { name: t.name, amount, price, value: price * amount };
        });

        if (isActive) setPortfolio(tokenData);
      } catch (error) {
        if (isActive) console.error("Error loading portfolio:", error);
      }
    })();
    return () => {
      isActive = false;
    };
  }, [user?.username, setPortfolio]);

  if (!user?.username) {
    return (
      <div className="myProfile">
        <h2>Sign in to see your portfolio</h2>
      </div>
    );
  }

  async function addToken() {
    if (!tokenInput || !amountInput) return;

    try {
      const newAmount = parseInt(amountInput);
      const tokenExists = portfolio.find((token) => token.name === tokenInput);

      let updatedPortfolio;

      if (tokenExists) {
        updatedPortfolio = portfolio.map((token) =>
          token.name === tokenInput
            ? {
                ...token,
                amount: token.amount + newAmount,
                value: (token.amount + newAmount) * token.price,
              }
            : token
        );
      } else {
        const priceResponse = await fetch(
          `/api/prices?ids=${encodeURIComponent(tokenInput)}`
        );
        if (!priceResponse.ok) throw new Error("Failed to load prices");
        const priceData = await priceResponse.json();
        const price = priceData[tokenInput]?.usd || 0;
        const value = price * newAmount;

        if (price === 0) {
          alert("Invalid token name! Try again.");
          return;
        }

        updatedPortfolio = [
          ...portfolio,
          { name: tokenInput, amount: newAmount, price, value },
        ];
      }

      setPortfolio(updatedPortfolio);

      const response = await fetch("/api/add-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: user.username,
          token: { name: tokenInput, amount: newAmount },
        }),
      });

      if (!response.ok) throw new Error("Failed to update backend");

      alert(`${tokenInput} successfully added with amount: ${amountInput}`);

      setTokenInput("");
      setAmountInput("");
    } catch (error) {
      console.error("Error adding token:", error);
      alert("An error occurred while adding the token.");
    }
  }

  return (
    <div className="myProfile">
      <h2>{user.username}'s Portfolio</h2>
      <h3>
        Total Portfolio Value: $
        {portfolio.reduce((total, token) => total + token.value, 0).toFixed(2)}
      </h3>

      <ul>
        {portfolio
          .filter((token) => token.value > 0)
          .map((token, index) => (
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

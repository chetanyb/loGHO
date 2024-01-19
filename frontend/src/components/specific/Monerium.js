import React, { useEffect, useState } from "react";
import { MoneriumClient } from "@monerium/sdk";

const Balance = () => {
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const monerium = new MoneriumClient({
          environment: "sandbox",
          clientId: process.env.REACT_APP_MONERIUM_CLIENT_ID,
          clientSecret: process.env.REACT_APP_MONERIUM_CLIENT_SECRET,
        });
        // Get all profiles for the authenticated user
        const authCtx = await monerium.getAuthContext();

        // Fetching all accounts for a specific profile
        const { id: profileId } = await monerium.getProfile(
          authCtx.profiles[0].id
        );
        // Fetching all balances for a specific profile
        const { balances } = await monerium.getBalances(profileId);

        if (balances && balances.length > 0) {
          setBalance(balances[0].balance);
        } else {
          setBalance("No balance available");
        }
      } catch (error) {
        console.error("Error fetching balance:", error);
        //setBalance("Error fetching balance");
        setBalance(error.message);
      }
    };

    fetchBalance();
  }, []);

  return (
    <div>
      <h2>Your Balance</h2>
      {balance ? <p>Your balance is: {balance}</p> : <p>Loading balance...</p>}
    </div>
  );
};

export default Balance;

import React, { useState } from "react";
import { placeOrderMessage } from "@monerium/sdk";
import { WalletClient } from "viem";
import { ethers } from "ethers";

function OffRamp({ monerium }) {
  const [amount, setAmount] = useState("20");
  const [iban, setIban] = useState("");
  const [orderStatus, setOrderStatus] = useState(null);

  const handleOrder = async () => {
    try {
      // Form the message
      const message = placeOrderMessage(amount, iban);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      // Send a signature request to the wallet
      const signature = await signer.signMessage(message);

      // Place the order
      const order = await monerium.placeOrder({
        amount,
        signature,
        address: "",
        counterpart: {
          identifier: {
            standard: "iban",
            iban,
          },
          details: {
            firstName: "User",
            lastName: "Userson",
            country: "IS",
          },
        },
        message,
        memo: "Powered by Monerium SDK",
        chain: "ethereum",
        network: "goerli",
        // supportingDocumentId, if applicable
      });

      setOrderStatus(order);
    } catch (error) {
      console.error("Error placing order:", error);
      setOrderStatus("Error");
    }
  };

  return (
    <div>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount in EUR"
      />
      <input
        type="text"
        className="text-black"
        value={iban}
        onChange={(e) => setIban(e.target.value)}
        placeholder="IBAN"
      />
      <button className="btn bg-red-400 mx-20" onClick={handleOrder}>
        Place Order
      </button>
      {orderStatus && <div>Order Status: {JSON.stringify(orderStatus)}</div>}
    </div>
  );
}

export default OffRamp;

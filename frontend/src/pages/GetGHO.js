import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useAccount } from "wagmi";
import { Monerium } from "../components/specific/Monerium.tsx";
import USDeData from "../assets/abi/USDe.json";

const GetGHO = () => {
  const [amount, setAmount] = useState(0);
  const [tokenBalance, setTokenBalance] = useState(0);
  const [sliderClass, setSliderClass] = useState("success");
  const { address } = useAccount();

  const fetchTokenBalance = async () => {
    if (!address) return;
    const USDeAddress = "0x1b55D077b3459e73354bA2C338425B3A3079fC0f";
    const USDeABI = JSON.parse(USDeData.result);

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(USDeAddress, USDeABI, provider);

    try {
      const balance = await contract.balanceOf(address);
      setTokenBalance(ethers.utils.formatEther(balance));
    } catch (error) {
      console.error("Error fetching token balance:", error);
    }
  };

  useEffect(() => {
    fetchTokenBalance();
  }, [address]);

  const handleAmountChange = (event) => {
    const inputValue = event.target.value;

    if (inputValue === "") {
      setAmount("");
    } else {
      const parsedAmount = parseFloat(inputValue);
      if (!isNaN(parsedAmount) && parsedAmount >= 0) {
        setAmount(parsedAmount);
      }
    }
  };

  const updateSliderClass = () => {
    const value = (amount / tokenBalance) * 100;
    if (value < 75) {
      setSliderClass("success");
    } else if (value < 90) {
      setSliderClass("warning");
    } else {
      setSliderClass("error");
    }
  };

  useEffect(() => {
    updateSliderClass();
  }, [amount, tokenBalance]);

  return (
    <div>
      <Monerium />

      <div className="container borrow-form bg-white p-4 rounded-md shadow-md mx-auto my-12 sm:w-1/2 md:w-1/3 lg:w-1/3">
        <form className="flex flex-col space-y-4">
          <h1 className=" text-xl font-extrabold text-black">Borrow GHO</h1>
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700"
          >
            Amount
          </label>
          <input
            type="number"
            name="amount"
            id="amount"
            className="appearance-none border rounded w-full py-2 px-3 text-gho-light-primary leading-tight bg-white"
            value={amount}
            onChange={handleAmountChange}
            placeholder="Enter amount"
          />
          <input
            type="range"
            className={`range range-${sliderClass}`}
            min="0"
            max={tokenBalance}
            value={amount}
            onChange={handleAmountChange}
          />
          <p>USDe Balance: {tokenBalance}</p>
          <p className="block text-sm font-medium text-gray-700 pt-4">
            Transaction terms
          </p>
          <div className="term-box border-2 rounded-md">
            <p className=" text-sm font-medium text-gray-500 py-1 px-1">
              Health factor: {/*factor*/}
              <br />
              Liquidation threshold: {/*threshold*/}
              <br />
              Borrow APY: {/*apy*/}
              <br />
              Exit load: {"0.5%"}
            </p>
          </div>
          <button
            type="submit"
            className={`bg-gho-light-bg text-white px-4 py-2 rounded font-bold ${
              amount > 0 ? "bg-gho-light-primary" : ""
            }`}
            disabled={amount === 0}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default GetGHO;

import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useAccount } from "wagmi";
import USDeData from "../../assets/abi/USDe.json";
import EUReData from "../../assets/abi/EURe.json";
import GBPeData from "../../assets/abi/GBPe.json";
import USDCData from "../../assets/abi/USDC.json";
import USDeLogo from "../../assets/svg/USDe.svg";
import EUReLogo from "../../assets/svg/EURe.svg";
import GBPeLogo from "../../assets/svg/GBPe.svg";
import USDCLogo from "../../assets/svg/USDC.svg";
import USDTLogo from "../../assets/svg/USDT.svg";
import GHOLogo from "../../assets/svg/GHO_Token.svg";
import { Monerium } from "./Monerium.tsx";

const GetGHO = ({ selectedToken, setSelectedToken }) => {
  const [amount, setAmount] = useState("");
  const [tokenBalance, setTokenBalance] = useState(0);
  const [selectedTokenExchangeRate, setSelectedTokenExchangeRate] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const { address } = useAccount();

  const selectedTokenLogo = () => {
    switch (selectedToken) {
      case "USDe":
        return USDeLogo;
      case "EURe":
        return EUReLogo;
      case "GBPe":
        return GBPeLogo;
      case "USDC":
        return USDCLogo;
      case "USDT":
        return USDTLogo;
      default:
        return USDeLogo;
    }
  };

  const fetchTokenBalance = async () => {
    if (!address) return;
    let tokenAddress, tokenABI;
    switch (selectedToken) {
      case "USDe":
        tokenAddress = "0x1b55D077b3459e73354bA2C338425B3A3079fC0f";
        tokenABI = JSON.parse(USDeData.result);
        break;
      case "EURe":
        tokenAddress = "0x83B844180f66Bbc3BE2E97C6179035AF91c4Cce8";
        tokenABI = JSON.parse(EUReData.result);
        break;
      case "GBPe":
        tokenAddress = "0x687b68644d0b4e3EC9a24FEc4767FCC5854b9572";
        tokenABI = JSON.parse(GBPeData.result);
        break;
      case "USDC":
        tokenAddress = "0x07865c6E87B9F70255377e024ace6630C1Eaa37F";
        tokenABI = JSON.parse(USDCData.result);
        break;
      default:
        tokenAddress = "0x1b55D077b3459e73354bA2C338425B3A3079fC0f";
        tokenABI = JSON.parse(USDeData.result);
        break;
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(tokenAddress, tokenABI, provider);

    try {
      const balance = await contract.balanceOf(address);
      const formattedBalance = ethers.utils.formatEther(balance);
      fetchExchangeRate();
      setTokenBalance(formattedBalance);
    } catch (error) {
      console.error("Error fetching token balance:", error);
    }
  };

  useEffect(() => {
    fetchTokenBalance();
  }, [address, selectedToken]);

  const fetchExchangeRate = async () => {
    const url = `https://api.forexrateapi.com/v1/latest?api_key=${process.env.REACT_APP_FOREX_RATE_API_KEY}&base=USD&currencies=EUR,GBP`;
    //const url = `https://api.exchangeratesapi.io/latest?base=USD&symbols=EUR,GBP`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      switch (selectedToken) {
        case "USDe":
          setSelectedTokenExchangeRate(1);
          break;
        case "EURe":
          if (data.success == false) {
            setSelectedTokenExchangeRate(0);
            break;
          }
          setSelectedTokenExchangeRate(Number(1 / data.rates.EUR));
          break;
        case "GBPe":
          if (data.success === false) {
            setSelectedTokenExchangeRate(0);
            break;
          }
          setSelectedTokenExchangeRate(Number(1 / data.rates.GBP));
          break;
        case "USDC":
          setSelectedTokenExchangeRate(1);
          break;
        default:
          setSelectedTokenExchangeRate(0);
          break;
      }
    } catch (error) {
      console.error("Error fetching exchange rate:", error);
    }
  };

  useEffect(() => {
    fetchExchangeRate();
  }, [selectedToken]);

  const handleAmountChange = (event) => {
    const inputValue = event.target.value;
    if (inputValue === "") {
      setAmount("");
    } else {
      const parsedAmount = parseFloat(inputValue);
      if (
        !isNaN(parsedAmount) &&
        parsedAmount >= 0 &&
        parsedAmount <= tokenBalance * selectedTokenExchangeRate
      ) {
        setAmount(parsedAmount);
      }
    }
  };

  return (
    <div>
      <div className="container borrow-form bg-white p-4 rounded-md mx-auto my-2">
        <form className="flex flex-col space-y-4">
          <h1 className="text-xl font-extrabold text-black">Get GHO</h1>
          <p className="text-md font-bold text-slate-500">
            Get More Stables with Monerium
          </p>
          <Monerium className="flex items-center justify-center text-slate-600" />
          <a
            className="border text-slate-700 text-center bg-gho-dark-primary rounded-md"
            href="https://sandbox.monerium.dev/accounts"
            target="_blank"
          >
            GET STABLECOINS
          </a>
          <select
            className="select select-accent w-full bg-white text-slate-700"
            value={selectedToken}
            onChange={(e) => {
              setSelectedToken(e.target.value);
              setTokenBalance(0);
            }}
          >
            <option disabled className="bg-gho-light-bg text-slate-700">
              Select deposit asset
            </option>
            <option value="USDe" className="bg-gho-light-bg">
              USDe
            </option>
            <option value="EURe" className="bg-gho-light-bg">
              EURe
            </option>
            <option value="GBPe" className="bg-gho-light-bg">
              GBPe
            </option>
            <option value="USDC" className="bg-gho-light-bg">
              USDC
            </option>
            <option value="USDT" className="bg-gho-light-bg">
              USDT
            </option>
          </select>
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
            className="range range-accent"
            min="0"
            max={tokenBalance * selectedTokenExchangeRate}
            value={amount}
            onChange={handleAmountChange}
          />
          <div className="flex items-center">
            <img
              src={selectedTokenLogo()}
              alt={`${selectedToken} logo`}
              className="h-5 w-5"
            />
            <p className="text-slate-500 pl-1">
              {selectedToken} Balance: {tokenBalance}
            </p>
          </div>
          <p className="block text-sm font-medium text-gray-700 pt-4">
            Transaction terms
          </p>
          <div className="term-box border-2 rounded-md">
            <p className="text-sm font-medium text-gray-500 py-1 px-1">
              <div className="flex items-center">
                You will receive:{" "}
                <img src={GHOLogo} alt="GHO Logo" className="h-5 w-5 mr-1" />
                {amount} GHO
              </div>
              Exchange rate: {selectedTokenExchangeRate}
              <br />
              Borrow APY: 0%
              <br />
              Exit load: {"0.5%"}
            </p>
          </div>
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              alert("CALL CONTRACT HERE!");
            }}
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

import React, { useEffect, useState } from "react";
import USDeLogo from "../../assets/svg/USDe.svg";
import EUReLogo from "../../assets/svg/EURe.svg";
import GBPeLogo from "../../assets/svg/GBPe.svg";
import USDCLogo from "../../assets/svg/USDC.svg";
import USDTLogo from "../../assets/svg/USDT.svg";
import GHOLogo from "../../assets/svg/GHO_Token.svg";
import { ethers } from "ethers";
import GHOData from "../../assets/abi/GHO.json";
import { useAccount } from "wagmi";

const LetGHO = () => {
  const [amount, setAmount] = useState(0);
  const [tokenBalance, setTokenBalance] = useState(0);
  const [GHOBalance, setGHOBalance] = useState(0);
  const [selectedToken, setSelectedToken] = useState("USDe");
  const [selectedTokenExchangeRate, setSelectedTokenExchangeRate] = useState(0);
  const { address } = useAccount();


  const fetchGHOBalance = async () => {
    if (!address) return;
    const GHOAddress = "0x6e8b5606658D1Dc4780ba7043D7FC7957e155f95";
    const GHOABI = JSON.parse(GHOData.result);

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(GHOAddress, GHOABI, provider);

    try {
      const GHOBalance = await contract.balanceOf(address);
      setGHOBalance(ethers.utils.formatEther(GHOBalance));
    } catch (error) {
      console.error("Error fetching token balance:", error);
    }
  };

  useEffect(() => {
    fetchGHOBalance();
  }, [address]);

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
        parsedAmount <= GHOBalance * selectedTokenExchangeRate
      ) {
        setAmount(parsedAmount);
      }
    }
  };

  return (
    <div>
      <div className="container borrow-form bg-white p-4 rounded-md mx-auto my-2">
        <form className="flex flex-col space-y-4">
          <h1 className="text-xl font-extrabold text-black">Let GHO</h1>
          <select
            className="select select-accent w-full bg-white text-slate-700"
            onChange={(e) => {
              setSelectedToken(e.target.value);
              setTokenBalance(0);
            }}
          >
            <option
              disabled
              selected
              className="bg-gho-light-bg text-slate-700"
            >
              Select withdrawal asset
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
            <img src={GHOLogo} alt="GHO logo" className="h-5 w-5" />
            <p className="text-slate-500 pl-1">GHO Balance: {GHOBalance}</p>
          </div>
          <p className="block text-sm font-medium text-gray-700 pt-4">
            Transaction terms
          </p>
          <div className="term-box border-2 rounded-md">
            <p className="text-sm font-medium text-gray-500 py-1 px-1">
              <div className="flex items-center">
                You will receive:{" "}
                <img
                  src={selectedTokenLogo()}
                  alt={`${selectedToken} logo`}
                  className="h-5 w-5 mr-1"
                />
                {amount * selectedTokenExchangeRate}
                <br />
              </div>
              Exchange rate: {selectedTokenExchangeRate}
              <br />
              Exit load: {"0.5%"}
            </p>
          </div>
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              alert("Add contract call here");
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

export default LetGHO;

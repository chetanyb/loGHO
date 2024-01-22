import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useAccount } from "wagmi";
import USDeData from "../assets/abi/USDe.json";
import EUReData from "../assets/abi/EURe.json";
import GBPeData from "../assets/abi/GBPe.json";
import USDCData from "../assets/abi/USDC.json";
import GHOData from "../assets/abi/GHO.json";
import GetGHO from "../components/specific/GetGHO";
import LetGHO from "../components/specific/LetGHO";
import Wallet from "../assets/images/wallet.png";
import Bar from "../assets/images/bar-chart.png";
import Fee from "../assets/images/fee.png";
import USDe from "../assets/svg/USDe.svg";
import EURe from "../assets/svg/EURe.svg";
import GBPe from "../assets/svg/GBPe.svg";
import USDC from "../assets/svg/USDC.svg";
import USDT from "../assets/svg/USDT.svg";
import GHO from "../assets/svg/GHO_Token.svg";
import InfoButton from "../components/specific/HoverInfo";

const Dashboard = () => {
  const { address } = useAccount();

  const [USDeBalance, setUSDeBalance] = useState(0);
  const [EUReBalance, setEUReBalance] = useState(0);
  const [GBPeBalance, setGBPeBalance] = useState(0);
  const [USDCBalance, setUSDCBalance] = useState(0);
  const [USDTBalance, setUSDTBalance] = useState(0);
  const [GHOBalance, setGHOBalance] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const [EUReExchangeRate, setEUReExchangeRate] = useState(0);
  const [GBPeExchangeRate, setGBPeExchangeRate] = useState(0);
  const [selectedToken, setSelectedToken] = useState("USDe");

  const fetchUSDeBalance = async () => {
    if (!address) return;
    const USDeAddress = "0x1b55D077b3459e73354bA2C338425B3A3079fC0f";
    const USDeABI = JSON.parse(USDeData.result);

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(USDeAddress, USDeABI, provider);

    try {
      const USDeBalance = await contract.balanceOf(address);
      setUSDeBalance(ethers.utils.formatEther(USDeBalance));
    } catch (error) {
      console.error("Error fetching token balance:", error);
    }
  };

  useEffect(() => {
    fetchUSDeBalance();
  }, [address]);

  const fetchEUReBalance = async () => {
    if (!address) return;
    const EUReAddress = "0x83B844180f66Bbc3BE2E97C6179035AF91c4Cce8";
    const EUReABI = JSON.parse(EUReData.result);

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(EUReAddress, EUReABI, provider);

    try {
      const EUReBalance = await contract.balanceOf(address);
      setEUReBalance(ethers.utils.formatEther(EUReBalance));
    } catch (error) {
      console.error("Error fetching token balance:", error);
    }
  };

  useEffect(() => {
    fetchEUReBalance();
  }, [address]);

  const fetchGBPeBalance = async () => {
    if (!address) return;
    const GBPeAddress = "0x687b68644d0b4e3EC9a24FEc4767FCC5854b9572";
    const GBPeABI = JSON.parse(GBPeData.result);

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(GBPeAddress, GBPeABI, provider);

    try {
      const GBPeBalance = await contract.balanceOf(address);
      setGBPeBalance(ethers.utils.formatEther(GBPeBalance));
    } catch (error) {
      console.error("Error fetching token balance:", error);
    }
  };

  useEffect(() => {
    fetchGBPeBalance();
  }, [address]);

  const fetchUSDCBalance = async () => {
    if (!address) return;
    const USDCAddress = "0x07865c6E87B9F70255377e024ace6630C1Eaa37F";
    const USDCABI = JSON.parse(USDCData.result);

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(USDCAddress, USDCABI, provider);

    try {
      const USDCBalance = await contract.balanceOf(address);
      setUSDCBalance(ethers.utils.formatEther(USDCBalance));
    } catch (error) {
      console.error("Error fetching token balance:", error);
    }
  };

  useEffect(() => {
    fetchUSDCBalance();
  }, [address]);

  const calculateTotalBalance = async () => {
    const totalBalance =
      Number(USDeBalance) +
      Number(EUReBalance) * Number(EUReExchangeRate) +
      Number(GBPeBalance) * Number(GBPeExchangeRate) +
      Number(USDCBalance) +
      Number(GHOBalance); /*+ Number(USDTBalance)*/
    setTotalBalance(totalBalance);
  };

  useEffect(() => {
    calculateTotalBalance();
  }, [
    USDeBalance,
    EUReBalance,
    GBPeBalance,
    USDCBalance,
    EUReExchangeRate,
    GBPeExchangeRate,
  ]);

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

  const fetchExchangeRate = async () => {
    const url = `https://api.forexrateapi.com/v1/latest?api_key=${process.env.REACT_APP_FOREX_RATE_API_KEY}&base=USD&currencies=EUR,GBP`;
    //const url = `https://api.exchangeratesapi.io/latest?base=USD&symbols=EUR,GBP`;
    const response = await fetch(url);
    const data = await response.json();
    setEUReExchangeRate(Number(1 / data.rates.EUR));
    setGBPeExchangeRate(Number(1 / data.rates.GBP));
  };

  useEffect(() => {
    fetchExchangeRate();
  }, []);

  return (
    <div>
      <dialog id="deposit_modal" className="modal">
        <div className="modal-box bg-white w-screen rounded-md shadow-md">
          <form method="dialog">
            <GetGHO
              selectedToken={selectedToken}
              setSelectedToken={setSelectedToken}
            />
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
        </div>
      </dialog>
      <dialog id="redeem_modal" className="modal">
        <div className="modal-box bg-white w-screen rounded-md shadow-md">
          <form method="dialog">
            <LetGHO
              selectedToken={selectedToken}
              setSelectedToken={setSelectedToken}
            />
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
        </div>
      </dialog>
      <div className="flex flex-col">
        <div className="w-full bg-gho-dark-bg">
          <h1 className="mx-60 pb-4 pt-10 text-2xl text-start font-uni-neue-heavy text-slate-200">
            Dashboard
          </h1>
          <div className="flex justify-start mx-60 pb-4">
            <div className="rounded-xl border border-slate-400 w-11 h-11 bg-gho-light-primary flex items-center justify-center">
              <img src={Wallet} alt="wallet" className="w-6 h-6" />
            </div>
            <div className="flex flex-col justify-between ml-4">
              <p className="text-slate-200 font-uni-neue-light text-sm">
                Total Balance<span className="font-sans">≈</span>
              </p>
              <p className="text-slate-200 text-xl">
                ${Number(totalBalance).toFixed(2)}
              </p>
            </div>
            <div className="flex flex-col justify-between ml-10">
              <div className="rounded-xl border border-slate-400 w-11 h-11 bg-gho-light-primary flex items-center justify-center">
                <img src={Bar} alt="bar-chart" className="w-7 h-7" />
              </div>
            </div>
            <div className="flex flex-col justify-between ml-4">
              <p className="text-slate-200 font-uni-neue-light text-sm">
                Rewards
              </p>
              <p className="text-slate-200 text-xl">${5}</p>
            </div>
            <div className="flex flex-col justify-between ml-10">
              <div className="rounded-xl border border-slate-400 w-11 h-11 bg-gho-light-primary flex items-center justify-center">
                <img src={GHO} alt="gho-balance" className="w-7 h-7" />
              </div>
            </div>
            <div className="flex flex-col justify-between ml-4">
              <p className="text-slate-200 font-uni-neue-light text-sm">
                GHO Balance
              </p>
              <p className="text-slate-200 text-xl">{GHOBalance}</p>
            </div>
            <div className="flex flex-col justify-between ml-10">
              <div className="rounded-xl border border-slate-400 w-11 h-11 bg-gho-light-primary flex items-center justify-center">
                <img src={Fee} alt="fee-hand" className="w-7 h-7" />
              </div>
            </div>
            <div className="flex flex-col justify-between ml-4">
              <div className="flex items-center">
                <p className="text-slate-200 font-uni-neue-light text-sm">
                  Fees
                </p>
                <InfoButton />
              </div>
              <p className="text-slate-200 text-xl">{0.5}% Exit load</p>
            </div>
          </div>
        </div>
        <div className="flex w-full">
          <div className="flex w-1/2 justify-center border border-slate-500">
            <div className=" bg-gho-light-bg w-full pt-2">
              <b className=" text-gho-dark-bg font-light text-lg px-5">
                Supply
              </b>
              <ul className="px-5 flex justify-between border-t text-slate-500">
                <li>Asset</li>
                <li className="ml-20">Balance</li>
                <li>Exchange Rate</li>
                <li>Actions</li>
              </ul>
              <ul className="menu w-full rounded-none text-slate-700 px-5">
                <li
                  className="border-t border-slate-500"
                  onClick={() => {
                    setSelectedToken("USDe");

                    document.getElementById("deposit_modal").showModal();
                  }}
                >
                  <div className="justify-between">
                    <a className="flex items-center">
                      <img src={USDe} alt="USDe" className="w-10 h-10 mr-2" />
                      USDe
                    </a>
                    <p>{Number(USDeBalance).toFixed(2)}</p>
                    <p>1.0000</p>
                    <p>Deposit</p>
                  </div>
                </li>
                <li
                  className="border-t border-slate-500"
                  onClick={() => {
                    setSelectedToken("EURe");
                    document.getElementById("deposit_modal").showModal();
                  }}
                >
                  <div className="justify-between">
                    <a className=" flex items-center">
                      <img src={EURe} alt="EURr" className="w-10 h-10 mr-2" />
                      EURe
                    </a>
                    <p>{Number(EUReBalance).toFixed(2)}</p>
                    <p>{Number(EUReExchangeRate).toFixed(4)}</p>
                    <p>Deposit</p>
                  </div>
                </li>
                <li
                  className="border-t border-slate-500"
                  onClick={() => {
                    setSelectedToken("GBPe");
                    document.getElementById("deposit_modal").showModal();
                  }}
                >
                  <div className="justify-between">
                    <a className=" flex items-center">
                      <img src={GBPe} alt="GBPe" className="w-10 h-10 mr-2" />
                      GBPe
                    </a>
                    <p>{Number(GBPeBalance).toFixed(2)}</p>
                    <p>{Number(GBPeExchangeRate).toFixed(4)}</p>
                    <p>Deposit</p>
                  </div>
                </li>
                <li
                  className="border-t border-slate-500"
                  onClick={() => {
                    setSelectedToken("USDC");
                    document.getElementById("deposit_modal").showModal();
                  }}
                >
                  <div className="justify-between">
                    <a className=" flex items-center">
                      <img src={USDC} alt="USDC" className="w-10 h-10 mr-2" />
                      USDC
                    </a>
                    <p>{Number(USDCBalance).toFixed(2)}</p>
                    <p>1.0000</p>
                    <p>Deposit</p>
                  </div>
                </li>
                <li className="border-t border-slate-500">
                  <div className="justify-between -px-10">
                    <a className=" flex items-center">
                      <img src={USDT} alt="USDT" className="w-10 h-10 mr-2" />
                      USDT
                    </a>
                    <p className="-mx-6">-</p>
                    <p className="-mx-6">-</p>
                    <p className="-mx-6">-</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex w-1/2 border border-slate-500">
            <div className=" bg-gho-light-bg w-full pt-2">
              <b className=" text-gho-dark-bg font-light text-lg px-5">
                Redeem
              </b>
              <ul className="px-5 flex justify-between border-t text-slate-500">
                <li>Asset</li>
                <li>Balance</li>
                <li>Actions</li>
              </ul>
              <ul className="menu w-full rounded-none pt-2 text-slate-700">
                <li
                  className="border-t border-slate-500"
                  onClick={() => {
                    setSelectedToken("USDC");
                    document.getElementById("redeem_modal").showModal();
                  }}
                >
                  <div className="flex justify-between rounded-none">
                    <a className="flex items-center">
                      <img src={USDe} alt="vUSDe" className="w-10 h-10" />
                      vUSDe
                    </a>
                    <p>0</p>
                    <p>Redeem</p>
                  </div>
                </li>
                <li
                  className="border-t border-slate-500"
                  onClick={() => {
                    setSelectedToken("USDC");
                    document.getElementById("redeem_modal").showModal();
                  }}
                >
                  <div className="flex justify-between rounded-none">
                    <a className="flex items-center">
                      <img src={EURe} alt="vEURe" className="w-10 h-10" />
                      vEURe
                    </a>
                    <p>0</p>
                    <p>Redeem</p>
                  </div>
                </li>
                <li
                  className="border-t border-slate-500"
                  onClick={() => {
                    setSelectedToken("USDC");
                    document.getElementById("redeem_modal").showModal();
                  }}
                >
                  <div className="flex justify-between rounded-none">
                    <a className="flex items-center">
                      <img src={GBPe} alt="vGBPe" className="w-10 h-10" />
                      vGBPe
                    </a>
                    <p>0</p>
                    <p>Redeem</p>
                  </div>
                </li>
                <li
                  className="border-t border-b border-slate-500"
                  onClick={() => {
                    setSelectedToken("USDC");
                    document.getElementById("redeem_modal").showModal();
                  }}
                >
                  <div className="flex justify-between rounded-none">
                    <a className="flex items-center">
                      <img src={USDC} alt="vUSDC" className="w-10 h-10" />
                      vUSDC
                    </a>
                    <p>0</p>
                    <p>Redeem</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className=" bg-gho-light-bg w-full pt-2 border-2 border-gho-dark-bg">
          <b className=" text-gho-dark-bg font-light text-lg px-5">Off-ramp</b>
          <ul className="px-5 flex justify-between border-t text-slate-500">
            <li>Asset</li>
            <li>Balance</li>
            <li>Actions</li>
          </ul>
          <ul className="menu w-full rounded-none pt-2 text-slate-700">
            <li
              className="border-t border-slate-500"
              onClick={() => {
                setSelectedToken("USDe");

                document.getElementById("deposit_modal").showModal();
              }}
            >
              <div className="justify-between">
                <a className="flex items-center">
                  <img src={USDe} alt="USDe" className="w-10 h-10 mr-2" />
                  USDe
                </a>
                <p>{Number(USDeBalance).toFixed(2)}</p>
                <p>Off-ramp</p>
              </div>
            </li>
            <li
              className="border-t border-slate-500"
              onClick={() => {
                setSelectedToken("EURe");
                document.getElementById("deposit_modal").showModal();
              }}
            >
              <div className="justify-between">
                <a className=" flex items-center">
                  <img src={EURe} alt="EURr" className="w-10 h-10 mr-2" />
                  EURe
                </a>
                <p>{Number(EUReBalance).toFixed(2)}</p>
                <p>Off-ramp</p>
              </div>
            </li>
            <li
              className="border-t border-slate-500"
              onClick={() => {
                setSelectedToken("GBPe");
                document.getElementById("deposit_modal").showModal();
              }}
            >
              <div className="justify-between">
                <a className=" flex items-center">
                  <img src={GBPe} alt="GBPe" className="w-10 h-10 mr-2" />
                  GBPe
                </a>
                <p>{Number(GBPeBalance).toFixed(2)}</p>
                <p>Off-ramp</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

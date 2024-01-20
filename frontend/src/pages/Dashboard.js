import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useAccount } from "wagmi";
import USDeData from "../assets/abi/USDe.json";
import Wallet from "../assets/images/wallet.png";
import Bar from "../assets/images/bar-chart.png";
import Fee from "../assets/images/fee.png";
import USDe from "../assets/svg/USDe.svg";
import EURe from "../assets/svg/EURe.svg";
import GBPe from "../assets/svg/GBPe.svg";
import USDC from "../assets/svg/USDC.svg";
import USDT from "../assets/svg/USDT.svg";
import GHO from "../assets/svg/GHO_Token.svg";

const Dashboard = () => {
  return (
    <div>
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
              <p className="text-slate-200 text-xl">${5}</p>
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
                <img src={Fee} alt="fee-hand" className="w-7 h-7" />
              </div>
            </div>
            <div className="flex flex-col justify-between ml-4">
              <p className="text-slate-200 font-uni-neue-light text-sm">Fees</p>
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
                <li className="ml-24">Balance</li>
                <li>Exchange Rate</li>
                <li>Actions</li>
              </ul>
              <ul className="menu w-full rounded-none text-slate-700 px-5">
                <li className="border-t border-slate-500">
                  <div className="justify-between">
                    <a className="flex items-center">
                      <img src={USDe} alt="USDe" className="w-10 h-10 mr-2" />
                      USDe
                    </a>
                    <p>500</p>
                    <p>500</p>
                    <p>500</p>
                  </div>
                </li>
                <li className="border-t border-slate-500">
                  <div className="justify-between">
                    <a className=" flex items-center">
                      <img src={EURe} alt="EURr" className="w-10 h-10 mr-2" />
                      EURe
                    </a>
                    <p>500</p>
                    <p>500</p>
                    <p>500</p>
                  </div>
                </li>
                <li className="border-t border-slate-500">
                  <div className="justify-between">
                    <a className=" flex items-center">
                      <img src={GBPe} alt="GBPe" className="w-10 h-10 mr-2" />
                      GBPe
                    </a>
                    <p>500</p>
                    <p>500</p>
                    <p>500</p>
                  </div>
                </li>
                <li className="border-t border-slate-500">
                  <div className="justify-between">
                    <a className=" flex items-center">
                      <img src={USDC} alt="USDC" className="w-10 h-10 mr-2" />
                      USDC
                    </a>
                    <p>500</p>
                    <p>500</p>
                    <p>500</p>
                  </div>
                </li>
                <li className="border-t border-slate-500">
                  <div className="justify-between">
                    <a className=" flex items-center">
                      <img src={USDT} alt="USDT" className="w-10 h-10 mr-2" />
                      USDT
                    </a>
                    <p>500</p>
                    <p>500</p>
                    <p>500</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex w-1/2 justify-center border border-slate-500">
            <div className=" bg-gho-light-bg w-full pt-2">
              <b className=" text-gho-dark-bg font-light text-lg px-5">
                Redeem
              </b>
              <ul className="px-5 flex justify-between border-t text-slate-500">
                <li>Asset</li>
                <li>Balance</li>
                <li>Actions</li>
              </ul>
              <ul className="menu w-full bg-gho-dark-primary rounded-none pt-2 text-slate-700">
                <li className="border-t border-b border-slate-500">
                  <div className="flex justify-between">
                    <a className="flex items-center">
                      <img src={GHO} alt="GHO" className="w-10 h-10" />
                      GHO
                    </a>
                    <p>500</p>
                    <p>Redeem</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

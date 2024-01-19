import React, { useState } from "react";
import Header from "../components/layout/Header";
import Balance from "../components/specific/Monerium";

const GetGHO = () => {
  const [amount, setAmount] = useState(0);
  const handleAmountChange = (event) => {
    const inputValue = event.target.value;

    if (inputValue === "") {
      setAmount("");
    } else {
      const parsedAmount = parseInt(inputValue, 10);
      if (!isNaN(parsedAmount) && parsedAmount >= 0) {
        setAmount(parsedAmount);
      }
    }
  };

  return (
    <div className="">
      <Header />
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
          <Balance /> {/* Render the MoneriumBalance component */}
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
              Transaction fee: {/*fee*/}
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

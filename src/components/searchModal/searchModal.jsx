"use client";

import React, { useState } from "react";
import SearchModalBtns from "../searchModalBtns/SearchModalBtns";
import classes from "./searchModal.module.css";
import { useRouter } from "next/navigation";
import { MAX_PRICE, MIN_PRICE, types, countries } from "./searchModalData";
import { AiOutlineClose } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";

const SearchModal = ({ handleHideModal }) => {
  const responseType = {
    error: "error",
    success: "success",
  };

  const [step, setStep] = useState(1);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [type, setType] = useState(0);
  const [country, setCountry] = useState(0);

  const router = useRouter();

  const handleBack = () => {
    if (step === 1) {
      return null;
    }

    setStep((prev) => prev - 1);
  };

  const handleNext = () => {
    if (step === 3) {
      handleSearch();
      return;
    }

    setStep((prev) => prev + 1);
  };

  const handleSearch = () => {
    if (type && country && minPrice && maxPrice && maxPrice > minPrice) {
      const url = `/search?type=${type}&country=${country}&minPrice=${minPrice}&maxPrice=${maxPrice}`;
      router.push(url);
    } else {
      return notify("Fill all fields", responseType.error);
    }
  };

  function notify(text, response) {
    toast[response](text);
  }

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        {step === 1 && (
          <div className={classes.step_1}>
            <h2 className={classes.title}>Pick Your Desired Price</h2>
            <div className={classes.inputsContainer}>
              <div className={classes.inputWrapper}>
                <label htmlFor="minPrice">Min price</label>
                <input
                  id="minPrice"
                  type="number"
                  value={minPrice}
                  min={MIN_PRICE}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
              </div>
              <div className={classes.inputWrapper}>
                <label htmlFor="maxPrice">Max Price</label>
                <input
                  id="maxPrice"
                  type="number"
                  value={maxPrice}
                  max={MAX_PRICE}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>
            </div>
          </div>
        )}
        {step === 2 && (
          <div className={classes.step_2}>
            <h2 className={classes.title}>Pick a type</h2>
            <div className={classes.selectContainer}>
              <select
                className={classes.type}
                onChange={(e) => setType((prev) => e.target.value)}
                value={type}
              >
                {types.map((type, i) => (
                  <option value={i} key={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
        {step === 3 && (
          <div className={classes.step_3}>
            <h2 className={classes.title}>Location of estate</h2>
            <div className={classes.selectContainer}>
              <select
                className={classes.country}
                onChange={(e) => setCountry((prev) => e.target.value)}
                value={country}
              >
                {countries.map((country, i) => (
                  <option value={i} key={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
        <SearchModalBtns
          step={step}
          handleBack={handleBack}
          handleNext={handleNext}
        />
        <AiOutlineClose
          onClick={handleHideModal}
          className={classes.closeIcon}
          size={20}
        />
      </div>
      <ToastContainer />
    </div>
  );
};

export default SearchModal;

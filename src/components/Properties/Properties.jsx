"use client";

import React from "react";
import classes from "./properties.module.css";
import PropertyCard from "../propertyCard/PropertyCard";

const Properties = ({ properties }) => {
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.titles}>
          <h2 className={classes.mainTitle}>Most viewed properties</h2>
          <h5 className={classes.secondaryTitle}>Check them out</h5>
        </div>
        <div className={classes.propertyContainer}>
          {properties?.length > 0 ? (
            properties.map((property) => (
              <PropertyCard
                // TODO: IN OUR DB THE ID GOING TO BE _ID
                key={property._id}
                property={property}
              />
            ))
          ) : (
            <h2>No properties listed</h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default Properties;

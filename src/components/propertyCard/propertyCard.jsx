import React from "react";
import Image from "next/image";
import Link from "next/link";
import classes from "./propertyCard.module.css";

const PropertyCard = ({ property }) => {
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.imageContainer}>
          <Image src={property?.img} width="350" height="300" alt="house" />
          <span className={classes.propertyCategory}>{property?.type}</span>
          <div className={classes.propertyData}>
            <h5>{property?.title}</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;

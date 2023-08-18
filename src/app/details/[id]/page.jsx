"use client";

import React, { useEffect, useState } from "react";
import classes from "./detail.module.css";
import Image from "next/image";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import { FaBed } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { countries, types } from "@/components/searchModal/searchModalData";
import EditModal from "@/components/editModal/EditModal";
import { useRouter } from "next/navigation";
import { propertiesData } from "@/components/Properties/PropertiesData";

const Details = (ctx) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [property, setProperty] = useState("");
  const router = useRouter();
  const id = ctx.params.id;
  const isOwner = true;

  useEffect(() => {
    const fetchProperty = () => {
      const property = propertiesData.find(
        (p) => p.id.toString() === id.toString()
      );
      setProperty(property);
    };
    fetchProperty();
  }, []);

  const handleOpenEditModal = () => setShowEditModal((prev) => true);
  const handleHideEditModal = () => setShowEditModal((prev) => false);

  const handleDelete = () => {};

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.imageContainer}>
          <Image src={property?.img} height="750" width="1000" alt="house" />
          <span className={classes.category}>{property?.type}</span>
        </div>
        <div className={classes.propertyData}>
          <div className={classes.propertySection}>
            <h2 className={classes.title}>{property?.title}</h2>
            {isOwner && (
              <div className={classes.controls}>
                <button onClick={handleOpenEditModal}>
                  <BsFillPencilFill />
                </button>
                <button onClick={handleDelete}>
                  <BsFillTrashFill />
                </button>
              </div>
            )}
          </div>
          <div className={classes.propertySection}>
            <h5 className={classes.country}>{property?.country}</h5>
            <span className={classes.type}>{property?.type}</span>
          </div>
          <div className={classes.propertySection}>
            <h5 className={classes.sqmeters}>
              Sq. meters {property?.sqmeters}
            </h5>
            <span className={classes.beds}>
              {property?.beds}
              <FaBed />
            </span>
          </div>
          <div className={classes.propertySection}>
            <span className={classes.price}>Price: ${property?.price}</span>
          </div>
        </div>
      </div>
      {showEditModal && (
        <EditModal
          handleHideEditModal={handleHideEditModal}
          property={property}
          id={id}
        />
      )}
    </div>
  );
};

export default Details;

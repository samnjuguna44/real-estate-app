"use client";
import React, { useEffect, useState } from "react";
import classes from "./search.module.css";
import PropertyCard from "@/components/propertyCard/PropertyCard";
import { useSearchParams } from "next/navigation";
import qs from "query-string";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { countries, types } from "@/components/searchModal/searchModalData";

const Search = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("http://localhost:3000/api/property");
        const data = await res.json();

        setProperties(data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    fetchProperties();
  }, []);

  useEffect(() => {
    const filteredProperties = () => {
      if (isLoading || properties?.length === 0) return;

      const { type, country, minPrice, maxPrice } = qs.parse(
        searchParams.toString()
      );

      setFilteredProperties(prev => {
        return properties.filter((property) => {
          const countryIndex = countries.findIndex((country) => country === property.country)
          const typeIndex = types.findIndex((type) => type === property.type)
          
          return (
            countryIndex === Number(type) &&
            typeIndex === Number(country) &&
            property.price > Number(minPrice) &&
            property.price < Number(maxPrice)
          );
        });
      });
    };
    properties?.length > 0 && filteredProperties();
  }, [properties]);

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.titles}>
          <h2 className={classes.mainTitle}>
            Here are your desired properties
          </h2>
          <h5 className={classes.secondaryTitle}>Happy browsing</h5>
        </div>
        <div className={classes.properties}>
          {filteredProperties?.map((property) => (
            <PropertyCard key={property?._id} property={property} />
          ))}
        </div>
      </div>
      <div
        onClick={() => {
          router.push("/");
        }}
        className={classes.goBack}
      >
        <AiOutlineArrowLeft size={25} />
        <span>Go Back</span>
      </div>
    </div>
  );
};

export default Search;

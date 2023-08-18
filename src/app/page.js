"use client";

import Hero from "@/components/Hero/Hero";
import Properties from "@/components/Properties/Properties";
import { useEffect, useState } from "react";

export default function Home() {
  const [estates, setEstates] = useState([]);

  useEffect(() => {
    const fetchEstates = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/property");
        const data = await res.json();

        setEstates(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEstates();
  }, []);

  return (
    <main>
      <Hero />
      <Properties properties={estates} />
    </main>
  );
}

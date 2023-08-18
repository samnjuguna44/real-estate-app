"use client";

import React, { useState } from "react";
import classes from "./navbar.module.css";
import Link from "next/link";
import ListModal from "../listModal/ListModal";
import { signIn, signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const page = usePathname();
  const { data: session } = useSession();
  const [showListModal, setShowListModal] = useState(false);

  if (page.includes("login") || page.includes("register")) return null;

  const handleShowListModal = () => {
    setShowListModal((prev) => true);
  };

  const handleHideListModal = () => {
    setShowListModal((prev) => false);
  };

  return (
    <header className={classes.container}>
      <nav className={classes.wrapper}>
        <Link className={classes.left} href="/">
          <h2>Samson Villas</h2>
        </Link>
        <div className={classes.right}>
          {session?.user?.email != null ? (
            //if the user is logged in
            <>
              <span className={classes.username}>{session?.user?.email}</span>
              <button onClick={() => signOut()} className={classes.logoutBtn}>
                Logout
              </button>
              <span onClick={handleShowListModal} className={classes.list}>
                List
              </span>
              {showListModal && (
                <ListModal handleHideListModal={handleHideListModal} />
              )}
            </>
          ) : (
            <>
              <span>Hello guest!</span>
              <button onClick={() => signIn()} className={classes.login}>
                Log in
              </button>
              <Link className={classes.register} href="/register">
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

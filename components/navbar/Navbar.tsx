"use client";

import Image from "next/image";
import Logo from "../../assets/img/logo.png";
import { usePathname } from "next/navigation";
import Button from "../button/Button";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { useEffect, useState } from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";
import Link from "next/link";

const Navbar = () => {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  function handleLogout() {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        setIsLoggedIn(false);
        setUsername("");
      })
      .catch((error) => {
        // An error happened.
        console.error("Logout error:", error);
      });
  }

  useEffect(() => {
    // Subscribe to the auth state change
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setIsLoggedIn(true);
        setUsername(user.displayName || "User"); // Default to 'User' if displayName is not available
      } else {
        // User is signed out
        setIsLoggedIn(false);
        setUsername("");
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []); // Remove isLoggedIn and username from the dependencies array

  return (
    <nav className="bg-white flex flex-row gap-[20px] justify-between items-center px-[100px] py-[25px] shadow-lg fixed w-full z-[100]">
      <Image alt="logo" src={Logo} />
      <div className="flex gap-[48px] items-center">
        <Link
          href="/"
          className={`hover:animate-smallBounce text-neutral-10 text-[16px] cursor-pointer ${
            pathname == "/" ? "underline underline-offset-8" : ""
          }`}
        >
          Home
        </Link>
        <Link
          href="/calculator"
          className={`hover:animate-smallBounce text-neutral-10 text-[16px] cursor-pointer ${
            pathname == "/calculator" ? "underline underline-offset-8" : ""
          }`}
        >
          Calculator
        </Link>
        <Link
          href="/articles"
          className={`hover:animate-smallBounce text-neutral-10 text-[16px] cursor-pointer ${
            pathname == "/articles" ? "underline underline-offset-8" : ""
          }`}
        >
          Articles
        </Link>
        {isLoggedIn ? (
          <>
            <Menu>
              <MenuButton minW={"100px"}>
                <p className="text-[16px] text-neutral-10 underline underline-offset-8">
                  {username}
                </p>
              </MenuButton>
              <MenuList className="text-[16px] text-red-400 font-semibold">
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </>
        ) : (
          <>
            <Button
              isThin={true}
              text="Login"
              dest="/auth/login"
              isAnimate={false}
            />
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

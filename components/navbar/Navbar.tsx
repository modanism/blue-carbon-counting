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

const Navbar = () => {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [username, setUsername] = useState("");

  function handleLogout() {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        setIsLoggedIn(true);
        setUsername(user.displayName ?? "");
        // ...
      } else {
        // User is signed out
        // ...
        setIsLoggedIn(false);
      }
    });
  }, [isLoggedIn, username]);

  return (
    <nav className="bg-white flex flex-row gap-[20px] justify-between items-center px-[100px] py-[25px] shadow-lg fixed w-full z-[100]">
      <Image alt="logo" src={Logo} />
      <div className="flex gap-[48px] items-center">
        <a
          href="/"
          className={`hover:animate-smallBounce text-neutral-10 text-[16px] cursor-pointer ${
            pathname == "/" ? "underline underline-offset-8" : ""
          }`}
        >
          Home
        </a>
        <a
          href="/calculator"
          className={`hover:animate-smallBounce text-neutral-10 text-[16px] cursor-pointer ${
            pathname == "/calculator" ? "underline underline-offset-8" : ""
          }`}
        >
          Calculator
        </a>
        <a
          href="/articles"
          className={`hover:animate-smallBounce text-neutral-10 text-[16px] cursor-pointer ${
            pathname == "/articles" ? "underline underline-offset-8" : ""
          }`}
        >
          Articles
        </a>
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

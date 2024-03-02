import React from "react";
import logo from "../img/logo.png";
import avatar from "../img/avatar.png";
import { MdShoppingBasket, MdAdd, MdLogout } from "react-icons/md";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.config";
import { useStateValue } from "./Context/state-context";
import { actionType } from "./Context/reducer";
import { useState } from "react";

const Header = () => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const [state, dispatch] = useStateValue();

  const [isMenu, setIsMenu] = useState(false);

  const login = async function () {
    if (state.user) {
      setIsMenu((prev) => !prev);
      return;
    }
    const {
      user: { refreshToken, providerData },
    } = await signInWithPopup(firebaseAuth, provider);

    dispatch({
      type: actionType.SET_USER,
      user: providerData[0],
    });

    localStorage.setItem("user", JSON.stringify(providerData[0]));
  };

  const logout = function () {
    setIsMenu(false);
    localStorage.removeItem("user");
    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
  };

  const showCart = function () {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !state.cartShow,
    });
  };

  return (
    <header className="w-screen fixed z-50 p-3 px-4 md:p-6 md:px-16 bg-primary  ">
      {/* Destop & tablet */}
      <div className="hidden w-full h-full p-4 justify-between items-center md:flex">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => setIsMenu(false)}
        >
          <img src={logo} className="w-8 object-cover" alt="logo" />
          <p className="text-headingColor text-xl font-bold">City</p>
        </Link>

        <div className="flex gap-10">
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="flex items-center gap-8"
          >
            <li
              className="text-base text-headingColor cursor-pointer duration-100 ease-in-out transition-all"
              onClick={() => setIsMenu(false)}
            >
              Home
            </li>
            <li
              className="text-base text-headingColor cursor-pointer duration-100 ease-in-out transition-all"
              onClick={() => setIsMenu(false)}
            >
              Menu
            </li>
            <li
              className="text-base text-headingColor cursor-pointer duration-100 ease-in-out transition-all"
              onClick={() => setIsMenu(false)}
            >
              About Us
            </li>
            <li
              className="text-base text-headingColor cursor-pointer duration-100 ease-in-out transition-all"
              onClick={() => setIsMenu(false)}
            >
              Service
            </li>
          </motion.ul>

          <motion.div
            whileTap={{ scale: 0.6 }}
            className="relative flex justify-center items-center"
            onClick={() => {
              setIsMenu(false);
              showCart();
            }}
          >
            <MdShoppingBasket className="text text-textColor text-3xl cursor-pointer flex justify-center items-center relative top-0" />
            {state.cartItems && state.cartItems.length > 0 && (
              <div className="w-5 h-5 bg-cartNumBg rounded-full flex justify-center items-center absolute -top-2 -right-2">
                <p className="text-sm text-white font-semibold">
                  {state.cartItems.length}
                </p>
              </div>
            )}
          </motion.div>

          <div className="relative">
            <motion.img
              whileTap={{ scale: 0.6 }}
              src={state.user ? state.user.photoURL : avatar}
              className="w-10 h-10 drop-shadow-2xl cursor-pointer rounded-full"
              alt="avatar"
              onClick={login}
            />

            {isMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.2 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.2 }}
                className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute right-0 top-12"
              >
                {state.user && (
                  <Link to="/create-item" onClick={() => setIsMenu(false)}>
                    <p
                      className="px-4 py-2 flex justify-between items-center gap-3 cursor-pointer
                  hover:bg-slate-100 transition-all duration-300 ease-in-out text-textColor text-base"
                    >
                      New Item <MdAdd />
                    </p>
                  </Link>
                )}

                <p
                  className="px-4 py-2 flex justify-between items-center gap-3 cursor-pointer
              hover:bg-slate-100 transition-all duration-300 ease-in-out text-textColor text-base"
                  onClick={logout}
                >
                  Logout
                  <MdLogout />
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* mobile */}
      <div className="flex justify-between items-center w-full h-full p-4 md:hidden">
        <motion.div
          whileTap={{ scale: 0.6 }}
          className="relative flex justify-center items-center"
          onClick={() => {
            setIsMenu(false);
            showCart();
          }}
        >
          <MdShoppingBasket className="text text-textColor text-3xl cursor-pointer flex justify-center items-center relative top-0" />
          {state.cartItems && state.cartItems.length > 0 && (
            <div className="w-5 h-5 bg-cartNumBg rounded-full flex justify-center items-center absolute -top-2 -right-2">
              <p className="text-sm text-white font-semibold">
                {state.cartItems.length}
              </p>
            </div>
          )}
        </motion.div>

        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => setIsMenu(false)}
        >
          <img src={logo} className="w-8 object-cover" alt="logo" />
          <p className="text-headingColor text-xl font-bold">City</p>
        </Link>

        <div className="relative">
          <motion.img
            whileTap={{ scale: 0.6 }}
            src={state.user ? state.user.photoURL : avatar}
            className="w-10 h-10 drop-shadow-2xl cursor-pointer rounded-full"
            alt="avatar"
            onClick={login}
          />

          {isMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.2 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.2 }}
              className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute right-0 top-12"
            >
              {state.user && (
                <Link to="/create-item" onClick={() => setIsMenu(false)}>
                  <p
                    className="px-4 py-2 flex justify-between items-center gap-3 cursor-pointer
                  hover:bg-slate-100 transition-all duration-300 ease-in-out text-textColor text-base"
                  >
                    New Item <MdAdd />
                  </p>
                </Link>
              )}

              <ul className="flex flex-col items-start justify-center">
                <li
                  onClick={() => setIsMenu(false)}
                  className="text-base text-headingColor cursor-pointer duration-100 px-4 py-2 ease-in-out transition-all w-full h-full hover:bg-slate-100"
                >
                  Home
                </li>
                <li
                  onClick={() => setIsMenu(false)}
                  className="text-base text-headingColor cursor-pointer duration-100 px-4 py-2 ease-in-out transition-all w-full h-full hover:bg-slate-100"
                >
                  Menu
                </li>
                <li
                  onClick={() => setIsMenu(false)}
                  className="text-base text-headingColor cursor-pointer duration-100 px-4 py-2 ease-in-out transition-all w-full h-full hover:bg-slate-100"
                >
                  About Us
                </li>
                <li
                  onClick={() => setIsMenu(false)}
                  className="text-base text-headingColor cursor-pointer duration-100 px-4 py-2 ease-in-out transition-all w-full h-full hover:bg-slate-100"
                >
                  Service
                </li>
              </ul>

              <p
                className="px-4 py-2 flex justify-between items-center gap-3 cursor-pointer
              hover:bg-gray-300 transition-all duration-300 ease-in-out text-textColor text-base bg-gray-200 shadow-md"
                onClick={logout}
              >
                Logout
                <MdLogout />
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

import React, { useEffect, useRef, useState } from "react";
import { MdShoppingBasket } from "react-icons/md";
import { motion } from "framer-motion";
import NotFound from "../img/NotFound.svg";
import { useStateValue } from "./Context/state-context";
import { actionType } from "./Context/reducer";

const RowContainer = ({ flag, data, scrollValue }) => {
  // console.log(data);

  const [items, setItems] = useState([]);
  const [{ cartItems }, dispatch] = useStateValue();

  const rowContainerRef = useRef();

  const addToCart = function () {
    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: items,
    });
  };

  useEffect(() => {
    addToCart();
  }, [items]);

  useEffect(() => {
    rowContainerRef.current.scrollLeft += scrollValue;
  }, [scrollValue]);

  return (
    <div
      ref={rowContainerRef}
      className={`w-full flex items-center gap-3  my-12 scroll-smooth ${
        flag
          ? "overflow-x-scroll scrollbar-none"
          : "overflow-x-hidden flex-wrap justify-center"
      }`}
    >
      {data && data.length > 0 ? (
        data.map((item) => (
          <div
            key={item.id}
            className="w-300 min-w-[300px] md:w-350 md:min-w-[340px] h-auto my-8 bg-cardOverlay transition-all duration-300 rounded-xl p-4 backdrop-blur-lg hover:drop-shadow-lg"
          >
            <div className="w-full h-[130px] flex items-start justify-between">
              <motion.img
                whileHover={{ scale: 1.2 }}
                src={item.imageURL}
                alt=""
                className="w-40 h-full object-contain -mt-8 drop-shadow-2xl"
              />
              <motion.div
                whileTap={{ scale: 0.75 }}
                className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer mt-2 hover:shadow-2xl"
                onClick={() => setItems([...cartItems, item])}
              >
                <MdShoppingBasket className="text-white" />
              </motion.div>
            </div>

            <div className="w-full flex flex-col items-end justify-end">
              <p className="text-textColor font-semibold text-base md:text-lg">
                {item.title}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {item.calories} Calories
              </p>
              <div className="flex items-center gap-8">
                <p className="text-lg text-textColor font-semibold">
                  <span className="text-sm text-red-500">$</span>
                  {item.price}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="w-full flex flex-col items-center justify-center">
          <img src={NotFound} alt="NotFound" className="h-340" />
          <p className="text-xl text-textColor font-semibold my-2">
            Items Not Availabe
          </p>
        </div>
      )}
    </div>
  );
};

export default RowContainer;

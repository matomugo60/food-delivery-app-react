import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BiMinus, BiPlus } from "react-icons/bi";
import { useStateValue } from "./Context/state-context";
import { actionType } from "./Context/reducer";

let items = [];

const CartItems = ({ item, setFlag, flag }) => {
  const [qty, setQty] = useState(item.qty);

  const [{ cartItems }, dispatch] = useStateValue();

  const cartDispatch = function () {
    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: items,
    });
  };

  const updateQty = function (type, id) {
    if (type === "add") {
      setQty((prevQty) => prevQty + 1);

      cartItems.map((item) => {
        if (item.id === id) {
          item.qty++;
          setFlag(flag + 1);
        }
      });

      cartDispatch();
    }

    if (type === "remove") {
      if (qty === 1) {
        items = cartItems.filter((item) => item.id !== id);
        setFlag(flag + 1);
        cartDispatch();
      } else {
        setQty(qty - 1);
        cartItems.map((item) => {
          if (item.id === id) {
            item.qty--;
          }
        });
        setFlag(flag + 1);
        cartDispatch();
      }
    }
  };

  useEffect(() => {
    items = cartItems;
  }, [qty]);

  return (
    <div className="w-full p-1 px-2 rounded-lg bg-cartItem flex items-center gap-2">
      <img
        src={item.imageURL}
        alt="img"
        className="w-20 h-20 max-w-[60px] rounded-full object-contain"
      />

      {/* main section */}
      <div className="flex flex-col gap-2">
        <p className="text-base text-gray-50">{item.title}</p>
        <p className="text-sm text-gray-300 font-semibold">
          $ {(item.price * qty).toFixed(2)}
        </p>
      </div>

      {/* button  */}
      <div className="group flex items-center gap-2 ml-auto cursor-pointer">
        <motion.div
          className="text-gray-50"
          whileTap={{ scale: 0.75 }}
          onClick={() => updateQty("remove", item.id)}
        >
          <BiMinus />
        </motion.div>
        <p className="w-5 h-5 rounded-sm bg-cartBg text-gray-50 flex items-center justify-center">
          {qty}
        </p>
        <motion.div
          className="text-gray-50"
          whileTap={{ scale: 0.75 }}
          onClick={() => updateQty("add", item.id)}
        >
          <BiPlus />
        </motion.div>
      </div>
    </div>
  );
};

export default CartItems;

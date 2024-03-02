import React, { useRef, useState } from "react";
import HomeContainer from "./HomeContainer";
import { motion } from "framer-motion";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import RowContainer from "./RowContainer";
import { useStateValue } from "./Context/state-context";
import MenuContainer from "./MenuContainer";
import CartContainer from "./CartContainer";

const MainContainer = () => {
  const [{ foodItems, cartShow }, dispatch] = useStateValue();

  const [scrollValue, setScrollValue] = useState(0);

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center">
      <HomeContainer />

      <section className="w-full p-4 mt-80 md:my-10">
        <div className="w-full flex items-center justify-between">
          <p
            className="text-2xl font-semibold capitalize text-textColor relative before:absolute before:content before:rounded-lg
          before:w-32 before:h-1 before:-bottom-3 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-400 transition-all ease-in-out duration-300"
          >
            Our fresh & Healthy fruits
          </p>

          <div className="hidden md:flex items-center gap-3">
            <motion.div
              whileTap={{ scale: "0.75" }}
              className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer
            transition-all duration-300 ease-in-out hover:shadow-lg flex items-center justify-center"
              onClick={() =>
                setScrollValue((prev) => {
                  if (prev > 0) return -100;
                  else return (prev -= 100);
                })
              }
            >
              <MdChevronLeft className="text-lg text-white" />
            </motion.div>
            <motion.div
              whileTap={{ scale: "0.75" }}
              className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer
            transition-all duration-300 ease-in-out hover:shadow-lg flex items-center justify-center"
              onClick={() =>
                setScrollValue((prev) => {
                  if (prev < 0) return 100;
                  else return (prev += 100);
                })
              }
            >
              <MdChevronRight className="text-lg text-white" />
            </motion.div>
          </div>
        </div>
        <RowContainer
          scrollValue={scrollValue}
          flag={true}
          data={foodItems?.filter((n) => n.category === "fruits")}
        />
      </section>

      <MenuContainer />

      {cartShow && <CartContainer />}
    </div>
  );
};

export default MainContainer;

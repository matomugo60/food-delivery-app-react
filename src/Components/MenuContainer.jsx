import React, { useEffect, useRef, useState } from "react";
import { IoFastFood } from "react-icons/io5";
import { categories } from "./Utils/data";
import { motion } from "framer-motion";
import RowContainer from "./RowContainer";
import { useStateValue } from "./Context/state-context";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const MenuContainer = () => {
  const [filter, setFilter] = useState("chicken");

  const [{ foodItems }, dispatch] = useStateValue();

  const [scrollValue2, setScrollValue2] = useState(0);

  const rowContainerRef = useRef();

  useEffect(() => {
    rowContainerRef.current.scrollLeft += scrollValue2;
  }, [scrollValue2]);

  return (
    <section className="w-full p-4" id="menu">
      <div className="w-full flex flex-col  justify-center items-center">
        <p
          className="text-2xl font-semibold capitalize text-textColor relative before:absolute before:content before:rounded-lg
          before:w-16 before:h-1 mr-auto before:-bottom-3 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-400 transition-all ease-in-out duration-300"
        >
          Our Hot Dishes
        </p>

        <div className="hidden sm:flex lg:hidden ml-auto mb-12 items-center gap-3">
          <motion.div
            whileTap={{ scale: "0.75" }}
            className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer
            transition-all duration-300 ease-in-out hover:shadow-lg flex items-center justify-center"
            onClick={() =>
              setScrollValue2((prev) => {
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
              setScrollValue2((prev) => {
                if (prev < 0) return 100;
                else return (prev += 100);
              })
            }
          >
            <MdChevronRight className="text-lg text-white" />
          </motion.div>
        </div>

        <div
          ref={rowContainerRef}
          className="w-full flex items-center justify-start lg:justify-center gap-8 my-6 overflow-x-scroll scrollbar-none"
        >
          {categories &&
            categories.map((category) => (
              <motion.div
                whileTap={{ scale: 0.6 }}
                onClick={() => setFilter(category.urlParamName)}
                key={category.id}
                className={`group ${
                  filter === category.urlParamName ? "bg-cartNumBg" : "bg-white"
                } w-24 min-w-[94px] h-28 cursor-pointer rounded-lg drop-shadow-xl
                flex flex-col gap-3 items-center justify-center hover:bg-cartNumBg duration-300 transition-all ease-in-out`}
              >
                <div
                  className={`w-10 h-10 rounded-full shadow-lg ${
                    filter === category.urlParamName
                      ? "bg-white"
                      : "bg-cartNumBg"
                  } group-hover:bg-white flex items-center duration-300 transition-all ease-in-out justify-center`}
                >
                  <IoFastFood
                    className={` ${
                      filter === category.urlParamName
                        ? "text-textColor"
                        : "text-white"
                    } group-hover:text-textColor text-lg duration-300 transition-all ease-in-out`}
                  />
                </div>
                <p
                  className={`text-sm  ${
                    filter === category.urlParamName
                      ? "text-white"
                      : "text-textColor"
                  } group-hover:text-white duration-300 transition-all ease-in-out`}
                >
                  {category.name}
                </p>
              </motion.div>
            ))}
        </div>

        <div className="w-full">
          <RowContainer
            flag={false}
            data={foodItems?.filter((n) => n.category === filter)}
          />
        </div>
      </div>
    </section>
  );
};

export default MenuContainer;

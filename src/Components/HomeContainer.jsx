import React from "react";
import delivery from "../img/delivery.png";
import heroBg from "../img/heroBg.png";
import { heroData } from "./Utils/data";

const HomeContainer = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full" id="home">
      <div className="py-2 flex-1 flex flex-col items-start justify-center gap-6">
        <div className="flex items-center gap-2 justify-center mx-auto bg-orange-100 px-4 py-2 rounded-full">
          <p className="text-base text-orange-500 font-semibold">
            Bike Delivery
          </p>
          <div className="w-8 h-8 bg-white rounded-full overflow-hidden drop-shadow-xl">
            <img
              src={delivery}
              className="w-full h-full object-contain"
              alt="delivery"
            />
          </div>
        </div>

        <p className="text-[2.5rem] font-bold tracking-wide text-headingColor">
          The Fastest Delivery In{" "}
          <span className="text-orange-600 text-[3rem]">Your City</span>
        </p>

        <p className="text-base text-textColor text-center md:text-left md:w-[80%]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero in nihil
          minima error ullam fugit ipsum perspiciatis quasi ab reiciendis,
          tempora doloremque. Ea, dolor repudiandae ipsam totam est odit sit!
        </p>

        <button
          type="button"
          className="text bg-gradient-to-br mx-auto from-orange-400 to-orange-500 w-full md:w-auto px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-300"
        >
          Order Now
        </button>
      </div>

      <div className="py-2 flex-1 flex items-center justify-center relative">
        <div className="w-[90%] mx-auto lg:w-auto h-420 lg:h-650 flex items-center justify-center relative overflow-hidden">
          <img
            src={heroBg}
            className="w-full lg:w-auto h-full"
            alt="hero background"
          />
        </div>

        <div className="w-[90%] md:w-full lg:w-[90%] xl:w-[70%]  h-full absolute top-0 md:left-0 gap-2 grid grid-cols-1 md:grid-cols-2 items-center justify-center  py-4">
          {heroData.map((data) => (
            <div
              key={data.id}
              className=" lg:w-190 w-[90%] mt-8 md:mt-0 mx-auto md:w-full p-2 lg:p-4 bg-cardOverlay backdrop-blur-md rounded-3xl flex flex-col items-center justify-center drop-shadow-lg"
            >
              <img
                src={data.img}
                className="w-20 lg:w-40 -mt-10 lg:-mt-20"
                alt="ice1"
              />

              <p className="text-base lg:text-xl font-semibold text-textColor mt-2 lg:mt-4">
                {data.name}
              </p>

              <p className="text-xs lg:text-sm text-lighttextGray font-semibold my-1 lg:my-3">
                {data.desc}
              </p>

              <p className="text-sm text-headingColor font-semibold">
                <span className="text-xs text-red-600">$</span> {data.price}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeContainer;

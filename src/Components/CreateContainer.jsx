import React, { Fragment, useState } from "react";
import { motion } from "framer-motion";
import {
  MdFastfood,
  MdCloudUpload,
  MdDelete,
  MdFoodBank,
  MdAttachMoney,
} from "react-icons/md";
import { categories } from "./Utils/data";
import Loader from "./Loader";
import { storage } from "../firebase.config";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { getALlFoodItems, saveItem } from "./Utils/FirebaseFuncs";
import { useStateValue } from "./Context/state-context";
import { actionType } from "./Context/reducer";

const CreateContainer = () => {
  const [title, setTitle] = useState("");
  const [calories, setCalories] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(null);
  const [fields, setFields] = useState(false);
  const [alertStatus, setAlertStatus] = useState("");
  const [msg, setMsg] = useState(null);
  const [imageAsset, setImageAssets] = useState(null);
  const [isLoading, setIsloading] = useState(false);

  const [{}, dispatch] = useStateValue();

  const uploadImage = function (e) {
    setIsloading(true);
    const imageFile = e.target.files[0];
    console.log(imageFile);

    const storageRef = ref(storage, `images/${Date.now()}-${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        console.log(error);
        setFields(true);
        setMsg("Error while uploading, PLEASE TRY AGAIN ❤");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
          setIsloading(false);
        }, 4000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageAssets(downloadURL);
          setIsloading(false);
          setFields(true);
          setMsg("Image Uploaded Successfully 😃");
          setAlertStatus("success");
          setTimeout(() => {
            setFields(false);
          }, 4000);
        });
      }
    );
  };

  const deleteImage = function () {
    setIsloading(true);
    const deleteRef = ref(storage, imageAsset);
    deleteObject(deleteRef).then(() => {
      setImageAssets(null);
      setIsloading(false);
      setFields(true);
      setMsg("Image Deleted Successfully 😃");
      setAlertStatus("success");
      setTimeout(() => {
        setFields(false);
      }, 4000);
    });
  };

  const saveDetails = function () {
    setIsloading(true);
    try {
      if (!title || !calories || !imageAsset || !price || !category) {
        setFields(true);
        setMsg("Required Fields Can't Be Empty");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
          setIsloading(false);
        }, 4000);
      } else {
        const data = {
          id: `${Date.now()}`,
          title,
          imageURL: imageAsset,
          category,
          calories,
          qty: 1,
          price,
        };

        saveItem(data);
        setIsloading(false);
        setFields(true);
        setMsg("Data Uploaded Successfully 😃");
        setAlertStatus("success");
        clearData();
        setTimeout(() => {
          setFields(false);
        }, 4000);
      }
    } catch (error) {
      console.log(error);
      setFields(true);
      setMsg("Error while uploading, PLEASE TRY AGAIN ❤");
      setAlertStatus("danger");
      setTimeout(() => {
        setFields(false);
        setIsloading(false);
      }, 4000);
    }

    fetchData();
  };

  const clearData = function () {
    setTitle("");
    setImageAssets(null);
    setCalories("");
    setPrice("");
  };

  const fetchData = async function () {
    const data = await getALlFoodItems();
    console.log(data);
    dispatch({
      type: actionType.SET_FOOD_ITEMS,
      foodItems: data,
    });
  };

  return (
    <div className="w-full h-auto min-h-[calc(100vh_-_8rem)] flex items-center justify-center">
      <div className="w-[90%] md:w-[75%] border-2 border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center gap-4">
        {fields && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`w-full p-2 rounded-lg text-center text-lg font-semibold ${
              alertStatus === "danger"
                ? "bg-red-400 text-red-600"
                : "bg-emerald-400 text-emerald-800"
            }`}
          >
            {msg}
          </motion.p>
        )}

        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <MdFastfood className="text-xl text-gray-700" />
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            required
            value={title}
            placeholder="Give Me A Title..."
            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:duration-300
            placeholder:text-gray-500 text-textColor focus:placeholder:opacity-0"
          />
        </div>

        <div className="w-full">
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
          >
            <option value="other" className="bg-white">
              Select Category
            </option>
            {categories.map((data) => (
              <option
                key={data.id}
                className="text-base border-0 outline-none capitalize bg-white text-headingColor"
                value={data.urlParamName}
              >
                {data.name}
              </option>
            ))}
          </select>
        </div>

        <div
          className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-300
        w-full h-225 md:h-420 cursor-pointer rounded-lg"
        >
          {isLoading ? (
            <Loader />
          ) : (
            <Fragment>
              {!imageAsset ? (
                <>
                  <label className="w-full h-full flex flex-col justify-center items-center cursor-pointer">
                    <div className="w-full h-full flex flex-col justify-center items-center">
                      <MdCloudUpload className="text-gray-500 text-3xl hover:text-gray-700" />
                      <p className="text-gray-500 hover:text-gray-700">
                        Click here to Upload
                      </p>
                    </div>
                    <input
                      type="file"
                      name="uploadimage"
                      accept="image/*"
                      onChange={uploadImage}
                      className="w-0 h-0"
                    />
                  </label>
                </>
              ) : (
                <>
                  <div className="relative h-full">
                    <img
                      src={imageAsset}
                      alt="uploading Img"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      className="absolute bottom-3 right-3 rounded-full p-3 bg-red-500 text-xl cursor-pointer outline-none
                    hover:shadow-md duration-500 transition-all ease-in-out"
                      onClick={deleteImage}
                    >
                      <MdDelete className="text-white" />
                    </button>
                  </div>
                </>
              )}
            </Fragment>
          )}
        </div>

        <div className="w-full flex flex-col md:flex-row items-center gap-4">
          <div className="w-full py-2 border-b border-r border-gray-300 flex items-center gap-2">
            <MdFoodBank className="text-gray-700 text-2xl" />
            <input
              type="text"
              required
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              placeholder="Calories..."
              className="w-full h-full text-lg bg-transparent text-textColor outline-none border-none focus:placeholder:opacity-0 placeholder:duration-300 placeholder:text-gray-700"
            />
          </div>

          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdAttachMoney className="text-gray-700 text-2xl" />
            <input
              type="text"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price..."
              className="w-full h-full text-lg bg-transparent text-textColor outline-none border-none focus:placeholder:opacity-0 placeholder:duration-300 placeholder:text-gray-700"
            />
          </div>
        </div>

        <div className="flex items-center w-full">
          <button
            type="button"
            className="ml-10 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg
          text-lg text-white font-semibold"
            onClick={saveDetails}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateContainer;

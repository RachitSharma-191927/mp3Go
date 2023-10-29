import React, { useState } from "react";
import axiosAPI from "../../axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Axios from "axios";

export default function SignUp() {
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [phnNumber, setPhnNumber] = useState();
  const [password, setPassword] = useState();
  // const [gender, setGender] = useState();
  const [uploadImage, setUploadImage] = useState("");
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    const imageData = new FormData();
    imageData.append("file", uploadImage);
    imageData.append("upload_preset", process.env.REACT_APP_PRESET);
    var imageURL = "";
    try {
      await Axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY}/image/upload`,
        imageData
      )
        .then((response) => {
          imageURL = response.data.secure_url;
        })
        .catch((err) => {
          toast.error("Cloudinary Error");
          return;
        });
    } catch (err) {
      toast.error("Error in Image Upload");
      return;
    }

    const user = {
      name: name,
      email: email,
      password: password,
      phoneNo: phnNumber,
      img: imageURL,
    };

    try {
      const res = await axiosAPI.post("/signup", user, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success("You Have Successfully Registered");
      navigate("/login");
    } catch (err) {
      if (!err.response) {
        toast.error("Server Unavailable");
      }
      if (err.response.status === 409) {
        toast.error(err.response.data);
      }
      toast.error("Issue in Sign Up");
    }
  }

  return (
    <div className="min-h-[90vh] flex flex-col justify-center items-center">
      <p className="text-center text-xl sm:text-3xl md:text-4xl lg:text-5xl mb-[40px] font-bold font-sans text-[#002D74] dark:text-white ">
        Dive into a World of Musical Marvels - Sign Up Today!
      </p>
      <section classNameName="min-h-screen flex items-center justify-center">
        <div className="bg-gray-100 dark:bg-black flex rounded-2xl shadow-lg max-w-3xl py-10 px-6 items-center m-2">
          <div className="md:w-1/2 px-8 md:px-16">
            {/* <h2 className="font-bold text-2xl text-[#002D74] dark:text-white mb-5">
              Sign Up
            </h2> */}
            <form
              action=""
              className="flex flex-col gap-4 dark:text-black"
              onSubmit={(e) => handleRegister(e)}>
              <input
                required
                className="p-2 rounded-md border w-full"
                type="text"
                name="name"
                placeholder="Your Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
              <input
                required
                className="p-2 rounded-md border w-full"
                type="email"
                name="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <input
                required
                className="p-2 rounded-md border w-full"
                type="password"
                name="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <input
                required
                className="p-2 rounded-md border w-full"
                type="number"
                name="phnumber"
                placeholder="Phone Number"
                onChange={(e) => setPhnNumber(e.target.value)}
                value={phnNumber}
              />
              <label
                htmlFor="userImage"
                className="dark:text-white font-semibold text-sm md:text-lg text-[#002D74]">
                Upload Your Image
              </label>
              <input
                type="file"
                className="dark:text-white w-full"
                onChange={(event) => {
                  setUploadImage(event.target.files[0]);
                }}
                id="userImage"
              />
              <button className="bg-[#002D74] dark:bg-[#20212499] rounded-md text-white py-2 hover:scale-105 duration-300">
                SignUp
              </button>
            </form>
          </div>
          <div className="md:block hidden w-1/2">
            <img
              className="rounded-2xl"
              src="https://thumbs.dreamstime.com/b/teenager-boy-listening-to-music-headhones-guy-using-smartphone-audio-player-vector-illustration-teenager-boy-listening-to-157076855.jpg"
              alt="User"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

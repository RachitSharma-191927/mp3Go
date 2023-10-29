import React, { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin } = useLogin();
  const navigate = useNavigate();
  var error = "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data2 = handleLogin(email, password);
    let data = await data2;
    if (data && data.status === 200) {
      toast.success("Welcome To Mp3 Go");
      navigate("/");
    } else {
      if (data) {
        error = "Wrong Username or Password";
        toast.warning(data.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-5">
      <p className="text-center text-xl leading-6 sm:text-3xl md:text-4xl lg:text-5xl pt-[20px] pb-[50px] font-bold font-sans text-[#002D74] dark:text-white">
        Reconnect with Your Musical Paradise - Log In Now!
      </p>
      <section className="items-center rounded-2xl justify-center p-4 md:p-8">
        <div className="bg-gray-100 dark:bg-black flex rounded-2xl shadow-lg max-w-3xl items-center dark:text-white p-4 min-h-[55vh]">
          <div className="w-full md:w-1/2 px-8 md:px-16">
            <h2 className="font-bold text-2xl text-[#002D74] dark:text-white">
              Login
            </h2>
            {error ? <div>Wrong User Id or Password</div> : null}
            <form
              onSubmit={(e) => handleSubmit(e)}
              className="flex flex-col gap-4 dark:text-black"
              autoComplete="none">
              <input
                required
                className="p-2 mt-8 rounded-xl border w-full"
                type="email"
                name="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <div className="relative">
                <input
                  className="p-2 rounded-xl border w-full"
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </div>
              <button className="px-5 bg-[#002D74] dark:bg-[#20212499] rounded-xl text-white py-2 hover:scale-105 duration-300">
                Login
              </button>
            </form>

            <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
              <hr className="border-gray-400" />
              <p className="text-center text-sm">OR</p>
              <hr className="border-gray-400" />
            </div>

            <div className="mt-3 text-xs flex flex-col md:flex-row justify-between items-center text-[#002D74] w-full">
              <p className="dark:text-white mb-5 md:mb-0">
                Don't have an account?
              </p>
              <Link to="/signup">
                <button className="px-5 w-full bg-[#002D74] dark:bg-[#20212499] rounded-xl text-white py-2 hover:scale-105 duration-300">
                  Register
                </button>
              </Link>
            </div>
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

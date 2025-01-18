import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../Components/Provider/AuthProvider";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const { createNewUser, googleSignIn, setUser, updateUserProfile } =
    useContext(AuthContext);
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const photo = e.target.photo.value;

    if (!/(?=.*[A-Z])/.test(password)) {
      setPasswordError("Password must contain at least one uppercase letter.");
      return;
    }
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      return;
    }
    setPasswordError("");

    try {
      const res = await createNewUser(email, password);
      await updateUserProfile(name, photo);

      setUser({ ...res.user, displayName: name, photoURL: photo });
      toast.success("Registration successful!");
      navigate("/");
    } catch (error) {
      toast.error(`Registration failed: ${error.message}`);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const res = await googleSignIn();
      setUser(res.user);
      toast.success("Logged in with Google!");
      navigate("/");
    } catch (error) {
      toast.error(`Google Sign-In failed: ${error.message}`);
    }
  };

  return (
    <div>
     
      <div className="hero bg-base-200 min-h-screen py-7">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <form onSubmit={handleRegister} className="card-body">
          <h1 className="text-5xl font-bold">Register now!</h1>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              name="name"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Photo-URL</span>
            </label>
            <input
              type="text"
              placeholder="Enter photo URL"
              name="photo"
              className="input input-bordered"
            />
          </div>
          <div className="form-control relative">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              name="password"
              className="input input-bordered"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-14"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {passwordError && (
              <p className="text-red-500 text-sm mt-2">{passwordError}</p>
            )}
          </div>
          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </div>
          <p className="text-center">
            Already have an account?{" "}
            <Link className="text-red-500" to="/login">
              Login
            </Link>
          </p>
            <button
                                      type="button"
                                      onClick={handleGoogleSignIn}
                                      className="btn btn-outline mt-4 text-green-500 items-center"
                                  >
                                      <FcGoogle /> Sign in with Google
                                  </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Register;
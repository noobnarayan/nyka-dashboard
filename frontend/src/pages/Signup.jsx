import React, { useState } from "react";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
function Signup() {
  const [formState, setFormState] = useState({
    avatar: "",
    name: "",
    email: "",
    password: "",
  });

  const [processing, setProcessing] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileUpload = (e) => {
    const imageFile = e.target.files[0];
    setFormState({
      ...formState,
      avatar: imageFile,
    });
  };

  const signup = async (data) => {
    setProcessing(true);
    try {
      const res = await authService.signup(data);
      if (res.statusCode === 201) {
        navigate("/login");
      }
      setProcessing(false);
    } catch (error) {
      console.log(error);
      setProcessing(false);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    signup(formState);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleFormSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <InputField
              id="name"
              name="name"
              type="text"
              value={formState.name}
              onChange={handleInputChange}
              placeholder="Full Name"
              isRequired={true}
              label="Full Name"
            />
            <InputField
              id="email"
              name="email"
              type="email"
              value={formState.email}
              onChange={handleInputChange}
              placeholder="Email address"
              isRequired={true}
              label="Email Address"
            />
            <InputField
              id="password"
              name="password"
              type="password"
              value={formState.password}
              onChange={handleInputChange}
              placeholder="Password"
              isRequired={true}
              label="Password"
            />
            <InputField
              id="avatar"
              name="avatar"
              type="file"
              onChange={handleFileUpload}
              isRequired={true}
              label="Avatar"
            />
          </div>

          <div>
            <Button
              buttonText={processing ? "Creating Account..." : "Sign Up"}
              color="bg-black"
              textColor="text-white"
              additionalClasses="hover:bg-gray-500"
            />
          </div>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm">
            Already have an account? {""}
            <Link
              to="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;

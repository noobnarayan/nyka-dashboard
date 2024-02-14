import React, { useState } from "react";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { Link } from "react-router-dom";
function Signup() {
  const [formState, setFormState] = useState({
    avatar: "",
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" action="#" method="POST">
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
              id="email-address"
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
              onChange={handleInputChange}
              isRequired={true}
              label="Avatar"
            />
          </div>

          <div>
            <Button
              buttonText="Sign up"
              color="bg-black"
              textColor="text-white"
              additionalClasses="hover:bg-gray-500 "
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

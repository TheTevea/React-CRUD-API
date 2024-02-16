import React, { useState } from "react";
import List from "./List";
import axios from "axios";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userField, setUserField] = useState({
    name: "",
    email: "",
    password: "",
  });
  const changeUserFiledHandler = (e) => {
    setUserField({
      ...userField,
      [e.target.name]: e.target.value,
    });
  };

  const onsubmitChange = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/addnew",
        userField
      );
      setIsLoading(true);
    } catch (error) {
      console.log("SOmething went wrong!");
    }
  };

  if (isLoading) {
    return <Home />;
  }

  return (
    <div className="container">
      <h2 className="w-100  d-flex justify-content-center p-3">
        React JS With Laravel 10 CRUD
      </h2>

      <div className="row">
        <div className="col-md-4">
          <h3>Add Your Details</h3>
          <form className="row g-3 text-start">
            <div className="col-md-12">
              <label htmlFor="inputFullName" className="form-label">
                Full Name:
              </label>
              <input
                type="text"
                className="form-control"
                id="inputFullName"
                placeholder="Enter Full name"
                name="name"
                onChange={(e) => changeUserFiledHandler(e)}
              />
            </div>
            <div className="col-md-12">
              <label htmlFor="inputEmail" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="inputEmail"
                name="email"
                onChange={(e) => changeUserFiledHandler(e)}
                placeholder="Enter Email"
              />
            </div>
            <div className="col-12">
              <label htmlFor="inputPassword" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="inputPassword"
                name="password"
                onChange={(e) => changeUserFiledHandler(e)}
                placeholder="Enter Password"
              />
            </div>

            <div className="col-12">
              <button
                onClick={(e) => onsubmitChange(e)}
                type="submit"
                className="btn btn-primary"
              >
                Add User
              </button>
            </div>
          </form>
        </div>

        <div className="col-md-8">
          <List />
        </div>
      </div>
    </div>
  );
};

export default Home;

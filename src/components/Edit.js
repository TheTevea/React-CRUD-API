import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [userField, setUserField] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const data = await axios("http://127.0.0.1:8000/api/users/" + id);

      setUserField(data.data.users);
    } catch (error) {
      console.log("something went wrong!");
    }
  };

  const changeUserFieldHandler = (e) => {
    setUserField({
      ...userField,
      [e.target.name]: e.target.value,
    });
    console.log(userField);
  };

  const onsubmitChange = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://127.0.0.1:8000/api/usersupdate/" + id, userField);
      navigate("/");
    } catch (error) {
      console.log("Something went wrong!");
    }
  };

  const clickToBackHandler = () => {
    navigate("/");
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-12 mt-5">
            <h3>Add Your Details</h3>
            <form className="row g-3 text-start">
              <div className="col-md-12">
                <label htmlFor="inputiD" className="form-label">
                  ID:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputiD"
                  value={id}
                  disabled
                  name="id"
                />
              </div>
              <div className="col-md-12">
                <label htmlFor="inputFullName" className="form-label">
                  Full Name:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputFullName"
                  value={userField.name}
                  name="name"
                  onChange={(e) => changeUserFieldHandler(e)}
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
                  value={userField.email}
                  name="email"
                  onChange={(e) => changeUserFieldHandler(e)}
                />
              </div>

              <div className="col-md-12">
                <label htmlFor="inputPassword" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="inputPassword"
                  name="password"
                  onChange={(e) => changeUserFieldHandler(e)}
                />
              </div>

              <div className="col-12">
                <button
                  type="submit"
                  onClick={(e) => onsubmitChange(e)}
                  className="btn btn-primary"
                >
                  Update User
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="container d-flex justify-content-center mt-3">
          <div>
            <button onClick={clickToBackHandler} className="btn btn-primary">
              Back To Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;

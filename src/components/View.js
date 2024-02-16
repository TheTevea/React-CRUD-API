import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const View = () => {
  const { id } = useParams();

  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const data = await axios("http://127.0.0.1:8000/api/users/" + id);
      setUser(data.data.users);
    } catch (error) {
      console.log("something went wrong!");
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
            <h1>User Details</h1>

            <table className="table">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Full Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                </tr>
              </tbody>
            </table>
          </div>
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
  );
};

export default View;

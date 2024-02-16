import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

const List = () => {
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await axios("http://127.0.0.1:8000/api/users");

      setUserData(data.data.results);
    } catch (error) {
      console.log("something went wrong!");
    }
  };

  const handleDelete = async (id) => {
    await axios.delete("http://127.0.0.1:8000/api/usersdelete/" + id);

    const newUserData = userData.filter((item) => {
      return item.id !== id;
    });
    setUserData(newUserData);
  };

  return (
    <div className="container">
      <p>
        User Details <sup>{userData.length}</sup>
      </p>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>NO.</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {userData.map((user, i) => {
            return (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{user.name}</td>
                <td className="text-primary">{user.email}</td>
                <td>
                  <NavLink
                    to={`/view/${user.id}`}
                    className="btn btn-success mx-2"
                  >
                    View
                  </NavLink>
                  <NavLink
                    to={`/edit/${user.id}`}
                    className="btn btn-info mx-2"
                  >
                    Edit
                  </NavLink>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default List;

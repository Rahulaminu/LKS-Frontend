import axios from "axios";
import NavbarHome from "../../components/NavbarHome";
import { useState, useEffect } from "react";
import Posts from "../../features/Posts";
import { Link } from "react-router-dom";

const Home = () => {
  const [users, setUser] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/v1/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUser(response.data.users);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <NavbarHome />
      <div className="container mx-auto flex pt-20">
        <div className="w-2/3 p-4">
          <div className="mb-4">
            <h2 className="text-xl font-bold">News Feed</h2>
          </div>
          <Posts />
        </div>
        {/* Sidebar */}
        <div className="w-1/3 p-4">
          <div className="bg-white p-6 rounded-lg shadow-md mb-4">
            <h3 className="font-semibold text-lg mb-2">Follow Requests</h3>
            <div className="flex items-center justify-between mb-4 border p-2 rounded-md">
              <span>@laychristian92</span>
              <button className="bg-blue-500 text-white px-3 py-1 rounded">
                Confirm
              </button>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-4">Explore People</h3>
            {users.length > 0 ? (
              <ul>
                {users.map((user, index) => (
                  <li key={index} className="mb-2 border p-2 rounded-md">
                    <Link to={`/users/${user.username}`}>@{user.username}</Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

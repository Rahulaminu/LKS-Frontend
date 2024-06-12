import axios from "axios";
import NavbarHome from "../../components/NavbarHome";
import { useState, useEffect } from "react";
import Posts from "../../features/Posts";
import { Link } from "react-router-dom";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [followers, setFollowers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/v1/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUsers(response.data.users);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchFollowers = async () => {
    try {
      const username = localStorage.getItem("username");
      const response = await axios.get(
        `http://127.0.0.1:8000/api/v1/users/${username}/followers/request`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data && Array.isArray(response.data.followers)) {
        const followerUsernames = response.data.followers.map(
          (follower) => follower.username
        );
        setFollowers(followerUsernames);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleConfirm = async (username) => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/v1/users/${username}/accept`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert(response.data.message);
      setFollowers(followers.filter((follower) => follower !== username));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchFollowers();
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
            {followers.length > 0 ? (
              followers.map((username, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between mb-4 border p-2 rounded-md"
                >
                  <span>@{username}</span>
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                    onClick={() => handleConfirm(username)}
                  >
                    Confirm
                  </button>
                </div>
              ))
            ) : (
              <p>Tidak ada follow requests</p>
            )}
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

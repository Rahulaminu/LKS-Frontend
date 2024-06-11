import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const NavbarHome = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    if (!token || !username) {
      navigate("/");
    } else {
      setUsername(username);
    }
  }, [navigate]);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://127.0.0.1:8000/api/v1/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      navigate("/");
    } catch (error) {
      console.error("Kesalahan logout:", error);
    }
  };

  return (
    <nav className="fixed mx-auto w-full bg-white shadow-sm p-6">
      <div className="text-center">
        <div className="float-left">
          <Link to="/home">
            <span className="text-lg">Facegram</span>
          </Link>
        </div>
        <div className="float-right">
          <Link to={`/users/${username}`}>
            <span className="text-lg px-5">
              {username ? "@" + username : "loading..."}
            </span>
          </Link>
          <Link
            to="/"
            className="text-lg cursor-pointer hover:text-red-400"
            onClick={handleLogout}
          >
            logout
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavbarHome;

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import NavbarHome from "../../components/NavbarHome";
import axios from "axios";

const UserDetail = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/v1/users/${username}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setUser(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [username]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleFollow = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/v1/users/${username}/follow`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Network response was not ok");
      }
      const data = await response.json();
      setUser((prevUser) => ({
        ...prevUser,
        is_following: data.status === "following",
      }));
      alert(data.message);
      window.location.reload();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleUnfollow = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/v1/users/${username}/unfollow`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Network response was not ok");
      }
      setUser((prevUser) => ({
        ...prevUser,
        is_following: false,
      }));
      alert("Unfollow successful");
      window.location.reload();
    } catch (error) {
      console.error("Unfollow error:", error);
      alert(error.message);
    }
  };

  const handleDelete = async (postId) => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/v1/posts/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 204) {
        alert("Post deleted successfully");
        window.location.reload();
      } else {
        throw new Error("Failed to delete post");
      }
    } catch (error) {
      console.error("Delete post error:", error);
      alert(error.message);
    }
  };

  return (
    <>
      <NavbarHome />
      <div className="max-w-4xl mx-auto pt-28">
        <div className="bg-white shadow p-5 rounded-lg">
          <div className="grid grid-cols-2">
            <div>
              <div className="flex items-center space-x-4">
                <div className="text-lg font-bold">{user.full_name}</div>
                <div className="text-gray-500">@{user.username}</div>
              </div>
              <p className="text-gray-600 mt-1">{user.bio}</p>
            </div>
            <div>
              {user.is_your_account ? (
                <Link to="/post">
                  <button className="mt-5 bg-blue-500 text-white px-4 py-2 rounded w-full">
                    + Create new post
                  </button>
                </Link>
              ) : (
                <button
                  onClick={
                    user.following_status === "following" ||
                    user.following_status === "requested"
                      ? handleUnfollow
                      : handleFollow
                  }
                  className={`mt-5 ${
                    user.following_status === "following" ||
                    user.following_status === "requested"
                      ? "bg-gray-500"
                      : "bg-blue-500"
                  } text-white px-4 py-2 rounded w-full`}
                >
                  {user.following_status === "following" ||
                  user.following_status === "requested"
                    ? "Unfollow"
                    : "Follow"}
                </button>
              )}
              <div className="flex items-center justify-between mt-5">
                <div className="text-gray-600">{user.posts_count} posts</div>
                <Link to={`/users/${username}/followers`}>
                  <div className="text-gray-600 cursor-pointer">
                    {user.followers_count} followers
                  </div>
                </Link>
                <Link to={`/users/${username}/following`}>
                  <div className="text-gray-600 cursor-pointer">
                    {user.following_count} following
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
        {user.posts_count > 0 || user.is_your_account ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
            {Array.isArray(user.posts) ? (
              user.posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white shadow rounded-lg overflow-hidden"
                >
                  <div className="flex overflow-x-auto h-48">
                    {post.post_attachments.map((attachment) => (
                      <div
                        key={attachment.id}
                        className="flex-shrink-0 w-full h-full"
                      >
                        <img
                          src={`http://127.0.0.1:8000/${attachment.storage_path}`}
                          alt="Post"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <p className="p-4 text-gray-700">{post.caption}</p>
                  {user.is_your_account && (
                    <div className="py-5 px-5">
                      <button
                        onClick={() => {
                          if (window.confirm("Apakah yakin untuk menghapus?")) {
                            handleDelete(post.id);
                          }
                        }}
                        type="button"
                        className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                      >
                        Hapus
                      </button>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="mt-5 text-gray-600">{user.posts}</div>
            )}
          </div>
        ) : user.posts_count === 0 &&
          !user.is_your_account &&
          user.is_private ? (
          <div className="mt-5 text-gray-600">{user.posts}</div>
        ) : (
          <div className="mt-5 text-gray-600">{user.posts}</div>
        )}
      </div>
    </>
  );
};

export default UserDetail;

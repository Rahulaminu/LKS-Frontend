import axios from "axios";
import { useEffect, useState } from "react";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  const fetchPots = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/v1/posts", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setPosts(response.data.posts.data);
      console.log(response.data.posts.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPots();
  }, []);

  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow-md w-full">
        {Array.isArray(posts) && posts.length > 0 ? (
          posts.map((post, index) => {
            return (
              <div key={index} className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-lg">
                    {post.user.username}
                  </h3>
                  <span className="text-gray-500 text-sm">
                    {/* Date here */}
                  </span>
                </div>
                <div className="flex overflow-x-auto h-[650px]">
                  {post.post_attachments.map((gambar, index) => (
                    <div key={index} className="flex-shrink-0 w-full h-full">
                      <img
                        src={`http://127.0.0.1:8000/${gambar.storage_path}`}
                        alt="Landscape"
                        className="w-full h-full object-cover rounded-lg mr-4"
                      />
                    </div>
                  ))}
                </div>
                <p className="mt-2">{post.caption}</p>
              </div>
            );
          })
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};

export default Posts;

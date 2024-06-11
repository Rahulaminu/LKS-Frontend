import NavbarHome from "../../components/NavbarHome";
import axios from "axios";

function Post() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("caption", e.target.caption.value);
      const attachments = e.target.attachments.files;
      console.log(attachments);
      for (let i = 0; i < attachments.length; i++) {
        formData.append("attachments[]", attachments[i]);
      }
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/posts",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Post created successfully:", response.data);
      e.target.reset();
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };

  return (
    <>
      <NavbarHome />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-4">Create new post</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="caption"
              >
                Caption
              </label>
              <textarea
                id="caption"
                name="caption"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                rows="4"
              ></textarea>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="attachments"
              >
                Image(s)
              </label>
              <input
                id="attachments"
                name="attachments"
                type="file"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                multiple
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Share
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Post;

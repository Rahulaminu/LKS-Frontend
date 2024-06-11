import Navbar from "../../components/Navbar";
import Form from "../../components/Form";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <>
      <Navbar />
      <main className="mt-20">
        <div className="container mx-auto py-5">
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                  <h5 className="font-bold text-xl">Register</h5>
                </div>
                <Form />
              </div>
              <div className="text-center mt-4">
                Already have an account?{" "}
                <Link className="text-blue-500 hover:text-blue-800" to="/">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
export default Register;

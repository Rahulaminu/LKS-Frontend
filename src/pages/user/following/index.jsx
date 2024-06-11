import axios from "axios";
import { useEffect, useState } from "react";
import NavbarHome from "../../../components/NavbarHome";

const Following = () => {
    const [following, setFollowing] = useState([]);

    const fetchFollowing = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/v1/following", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setFollowing(response.data.following);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchFollowing();
    }, []);




    return (
        <>
            <NavbarHome/>
            <div className="bg-white p-6 rounded-lg shadow-md ">
                <h3 className="font-semibold text-lg mb-4 mt-10 py-5">Following</h3>
                {following.length ? (
                    <ul>
                        {following.map((user, index) => (
                            <li key={index} className="mb-2 border p-2 rounded-md">
                                @{user.username}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </>
    )
}

export default Following
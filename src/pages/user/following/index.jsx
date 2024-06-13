import axios from "axios";
import { useEffect, useState } from "react";
import NavbarHome from "../../../components/NavbarHome";
import { useParams } from "react-router-dom";

const Following = () => {
    const { username } = useParams();
    const [following, setFollowing] = useState([]);

    
    useEffect(() => {
        const fetchFollowing = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/v1/users/${username}/following`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setFollowing(response.data.following);
            } catch (error) {
                console.error(error);
            }
        };

        fetchFollowing();
    }, [username]);




    return (
        <>
            <NavbarHome/>
            <div className="bg-white p-6 rounded-lg shadow-md ">
                <h3 className="font-semibold text-lg mb-4 mt-10 py-5">Following</h3>
                {following ? (
                    <ul>
                        {following.map((user, index) => (
                            <li key={index} className="mb-2 border p-2 rounded-md">
                                @{user.username}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Zero Following</p>
                )}
            </div>
        </>
    )
}

export default Following
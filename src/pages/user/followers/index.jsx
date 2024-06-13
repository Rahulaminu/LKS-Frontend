import axios from "axios";
import { useEffect, useState } from "react";
import NavbarHome from "../../../components/NavbarHome";
import { useParams } from "react-router-dom";

const Followers = () => {
    const { username } = useParams();
    const [followers, setFollowers] = useState([]);

    useEffect(() => {
        const fetchFollowers = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/v1/users/${username}/followers`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setFollowers(response.data.followers);
            } catch (error) {
                console.error(error);
            }
        };

        fetchFollowers();
    }, [username]);


    return (
        <>
            <NavbarHome />
            <div className="bg-white p-6 rounded-lg shadow-md ">
                <h3 className="font-semibold text-lg mb-4 mt-10 py-5">Followers</h3>
                {followers ? (
                    <ul>
                        {followers.map((user, index) => (
                            <li key={index} className="mb-2 border p-2 rounded-md">
                                @{user.username}
                            </li>
                        ))}
                    </ul>
                ) :  (
                    <p>No followers yet!</p>
                )}
            </div>
        </>
    )
}

export default Followers
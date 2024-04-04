import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { GlobalContext } from "../Contexts/GlobalContext";
import "./karaoke.css";
const Karaoke = () => {
    const { songs, setSongs } = useContext(GlobalContext);
    const [id, setId] = useState("");
    useEffect(() => {
        axios
            .post(
                "https://accounts.spotify.com/api/token",

                {
                    grant_type: "client_credentials",
                    client_id: "3d1736b0722c4a729d6b7b0f5bb9ca68",
                    client_secret: "5e8b8368d8be49dc855c8ca0f2965f1e"
                },

                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                }
            )
            .then(res => {
                localStorage.setItem("token", res.data.access_token);
            })
            .catch(err => console.log(err));
        if (JSON.stringify(songs) != JSON.stringify([])) {
            console.log(songs);
            axios
                .get(
                    `https://api.spotify.com/v1/search?query=${songs[0]}&type=track&limit=10&offset=0`,
                    {
                        headers: {
                            Authorization: `Bearer  ${localStorage.getItem("token")}`
                        }
                    }
                )
                .then(res => setId(res.data.tracks.items[0].id));
        }
    }, [songs]);

    return (
        <div className="player">
            <iframe
                src={`https://open.spotify.com/embed/track/${id}?utm_source=generator`}
                width="80%"
                height="352"
                allowFullscreen=""
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            ></iframe>
        </div>
    );
};

export default Karaoke;

import { useEffect, useState } from "react";
import { SearchIcon } from "../components/icons/Svgs";
import PrincipalContainer from "../components/layouts/PrincipalContainer";
import { axiosMusic } from "../utils/configAxios";
import Cassette from "../components/playlists/Cassette";



const PlayLists = () => {
  const [userPlaylists, setUserplaylists] = useState([]);
  const [playlistName, setPlaylistName] = useState("");

  const playlistByName = userPlaylists.filter((playlist) => playlist.title.toLowerCase().includes(playlistName.toLowerCase()))

  const CASSETTE_HEIGHT = 180
  const DELTA_Y = 48
  const quantityCassettes = playlistByName.length

  const totalHeight = CASSETTE_HEIGHT + (DELTA_Y *( quantityCassettes - 1) ) + "px"


  useEffect(() => {
    axiosMusic
      .get("/api/playlists/me")
      .then(({ data }) => setUserplaylists(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <PrincipalContainer>
      <div
        //  onSubmit={handleOnsubmit}
        className="flex  items-center gap-2  bg-white/20 rounded-xl  p-2"
      >
        <span>
          <SearchIcon />
        </span>
        <input
          className="bg-transparent outline-none flex-1"
          type="text"
          placeholder="Burcar..."
          name="query"
          size={10}
          autoComplete="off"
          value={playlistName}
          onChange={(e) => setPlaylistName(e.target.value)}
        />
      </div>
      {/* playlist del usuario */}
      <section 
      style={{height:  totalHeight}}
      className=" relative mt-8 grid place-content-center">
        {
        playlistByName.map((playlist, index) => (
        <Cassette
         key={playlist.id} 
         title={playlist.title}
         id={playlist.id}
         index={index}
         /> 
         ))}
      </section>
    </PrincipalContainer>
  );
};

export default PlayLists;

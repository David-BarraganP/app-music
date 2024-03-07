import { useEffect, useState } from "react";
import { SearchIcon } from "../components/icons/Svgs";
import { axiosMusic } from "../utils/configAxios";
import TrackList from "../components/shared/TrackList";
import PrincipalContainer from "../components/layouts/PrincipalContainer";

const Home = () => {
  const [tracksRecommendations, setTracksRecommendations] = useState([]);
  const [searchTracks, setSearchTracks] = useState([]);

  const handleOnsubmit = (e) => {
    e.preventDefault();
    const query = e.target.query.value;
    const limit = e.target.limit.value;
    //? mostar canciones recomendadas cuando el usuacrio aca click vacio en el buscador
    if (query === "") return setSearchTracks([]);

    axiosMusic
      .get(`/api/tracks?limit=${limit}&q=${query}`)
      .then(({ data }) => setSearchTracks(data.tracks.items))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axiosMusic
      .get("/api/tracks/recommendations?seed_genres=reggae,rock,spanish")
      .then(({ data }) => setTracksRecommendations(data.tracks))
      .catch((err) => console.log(err));
  }, []);

  return (
   <PrincipalContainer>
     <form
       onSubmit={handleOnsubmit}
       className="flex  items-center gap-2  bg-white/20 rounded-xl  p-2"
     >
       <button>
         <SearchIcon />
       </button>
       <input
         className="bg-transparent outline-none flex-1"
         type="text"
         placeholder="Burcar..."
         name="query"
         size={10}
         autoComplete="off"
       />
       <select
         name="limit"
         className="bg-transparent outline-none [&>option]:text-black"
       >
         <option>10</option>
         <option>12</option>
         <option>14</option>
         <option>16</option>
       </select>
     </form>
     <TrackList
       tracks={
         searchTracks.length === 0 ? tracksRecommendations : searchTracks
       }
       showAddBtn
     />
   </PrincipalContainer>
   
  );
};

export default Home;

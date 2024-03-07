import { Link } from "react-router-dom";
import { AddIcon, MinusIcon, PlayTrackIcon } from "../icons/Svgs";
import { addTracks, deleteTrack } from "../../store/slices/playlist.slice";
import { useDispatch } from "react-redux";


const TrackCard = ({
  track,
  showAddBtn,
  showMinusBtn,
  showDeleteTrack, 
  onDeleteTrack,
  showPlayTrack,
  onPlayTrack,
}) => {
  const dispatch = useDispatch();

  const handleAddTrack = () => {
    dispatch(addTracks(track));
  };

  const handleDeleteTrack = () => {
    dispatch(deleteTrack(track.id));
  };

 

  return (
    <article
      className="flex items-center gap-2 hover:bg-white/30 p-1 
    rounded-md pr-4 transition-colors group*"
    >
      <header>
        <img
          className="size-[50px] aspect-square rounded-md
        group-hover:shadow-lg group-hover:shadow-secondary transition-shadow"
          src={track.album.images[2]?.url}
          alt=""
        />
      </header>
      <div className="flex-1">
        <Link
          to={`/tracks/${track.id}`}
          className="text-sm font-bold 
         hover:text-secondary transition-colors line-clamp-1"
        >
          {track.name}
        </Link>
        <ul className="flex gap-2">
          {track.artists.slice(0, 2).map((artist, index) => (
            <li key={artist.id}>
              <Link
                to={`/artists/${artist.id}`}
                className="text-sm text-slate-400
                hover:text-secondary transition-colors"
              >
                {artist.name}
                {track.artists.slice(0, 2).length - 1 !== index && ","}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center gap-1">
        {showAddBtn && (
          <button type="button" onClick={handleAddTrack}>
            <AddIcon />
          </button>
        )}
        {showMinusBtn && (
          <button
            onClick={handleDeleteTrack}
            type="button"
            className="flex items-center"
          >
            <MinusIcon />
          </button >
        )}
        {showDeleteTrack && (
          <button onClick={() => onDeleteTrack(track.id)} type="button">
            <MinusIcon />
          </button>
        )}
        {
          showPlayTrack && (
            <button onClick={() => onPlayTrack(track.spotifyId)}>
              <PlayTrackIcon />
            </button>
          )
        }
      </div>
    </article>
  ); 
};

export default TrackCard;

import { Link } from "react-router-dom";
import { LogoutIcon, PlayIcon, PlaylistIcon } from "../icons/Svgs";
import {  useEffect, useState } from "react";
import { logout } from "../../store/slices/user.slice";
import { useDispatch, useSelector } from "react-redux";
import PopUpPlaylist from "./PopUpPlaylist";

const Header = ({isPlubic}) => {
  const [isShowAuth, setIsShowAuth] = useState(false);
  const [isShowPlaylist, setIsShowPlaylist] = useState(false);

 

  const dispatch = useDispatch();

  const tracks = useSelector((store) => store.playlist.tracks)

 

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleToggleAuth = () =>  {
    setIsShowAuth(!isShowAuth)
  }

  const handleTogglePlaylist = () => {
    setIsShowPlaylist(!isShowPlaylist)
  }

  useEffect(() => {
    if (isShowPlaylist){
      setIsShowAuth(false)
    }
  }, [isShowPlaylist])

  useEffect(() => {
    if (isShowAuth){
    setIsShowPlaylist(false)
    }
  }, [isShowAuth])


  return (
    <header className={`flex items-center justify-betwenn  p-4 bg-primary-dark relative ${isPlubic 
      ? "flex justify-center" 
      : " flex justify-between"}
      `}>
        
      <Link  to="/" className="uppercase font-semibold">Gift Music</Link>

      {
        !isPlubic && (
          <div className="flex items-center gap-1">
          <button
            className="uppercase hover:bg-primary-light p-1 px-4 rounded-full
        border border-secondary font-semibold"
        onClick={handleToggleAuth}
          > 
            Mi cuenta
          </button>
          <button
          onClick={handleTogglePlaylist}
            className="uppercase hover:bg-primary-light p-1 px-4 rounded-full
        border border-secondary flex gap-1 items-center font-semibold"
          >
            <PlaylistIcon />
            <span className="hidden sm:inline">Grabando</span>{tracks.length}
          </button>
        </div>
        )
      }

      {/* PopUp Auth */}
      <div
        className={`absolute  -bottom-4 translate-y-full
    bg-primary-light grid gap-2 p-3 px-5 rounded-xl border border-secondary transition-all ${
      isShowAuth
       ? "right-4" 
       : "-right-full"
       }`}>

        <Link to="/playlist" className="flex items-center gap-2 ">
          <PlayIcon /> Mis Gravaciones</Link>
        <button onClick={handleLogout} className="flex items-center gap-2 ">
          <LogoutIcon /> Cerrar sesion</button>
      </div>
      <PopUpPlaylist 
       isShowPlaylist={isShowPlaylist}
       tracks={tracks}
       />
    </header>
  );
};

export default Header;

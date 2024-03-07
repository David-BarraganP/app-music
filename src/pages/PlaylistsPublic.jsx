import { Link, useParams } from "react-router-dom"
import { ChangeIcon, PlusIcon,  ShareIcon } from "../components/icons/Svgs"
import PrincipalContainer from "../components/layouts/PrincipalContainer"
import { axiosMusic } from "../utils/configAxios"
import { useEffect, useState } from "react"
import TrackList from "../components/shared/TrackList"
import PreviewTrack from "../components/shared/PreviewTrack"


const PlaylistsPublic = () => {
  const [isShowFront,setIsShowFront] = useState(true)
  const [playlistInfo,setPlaylistInfo] = useState(null)
   const [currentTrack,setCurrentTrack] = useState(null)
  

  const {id} = useParams()
 

  const handleToggleCassete = () => {
    setIsShowFront(!isShowFront)
  }

  const handleCopyURL = () => {
    const currentURL = window.location.href
    navigator.clipboard.writeText(currentURL)
    .then(() => alert("Copiado en el portapapeles"))
  }

  const handlePlayTrack = (spotifyId) => {
setCurrentTrack(spotifyId)
  }

  useEffect(() =>{
    axiosMusic
    .get(`/api/playlists/${id}`)
    .then(({data}) => setPlaylistInfo(data))
    .catch((err) => console.log(err))
  },[])



  return (

   <PrincipalContainer isPlubic>
    <Link to={-1}
className="text-secondary"
>
{"< Atras"}
</Link>

<div>

<div className={`relative max-w-max mx-auto cassette ${isShowFront ? "front" : "back"}`}>

{/* front */}
<div className="relative front"> 
  <img src="/images/cassete.png" alt="" />
  {/* titulo */}
  <div className="bg-white flex items-center p-1 absolute top-[16px] left-[20px] rounded-md
  w-[198px] text-sm"> 
     <h3 className="text-black line-clamp-1 capitalize">
      {playlistInfo?.title}</h3>
  </div>
    <button
    onClick={handleCopyURL }
     to={`/playlists/public/${id}`} 
     type="button" 
     className=" absolute right-14 bottom-4 ">
    <ShareIcon />
    </button>
    <button className=" absolute right-4 bottom-4" > 
      <PlusIcon />
    </button>
</div>

{/*trasera*/}
<div className="absolute top-0 back ">
<img src="/images/cassete.png" alt="" />
 {/* para*/}
 <label className="bg-white flex items-center p-1 absolute top-[16px] left-[20px] rounded-md
  w-[198px] text-sm">
  <h4 className="text-black line-clamp-1 capitalize">
    {playlistInfo?.to}
  </h4>
  </label>


{/* mensaje */}
  <div className="bg-white items-center p-1 absolute top-[50px] left-[20px] rounded-md
  w-[198px] h-[90px] text-sm overflow-y-auto">
   <p className="text-black line-clamp-1 capitalize">
{playlistInfo?.message}
   </p>
    
  </div>
</div>
</div>
<button 
className="flex gap-2 mx-auto p-1 px-4 border-2 dorder-white rounded-full"
type="button"
onClick={handleToggleCassete}
>  
Lado {isShowFront ? "(B)" : "(A)"} < ChangeIcon />  
</button>
</div>

{
  currentTrack !== null && (
    <PreviewTrack  idTrack={currentTrack}/>
  )
}

<TrackList  
tracks={playlistInfo?.tracks ?? []}
showPlayTrack
onPlayTrack={handlePlayTrack}
/>

   </PrincipalContainer>
  )
}

export default PlaylistsPublic

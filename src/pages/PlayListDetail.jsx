import { Link, useNavigate, useParams } from "react-router-dom"
import PrincipalContainer from "../components/layouts/PrincipalContainer"
import { ChangeIcon, DeleteIcon, PencilIcion, SaveIcon, ShareIcon } from "../components/icons/Svgs"
import { useEffect, useRef, useState } from "react"
import { axiosMusic } from "../utils/configAxios"
import TrackList from "../components/shared/TrackList"



const PlayListDetail = () => {
  const [isShowFront,setIsShowFront] = useState(true)
  const [playlistInfo,setPlaylistInfo] = useState([])

  const {id} = useParams()
  const formRef = useRef (null)
  const navigate = useNavigate()

  const handleToggleCassete = () => {
    setIsShowFront(!isShowFront)
  }

  const handelSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData)
    axiosMusic
    .patch(`/api/playlists/${id}`, data) 
    .then(() => alert("Playlist actualizada"))
    .catch((err) => console.log (err))
  
  }

  const handleDeleteTrackByPlaylist = (idTrack) => {
    axiosMusic
      .delete(`/api/playlists/${id}/tracks/${idTrack}`)
      .then(() => {
        const newTracks = playlistInfo.tracks.filter((track) => track.id !== idTrack)
        const newPlaylistInfo = {...playlistInfo, tracks: newTracks}
        alert("Cancion eliminada correctamente")
        setPlaylistInfo(newPlaylistInfo)
      })
      .catch((err) => console.log(err));
  };

  const handleDeletePlaylist = () => {
    axiosMusic
    .delete(`/api/playlists/${id }`)
    .then(() => {
    alert("Playlist eliminada correctamente"),
    navigate("/playlist")})
    .catch((err) => (err))
  }


  useEffect(() =>{
    axiosMusic
    .get(`/api/playlists/${id}`)
    .then(({data}) => setPlaylistInfo(data))
    .catch((err) => console.log(err))
  },[])

  useEffect(() => {
if(playlistInfo){
  // aqui ya hay informacion del estado
  formRef.current.title.value = playlistInfo.title
  formRef.current.to.value = playlistInfo.to
  formRef.current.message.value = playlistInfo.message
}
  },[playlistInfo])


  return (
   <PrincipalContainer>
<Link to={-1}
className="text-secondary"
>
{"< Atras"}
</Link>

<form
onSubmit={ handelSubmit}
 ref={formRef }>
  
<div className={`relative max-w-max mx-auto cassette ${isShowFront ? "front" : "back"}`}>

{/* front */}
<div className="relative front"> 
  <img src="/images/cassete.png" alt="" />
  {/* titulo */}
  <label className="bg-white flex items-center p-1 absolute top-[16px] left-[20px] rounded-md
  w-[198px] text-sm">
    <input 
    className="outline-none bg-transparent text-black"
    placeholder="Titulo"
    type="text"
    name="title"
    onFocus={() => setIsShowFront(true) }
    required
     /> 
    <PencilIcion />
  </label>
  <button type="submit" className=" absolute left-4 bottom-4 ">
    <SaveIcon />
  </button>

    <button
    onClick={ handleDeletePlaylist}
     type="button" className=" absolute left-14 bottom-4 ">
    <DeleteIcon />
    </button>
    
    <Link to={`/playlists/public/${id}`} type="button" className=" absolute right-4 bottom-4 ">
    <ShareIcon />
    </Link>
</div>

{/*trasera*/}
<div className="absolute top-0 back ">
<img src="/images/cassete.png" alt="" />

 {/* para*/}
  
 <label className="bg-white flex items-center p-1 absolute top-[16px] left-[20px] rounded-md
  w-[198px] text-sm">
    <input 
    className="outline-none bg-transparent text-black"
    placeholder="Para:"
    type="text" 
    name="to"
    required
    onFocus={() => setIsShowFront(false) }

    /> 
    <PencilIcion />
  </label>


{/* mensaje */}
  <label className="bg-white flex items-center p-1 absolute top-[50px] left-[20px] rounded-md
  w-[198px] text-sm">
    <textarea 
    className="outline-none bg-transparent text-black resize-none w-full"
    placeholder="Mensaje"
    type="text" 
    rows={4}
    name="message"
    required
    /> 
    
  </label>
</div>
</div>
<button 
className="flex gap-2 mx-auto p-1 px-4 border-2 dorder-white rounded-full"
type="button"
onClick={handleToggleCassete}
>  
Lado {isShowFront ? "(B)" : "(A)"} < ChangeIcon />  
</button>
</form>
<TrackList  
tracks={playlistInfo?.tracks ?? []}
showDeleteTrack
onDeleteTrack={handleDeleteTrackByPlaylist}
/>
   </PrincipalContainer>
  )
}

export default PlayListDetail

import { useState } from "react"
import {PencilIcion,  ChangeIcon}  from "../icons/Svgs"
import "./PopUpPlaylist.css"
import TrackList from "./TrackList"
import { axiosMusic } from "../../utils/configAxios"
import { resetTracks } from "../../store/slices/playlist.slice"
import { useDispatch } from "react-redux"



const PopUpPlaylist = ({isShowPlaylist, tracks}) => {
  const [isShowFront,setIsShowFront] = useState(true)

  const dispacht = useDispatch()

  const handleToggleCassete = () => {
    setIsShowFront(!isShowFront)
  }

  const handelSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData)
   data.tracks = tracks
   axiosMusic
   .post("/api/playlists", data)
   .then(() => {
    e.target.reset()
    dispacht( resetTracks())
    alert("Playlist creada correctamente, revisa tu Playlist")
   })
   .catch((err) => console.log(err))
  }



  return (
    <form 
    onSubmit={ handelSubmit}
    className={`absolute  -bottom-4 translate-y-full
    bg-primary-light grid gap-2 p-3 px-5 rounded-xl border border-secondary transition-all max-w-[279.6px] z-20 ${
      isShowPlaylist
       ? "right-4" 
       : "-right-full"
       }`}
    >
      {/* cassete */}
      <div className={`relative cassette ${isShowFront ? "front" : "back"}`}>

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
      onClick={handleToggleCassete}>  
        Lado {isShowFront ? "(B)" : "(A)"} < ChangeIcon />  
        </button>

        <TrackList tracks={tracks}
        limitScroll
        showMinusBtn
        />
      <button
      type="submit"  className="flex gap-2 mx-auto p-1 px-5 border-2 dorder-white rounded-full uppercase">
        Crear
        </button>
    </form>
  )
}

export default PopUpPlaylist

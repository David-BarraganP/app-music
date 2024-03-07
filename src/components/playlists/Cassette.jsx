import { Link } from "react-router-dom"
import { PencilIcion } from "../icons/Svgs"

const Cassette = ({ title, id, index }) => {

    const  DELTA_Y  = 49
    const separation = index *  DELTA_Y  + "px"
    


  return (
    <Link to={`/playlists/${id}`} 
    className="absolute cursor-pointer left-1/2 -translate-x-1/2 w-[238px] blocks 
    hover:rotate-3 hover:-translate-y-2 transition-transform"
    style={{top: separation}}
    > 
    <img
    src="/images/cassete.png" alt="" />
    {/* titulo */}
    <div className="bg-white flex items-center p-1 absolute top-[16px] left-[20px] rounded-md
    w-[198px] text-sm">
    <h4 className="text-black flex-1 line-clamp-1 capitalize">{title}</h4> 
      <PencilIcion />
    </div>
  </Link>
  )
}

export default Cassette

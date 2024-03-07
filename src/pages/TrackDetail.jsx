import { Link, useParams } from "react-router-dom"
import PrincipalContainer from "../components/layouts/PrincipalContainer"
import TrackList from "../components/shared/TrackList"
import { useEffect, useState } from "react"
import { axiosMusic } from "../utils/configAxios"


const TrackDetail = () => {
  const [trackInfo,setTrackInfo] = useState(null)

  const {id} = useParams()

  useEffect(() => {
    axiosMusic
    .get(`/api/tracks/${id}`)
    .then(({data}) => setTrackInfo(data))
    .catch((err) => console.log(err))
     
  }, [])


  return (
    <PrincipalContainer>
    <Link to={-1}
className="text-secondary"
>
{"< Atras"}
</Link>
<header className="xs:grid xs:grid-cols-2 xs:gap-4 xs:items-center py-6">
  <div>
<img 
className="rounded-2xl block mx-auto size-[200px] object-cover"
src={trackInfo?.album.images[1].url} 
alt="" />
  </div>
  <div>
    <h2 className="font-semibold">{trackInfo?.name}</h2>
    <ul className="mt-2">
<li className="flex gap-2 ">{trackInfo?.artists[0].name}</li>
<li>Album: {trackInfo?.album.name}</li>
<li className="">Año de salida: {trackInfo?.album.release_date }
</li>
    </ul>
  </div>
</header>
<h3>Canciones recomendadas</h3>
<TrackList  tracks={trackInfo?.relatedSongs ?? []} showAddBtn/>
  </PrincipalContainer>
  )
}

export default TrackDetail

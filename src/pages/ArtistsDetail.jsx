import { Link, useParams } from "react-router-dom"
import PrincipalContainer from "../components/layouts/PrincipalContainer"
import { useEffect, useState } from "react"
import { axiosMusic } from "../utils/configAxios"
import TrackList from "../components/shared/TrackList"
import {Swiper, SwiperSlide} from "swiper/react"
import "swiper/css"


const ArtistsDetail = () => {
  const [artisInfo, setArtisInfo] = useState(null)


  const {id} = useParams()
  

  useEffect(() => {
    axiosMusic
    .get(`/api/artists/${id}`)
    .then(({data}) =>  setArtisInfo(data))
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
className="rounded-full block mx-auto size-[200px] object-cover"
src={artisInfo?.images[1].url} 
alt="" />
  </div>
  <div>
    <h2 className="font-semibold">{artisInfo?.name}</h2>
    <ul className="mt-2">
<li className="flex gap-2 ">Seguidores: {artisInfo?.followers.total} <span> <img
className="size-[20px] flex items-center justify-center"
 src="https://cdn-icons-png.flaticon.com/512/2097/2097734.png" alt="" /></span> </li>
<li>Popularidad: {artisInfo?.popularity}</li>
<li className="">Generos: 
<ul className="flex gap-2 flex-wrap items-center pt-2">
{artisInfo?.genres.map((genre) => <li className="border-2 rounded-md px-2 uppercase text-sm
font-semibold border-purple-300" key={genre}>{genre}</li> )}
</ul>
</li>
    </ul>
  </div>
</header>
  {/* slider albumes del artista*/}
<section>
  <Swiper
  className="mySwiper"
  breakpoints={{
    0: {
      slidesPerView: 2,
      spaceBetween: 15, 
    },
    500: {
      slidesPerView: 3,
      spaceBetween: 15, 
    }
  }}>
    <h3>Albunes del artista</h3>
{
  artisInfo?.albums.map((album) => (
    <SwiperSlide key={album.id}>
<article>
  <header className="mb-2">
    <img
    className="rounded-md size-[130px]"
     src={album.images[1].url} alt="" />
  </header>
  <h5 className="text-sm font-semibold line-clamp-1">{album.name}</h5>
  <h6 className="text-sm text-slate-400">{album.artists[0].name}</h6>
</article>
    </SwiperSlide> 
  ))
}
  </Swiper>
</section>
<TrackList 
tracks={
  artisInfo?.songsTop ?? []
}
showAddBtn
 /> 
  </PrincipalContainer>
  )
}

export default ArtistsDetail

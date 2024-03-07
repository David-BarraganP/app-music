

const PreviewTrack = ({idTrack}) => {
  return (
    <div className="pt-5">
    <iframe
    style={{borderRadius: "12px"}}
    src={`https://open.spotify.com/embed/track/${idTrack}?utm-source=generator&theme=0`}
    width="100%"
    height="152"
    allowFullScreen=""
    allow="autoplay; clipbord-write; encrypted-media; fullscreen;
    picture-in-picture"
    loading="lazy"
    >
    </iframe>
    </div>
  )
}

export default PreviewTrack

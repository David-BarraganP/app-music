import TrackCard from "./TrackCard"

const TrackList= ({
  tracks, 
  limitScroll = false, 
  showAddBtn, 
  showMinusBtn,
  showDeleteTrack,
  onDeleteTrack,
  showPlayTrack,
  onPlayTrack,
 }) => {

  const classByScroll = limitScroll ? "max-h-[240px] overflow-y-auto" : ""

  return (
    <section className={`grid gap-2 pt-6  ${classByScroll}`}>
      {
        tracks.map((track) => (
        <TrackCard 
         key={track.id} 
         track={track}
         showAddBtn={showAddBtn}
         showMinusBtn={showMinusBtn}
         showDeleteTrack={showDeleteTrack}
         onDeleteTrack={onDeleteTrack}
         showPlayTrack={showPlayTrack}
         onPlayTrack={onPlayTrack}
         />
        ))}
    </section>
  )
}

export default TrackList

import { createSlice } from "@reduxjs/toolkit";

const playlistSlice = createSlice({

    name: "playlist",
    initialState: {
        tracks: [],
    },
    reducers: {
        addTracks: (state, action) => {
            const newTrack = action.payload
            const trackIndex =  state.tracks.findIndex((track) => track.id === newTrack.id  )
            if (trackIndex === -1) {
                state.tracks.push(newTrack)
            }else{
                return state
            } 
        },
        deleteTrack: (state, action) => {
               const idToDelete = action.payload   
               const newTracks = state.tracks.filter((track) => track.id !== idToDelete)
               state.tracks = newTracks 
        },
        resetTracks: (state) => {
            state.tracks = []
        }
    },
})

export const {addTracks, deleteTrack, resetTracks} = playlistSlice.actions

export default playlistSlice.reducer
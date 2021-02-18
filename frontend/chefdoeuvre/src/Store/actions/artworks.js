export const listArtworks = (artworks) => ({
    type: "GET_ARTWORKS",
    payload: artworks
})

export const personalArtworks = (myArtworks) => ({
    type: "GET_MY_ARTWORKS",
    payload: myArtworks
})

export const newArtwork = (artwork, artist) => ({
    type: "ADD_ARTWORK",
    // token: artist.token,
    id: artist.id,
    payload: artwork
})

export const deleteArtwork = (id_artwork) => ({
    type: "DELETE_ARTWORK",
    payload: id_artwork
})
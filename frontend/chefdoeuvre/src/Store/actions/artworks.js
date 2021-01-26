export const listArtworks = (artworks) => ({
    type: "GET_ARTWORKS",
    payload: artworks
})

export const newArtwork = (artwork, artist) => ({
    type: "ADD_ARTWORK",
    // token: artist.token,
    id: artist.id,
    payload: artwork
})
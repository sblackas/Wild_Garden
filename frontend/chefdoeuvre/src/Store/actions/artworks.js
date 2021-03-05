export const listArtworks = (artworks) => ({
    type: "GET_ARTWORKS",
    payload: artworks
})

export const personalArtworks = (myArtworks) => ({
    type: "GET_MY_ARTWORKS",
    myArtworks: myArtworks
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

export const editArtwork = (artwork) => ({
    type: "UPDATE_MY_ARTWORK",
    payload: artwork
})

export const addToFav = (id_artwork) => ({
    type: "ADD_FAVORITES",
    payload: id_artwork
})

export const listFavs = (artworks) => ({
    type: "GET_MY_FAVS",
    payload: artworks
})

export const deleteFromFav = (id_artwork) => ({
    type: "DELETE_MY_FAV",
    payload: id_artwork
})
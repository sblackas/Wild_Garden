export const loginArtist = (artist) => ({
    type: "SIGNIN_ARTIST",
    token: artist.token,
    email: artist.email,
    id: artist.id
})

export const logoutArtist = () => ({
    type: "SIGNOUT_ARTIST"
})

export const usersList = (users) => ({
    type: "GET_ALL_USERS",
    payload: users
})

export const userData = (artist) => ({
    type: "GET_DATA_USER",
    payload: artist,
})

export const deleteUser = (id_user) => ({
    type: "DELETE_USER",
    payload: id_user
})
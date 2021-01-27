export const loginArtist = (artist) => ({
    type: "SIGNIN_ARTIST",
    token: artist.token,
    email: artist.email,
    id: artist.id
})

export const logoutArtist = () => ({
    type: "SIGNOUT_ARTIST"
})

// export const loggedArtist = () => ({
//     type: "LOAD_USER",
//     // id : artist.id
//     id : localStorage.getItem("id")
// })

export const usersList = (users) => ({
    type: "GET_ALL_USERS",
    payload: users
})
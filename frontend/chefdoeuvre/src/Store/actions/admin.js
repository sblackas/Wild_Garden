export const loginAdmin = (admin) => ({
    type: "SIGNIN_ADMIN",
    token: admin.token,
    email: admin.email,
    id: admin.id
})

export const logoutAdmin = () => ({
    type: "SIGNOUT_ADMIN"
})
export const listCate = (categories) => ({
    type: "GET_CATEGORIES",
    payload: categories
})

export const newCategory = (category, admin) => ({
    type: "ADD_CATEGORY",
    id: admin.id,
    payload: category
})

export const stripToBasic = (data) => {
    const userData = structuredClone(data)
    delete userData.coverImg
    delete userData.bio
    delete userData.id
    delete userData.location
    delete userData.website
    delete userData.createdAt
    delete userData.updatedAt
    delete userData.followers
    delete userData.following
    delete userData.password
    delete userData.email
    delete userData.bookmarks
    return userData
}

export const stripToFollowUser = (data) => {
    const userData = structuredClone(data)
    delete userData.id
    delete userData.location
    delete userData.website
    delete userData.createdAt
    delete userData.updatedAt
    delete userData.followers
    delete userData.following
    delete userData.password
    delete userData.email
    delete userData.bookmarks
    return userData
}



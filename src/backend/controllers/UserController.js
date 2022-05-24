import { Response } from "miragejs";
import { formatDate, requiresAuth } from "../utils/authUtils";
import { stripToFollowUser } from "../utils/prepareUserObject";

/**
 * All the routes related to user are present here.
 * */

/**
 * This handler handles gets all users in the db.
 * send GET Request at /api/users
 * */

export const getAllUsersHandler = function () {
    return new Response(200, {}, { users: this.db.users });
};

/**
 * This handler handles get a user from userId in the db.
 * send GET Request at /api/users/:userId
 * */

export const getUserHandler = function (schema, request) {
    const username = request.params.username;
    try {
        const user = schema.users.findBy({ username: username }).attrs;
        return new Response(200, {}, { user });
    } catch (error) {
        return new Response(
            500,
            {},
            {
                error,
            }
        );
    }
};

/**
 * This handler handles updating user details.
 * send POST Request at /api/users/edit
 * body contains { userData }
 * */

export const editUserHandler = function (schema, request) {
    let user = requiresAuth.call(this, request);
    try {
        if (!user) {
            return new Response(
                404,
                {},
                {
                    errors: [
                        "The username you entered is not Registered. Not Found error",
                    ],
                }
            );
        }
        const { userData } = JSON.parse(request.requestBody);
        if (userData.email && userData.email !== user.email) {
            const foundUserEmail = schema.users.findBy({ email: userData.email });
            if (foundUserEmail) {
                return new Response(
                    422,
                    {},
                    {
                        errors: ["Unprocessable Entity. Email Already Exists."],
                    }
                );
            }
        }

        user = { ...user, ...userData, updatedAt: formatDate() };
        this.db.users.update({ _id: user._id }, user);
        return new Response(201, {}, { user });
    } catch (error) {
        return new Response(
            500,
            {},
            {
                error,
            }
        );
    }
};

/**
 * This handler gets all the user bookmarks from the db.
 * send GET Request at /api/users/bookmark/
 * */

export const getBookmarkPostsHandler = function (schema, request) {
    const user = requiresAuth.call(this, request);
    try {
        if (!user) {
            return new Response(
                404,
                {},
                {
                    errors: [
                        "The username you entered is not Registered. Not Found error",
                    ],
                }
            );
        }

        const bookmarkData = user.bookmarks.map((id) => {
            return schema.posts.findBy({ _id: id }).attrs;
        })

        return new Response(200, {}, { bookmarks: bookmarkData });
    } catch (error) {
        return new Response(
            500,
            {},
            {
                error,
            }
        );
    }
};
/**
 * This handler handles adding a post to user's bookmarks in the db.
 * send POST Request at /api/users/bookmark/:postId/
 * */

export const bookmarkPostHandler = function (schema, request) {
    const { postId } = request.params;
    // const post = schema.posts.findBy({ _id: postId }).attrs;
    const user = requiresAuth.call(this, request);
    try {
        if (!user) {
            return new Response(
                404,
                {},
                {
                    errors: [
                        "The username you entered is not Registered. Not Found error",
                    ],
                }
            );
        }
        const isBookmarked = user.bookmarks.some(
            (currPostId) => currPostId === postId
        );
        if (isBookmarked) {
            return new Response(
                400,
                {},
                { errors: ["This Post is already bookmarked"] }
            );
        }
        user.bookmarks.push(postId);
        this.db.users.update(
            { _id: user._id },
            { ...user, updatedAt: formatDate() }
        );
        return new Response(200, {}, { bookmarks: user.bookmarks });
    } catch (error) {
        return new Response(
            500,
            {},
            {
                error,
            }
        );
    }
};

/**
 * This handler handles adding a post to user's bookmarks in the db.
 * send POST Request at /api/users/remove-bookmark/:postId/
 * */

export const removePostFromBookmarkHandler = function (schema, request) {
    const { postId } = request.params;
    let user = requiresAuth.call(this, request);
    try {
        if (!user) {
            return new Response(
                404,
                {},
                {
                    errors: [
                        "The username you entered is not Registered. Not Found error",
                    ],
                }
            );
        }
        const isBookmarked = user.bookmarks.some(
            (currPostId) => currPostId === postId
        );
        if (!isBookmarked) {
            return new Response(400, {}, { errors: ["Post not bookmarked yet"] });
        }
        const filteredBookmarks = user.bookmarks.filter(
            (currPostId) => currPostId !== postId
        );
        user = { ...user, bookmarks: filteredBookmarks };
        this.db.users.update(
            { _id: user._id },
            { ...user, updatedAt: formatDate() }
        );
        return new Response(200, {}, { bookmarks: user.bookmarks });
    } catch (error) {
        return new Response(
            500,
            {},
            {
                error,
            }
        );
    }
};

/**
 * This handler handles follow action.
 * send POST Request at /api/users/follow/:requestUserId/
 * */

export const getFollowDetails = function (schema, request) {
    const user = requiresAuth.call(this, request);
    const { requestUserId } = request.params;
    const requestedUser = schema.users.findBy({ _id: requestUserId }).attrs;
    try {
        if (!user) {
            return new Response(
                404,
                {},
                {
                    errors: [
                        "The username you entered is not Registered. Not Found error",
                    ],
                }
            );
        }
        return new Response(200, {}, { followers: requestedUser.followers, following: requestedUser.following });
    } catch (error) {
        return new Response(
            500,
            {},
            {
                error,
            }
        );
    }
}

/**
 * This handler handles follow action.
 * send POST Request at /api/users/follow/:followUserId/
 * */

export const followUserHandler = function (schema, request) {
    const user = requiresAuth.call(this, request);
    const { followUserId } = request.params;
    const followUser = schema.users.findBy({ _id: followUserId }).attrs;

    const preparedUser = stripToFollowUser(user)
    const preparedFollowUser = stripToFollowUser(followUser)
    try {
        if (!user) {
            return new Response(
                404,
                {},
                {
                    errors: [
                        "The username you entered is not Registered. Not Found error",
                    ],
                }
            );
        }
        const isFollowing = user.following.some(
            (currUser) => currUser._id === followUser._id
        );

        if (isFollowing) {
            return new Response(400, {}, { errors: ["User Already following"] });
        }

        const updatedUser = {
            ...user,
            following: [...user.following, { ...preparedFollowUser }],
        };
        const updatedFollowUser = {
            ...followUser,
            followers: [...followUser.followers, { ...preparedUser }],
        };
        this.db.users.update(
            { _id: user._id },
            { ...updatedUser, updatedAt: formatDate() }
        );
        this.db.users.update(
            { _id: followUser._id },
            { ...updatedFollowUser, updatedAt: formatDate() }
        );
        return new Response(
            200,
            {},
            { followUser: updatedFollowUser }
        );
    } catch (error) {
        return new Response(
            500,
            {},
            {
                error,
            }
        );
    }
};

/**
 * This handler handles unfollow action.
 * send POST Request at /api/users/unfollow/:followUserId/
 * */

export const unfollowUserHandler = function (schema, request) {
    const user = requiresAuth.call(this, request);
    const { followUserId } = request.params;
    const followUser = this.db.users.findBy({ _id: followUserId });

    try {
        if (!user) {
            return new Response(
                404,
                {},
                {
                    errors: [
                        "The username you entered is not Registered. Not Found error",
                    ],
                }
            );
        }
        const isFollowing = user.following.some(
            (currUser) => currUser._id === followUser._id
        );

        if (!isFollowing) {
            return new Response(400, {}, { errors: ["User already not following"] });
        }

        const updatedUser = {
            ...user,
            following: user.following.filter(
                (currUser) => currUser._id !== followUser._id
            ),
        };
        const updatedFollowUser = {
            ...followUser,
            followers: followUser.followers.filter(
                (currUser) => currUser._id !== user._id
            ),
        };
        this.db.users.update(
            { _id: user._id },
            { ...updatedUser, updatedAt: formatDate() }
        );
        this.db.users.update(
            { _id: followUser._id },
            { ...updatedFollowUser, updatedAt: formatDate() }
        );
        return new Response(
            200,
            {},
            { followUser: updatedFollowUser }
        );
    } catch (error) {
        return new Response(
            500,
            {},
            {
                error,
            }
        );
    }
};

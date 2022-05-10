import { apiRequests } from "./api.js";

const pageSize = 5;
const commentsPerPage = 5;
const endpoints = {
    MOVIES_LIST : `data/movies`,
    MOVIE_BY_ID : `data/movies/`,
    MOVIES_COUNT : `data/movies?count`,
    LIKES_BY_QUERY : `data/likes?`,
    LIKES : `data/likes/`,
    COMMENTS : `data/comments`,
};

export async function getAllMovies(page = 1){
    let pagesDispersed = [];
    let query = `?pageSize=${pageSize}&offset=${(page - 1) * pageSize}`;
    let [movies, moviesCount] = await Promise.all([
        apiRequests.get(endpoints.MOVIES_LIST + query),
        apiRequests.get(endpoints.MOVIES_COUNT)
    ]);
     let pages = Math.ceil(Number(moviesCount) / pageSize);
     for(let page = 1; page <= pages; page++){pagesDispersed.push(page)};
    return {
         movies, pages, pagesDispersed
    };
};

export async function getSingleMovie(movieId){
  let movie = await apiRequests.get(`${endpoints.MOVIE_BY_ID}${movieId}`);
  return movie;
};

export async function checkIfUserAlreadyLiked(userId, movieId){
let query = `where=movieId%3D%22${encodeURIComponent(movieId)}%22%20and%20_ownerId%3D%22${encodeURIComponent(userId)}%22`;
  let result = await apiRequests.get(endpoints.LIKES_BY_QUERY + query);
  return result;
};

export async function getTotalLikes(movieId){
    let query = `where=movieId%3D%22${encodeURIComponent(movieId)}%22&distinct=_ownerId&count`;
    let likesCount = await apiRequests.get(endpoints.LIKES_BY_QUERY + query);
    return likesCount;
};

export async function addLike(data){
   await apiRequests.post(endpoints.LIKES, data);
};

export async function revokeLike(likeId){
    await apiRequests.del(endpoints.LIKES + likeId);
};

export async function addMovie(data){
    let resp = await apiRequests.post(endpoints.addMovie, data);
    if(resp.hasOwnProperty(`url`)){
        err = await resp.json();
        err.status = `not-ok`;
        return err;
    }
    else{
        resp.status = `ok`;
        return resp;
    };
};

export async function editMovie(movieId, data){
    let resp = await apiRequests.put(endpoints.MOVIE_BY_ID + movieId, data);
    if(resp.hasOwnProperty(`url`)){
        err = await resp.json();
        err.status = `not-ok`;
        return err;
    }
    else{
        resp.status = `ok`;
        return resp;
    };
}

export async function deleteMovie(movieId){
    await apiRequests.del(endpoints.MOVIE_BY_ID + movieId);
};

export const getComments =  async (movieId,page) => {
    let commentsQuery = `?where=movieId%3D%22${encodeURIComponent(movieId)}%22&pageSize=${commentsPerPage}&offset=${(page - 1) * commentsPerPage}`;
    let countQuery = `?where=movieId%3D%22${encodeURIComponent(movieId)}%22&count`;
     let [comments, commentsCount] = await Promise.all([
        apiRequests.get(endpoints.COMMENTS + commentsQuery),
        apiRequests.get(endpoints.COMMENTS + countQuery)
     ]);
     return {comments, pages: Math.ceil(Number(commentsCount) / commentsPerPage)};
};

export const postComment = async (data) => {
   let comment = await apiRequests.post(endpoints.COMMENTS, data);
   return comment;
};
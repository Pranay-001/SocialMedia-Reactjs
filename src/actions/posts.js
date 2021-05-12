import { APIURLs } from '../helpers/urls';
import {UPDATE_POSTS} from './actionType'
export function fetchPosts(){
    return (dispatch) => {
        const url=APIURLs.fetchPosts();
        fetch(url)
        .then(response=>response.json())
        .then(data=>{
            console.log(data);
            dispatch(updatePost(data.data.posts))
        });
    }
}

export function updatePost(posts){
    return{
        type:UPDATE_POSTS,
        posts,
    }
}
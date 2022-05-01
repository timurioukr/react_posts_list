import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import PostService from '../API/PostService';
import { useFetching } from '../hooks/useFetching';
import Loader from '../components/UI/loader/Loader';

const PostIdPage = () => {
    const params = useParams()
    const [post, setPost] = useState({})
    const [comments, setComments] = useState([])


    const [fetchPostById, isLoading, error] = useFetching( async () => {
        const response = await PostService.getById(params.id)
        setPost(response.data)
    })

    const [fetchComment, isComLoading, comError] = useFetching( async () => {
        const response = await PostService.getCommentsByPostId(params.id)
        setComments(response.data)
    })

    useEffect(() => {
        fetchPostById(params.id)
        fetchComment(params.id)
    }, [])

    return (
        <div>
            <h2>You open page with ID = {params.id}</h2>
            {isLoading
                ? <Loader/>
                : <div>{post.id}. {post.body}</div>
            }
            <h2>Comments</h2>
            {isComLoading
                ? <Loader/>
                : <div>
                    {comments.map(comm => 
                    <div style={{marginTop: 15}}>
                        <h5>{comm.email}</h5>
                        <div>{comm.body}</div>
                    </div>
                )}</div>
            }
        </div>
    );
};

export default PostIdPage;
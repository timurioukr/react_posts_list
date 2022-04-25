import React, { useState, useEffect } from 'react'
import { usePosts } from '../hooks/usePosts';
import PostFilter from '../components/PostFilter';
import PostForm from '../components/PostForm';
import PostList from '../components/PostList';
import MyButton from '../components/UI/button/MyButton';
import MyModal from '../components/UI/modal/MyModal';
import PostService from '../API/PostService'
import Loader from '../components/UI/loader/Loader';
import {getPageCount} from '../utils/pages'
import '../styles/app.css'
import { useFetching } from '../hooks/useFetching';
import Pagination from '../components/UI/pagination/Pagination';

function Posts() {
  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState({sort: '', query: ''})
  const [modal, setModal] = useState(false)
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
  const [totalPages, setTotalPages] = useState(0)
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)




  const [fetchPosts, isPostLoading, postError] = useFetching( async () => {
    const response = await PostService.getAll(limit, page )
    setPosts(response.data)
    const totalCount = response.headers['x-total-count']
    setTotalPages(getPageCount(totalCount, limit))
  })

  useEffect(() => {
    fetchPosts()
  }, [page])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const changePage = (p) => {
    setPage(p)
  } 

  return (
    <div className="App">
       <MyButton style={{marginTop: 30}} onClick={() => setModal(true)} >Create post</MyButton>
      <MyModal
        setVisible={setModal}
        visible={modal}
      >
        <PostForm create={createPost}/>
      </MyModal> 
      <hr style={{marginTop: 15, marginBottom: 15}}/>
      <PostFilter 
      filter={filter}
      setFilter={setFilter}
      />
      {postError && <h1>Error {postError}</h1>}
      {isPostLoading
        ? <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}><Loader/></div>
        : <PostList remove={removePost} posts={sortedAndSearchedPosts } title={'Post list'}/>
      }
      <Pagination page={page} changePage={changePage} totalPages={totalPages}/>
    
    </div>
  );
}

export default Posts;
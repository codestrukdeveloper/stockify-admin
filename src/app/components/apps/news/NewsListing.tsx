'use client'
import { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import NewsCard from './NewsCard';
import { orderBy } from 'lodash';
import { useSelector, useDispatch } from '@/store/hooks';
import { fetchNewsPosts } from '@/store/apps/news/NewsSlice';
import NewsFeaturedCard from './NewsFeaturedCard';
import { NewsPostType } from '../../../(DashboardLayout)/types/apps/news';

const NewsListing = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNewsPosts());
  }, [dispatch]);

  
  const filterNews = (posts: NewsPostType[], sortBy: string, _cSearch: string) => {
    // SORT BY

    if (sortBy === 'newest') {
      posts = orderBy(posts, ['createdAt'], ['desc']);
    }
    if (sortBy === 'oldest') {
      posts = orderBy(posts, ['createdAt'], ['asc']);
    }
   
    return posts;
  };

  return (
    <Grid container spacing={3}>
     
      {/* {newsPosts.map((post) => {
        return <NewsCard post={post} key={post.id} />;
      })} */}
      <Grid item lg={12} sm={12} mt={3}>
        <Pagination count={10} color="primary" sx={{ display: 'flex', justifyContent: 'center' }} />
      </Grid>
    </Grid>
  );
};

export default NewsListing;

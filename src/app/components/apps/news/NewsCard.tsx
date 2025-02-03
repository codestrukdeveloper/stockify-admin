// third-party
import { format } from 'date-fns';
import NextLink  from 'next/link';
import { useDispatch } from '@/store/hooks';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { IconEye, IconMessage2, IconPoint } from '@tabler/icons-react';
import { fetchNewsPost } from '@/store/apps/news/NewsSlice';
import BlankCard from '../../shared/BlankCard';
import { NewsPostType } from '../../../(DashboardLayout)/types/apps/news';
import { INews } from '@/app/(DashboardLayout)/types/apps/INews';

interface Btype {
  post: INews;
  index?: number;
}

const NewsCard = ({ post }: Btype) => {
  const dispatch = useDispatch();
  const { coverImg,_id, title, link, createdAt }: any = post;

  const linkTo = title
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');

  return (
    <Grid item xs={12} lg={4} md={4} sm={6} display="flex" alignItems="stretch">
      <BlankCard className="hoverCard">
        <>
          <Typography
            component={NextLink}
            href={`/apps/news/edit/${_id}`}
            onClick={() => dispatch(fetchNewsPost(linkTo))}
          >
            <CardMedia component="img" height="240" image={coverImg} alt="green iguana" />
          </Typography>
          <CardContent>
            <Box my={3}>
              <Typography
                gutterBottom
                variant="h5"
                color="inherit"
                sx={{ textDecoration: 'none' }}
                component={NextLink}
                href={`/apps/news/detail/${linkTo}`}
                onClick={() => dispatch(fetchNewsPost(linkTo))}
              >
                {title}
              </Typography>
            </Box>
            <Stack direction="row" gap={3} alignItems="center">
              <Stack direction="row" gap={1} alignItems="center">
                <IconEye size="18" /> {link}
              </Stack>
          

              <Stack direction="row" ml="auto" alignItems="center">
                <IconPoint size="16" />
                <small>{format(new Date(createdAt), 'E, MMM d')}</small>
              </Stack>
            </Stack>
          </CardContent>
        </>
      </BlankCard>
    </Grid>
  );
};

export default NewsCard;

import { Box, Skeleton } from '@mui/material'

const NoticeDetailTitleSkeleton = () => {
  return (
    <Box pb={2} borderBottom='1px solid var(--lightGray)'>
      <Skeleton variant='text' width='40%' height='50px' animation='wave' />
    </Box>
  )
}

export default NoticeDetailTitleSkeleton
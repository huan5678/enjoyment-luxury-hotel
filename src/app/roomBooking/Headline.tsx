import { Box, Stack, Typography } from '@mui/material';

interface HeadlineProps {
  title: string;
  fontSizeStyle?: string;
  isGray?: boolean
}

function Headline({title, fontSizeStyle, isGray = false}: HeadlineProps) {
  
  return (
    <Box display='flex' alignItems='center'
         sx={{ mb: fontSizeStyle === 'normal' ? '8px' : {sm: '16px', md: '24px'} }}>
      <Stack sx={{
        width: '4px',
        height: '24px',
        mr: '12px',
        bgcolor: isGray ? '#909090' : 'primary.main'
      }} />
      <Typography sx={{
        fontSize: fontSizeStyle === 'normal' ? '16px' : {sm: '16px', md: '24px'},
        fontWeight: 700,
      }}>
        {title}
      </Typography>
    </Box>
  )
}

export default Headline
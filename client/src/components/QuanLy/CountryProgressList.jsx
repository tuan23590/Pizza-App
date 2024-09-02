import React from 'react';
import { Box, Typography, LinearProgress, Grid } from '@mui/material';

const data = [
  { country: 'India', percentage: 50 },
  { country: 'USA', percentage: 35 },
  { country: 'Brazil', percentage: 10 },
  { country: 'Brazil', percentage: 10 },
  { country: 'Brazil', percentage: 10 },
  { country: 'Brazil', percentage: 10 },
  { country: 'Brazil', percentage: 10 },
  { country: 'Other', percentage: 5 },
];

const ProgressItem = ({ country, flag, percentage }) => (
  <Grid container spacing={2}>
    <Grid item xs={2} mb={2}>
      <Typography variant="body2">{country}</Typography>
    </Grid>
    <Grid item xs={9}>
      <LinearProgress
        variant="determinate"
        value={percentage}
        sx={{ width: '100%',padding:1,borderRadius:5 }}
      />
      </Grid>
      <Grid item xs={1}>
      <Typography variant="body2">{`${percentage}%`}</Typography>
    </Grid>
  </Grid>
);

const CountryProgressList = () => (
  <Box width="300px">
    {data.map((item,index) => (
      <ProgressItem key={index} {...item} />
    ))}
  </Box>
);

export default CountryProgressList;

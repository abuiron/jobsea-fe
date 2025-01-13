import { Typography, Box, Card, CardContent, Grid } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';

const UserJobsHistory = () => {
    const { user } = useSelector(state => state.userProfile);

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" sx={{ color: "#fafafa", pb: 3 }}>
                Job History
            </Typography>
            <Grid container spacing={3}>
                {Array.isArray(user?.jobsHistory) && user.jobsHistory.length > 0 ? (
                    user.jobsHistory.map((job, i) => (
                        <Grid item xs={12} sm={6} md={4} key={i}>
                            <Card sx={{ bgcolor: '#1e1e1e', color: '#fafafa' }}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        {job.title || 'No Title'}
                                    </Typography>
                                    <Typography variant="body2" sx={{ pb: 1 }}>
                                        {job.description || 'No Description'}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#b3b3b3' }}>
                                        Location: {job.location || 'Unknown'}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#b3b3b3' }}>
                                        Salary: {job.salary || 'N/A'}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#b3b3b3' }}>
                                        Interview Date: {job.interviewDate
                                            ? moment(job.interviewDate).format('YYYY/MM/DD')
                                            : 'Not Scheduled'}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#b3b3b3' }}>
                                        Status: {job.applicationStatus || 'Pending'}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <Typography variant="h6" sx={{ color: "#fafafa", pt: 3 }}>
                        No job history found.
                    </Typography>
                )}
            </Grid>
        </Box>
    );
};

export default UserJobsHistory;

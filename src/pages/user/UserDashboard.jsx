import { Typography, Box, Grid } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import StatComponent from '../../component/StartComponent';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import WorkIcon from '@mui/icons-material/Work';
import moment from 'moment';

const UserDashboard = () => {
    const { user } = useSelector(state => state.userProfile);

    // Fallback values for missing data
    const memberSince = user?.createdAt
        ? moment(user.createdAt).format('YYYY / MM / DD')
        : 'N/A';

    const jobsSubmitted = Array.isArray(user?.jobsHistory)
        ? user.jobsHistory.length
        : 0;

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" sx={{ color: "white", pb: 3 }}>
                Dashboard
            </Typography>
            <Grid container spacing={3}>
                {/* Stat: Member Since */}
                <Grid item xs={12} sm={6}>
                    <StatComponent
                        value={memberSince}
                        icon={<CalendarMonthIcon sx={{ color: "#fafafa", fontSize: 30 }} />}
                        description="Member Since"
                    />
                </Grid>

                {/* Stat: Jobs Submitted */}
                <Grid item xs={12} sm={6}>
                    <StatComponent
                        value={jobsSubmitted.toString()}
                        icon={<WorkIcon sx={{ color: "#fafafa", fontSize: 30 }} />}
                        description="Jobs Submitted"
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default UserDashboard;

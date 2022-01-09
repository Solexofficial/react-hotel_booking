import { Paper } from '@mui/material';
import React from 'react';
import RoomsListTable from './RoomsListTable/RoomsListTable';

const AdminDashboard = () => {
  return (
    <div style={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <RoomsListTable />
      </Paper>
    </div>
  );
};

export default AdminDashboard;

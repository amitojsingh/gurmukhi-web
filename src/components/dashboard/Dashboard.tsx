import React from 'react';
import { SignOutButton } from '@/components/authentication';
import { CustomHeader } from '../common';

const Dashboard = () => {

    return (
      <>
        <CustomHeader />
        <div>
          <h1>Dashboard</h1>
          <SignOutButton />
        </div>
      </>
    );
};

export default Dashboard;

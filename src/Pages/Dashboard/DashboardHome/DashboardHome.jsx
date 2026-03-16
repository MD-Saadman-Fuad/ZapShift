import React from 'react';
import useRole from '../../../Hooks/useRole';
import Loading from '../../../Components/Loading/Loading';
import AdminDashboardHome from './AdminDashboardHome';
import UserDashboardHome from './UserDashboardHome';
import RiderDashboardHome from './RiderDashboardHome';

const DashboardHome = () => {
    const { role, roleLoading } = useRole();
    if (roleLoading) {
        return <Loading />;
    }
    if (role === 'admin') {
        return <AdminDashboardHome />;
    }
    if (role === 'rider') {
        return <RiderDashboardHome />;
    }
    if (role === 'user') {
        return <UserDashboardHome />;
    }
    return (
        <div>
            <h2 className='text-4xl'>Dashboard Home</h2>
        </div>
    );
};

export default DashboardHome;
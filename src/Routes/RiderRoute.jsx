import React from 'react';
import Loading from '../Components/Loading/Loading';
import useRole from '../Hooks/useRole';
import useAuth from '../Hooks/useAuth';
import Forbidden from '../Components/Forbidden/Forbidden';

const RiderRoute = ({children}) => {
    const { loading, user} = useAuth();
    const {role, roleLoading } = useRole();

    if(loading || !user || roleLoading){
        return <Loading></Loading>
    }

    if(role !== 'rider'){
        return <Forbidden></Forbidden>
    }
    
    return children;
};

export default RiderRoute;
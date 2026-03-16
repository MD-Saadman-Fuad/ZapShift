import axios from 'axios';
import React from 'react';

const axiosInstance = axios.create({
    baseURL: 'https://zapshift-server.onrender.com'
})

const useAxios = () => {
        return axiosInstance;
};

export default useAxios;
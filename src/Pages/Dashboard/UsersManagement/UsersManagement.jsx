import React, { useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaUserShield } from 'react-icons/fa';
import { FiShieldOff } from 'react-icons/fi';
import Swal from 'sweetalert2';

const UsersManagement = () => {
  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText] = useState('');
  const { refetch, data: users = [] } = useQuery({
    queryKey: ['users', searchText],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?searchText=${searchText}`);
      return res.data;
    }
  })

  const handleMakeUserAdmin = user => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to make ${user.name} an Admin!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, make Admin!"
    }).then((result) => {
      if (result.isConfirmed) {
        const roleInfo = { role: 'admin' };
        axiosSecure.patch(`/users/${user._id}/role`, roleInfo)
          .then(res => {
            if (res.data.modifiedCount > 0) {
              refetch();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${user.name} is now an Admin.`,
                showConfirmButton: false,
                timer: 2000
              });
            }
          })
      }
    });
  };

  const handleRemoveAdmin = user => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to remove ${user.name} from Admin role!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove Admin!"
    }).then((result) => {
      if (result.isConfirmed) {
        const roleInfo = { role: 'user' };
        axiosSecure.patch(`/users/${user._id}/role`, roleInfo)
          .then(res => {
            if (res.data.modifiedCount > 0) {
              refetch();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${user.name} Removed from Admin.`,
                showConfirmButton: false,
                timer: 2000
              });
            }
          })
      }
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold">Manage Users ({users.length})</h2>
      {/* <h3>{searchText}</h3> */}
      <label className="input">
        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        <input onChange={(e)=> setSearchText(e.target.value)}
         type="search" className="grow" placeholder="Search" />
        
      </label>


      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                #
              </th>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Admin Action</th>
              <th>Other Actions</th>
            </tr>
          </thead>
          <tbody>


            {users.map((user, index) =>
              <tr>
                <td>
                  {index + 1}
                </td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={user.photoURL}
                          alt="Avatar Tailwind CSS Component" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.name}</div>
                      <div className="text-sm opacity-50">United States</div>
                    </div>
                  </div>
                </td>
                <td>
                  {user.email}
                </td>
                <td>
                  {user.role}
                </td>
                <td>

                  {user.role === 'admin' ? <button onClick={() => handleRemoveAdmin(user)}
                    className='btn bg-red-500'>
                    <FiShieldOff />
                  </button> :
                    <button onClick={() => handleMakeUserAdmin(user)} className='btn bg-green-500'>

                      <FaUserShield />
                    </button>}

                </td>
                <th>
                  Actions
                </th>
              </tr>
            )}

          </tbody>

        </table>
      </div>
    </div>
  );
};

export default UsersManagement; 
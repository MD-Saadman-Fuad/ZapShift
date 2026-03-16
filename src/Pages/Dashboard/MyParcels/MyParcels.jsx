import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { FiEdit } from 'react-icons/fi';
import { FaMagnifyingGlass, FaRegTrashCan } from 'react-icons/fa6';
import Swal from 'sweetalert2';
import { Link } from 'react-router';


const MyParcels = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['myParcels', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user?.email}`);
            return res.data;
        }
    })


    const handleParcelDelete = id => {
        console.log(id);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/parcels/${id}`)
                    .then(res => {
                        console.log(res.data);

                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your Parcel has been deleted.",
                                icon: "success"
                            });
                        }
                    });


            }
        });
    }

    return (
        <div>
            <h2>All of My Parcels : {parcels.length}</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Cost</th>
                            <th>Payment Status</th>
                            <th>Tracking ID</th>
                            <th>Delivary Status</th>

                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            parcels.map((parcel, index) => <tr key={parcel._id}>
                                <th>{index + 1}</th>
                                <td>{parcel.parcelName}</td>
                                <td>{parcel.cost}</td>

                                <td>{
                                    parcel.paymentStatus === "Paid" ? <span className='text-green-500'>Paid</span>
                                        : <Link to={`/dashboard/payment/${parcel._id}`} className="btn btn-sm btn-primary text-black">Pay</Link>
                                }</td>
                                <Link to={`/parcel-track/${parcel.trackingId}`} className="btn btn-md btn-primary text-black mt-2">
                                    {parcel.trackingId}
                                </Link>
                                <td>{parcel.delivaryStatus}</td>
                                <td>
                                    <button className="btn btn-square hover:bg-primary mx-2"><FiEdit ></FiEdit></button>
                                    <button className="btn btn-square hover:bg-primary mx-2"><FaMagnifyingGlass /></button>
                                    <button onClick={() => handleParcelDelete(parcel._id)}
                                        className="btn btn-square hover:bg-primary mx-2"><FaRegTrashCan /></button>
                                </td>
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyParcels;
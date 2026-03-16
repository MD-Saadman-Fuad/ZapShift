import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useLoaderData, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
// import axios from 'axios';
import useAuth from '../../Hooks/useAuth';

const SendParcel = () => {
    const { register, handleSubmit, control,
        // formState: { errors } 
    } = useForm();

    const navigate = useNavigate();

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const serviceCenters = useLoaderData();
    const regionsDuplicate = serviceCenters.map(center => center.region);
    const regions = [...new Set(regionsDuplicate)];
    const senderRegion = useWatch({ control, name: "senderRegion" });
    const receiverRegion = useWatch({ control, name: "receiverRegion" });

    const districtsByRegion = region => {
        const regionDistricts = serviceCenters.filter(center => center.region === region);
        return regionDistricts.map(center => center.district);
    }
    // console.log(regions);
    const handleSendParcel = data => {
        // console.log(data);
        const isDocument = data.parcelType === "document";
        const isSameDistrict = data.senderDistrict === data.receiverDistrict;
        const parcelWeight = parseFloat(data.parcelWeight);
        // console.log(isSameDistrict);
        let cost = 0;

        if (isDocument) {
            cost = isSameDistrict ? 60 : 80;
        }
        else {
            if (parcelWeight < 3) {
                cost = isSameDistrict ? 110 : 150;
            } else {
                const minCharge = isSameDistrict ? 110 : 150;
                const extraWeight = parcelWeight - 3;
                const extraCharge = isSameDistrict ? extraWeight * 40 : (extraWeight * 40) + 40;
                cost = minCharge + extraCharge
            }
        }

        // console.log(`Total cost for the parcel is: ${cost} BDT`);
        data.cost = cost
        Swal.fire({
            title: "Do you want to confirm sending the parcel?",
            text: `You will be charged ${cost} BDT`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Confirm My Parcel"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.post('/parcels', data)
                    .then(res => {
                        // console.log(res.data);
                        if (res.data.insertedId) {
                            navigate('/dashboard/my-parcels');
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "Parcel Created, Please proceed to payment",
                                showConfirmButton: false,
                                timer: 2500
                            });
                        }
                    })

                Swal.fire({
                    title: "Confirmed!",
                    text: "Your parcel has been confirmed.",
                    icon: "success"
                });
            }
        });
    }
    return (
        <div className='text-black m-4'>
            <h2 className='text-3xl  font-bold'>Send Parcel</h2>
            <h2 className='text-md mt-2  font-bold'>Enter your parcel details</h2>

            <form onSubmit={handleSubmit(handleSendParcel)} className='text-black mt-4 p-4'>
                {/* Document */}
                <div>
                    <label className='label mr-4'>
                        <input type="radio" {...register("parcelType")} value="document" className='radio' defaultChecked />
                        Document
                    </label>

                    <label className='label'>
                        <input type="radio" {...register("parcelType")} value="non-document" className='radio' />
                        Non-Document
                    </label>
                </div>

                {/* Pickup Details */}
                <div className=''>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
                        <fieldset className="fieldset">
                            <label className="label">Parcel Name</label>
                            <input type="text" {...register("parcelName")} className="input w-full" placeholder="Parcel Name" />

                        </fieldset>
                        <fieldset className="fieldset">
                            <label className="label">Parcel Weight</label>
                            <input type="number" {...register("parcelWeight")} className="input w-full" placeholder="Parcel Weight" />

                        </fieldset>
                    </div>

                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
                    <div >
                        <h4 className='text-2xl font-semibold text-'>Sender Details</h4>
                        <fieldset className="fieldset">
                            <label className="label">Sender Name</label>
                            <input type="text" {...register("senderName")} defaultValue={user?.displayName} className="input w-full" placeholder="Sender Name" />

                            <label className="label">Sender Email</label>
                            <input type="text" {...register("senderEmail")} defaultValue={user?.email} className="input w-full" placeholder="Sender Email" />

                            <label className="label">Sender Phone</label>
                            <input type="text" {...register("senderPhone")} className="input w-full" placeholder="Sender Phone" />






                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Sender Regions</legend>
                                <select defaultValue="Pick a region" className="select w-full" {...register("senderRegion")}>
                                    <option disabled={true}>Pick a Region</option>
                                    {/* <option>Chrome</option> */}
                                    {
                                        regions.map((region, index) => <option key={index} value={region}>{region}</option>)
                                    }
                                </select>
                                {/* <span className="label">Optional</span> */}
                            </fieldset>

                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Sender District</legend>
                                <select defaultValue="Pick a region" className="select w-full" {...register("senderDistrict")}>
                                    <option disabled={true}>Pick a Region</option>
                                    {/* <option>Chrome</option> */}
                                    {
                                        districtsByRegion(senderRegion).map((region, index) => <option key={index} value={region}>{region}</option>)
                                    }
                                </select>
                                {/* <span className="label">Optional</span> */}
                            </fieldset>

                            <label className="label">Sender Address</label>
                            <input type="text" {...register("senderAddress")} className="input w-full" placeholder="Sender Address" />


                            <label className="label">Pickup Instructions</label>
                            <textarea {...register("pickupInstructions")} className="input w-full" placeholder="Pickup Instructions" rows="5"></textarea>
                        </fieldset>

                    </div>
                    <div>
                        <h4 className='text-2xl font-semibold'>Receiver Details</h4>
                        <fieldset className="fieldset">
                            <label className="label">Receiver Name</label>
                            <input type="text" {...register("receiverName")} className="input w-full" placeholder="Receiver Name" />


                            <label className="label">Receiver Email</label>
                            <input type="text" {...register("receiverEmail")} className="input w-full" placeholder="Receiver Email" />






                            <label className="label">Receiver Phone</label>
                            <input type="number" {...register("receiverPhone")} className="input w-full" placeholder="Receiver Phone" />



                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Receiver Regions</legend>
                                <select defaultValue="Pick a region" className="select w-full" {...register("receiverRegion")}>
                                    <option disabled={true}>Pick a Region</option>
                                    {/* <option>Chrome</option> */}
                                    {
                                        regions.map((region, index) => <option key={index} value={region}>{region}</option>)
                                    }
                                </select>
                                {/* <span className="label">Optional</span> */}
                            </fieldset>

                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Receiver District</legend>
                                <select defaultValue="Pick a region" className="select w-full" {...register("receiverDistrict")}>
                                    <option disabled={true}>Pick a Region</option>
                                    {/* <option>Chrome</option> */}
                                    {
                                        districtsByRegion(receiverRegion).map((region, index) => <option key={index} value={region}>{region}</option>)
                                    }
                                </select>
                                {/* <span className="label">Optional</span> */}
                            </fieldset>
                            <label className="label">Receiver Address</label>
                            <input type="text" {...register("receiverAddress")} className="input w-full" placeholder="Receiver Address" />



                            <label className="label">Delivary Instructions</label>
                            <textarea {...register("parcelInstructions")} className="input w-full" placeholder="Parcel Instructions" rows="5"></textarea>
                        </fieldset>

                    </div>
                </div>

                <input type="submit" className="btn btn-primary text-black submit mt-4" value="Send Parcel" />
            </form>

        </div>
    );
};

export default SendParcel;
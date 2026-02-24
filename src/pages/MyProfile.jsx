import React, { useState, useRef } from 'react'
import { assets } from '../assets/assets'

const MyProfile = () => {

    const [isEdit, setIsEdit] = useState(false)

    const [userData, setUserData] = useState({
        name: "Richard James",
        image: assets.profile_pic,
        email: 'hareeshreddy916@gmail.com',
        phone: '+1  123 456 7890',
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Church Road, London',
        },
        gender: 'Male',
        dob: '2000-01-20'
    })

    const [profilePic, setProfilePic] = useState(null); // url or base64 preview
    const fileInputRef = useRef(null);

    const handleFileChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            // set preview to base64 string
            setProfilePic(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const triggerFileInput = () => {
        // ensure input is present
        fileInputRef.current?.click();
    };

    const handleSave = () => {
        if (profilePic) {
            // save preview as user's image
            setUserData(prev => ({ ...prev, image: profilePic }));
            // clear file input so same file can be selected later
            if (fileInputRef.current) fileInputRef.current.value = '';
            setProfilePic(null);
        }
        setIsEdit(false);
    }

    const handleCancel = () => {
        // discard preview and clear file input
        setProfilePic(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
        setIsEdit(false);
    }

    return (
        <div className='max-w-lg flex flex-col gap-2 text-sm'>
            <div className='relative w-36'>
                <img
                    className='w-36 rounded object-cover block'
                    src={profilePic || userData.image}
                    alt="Profile"
                />

                {isEdit && (
                    <>
                        <button
                            type="button"
                            onClick={triggerFileInput}
                            className="absolute -bottom-2 -right-2 bg-primary text-white rounded-full p-1 shadow-md hover:opacity-90 focus:outline-none"
                            aria-label="Edit profile picture"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                <path fillRule="evenodd" d="M2 15.25V18h2.75l8.486-8.486-2.75-2.75L2 15.25z" clipRule="evenodd" />
                            </svg>
                        </button>

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                    </>
                )}
            </div>

            {isEdit
                ? <input className='bg-gray-50 text-3xl font-medium max-w-60 mt-4' type="text" onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))} value={userData.name} />
                : <p className='font-medium text-3xl text-neutral-800 mt-4'>{userData.name}</p>
            }

            <hr className='bg-zinc-400 h-[1px] border-none' />
            <div>
                <p className='text-neutral-500 underline mt-3'>CONTACT INFORMATION</p>
                <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
                    <p className='font-medium'>Email id:</p>
                    <p className='text-blue-500'>{userData.email}</p>
                    <p className='font-medium'>Phone:</p>
                    {isEdit
                        ? <input className='bg-gray-100 max-w-52' type="text" onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))} value={userData.phone} />
                        : <p className='text-blue-400'>{userData.phone}</p>}
                    <p className='font-medium'>Address:</p>
                    {isEdit
                        ? <p>
                            <input className='bg-gray-50' type="text" onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={userData.address.line1} />
                            <br />
                            <input className='bg-gray-50' type="text" onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={userData.address.line2} />
                          </p>
                        : <p className='text-gray-500'>{userData.address.line1} <br /> {userData.address.line2}</p>
                    }
                </div>
            </div>
            <div>
                <p className='text-neutral-500 underline mt-3'>BASIC INFORMATION</p>
                <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
                    <p className='font-medium'>Gender:</p>
                    {isEdit
                        ? <select className='max-w-20 bg-gray-100' onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))} value={userData.gender} >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        : <p className='text-gray-400'>{userData.gender}</p>}
                    <p className='font-medium'>Birthday:</p>
                    {isEdit
                        ? <input className='max-w-28 bg-gray-100' type='date' onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} value={userData.dob} />
                        : <p className='text-gray-400'>{userData.dob}</p>}
                </div>
            </div>
            <div className='mt-10 flex gap-3'>
                {
                    isEdit
                        ? <>
                            <button onClick={handleSave} className='border border-primary px-6 py-2 rounded-full hover:bg-primary hover:text-white transition-all'>Save</button>
                            <button onClick={handleCancel} className='px-6 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all'>Cancel</button>
                          </>
                        : <button onClick={() => setIsEdit(true)} className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all'>Edit</button>
                }
            </div>
        </div>
    )
}

export default MyProfile
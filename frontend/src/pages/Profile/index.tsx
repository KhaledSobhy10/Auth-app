import * as React from 'react';
import placeholder from "../../assets/react.svg";
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IProfileProps {

}

const Profile: React.FunctionComponent<IProfileProps> = (props) => {
    return <main className='w-screen min-h-screen flex justify-center items-center flex-col'>
        <header>
            <span>devchallenges</span>
            <div>

            </div>
        </header>
        <div className='text-center mb-8'>
            <h1 className='text-3xl mb-2'>Personal info</h1>
            <h2 className='text-lg font-light'>Basic info, like your name and photo</h2>
        </div>
        <div className='sm:container w-11/12 border rounded-lg divide-y m-2'>
            <div className='grid grid-cols-2 grid-rows-2 sm:py-6 sm:px-11 px-6 py-3 m-2'>
                <h3 className='font-normal text-2xl'>Profile</h3>
                <div className='col-span-1 row-span-2 flex justify-end items-center'>
                    <button className='border rounded-xl py-2 px-8  w-fit h-fit'>Edit</button>
                </div>
                <h4 className='text-xs font-medium text-[#828282]'>Some info may be visible to other people</h4>
            </div>
            <div className='grid grid-cols-3 sm:py-6 sm:px-11 px-6 py-3 m-2 items-center'>
                <span className='col-span-1 text-[#BDBDBD] text-sm'>PHOTO</span>
                <img src={placeholder} />
            </div>
            <div className='grid grid-cols-3 sm:py-6 sm:px-11 px-6 py-3 m-2 items-center'>
                <span className='col-span-1 text-[#BDBDBD] text-sm'>NAME</span>
                <p className='text-lg font-medium'>ALI AHMED</p>
            </div>
            <div className='grid grid-cols-3 sm:py-6 sm:px-11 px-6 py-3 m-2 items-center'>
                <span className='col-span-1 text-[#BDBDBD] text-sm'>BIO</span>
                <p className='text-lg font-medium'>I am a software developer and a big fan of devchallenges...</p>
            </div>
            <div className='grid grid-cols-3 sm:py-6 sm:px-11 px-6 py-3 m-2 items-center'>
                <span className='col-span-1 text-[#BDBDBD] text-sm'>PHONE</span>
                <p className='text-lg font-medium'>0112344234</p>
            </div>
            <div className='grid grid-cols-3 sm:py-6 sm:px-11 px-6 py-3 m-2 items-center'>
                <span className='col-span-1 text-[#BDBDBD] text-sm'>EMAIL</span>
                <p className='text-lg font-medium'> AliAhmed@gmail.com</p>
            </div>
        </div>
    </main>;
};

export default Profile;

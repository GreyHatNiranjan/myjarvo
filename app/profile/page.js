'use client'
import { useSession, signIn, signOut } from "next-auth/react"
import { useState } from 'react';
import Header from '../components/Header';
import Image from "next/image";

export default function UserProfile() {
  const { data: session } = useSession()
  // console.log(session?.user)
  const [userData, setUserData] = useState({
    fName: '',
    lName: '',
    adressL1: '',
    adressL2: '',
    adressL3: '',
    phone: '',
    email: '',
    zipCode: '',
    profileImage: ''
  });

  const [image, setImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData(prevState => ({
          ...prevState,
          profileImage: reader.result
        }));
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const googleSingIN = async () => {
    const GData = await signIn('google')
    // console.log(GData)
  }
  if (!session) {
    return <>
      <Header />
      <div className=" flex flex-col items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 min-h-[90vh] max-h-[90vh]">
        <div className="max-w-md w-full space-y-8 bg-white p-10 shadow-lg rounded-lg">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center">Not Signed In</h2>
          <p className="mt-2 text-gray-600 text-center">
            Sign in to access your Profile
          </p>
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => googleSingIN()}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm   hover:bg-gray-200 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
            >
              <span><Image src="/google.png" width={50} height={50} alt="G" className="w-5 mr-2" /></span>
              Sign In with Google
            </button>
          </div>
        </div>
      </div>
    </>
  } else {

    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto bg-white p-8 shadow-lg rounded-lg">
            <h2 className="text-3xl font-extrabold text-gray-900">Add Info for Shipping</h2>
            <p className="mt-2 text-gray-600">Manage your personal information below.</p>

            <div className="mt-8">
              <div className="text-center">
                <img
                  className="mx-auto h-32 w-32 rounded-full"
                  src={userData.profileImage || session?.user.image}  // Fallback image
                  alt="Profile"
                />
                <h3 className="mt-4 text-xl font-semibold text-gray-900">{userData.fName}</h3>
                {/* <p className="text-gray-600">{userData.email}</p> */}
              </div>

              {/* Editable Profile Fields */}
              <div className="mt-6">
                {/* First Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor='fName' className="block text-sm font-medium text-gray-700">First Name</label>
                    <input
                      type="text"
                      name="fName"
                      id="fName"
                      disabled={!isEditing}
                      value={userData.fName}
                      onChange={(e) => handleChange(e)}  // Corrected here
                      className={`mt-1 block w-full px-3 py-2 border ${isEditing ? 'border-gray-300' : 'border-transparent'
                        } bg-gray-50 rounded-md shadow-sm focus:outline-none ${isEditing ? 'focus:ring-indigo-500 focus:border-indigo-500' : ''
                        } sm:text-sm`}
                    />
                  </div>
                  {/* Last Name */}
                  <div>
                    <label htmlFor='lName' className="block text-sm font-medium text-gray-700">Last Name</label>
                    <input
                      type="text"
                      name="lName"
                      id="lName"
                      disabled={!isEditing}
                      value={userData.lName}
                      onChange={(e) => handleChange(e)}  // Corrected here
                      className={`mt-1 block w-full px-3 py-2 border ${isEditing ? 'border-gray-300' : 'border-transparent'
                        } bg-gray-50 rounded-md shadow-sm focus:outline-none ${isEditing ? 'focus:ring-indigo-500 focus:border-indigo-500' : ''
                        } sm:text-sm`}
                    />
                  </div>
                  {/* Adress Line 1*/}
                  <div>
                    <label htmlFor='adressL1' className="block text-sm font-medium text-gray-700">Adress Line 1</label>
                    <input
                      type="text"
                      name="adressL1"
                      id="adressL1"
                      disabled={!isEditing}
                      value={userData.adressL1}
                      onChange={(e) => handleChange(e)}  // Corrected here
                      className={`mt-1 block w-full px-3 py-2 border ${isEditing ? 'border-gray-300' : 'border-transparent'
                        } bg-gray-50 rounded-md shadow-sm focus:outline-none ${isEditing ? 'focus:ring-indigo-500 focus:border-indigo-500' : ''
                        } sm:text-sm`}
                    />
                  </div>
                  {/* Adress Line 2*/}
                  <div>
                    <label htmlFor='adressL2' className="block text-sm font-medium text-gray-700">Adress Line 2</label>
                    <input
                      type="text"
                      name="adressL2"
                      id="adressL2"
                      disabled={!isEditing}
                      value={userData.adressL2}
                      onChange={(e) => handleChange(e)}  // Corrected here
                      className={`mt-1 block w-full px-3 py-2 border ${isEditing ? 'border-gray-300' : 'border-transparent'
                        } bg-gray-50 rounded-md shadow-sm focus:outline-none ${isEditing ? 'focus:ring-indigo-500 focus:border-indigo-500' : ''
                        } sm:text-sm`}
                    />
                  </div>
                  {/* Adress Line 3*/}
                  <div>
                    <label htmlFor='adressL3' className="block text-sm font-medium text-gray-700">Adress Line 3</label>
                    <input
                      type="text"
                      name="adressL3"
                      id="adressL3"
                      disabled={!isEditing}
                      value={userData.adressL3}
                      onChange={(e) => handleChange(e)}  // Corrected here
                      className={`mt-1 block w-full px-3 py-2 border ${isEditing ? 'border-gray-300' : 'border-transparent'
                        } bg-gray-50 rounded-md shadow-sm focus:outline-none ${isEditing ? 'focus:ring-indigo-500 focus:border-indigo-500' : ''
                        } sm:text-sm`}
                    />
                  </div>

                  {/* Zip Code */}
                  <div>
                    <label htmlFor='zipCode' className="block text-sm font-medium text-gray-700">Zip Code</label>
                    <input
                      type="text"
                      name="zipCode"
                      id="zipCode"
                      disabled={!isEditing}
                      value={userData.zipCode}
                      onChange={(e) => handleChange(e)}  // Corrected here
                      className={`mt-1 block w-full px-3 py-2 border ${isEditing ? 'border-gray-300' : 'border-transparent'
                        } bg-gray-50 rounded-md shadow-sm focus:outline-none ${isEditing ? 'focus:ring-indigo-500 focus:border-indigo-500' : ''
                        } sm:text-sm`}
                    />
                  </div>


                  {/* Phone Number */}
                  <div>
                    <label htmlFor='phone' className="block text-sm font-medium text-gray-700">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      disabled={!isEditing}
                      value={userData.phone}
                      onChange={(e) => handleChange(e)}  // Corrected here
                      className={`mt-1 block w-full px-3 py-2 border ${isEditing ? 'border-gray-300' : 'border-transparent'
                        } bg-gray-50 rounded-md shadow-sm focus:outline-none ${isEditing ? 'focus:ring-indigo-500 focus:border-indigo-500' : ''
                        } sm:text-sm`}
                    />
                  </div>

                  {/* Email Adress */}
                  <div>
                    <label htmlFor='email' className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      disabled={!isEditing}
                      value={userData.email}
                      onChange={(e) => handleChange(e)}  // Corrected here
                      className={`mt-1 block w-full px-3 py-2 border ${isEditing ? 'border-gray-300' : 'border-transparent'
                        } bg-gray-50 rounded-md shadow-sm focus:outline-none ${isEditing ? 'focus:ring-indigo-500 focus:border-indigo-500' : ''
                        } sm:text-sm`}
                    />
                  </div>



                  {/* Profile Image Upload */}
                  <div>
                    <label htmlFor='image' className="block text-sm font-medium text-gray-700">Profile Image</label>
                    <input type="file" id='image' accept="image/*" onChange={handleImageUpload} disabled={!isEditing} />
                  </div>
                </div>

                {/* Edit / Save Button */}
                <div className="mt-8 flex justify-center">
                  <button
                    onClick={toggleEdit}  // Corrected here
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {isEditing ? 'Save Changes' : 'Edit Profile'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

}
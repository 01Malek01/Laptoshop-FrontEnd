'use client'
import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { JwtContext } from '@/components/Provider/Provider';

function Profile() {
  const [user, setUser] = useState({});
  const [editName, setEditName] = useState(false);
  const [newName, setNewName] = useState(user?.name || ''); // Initialize newName with user's name
  const [editEmail, setEditEmail] = useState(false);
  const [newEmail, setNewEmail] = useState(user?.email || ''); // Initialize newEmail with user's email
  const [error, setError] = useState(null);
  const router = useRouter();
  const jwt = useContext(JwtContext);

  useEffect(() => {
    if (jwt) {
      const res = fetch(`http://localhost:5000/api/v1/users/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}` // Your access token
        }

      }).then(res => res.json()).then(res => setUser(res.data?.user))

    }
  }, [jwt])
  const handleLogout = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/v1/users/logout', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error('Failed to logout'); // Handle logout errors gracefully (e.g., display an error message)
      }

      console.log('Logged out successfully');
      setUser({}); // Clear user data locally
      // router.push('/login');
      window.location.href = "/login";
    } catch (error) {
      console.error('Error logging out:', error);
      setError('Logout failed. Please try again.'); // Set an error state for UI display
    }
  };

  const handleSaveName = async (e) => {
    e.preventDefault();
    if (!newName) return; // Prevent saving empty name

    try {
      // Update user name on the server using the API (replace with your API call)
      const res = await fetch('http://localhost:5000/api/v1/users/updateMe', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`,
        },
        body: JSON.stringify({ name: newName }),
      });

      const updatedUser = await res.json();
      setUser(updatedUser.data?.user); // Update local state
      setNewName(updatedUser.data?.user.name); // Update newName for display
      setEditName(false); // Close edit mode
    } catch (error) {
      console.error('Error updating name:', error);
      // Handle errors appropriately (e.g., display an error message to the user)
    }
  };

  const handleSaveEmail = async (e) => {
    e.preventDefault();
    if (!newEmail) return; // Prevent saving empty email

    try {
      // Update user email on the server using the API (replace with your API call)
      const res = await fetch('http://localhost:5000/api/v1/users/updateMe', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`,
        },
        body: JSON.stringify({ email: newEmail }),
      });

      const updatedUser = await res.json();
      setUser(updatedUser.data?.user); // Update local state
      setNewEmail(updatedUser.data?.user.email); // Update newEmail for display
      setEditEmail(false); // Close edit mode
    } catch (error) {
      console.error('Error updating email:', error);
      // Handle errors appropriately (e.g., display an error message to the user)
    }
  };


  const handleEmailConfirmation = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/v1/users/confirmMyEmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`
      },
      credentials: 'include',
    })
  }

  const editNameHandler = () => {

    setEditName(!editName);

  }

  const editEmailHandler = () => {
    setEditEmail(!editEmail);
  }
 
  return (
    <>
      <div className='flex justify-start items-start p-5'>
        {
          user && (
            <p className='text-2xl text-black'>Hello, {user.name}</p>

          )
        }
      </div>

      <form action="" className="container w-[500px] mx-auto my-20 flex flex-col p-10 bg-slate-50 gap-3 rounded-lg">
        <div className="flex justify-center items-center">
          <span className="text-black p-4">Name</span>
          {editName ? (
            <>
              <label className="input input-bordered flex items-center gap-2">
                <input
                  type="text"
                  className="grow"
                  value={newName}
                  placeholder='Enter your new username'
                  onChange={(e) => setNewName(e.target.value)} // Update newName on input change
                />
              </label>
              <button type="button" className="btn btn-sm ml-2 h-[80%] " onClick={handleSaveName}>
                Save Name
              </button>
            </>
          ) : (
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="text"
                className="grow"
                value={user?.name}
                disabled={editName}
              />
              <button className="bg-white text-slate-500 px-1 hover:bg-slate-200 h-[80%] rounded-lg" onClick={editNameHandler}>
                Edit Name
              </button>
            </label>
          )}
        </div>

        <div className="flex justify-center items-center">
          <span className="text-black p-4">Email</span>
          {editEmail ? (
            <>
              <input
                type="email" // Set type to email for validation
                className="grow"
                placeholder="Enter your new email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)} // Update newEmail on input change
              />
              <button type="button" className="btn btn-sm ml-2 h-[80%] " onClick={handleSaveEmail}>
                Save Email
              </button>
            </>
          ) : (
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="text" // Change to email for display consistency
                className="grow"
                value={user?.email}
                disabled={editEmail}
              />
              <button className="bg-white text-slate-500 px-1 hover:bg-slate-200 h-[80%]  rounded-lg" onClick={editEmailHandler}>
                Edit Email
              </button>
            </label>
          )}
        </div>
        <button className="btn btn-primary w-full" onClick={handleEmailConfirmation}>Confirm Email</button>
        <button className="btn btn-primary w-full" onClick={handleLogout}>Logout</button>
      </form>

    </>
  )
}

export default Profile 

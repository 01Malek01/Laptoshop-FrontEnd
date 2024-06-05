'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

function Profile() {
  const [user, setUser] = useState({});
  const [editName, setEditName] = useState(false);
  const [newName, setNewName] = useState('');
  const [editEmail, setEditEmail] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);
  const [jwt, setJwt] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('jwt');
      setJwt(token);
    }
  }, [fetchUserData]);

  useEffect(() => {
    if (jwt) {
      fetchUserData();
    }
  }, [jwt]);

  const fetchUserData = async () => {
    try {
      const res = await fetch(`${process.env.API_URL}/users/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`
        }
      });
      const data = await res.json();
      setUser(data.data?.user);
      setNewName(data.data?.user.name);
      setNewEmail(data.data?.user.email);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem('jwt');
      console.log('Logged out successfully');
      setUser(null);
      window.location.href = "/login";
    } catch (error) {
      console.error('Error logging out:', error);
      setError('Logout failed. Please try again.');
    }
  };

  const handleSaveName = async (e) => {
    e.preventDefault();
    if (!newName || newName.length < 3 || newName.length > 10) {
      setError('Name must be between 3 and 10 characters');
      return;
    }

    try {
      const res = await fetch(`${process.env.API_URL}/users/updateMe`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`,
        },
        body: JSON.stringify({ name: newName }),
      });

      const updatedUser = await res.json();
      setUser(updatedUser.data?.user);
      setNewName(updatedUser.data?.user.name);
      setEditName(false);
      setError(null);
    } catch (error) {
      console.error('Error updating name:', error);
      setError('Error updating name');
    }
  };

  const handleSaveEmail = async (e) => {
    e.preventDefault();
    const emailPattern = /^\S+@\S+\.\S+$/;
    if (!newEmail || !emailPattern.test(newEmail)) {
      setError('Please enter a valid email');
      return;
    }

    try {
      const res = await fetch(`${process.env.API_URL}/users/updateMe`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`,
        },
        body: JSON.stringify({ email: newEmail }),
      });

      const updatedUser = await res.json();
      setUser(updatedUser.data?.user);
      setNewEmail(updatedUser.data?.user.email);
      setEditEmail(false);
      setError(null);
    } catch (error) {
      console.error('Error updating email:', error);
      setError('Error updating email');
    }
  };

  const handleEmailConfirmation = async (e) => {
    e.preventDefault();
    try {
      await fetch(`${process.env.API_URL}/users/confirmMyEmail`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`
        },
        credentials: 'include',
      });
    } catch (error) {
      console.error('Error confirming email:', error);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async (e) => {
    const formData = new FormData();
    formData.append('image', file);
    try {
      await fetch(`${process.env.API_URL}/users/updatePhoto`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${jwt}`
        },
        body: formData
      });
      window.location.reload();
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      {!jwt ? (
        <div className="container min-w-[200px] md:max-w-[80%] mx-auto my-20 flex flex-col p-10 bg-slate-50 gap-3 rounded-lg">
          <div className="flex justify-center items-center container flex-col md:flex-row gap-20">
            <div className="flex justify-center items-center flex-col mx-auto">
              <span className="text-black p-4">Please Login</span>
              <Link href="/login">
                <button className="btn btn-primary w-[150px] mx-auto mt-3">Login</button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <form className="container min-w-[200px] md:max-w-[80%] mx-auto my-20 flex flex-col p-10 bg-slate-50 gap-3 rounded-lg">
          <div className='flex justify-start items-start p-5'>
            {user && <p className='text-2xl text-black'>Hello, {user.name}</p>}
          </div>
          <div className="flex justify-center items-center container flex-col md:flex-row gap-20">
            <div className="flex justify-center items-center flex-col gap-5">
              <Image src={user?.image} alt="profile" width={150} height={150} />
              <div className="flex justify-center items-center flex-col mx-auto">
                <span className="text-black p-4">Upload A New Profile Photo 👇</span>
                <input onChange={handleFileChange} type="file" className="file-input file-input-bordered w-full max-w-xs" />
                <button className="btn btn-primary w-[150px] mx-auto mt-3" onClick={handleFileUpload}>Upload</button>
              </div>
            </div>
            <div>
              <div className="flex justify-center items-center flex-wrap">
                <span className="text-black p-4">Name</span>
                {editName ? (
                  <>
                    <label className="input input-bordered flex items-center gap-2">
                      <input
                        type="text"
                        className="grow"
                        value={newName}
                        placeholder='Enter your new username'
                        onChange={(e) => setNewName(e.target.value)}
                        required
                        minLength={3}
                        maxLength={10}
                      />
                    </label>
                    <button type="button" className="btn btn-primary ml-2 h-[80%]" onClick={handleSaveName}>
                      Save Name
                    </button>
                    <button type="button" className="btn btn-secondary ml-1 h-[80%]" onClick={() => setEditName(false)}>Cancel</button>
                  </>
                ) : (
                  <label className="input input-bordered flex items-center gap-2">
                    <input
                      type="text"
                      className="grow"
                      value={user?.name}
                      disabled={editName}
                    />
                    <button className="btn btn-accent ml-2 h-[80%]" onClick={() => setEditName(true)}>
                      Edit Name
                    </button>
                  </label>
                )}
              </div>
              <div className="flex justify-center items-center flex-wrap">
                <span className="text-black p-4">Email</span>
                {editEmail ? (
                  <>
                    <input
                      type="email"
                      className="grow input"
                      placeholder="Enter your new email"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      required
                      pattern="^\S+@\S+\.\S+$"
                    />
                    <button type="button" className="btn btn-primary ml-2 h-[80%]" onClick={handleSaveEmail}>
                      Save Email
                    </button>
                    <button type="button" className="btn btn-secondary ml-1 h-[80%]" onClick={() => setEditEmail(false)}>Cancel</button>
                  </>
                ) : (
                  <label className="input input-bordered flex items-center gap-2">
                    <input
                      type="text"
                      className="grow"
                      value={user?.email}
                      disabled={editEmail}
                    />
                    <button className="btn btn-accent ml-2 h-[80%]" onClick={() => setEditEmail(true)}>
                      Edit Email
                    </button>
                  </label>
                )}
                {error && <span className="text-red-500">{error}</span>}
              </div>
            </div>
          </div>
          {!user?.emailConfirmed && (
            <button className="btn btn-primary w-[150px] mx-auto mt-3" onClick={handleEmailConfirmation}>Confirm Email</button>
          )}
          <button className="btn btn-primary w-[150px] mx-auto mt-3" onClick={handleLogout}>Logout</button>
        </form>
      )}
    </div>
  );
}

export default Profile;

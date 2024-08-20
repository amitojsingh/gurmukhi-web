'use client'

import React, { useEffect, useRef, useState } from 'react';

import { CameraIcon } from '@/components/common';
import { SignOutButton, useAuth } from '@/components/authentication';
import { generateImagePreview, updateProfile } from '@/components/common/utils/updateProfile';

const ProfileSection: React.FC = () => {
    const { currentUser, setCurrentUser } = useAuth();
  
    const [ preview, setPreview ] = useState(null);
    const [ editMode, setEditMode ] = useState(false);
    const [ selectedFile, setSelectedFile ] = useState<File | null>(null);
    const [ updatedName, setUpdatedName ] = useState(currentUser?.displayName || '');
    
    const inputRef = useRef<HTMLInputElement>(null);

    const toggleEdit = async () => {
        if (editMode) {
          const response = await updateProfile({
            initialName: currentUser?.displayName,
            updatedName,
            uid: currentUser?.uid,
            initialPhotoUrl: currentUser?.photoURL,
            selectedFile,
            currentUser,
          });
          if (response.error) {
            console.error("error updating profile");
          } else {
            if (currentUser) {
              const updatedUser = {...currentUser};
              updatedUser.displayName = updatedName;
              response.updatedPhotoUrl && (updatedUser.photoURL = response.updatedPhotoUrl);
              setCurrentUser(updatedUser);
            }
          }
          setEditMode(false);
        } else {
          setEditMode(true);
        }
    };

    useEffect(() => {
      if (editMode) {
          inputRef.current?.focus();
      }
  }, [editMode]);

    return (
      <div className="profile-modal">
        {currentUser && (
          <div>
            <p className="email">{currentUser.email}</p>
            <span
              className="display-pic rounded-full bg-no-repeat bg-cover bg-top w-32 h-32"
              style={{ backgroundImage: `url(${preview ? preview : currentUser.photoURL})` }}
            >
              {!currentUser.photoURL && currentUser.displayName?.charAt(0)}
              {editMode && (
                <>
                <input
                  type="file"
                  id="display-image-input"
                  className="hidden"
                  accept='image/jpg, image/jpeg, image/png'
                  onChange={async (e) => {
                    const file = generateImagePreview(e, setPreview);
                    if (file) {
                      setSelectedFile(file);
                    }
                  }}
                />
                <label htmlFor="display-image-input" className='image-input-label block cursor-pointer'>
                  <CameraIcon />
                </label>
              </>
              )}
            </span>
            {editMode ? (
              <input
                type="text"
                className="name-input inline-block"
                ref={inputRef}
                onChange={(e) => {
                  setUpdatedName(e.target.value);
                }}
                value={updatedName}
              />
            ) : (
              <p className="display-name">{currentUser.displayName}</p>
            )}
          </div>
        )}
        <div className="flex justify-around items-center">
          <SignOutButton />
          <button className="white-secondary-button" onClick={toggleEdit}>{editMode ? "Save" : "Edit"}</button>
        </div>
      </div>
    );
};

export default ProfileSection;

import { CustomUser } from "@/components/authentication";
import { storage, usersCollection } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const updateProfile = async ({
  initialName,
  updatedName,
  uid,
  initialPhotoUrl,
  selectedFile,
  currentUser,
}: {
  initialName?: string;
  updatedName: string;
  uid?: string;
  initialPhotoUrl?: string;
  selectedFile?: File | null;
  currentUser?: CustomUser | null;
}) => {
  try {
    const userRef = doc(usersCollection, uid);
    const updatedDetails = {
      displayName: updatedName === "" ? initialName : updatedName,
      photoURL: initialPhotoUrl
    };
    if (selectedFile && currentUser) {
      const updatedPhotoUrl = await uploadProfileImage(selectedFile, currentUser);
      updatedDetails.photoURL = updatedPhotoUrl;
    }
    await updateDoc(userRef, updatedDetails);
    return { error: false, updatedPhotoUrl: updatedDetails.photoURL };
  } catch (error) {
    console.error("Error updating user:", error);
    return { error: true };
  }
};

export const uploadProfileImage = async (file: File, currentUser: CustomUser) => {
  try {
    const fileRef = ref(storage, `users/${currentUser.uid}/profile.${file.type.split('/')[1]}`);
    await uploadBytes(fileRef, file);
    const photoUrl = await getDownloadURL(fileRef);
    return photoUrl;
  } catch (error) {
    console.error('Error uploading file', error);
    return '';
  }
};

export const generateImagePreview = (e: React.ChangeEvent<HTMLInputElement>, setPreview: Function) => {
  const file = e.target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  }
  return file;
}
import { collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc, query, orderBy } from "firebase/firestore";
import { ref, deleteObject, getStorage } from "firebase/storage";
import { db } from "@/lib/firebaseClient";
import { uploadImageToCloudinary } from "@/lib/cloudinary";


export type TeamMember = {
  id: string;
  name: string;
  role: string;
  description: string; // Added description field
  imageUrl: string;
  order: number; // Added for sorting
  createdAt?: Date;
};

const storage = getStorage();

export async function getAllTeamMembers(): Promise<TeamMember[]> {
  try {
    const snap = await getDocs(query(collection(db, "team"), orderBy("order", "asc"))); // Order by 'order' field
    return snap.docs.map((docSnap) => ({
      id: docSnap.id,
      ...(docSnap.data() as Omit<TeamMember, "id">),
    }));
  } catch (error) {
    console.error("Team Firestore Error:", error);
    return [];
  }
}

export const uploadToCloudinary = async (file: File) => {
  return uploadImageToCloudinary(file);
};



export const saveTeamMember = async (
  name: string,
  role: string,
  description: string, // Added description parameter
  file?: File
) => {
  let imageUrl = "";

  if (file) {
    imageUrl = await uploadToCloudinary(file);
  }
  const teamSnapshot = await getDocs(collection(db, "team"));
  const order = teamSnapshot.size; // Assign order based on current number of members

  await addDoc(collection(db, "team"), {
    name,
    role,
    imageUrl,
    createdAt: new Date(),
    description, // Save description
    order, // Save order
  });
};

export const updateTeamMember = async (
  id: string,
  name: string,
  role: string,
  file?: File,
  existingUrl?: string,
  description?: string // Added description parameter
) => {
  let imageUrl = existingUrl || "";

  if (file) {
    imageUrl = await uploadToCloudinary(file);
  }

  await updateDoc(doc(db, "team", id), {
    name,
    role,
    imageUrl,
    description, // Update description
  });
};

export async function deleteTeamMember(id: string) {
  try {
    // Get the member data first to delete the image
    const memberRef = doc(db, "team", id);
    const memberSnap = await getDoc(memberRef);

    if (memberSnap.exists()) {
      const memberData = memberSnap.data();
      if (memberData.imageUrl) {
      try {
          const imageRef = ref(storage, memberData.imageUrl);
        await deleteObject(imageRef);
      } catch (deleteError) {
        console.warn("Could not delete image:", deleteError);
      }
      }
    }

    await deleteDoc(memberRef);
  } catch (error) {
    console.error("Team Firestore Error:", error);
    throw error;
  }
}

export const updateTeamMemberOrder = async (
  id: string,
  order: number
) => {
  await updateDoc(doc(db, "team", id), {
    order,
  });
};

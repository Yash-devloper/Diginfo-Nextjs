import { collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc, query, limit } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject, getStorage } from "firebase/storage";
import { db } from "@/lib/firebaseClient";


export type TeamMember = {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
  createdAt?: Date;
};

const storage = getStorage();

export async function getAllTeamMembers(): Promise<TeamMember[]> {
  try {
    const q = query(collection(db, "team"), limit(3));
    const snap = await getDocs(q);
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
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.error);

  return data.url;
};



export const saveTeamMember = async (
  name: string,
  role: string,
  file?: File
) => {
  let imageUrl = "";

  if (file) {
    imageUrl = await uploadToCloudinary(file);
  }

  await addDoc(collection(db, "team"), {
    name,
    role,
    imageUrl,
    createdAt: new Date(),
  });
};

export const updateTeamMember = async (
  id: string,
  name: string,
  role: string,
  file?: File,
  existingUrl?: string
) => {
  let imageUrl = existingUrl || "";

  if (file) {
    imageUrl = await uploadToCloudinary(file);
  }

  await updateDoc(doc(db, "team", id), {
    name,
    role,
    imageUrl,
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

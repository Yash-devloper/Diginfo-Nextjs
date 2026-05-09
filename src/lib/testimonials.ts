import { collection, doc, getDoc, getDocs, setDoc, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebaseClient";

export type Testimonial = {
  company: string;
  id: string;
  name: string;
  review: string;
  createdAt?: Date;
};

export async function getAllTestimonials(): Promise<Testimonial[]> {
  try {
    const snap = await getDocs(collection(db, "testimonials"));
    return snap.docs.map((docSnap) => ({
      id: docSnap.id,
      ...(docSnap.data() as Omit<Testimonial, "id">),
    }));
  } catch (error) {
    console.error("Testimonials Firestore Error:", error);
    return [];
  }
}

export async function saveTestimonial(name: string, review: string) {
  try {
    await addDoc(collection(db, "testimonials"), {
      name,
      review,
      createdAt: new Date(),
    });
  } catch (error) {
    console.error("Testimonials Firestore Error:", error);
    throw error;
  }
}

export async function updateTestimonial(id: string, name: string, review: string) {
  try {
    const testimonialRef = doc(db, "testimonials", id);
    await updateDoc(testimonialRef, {
      name,
      review,
    });
  } catch (error) {
    console.error("Testimonials Firestore Error:", error);
    throw error;
  }
}

export async function deleteTestimonial(id: string) {
  try {
    const testimonialRef = doc(db, "testimonials", id);
    await deleteDoc(testimonialRef);
  } catch (error) {
    console.error("Testimonials Firestore Error:", error);
    throw error;
  }
}
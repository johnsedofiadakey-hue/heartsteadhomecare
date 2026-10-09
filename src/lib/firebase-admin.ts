import "server-only";
import { applicationDefault, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

export function firebaseConfigured() {
  return Boolean(process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_STORAGE_BUCKET);
}

export function adminApp() {
  if (!firebaseConfigured()) return null;
  return getApps()[0] ?? initializeApp({
    credential: applicationDefault(),
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  });
}

export function adminDb() {
  const app = adminApp();
  return app ? getFirestore(app) : null;
}

export function adminAuth() {
  const app = adminApp();
  return app ? getAuth(app) : null;
}

export function adminBucket() {
  const app = adminApp();
  return app ? getStorage(app).bucket() : null;
}

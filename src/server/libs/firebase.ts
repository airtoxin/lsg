import admin from "firebase-admin";
import * as firebase from "firebase-admin/database";
import {
  FIREBASE_CLIENT_EMAIL,
  FIREBASE_DATABASE_URL,
  FIREBASE_PRIVATE_KEY,
  FIREBASE_PROJECT_ID,
} from "../constants";

export type { Database } from "firebase-admin/database";

export const getDatabase = () => {
  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: FIREBASE_PROJECT_ID,
        clientEmail: FIREBASE_CLIENT_EMAIL,
        privateKey: FIREBASE_PRIVATE_KEY,
      }),
      databaseURL: FIREBASE_DATABASE_URL,
    });
  }
  return firebase.getDatabase();
};

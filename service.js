import auth from "@react-native-firebase/auth";
import firestore, { doc, getFirestore } from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import { Alert } from "react-native";

export const CreateUser = async (username, email, password) => {
  try {
    const response = await auth().createUserWithEmailAndPassword(
      email,
      password
    );
    await firestore().collection("users").doc(response.user.uid).set({
      avatar: response.user.photoURL,
      username: username,
      email: email,
    });

    await SignInUser(response.user.email, password);
  } catch (err) {
    console.log("Error", err);
    throw new Error(err);
  }
};

export const SignInUser = async (email, password) => {
  try {
    const session = await auth().signInWithEmailAndPassword(email, password);
  } catch (error) {
    console.log("Error", error);
    throw new Error(err);
  }
};

export const getUser = async (uid) => {
  try {
    const data = await firestore().collection("users").doc(uid).get();

    return data.data();
  } catch (error) {
    console.log("Error", error);
    throw new Error(err);
  }
};

export const getAllPosts = async () => {
  try {
    const posts = await firestore().collection("videos").get();

    return posts.docs;
  } catch (error) {
    console.log("Error", error);
    throw new Error(err);
  }
};
export const getUserPosts = async (userId) => {
  try {
    const userRef = doc(getFirestore(), "users", userId);
    const posts = await firestore()
      .collection("videos")
      .where("creator", "==", userRef)
      .get();

    return posts.docs;
  } catch (error) {
    console.log("Error", error);
    throw new Error(err);
  }
};

export const getLatestPosts = async () => {
  try {
    const posts = await firestore()
      .collection("videos")
      .orderBy("createdAt", "desc")
      .limit(7)
      .get();

    return posts.docs;
  } catch (error) {
    console.log("Error", error);
    throw new Error(err);
  }
};
export const searchPosts = async (query) => {
  try {
    const posts = await firestore()
      .collection("videos")
      .orderBy("createdAt", "asc")
      .get();
    if (posts.size > 0) {
      return posts.docs.filter((item) => {
        if (item._data.title.includes(query)) {
          return true;
        }
        return false;
      });
    }
    return [];
  } catch (error) {
    console.log("Error", error);
    throw new Error(error);
  }
};

export const signOut = async (query) => {
  try {
    await auth().signOut();
  } catch (error) {
    console.log("Error", error);
    throw new Error(error);
  }
};

export const createVideoPost = async (form) => {
  try {
    const videoRef = storage().ref(form.video.fileName);
    const thumbnailRef = storage().ref(form.thumbnail.fileName);
    const [thumbnailUrl, videoUrl] = await Promise.all([
      thumbnailRef.putFile(form.thumbnail.uri),
      videoRef.putFile(form.video.uri),
    ]);

    if (thumbnailUrl.state == "success" && videoUrl.state == "success") {
      const url1 = await videoRef.getDownloadURL();
      const url2 = await thumbnailRef.getDownloadURL();
      const ref = firestore().collection("users").doc(form.userId);
      await firestore().collection("videos").doc().set({
        createdAt: new Date(),
        creator: ref,
        prompt: form.prompt,
        thumbnail: url2,
        video: url1,
        title: form.title,
      });
    } else {
      Alert.alert("Error", "Upload Failed");
    }
  } catch (error) {
    console.log("Error", error);
    throw new Error(error);
  }
};

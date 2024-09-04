import auth from "@react-native-firebase/auth";
import firestore, { doc, getFirestore } from "@react-native-firebase/firestore";

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
      .orderBy("createdAt", "asc")
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

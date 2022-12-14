// savig new item
import { collection, doc, getDocs, orderBy, query, setDoc } from "firebase/firestore";
import { firestore } from "../firebase.init";

export const saveItem = async (data) => {
    await setDoc(doc(firestore, 'foodItems', `${Date.now()},`), data, {
        merge: true,
    }
    );
}

export const getAllIitems = async () => {
    const item = await getDocs(
        query(collection(firestore, 'foodItems'), orderBy('id', 'desc'))
    );
    return item.docs.map((doc) => doc.data());
}
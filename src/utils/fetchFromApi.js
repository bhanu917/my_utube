import axios from "axios";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const BASE_URL = "https://yt-api.p.rapidapi.com";

const options = {
    headers: {
        "x-rapidapi-key": import.meta.env.VITE_RAPID_API_KEY,
        "x-rapidapi-host": "yt-api.p.rapidapi.com",
    },
};

const sanitizeCategory = (category) =>
    category.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-");

export const fetchFromApi = async (url, category) => {
    const cacheKey = category || url;
    const safeCategory = sanitizeCategory(cacheKey);
    const docRef = doc(db, "videos", safeCategory);

    try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log(`✅ Loaded "${cacheKey}" from Firestore cache (no API call)`);
            return docSnap.data();
        }
    } catch (err) {
        console.error("Firestore read failed, falling back to API:", err);
    }

    console.log(`🌐 "${cacheKey}" not cached yet — calling RapidAPI`);
    const { data } = await axios.get(`${BASE_URL}/${url}`, options);

    // yt-api wraps results under "data" (an array), not "contents"/"items"
    const items = data.data || data.contents || data.items || [data];

    try {
        await setDoc(docRef, { items });
        console.log(`💾 Cached "${cacheKey}" in Firestore permanently`);
    } catch (err) {
        console.error("Failed to cache to Firestore:", err);
    }

    return { items };
};
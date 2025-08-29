import CryptoJS from "crypto-js";

const KEY = process.env.NEXT_PUBLIC_ENCRYPT_DECRYPT_KEY_APP || "";
const IV = process.env.NEXT_PUBLIC_ENCRYPT_DECRYPT_IV_APP || "";

export function decryptData(encryptedData: string): any {
  try {
    // encryptedData format: `${encrypted}:${iv}`
    const parts = encryptedData.split(":");
    console.log("parts: ", parts);
    if (parts.length !== 2) throw new Error("Invalid encrypted payload format");

    const ciphertext = parts[0];
    const ivString = parts[1];

    const key = CryptoJS.enc.Utf8.parse(KEY);
    const iv = CryptoJS.enc.Utf8.parse(ivString);

    const decrypted = CryptoJS.AES.decrypt(ciphertext, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);

    if (!decryptedText) throw new Error("Decryption resulted in empty string");

    return JSON.parse(decryptedText);
  } catch (error) {
    console.error("Decryption error:", error);
    throw error; // Rethrow or handle accordingly
  }
}

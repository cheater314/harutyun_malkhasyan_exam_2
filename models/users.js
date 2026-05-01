import fs from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import md5 from "md5";
import CryptoJS from "crypto-js";

const filePath = path.resolve("data/users.json");

// helpers
export const getDataPath = () => filePath;

export async function readJSON() {
    try {
        const data = await fs.readFile(filePath, "utf8");
        return JSON.parse(data);
    } catch {
        return [];
    }
}

export async function writeJSON(data) {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

export async function findById(id) {
    const users = await readJSON();
    return users.find(u => u.id === id) || null;
}

export async function findByEmail(email) {
    const users = await readJSON();
    return users.find(u => u.email === email) || null;
}

export async function checkEmailUnique(email) {
    const user = await findByEmail(email);
    return !!user;
}

export async function create(data) {
    const users = await readJSON();

    const newUser = {
        id: uuidv4(),
        ...data
    };

    users.push(newUser);
    await writeJSON(users);

    return newUser;
}
export function hashPassword(pass) {
    return md5(md5(pass) + process.env.PASSWORD_SECRET);
}

export function encrypt(data) {
    return CryptoJS.AES.encrypt(
        JSON.stringify(data),
        process.env.TOKEN_SECRET
    ).toString();
}

export function decrypt(cipher) {
    try {
        const bytes = CryptoJS.AES.decrypt(cipher, process.env.TOKEN_SECRET);
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch {
        return null;
    }
}

export default {
    getDataPath,
    readJSON,
    writeJSON,
    findById,
    findByEmail,
    checkEmailUnique,
    create,
    hashPassword,
    encrypt,
    decrypt
};
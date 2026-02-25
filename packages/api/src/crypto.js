import crypto from "crypto";
import config from "../config";
import { ClientError } from "./errors";
import bcrypt from "bcrypt";

//encryption settings
export const ivSize = 16;
export const tagSize = 16;
const secretKey = config.server.secretKey;

/**
 * Hashes the given password using bcrypt
 */
export async function hashPassword(password) {
  return await bcrypt.hash(password, 12);
}

/**
 * Compares the given password to a hashed password using bcrypt
 */
export async function comparePassword(password, hash) {
  return await bcrypt.compare(password, hash);
}

/**
 * Encryption the given JSON value
 */
export async function encrypt(content) {
  let str = JSON.stringify(content);
  let iv = await crypto.randomBytes(ivSize);
  let cipher = crypto.createCipheriv("aes-256-gcm", secretKey, iv);
  let encrypted = Buffer.concat([cipher.update(str, "utf8"), cipher.final()]);
  let tag = cipher.getAuthTag();
  if (tag.length !== tagSize) throw new Error("Unexpected tag size");
  let buffer = Buffer.concat([iv, tag, encrypted]);
  return buffer.toString("base64");
}

/**
 * Decrypts the given token into a JSON value
 */
export async function decrypt(token) {
  try {
    let buffer = Buffer.from(token, "base64");
    let iv = buffer.slice(0, ivSize);
    let tag = buffer.slice(ivSize, ivSize + tagSize);
    if (iv.length !== ivSize || tag.length !== tagSize) throw null;
    let encrypted = buffer.slice(ivSize + tagSize);
    let decipher = crypto.createDecipheriv("aes-256-gcm", secretKey, iv);
    decipher.setAuthTag(tag);
    let str =
      decipher.update(encrypted, "binary", "utf8") + decipher.final("utf8");
    return JSON.parse(str);
  } catch {
    throw new ClientError({
      code: "invalid-auth",
      message: "Invalid authentication",
    });
  }
}

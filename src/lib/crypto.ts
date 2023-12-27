import crypto from "crypto";

export function generateRandomHex() {
   return crypto.randomBytes(16).toString("hex");
}

export function hexConversion(resetToken: string) {
   return crypto.createHash("sha256").update(resetToken).digest("hex");
}

import crypto from 'crypto'; 

export const CookieUtils = {
  setHeaderWithCookie(
    res,
    payload,
    maxAge,
  ) {
    Object.entries(payload).map(([key, value]) => {
      const iv = crypto.randomBytes(16); // Generate a random initialization vector
      const aesKey = Buffer.from(process.env.COOKIES_ENC_KEY, 'base64');

      // Encrypt the value before setting it as a cookie
      const cipher = crypto.createCipheriv('aes-256-gcm', aesKey, iv);

      let encryptedValue = cipher.update(value, 'utf8', 'hex');

      // Append the IV to the encrypted value for decryption later
      encryptedValue += iv.toString('hex') + cipher.final('hex');

      res.cookie(key, encryptedValue, {
        httpOnly: true, // will not allow client-side JavaScript to see the cookie
        maxAge: maxAge * 1000, // convert to milliseconds
        path: '/',
        domain: 'localhost', // change to your domain if needed
        secure: true, // only with https
        sameSite: true,
      })
    })
  },
  getCookieValue(req, key) {
    const cookieValue = req.cookies[key];

    // Decrypt the value before returning it
    if (!cookieValue) return null;

    const aesKey = Buffer.from(process.env.COOKIES_ENC_KEY, 'base64');

    // Extract the IV from the end of the encrypted value
    const ivLength = 32; // Length of IV in hex (16 bytes)
    const ivHex = cookieValue.slice(-ivLength);
    const iv = Buffer.from(ivHex, 'hex');

    const encryptedValue = cookieValue.slice(0, -ivLength);

    const decipher = crypto.createDecipheriv('aes-256-gcm', aesKey, iv);
    let decryptedValue = decipher.update(encryptedValue, 'hex', 'utf8');

    return decryptedValue
  },
  clearCookie(res, key) {
    res.clearCookie(key)
  },
}


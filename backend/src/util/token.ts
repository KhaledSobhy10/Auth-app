import jwt from "jsonwebtoken";

export const generateToken = (data: any, expiresIn: string | number = "1h") => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      data,
      process.env.TOKEN_SECRET as string,
      { expiresIn },
      (err, token) => {
        if (err) {
          reject(err);
        }
        resolve(token);
      }
    );
  });
};

export const verifyToken = (token: string) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.TOKEN_SECRET as string, (err, decoded) => {
      if (err) {
        reject(err);
      }
      resolve(decoded);
    });
  });
};

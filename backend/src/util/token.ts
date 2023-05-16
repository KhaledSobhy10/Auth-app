import jwt from "jsonwebtoken";

export const generateToken = (data: any, expiresIn: string | number = "1h") => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      data,
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJmb28iOiJiYXNyIiwiaWF0IjoxNjg0MjMzMASDASDjQ0fQpSmfmR34bv_VpVcBdvynfTfwnlnpN_z84Y8sNoVe7fM",
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
    jwt.verify(
      token,
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJmb28iOiJiYXNyIiwiaWF0IjoxNjg0MjMzMASDASDjQ0fQpSmfmR34bv_VpVcBdvynfTfwnlnpN_z84Y8sNoVe7fM",
      (err, decoded) => {
        if (err) {
          reject(err);
        }
        resolve(decoded);
      }
    );
  });
};

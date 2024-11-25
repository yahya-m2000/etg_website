// /* eslint-disable @typescript-eslint/no-explicit-any */

// import { jwtVerify, KeyLike, JWTPayload } from "jose";
// import jwksClient from "jwks-rsa";

// interface AuthPayload {
//   email: string;
// }

// const client = jwksClient({
//   jwksUri: `${process.env.AUTH0_ISSUER_BASE_URL}/.well-known/jwks.json`,
//   cache: true,
//   rateLimit: true,
//   jwksRequestsPerMinute: 5,
// });

// function getKey(header: any, callback: any) {
//   client.getSigningKey(header.kid, (err, key) => {
//     if (err) {
//       callback(err, null);
//     }
//     const signingKey = key?.getPublicKey();
//     callback(null, signingKey);
//   });
// }

// export async function verifyAuth(req: Request): Promise<AuthPayload | null> {
//   try {
//     const authHeader = req.headers.get("authorization");

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return null;
//     }

//     const token = authHeader.split(" ")[1];

//     const { payload } = await new Promise<{ payload: JWTPayload }>(
//       (resolve, reject) => {
//         getKey(
//           { kid: "key-id" },
//           (err: any, publicKey: KeyLike | Uint8Array) => {
//             if (err) {
//               return reject(err);
//             }

//             jwtVerify(token, publicKey, {
//               issuer: `${process.env.AUTH0_ISSUER_BASE_URL}/`,
//               audience: process.env.AUTH0_AUDIENCE,
//             })
//               .then((result) => resolve(result))
//               .catch(reject);
//           }
//         );
//       }
//     );

//     if (payload && payload.email) {
//       return { email: payload.email as string };
//     }

//     return null;
//   } catch (error) {
//     console.error("JWT verification error:", error);
//     return null;
//   }
// }

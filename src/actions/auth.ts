"use server";

import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";



export const login = async (credentials: {
  email: string;
  password: string;
}) => {
  try {
    const { data } = await axios.post(
      `https://upskilling-egypt.com:3005/api/auth/login`,
      credentials
    );


    (await cookies()).set("token", data.data.accessToken, {
      sameSite: "none",
      secure: true,
      expires: new Date(Date.now() +    1000 * 60 * 60 * 24),
    });


    return {
      status: 200,
      data: data.data,
      message: data.message,
    };


  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        status: 500,
        data: error.response?.data,
      };
    }
  }
};

export async function logout() {
  (await cookies()).set("token", "", { expires: new Date(0) });
}

// export async function updateSession(req: NextRequest) {
//   const session = req.cookies.get("token")?.value;

//   if (!session) return;


//   const [header, payload, signature] = session.split('.');

//   const payloadData = JSON.parse(
//     Buffer.from(payload, "base64").toString("utf8")
//   );
//   console.log(payloadData);
//   payloadData.expires = new Date(Date.now() + 10000);

//   console.log("object");

//   const newPayload = Buffer.from(JSON.stringify(payloadData)).toString('base64url');

//   const res = NextResponse.next();
//   res.cookies.set({
//     name: "token",
//     value: `${header}.${newPayload}.${signature}`,
//     expires: payloadData.expires,
//   })
//   return res;
// }

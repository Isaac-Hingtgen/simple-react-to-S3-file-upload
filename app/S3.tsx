import axios from "axios";
import { headers } from "next/headers";
const ENDPOINT = 'https://njfnh392k6.execute-api.us-east-2.amazonaws.com/s3-signed-url';

export async function sendTextAndFile(file: File): Promise<any> {
  let s3SignedUrl;
  let res;
  try {
    s3SignedUrl = await axios.get(ENDPOINT, {
      params: {
        name: file.name
      }
    }).then((response) => { 
      return response.data.url
    })
    if (!s3SignedUrl) throw new Error("No url received");
  } catch (error: unknown) {
    console.log(error)
    throw Error("Could not get signed url for s3 bucket");
  }

  try {
    const res = await axios.put(s3SignedUrl, file, {
        headers: {
            'Content-Type': 'text/plain',
        },
    });
    console.log(res)
    if (res.status != 200) throw new Error()
  } catch (error: unknown) {
    throw Error("Could not send file and text to s3 bucket");
  }
  return res
}
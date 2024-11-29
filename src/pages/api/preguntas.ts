import type { APIRoute } from "astro"
import { AES, enc } from 'crypto-ts';
import { configEnv } from "../../lib/vars";

export const POST: APIRoute = async ({ cookies, request }) => {

  let obj : {[key: string]: any} = {};

  if ( cookies.has('payload') ) {
    //recuperar valores de la cookie
    let encrypted = cookies.get('payload')?.value as string;
    let decrypted = AES.decrypt(encrypted, configEnv.SECRET_KEY);
    obj = JSON.parse(decrypted.toString(enc.Utf8).toString());
    console.log('cookieEndpoint', {obj});

    encrypted = AES.encrypt(JSON.stringify(obj), configEnv.SECRET_KEY).toString();
    cookies.set('payload', encrypted, { path: '/', httpOnly: true, secure: true, sameSite: 'lax' });

    return new Response(null, { status: 200 });
  } else {
    return new Response(null, { status: 400 });
  }
}
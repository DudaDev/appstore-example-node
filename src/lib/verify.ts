import * as express from 'express';
import * as crypto from 'crypto';

/**
 * verify inbound requests are from Duda following the HMAC
 * validation described in our docs.
 *
 * https://developer.duda.co/docs/app-store-webhooks#code-example
 * @param req Express request
 * @param res Express response
 * @param next Express next function
 */
export default function verifyRequestSignature(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  if (!process.env.DUDA_SECRET_KEY) {
    console.warn('[warn] unable to verify inbound request.');
    next();
  } else {
    // read our secret key from the environment
    const secret = process.env.DUDA_SECRET_KEY;

    // note the signature provided by Duda
    const fromDuda = req.headers['x-duda-signature'];

    // note the timestamp
    const time = req.headers['x-duda-signature-timestamp'];

    // convert the body to stringified JSON
    const body = JSON.stringify(req.body);

    // base64 decode our secret key
    const decodedSecret = Buffer.from(secret, 'base64')
      .toString('utf8');

    // generate an HMAC signature using the time and strinfigied body
    const generated = crypto.createHmac('sha256', decodedSecret)
      .update(`${time}.${body}`)
      .digest('base64');

    // compare the generated signature to what came from Duda and
    // act accordingly
    if (fromDuda === generated) {
      next();
    } else {
      res.status(400)
        .send();
    }
  }
}

export { verifyRequestSignature };

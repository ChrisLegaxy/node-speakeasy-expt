/**
 * @file auth.service.ts
 * @description - defining all related authentication servcies
 * @author Chris Van
 * @contact chrisvan.vshmr@gmail.com
 * @license
 * @copyright
 */

/**
 * * Imports
 */
import { v4 } from "uuid";
import { totp, generateSecret } from "speakeasy";

import db from "../database/index";

/**
 * * AuthService
 */
export const AuthService = {
  /**
   * @description - register/create user with id & secret (for 2 factor authentication)
   */
  async register() {
    /**
     * * uuid
     */
    const id = v4();

    try {
      /**
       * * secret.base32 - for enter manually in Google Authenicator to provide token
       * * secret.otpauth_url - for generating QR Google Authenicator scan and provide token
       */
      const secret = generateSecret();

      db.get("users")
        .push({
          id,
          secret,
        })
        .write();

      return db.get("users").find({ id }).value();
    } catch (error) {
      console.error(error);
      throw new Error("Error generating secret key");
    }
  },

  /**
   * @param id
   * @param tfaToken
   *
   * @description - verify 2 factor authentication token provided by Google Authenticator
   */
  async verify(id: string, tfaToken: string) {
    try {
      const user = db.get("users").find({ id }).value();

      if (!user) {
        throw Error("User not found");
      }

      /**
       * * verifying the token
       */
      const verified: boolean = totp.verify({
        secret: user.secret.base32,
        encoding: "base32",
        token: tfaToken,
      });

      if (!verified) {
        return {
          message: "Expired or Incorrect, Please Try Again",
        };
      }

      return {
        ...user,
        verified: true,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

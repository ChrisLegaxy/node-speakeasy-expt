/**
 * @file auth.controller.ts
 * @description - express controller
 * @author Chris Van
 * @contact chrisvan.vshmr@gmail.com
 * @license
 * @copyright
 */

/**
 * * Imports
 */
import {
  JsonController,
  Get,
  Res,
  HeaderParam,
  Param,
} from "routing-controllers";
import { Response } from "express";
import { AuthService } from "../services/auth.service";

/**
 * * UserController
 */
@JsonController("/auth")
export class UserController {
  constructor(private authService = AuthService) {}

  /**
   * @param response
   *
   * @description - register api endpoint
   */
  @Get("/register")
  async register(@Res() response: Response) {
    try {
      return await this.authService.register();
    } catch (error) {
      return response.status(500).json({
        message: error.message,
      });
    }
  }

  /**
   * @param id
   * @param tfaToken
   * @param response
   *
   * @description - verify api endpoint
   */
  @Get("/verify/:id")
  async verify(
    @Param("id") id: string,
    @HeaderParam("tfa_token") tfaToken: string,
    @Res() response: Response
  ) {
    try {
      return await this.authService.verify(id, tfaToken);
    } catch (error) {
      return response.status(500).json({
        message:
          error.message || "Internal Server Error, Please Try Again Later",
      });
    }
  }
}

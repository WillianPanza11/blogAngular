export * from './authController.service';
import { AuthControllerService } from './authController.service';
export * from './basicErrorController.service';
import { BasicErrorControllerService } from './basicErrorController.service';
export * from './postController.service';
import { PostControllerService } from './postController.service';
export const APIS = [AuthControllerService, BasicErrorControllerService, PostControllerService];

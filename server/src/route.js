import { Router } from "express";
const summarizeRouter = Router();

/** import all controllers */
import * as controller from './controller.js';



summarizeRouter.route('/summarize').post(controller.summarize)


export default summarizeRouter
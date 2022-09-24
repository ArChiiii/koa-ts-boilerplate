import { Context } from "koa";
import Router from "koa-router";
import * as exampleActivity from "../db/queries/exampleActivity";
import { IRequest } from "../model/request";

const router = new Router();

const BASE_URL = `/api/example_activity`;

router.get(BASE_URL, async (ctx: Context): Promise<void> => {
  try {
    const example_activity = await exampleActivity.getAllExampleActivities();
    ctx.body = {
      success: true,
      data: example_activity,
    };
  } catch (err) {
    ctx.status = 404;
    ctx.body = {
      success: false,
      message: err,
    };
  }
});

router.post(`${BASE_URL}`, async (ctx: Context) => {
  const { err, result } = await exampleActivity.addExampleActivity(
    <IRequest>(<unknown>ctx.request.body)
  );
  if (result) {
    ctx.status = 201;
    ctx.body = {
      success: true,
      data: result[0],
    };
  } else {
    err.statusCode = 400;
    throw err;
  }
});

export default router;

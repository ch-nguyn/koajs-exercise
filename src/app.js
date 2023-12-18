import Koa from "koa";
import koaBody from "koa-body";
import routes from "./routes/routes.js";
import koaEjs from "koa-ejs";
import path from "path";
import { fileURLToPath } from "url";

const app = new Koa();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

koaEjs(app, {
  root: path.join(__dirname, "views"),
  layout: "layouts/template",
  viewExt: "html",
  cache: false,
  debug: true,
});

app.use(koaBody({ parsedMethods: ["POST", "PUT", "PATCH", "DELETE"] }));
app.use(routes.routes());
app.use(routes.allowedMethods());

app.listen(5000);

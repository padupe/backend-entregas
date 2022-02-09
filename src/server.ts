import express from "express";
import swagger from "swagger-ui-express";
import { router } from "./shared/infra/http/routes";
import swaggerConfig from "./swagger.json"

const app = express();

app.use(express.json());
app.use('/api-docs', swagger.serve, swagger.setup(swaggerConfig));
app.use(router);

app.listen(4444, () => console.log('Server is running!'));
import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";

import { errorHandler,NotFoundError,currentUser } from "@nastickets/common";
import {createTicketRouter} from './routes/new'
import {showTicketRouter} from './routes/show'
import { indexTicketRouter } from './routes/index';

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);

app.use(currentUser);
app.use(createTicketRouter);
app.use(showTicketRouter) ;
app.use(indexTicketRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export {app};
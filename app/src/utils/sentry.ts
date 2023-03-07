import * as Sentry from "sentry-expo";
import { APP_ENV, SENTRY_DSN } from "@env";

export const sentryInit = () => {
  Sentry.init({
    dsn: SENTRY_DSN,
    enableInExpoDevelopment: true,
    debug: APP_ENV !== "production", // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
  });
};

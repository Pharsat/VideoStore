import * as Sentry from "@sentry/browser";

function init() {
  Sentry.init({
    dsn: "https://e20ca928e92246d9b9aedb117f34ee64@sentry.io/1526772"
  });
}

function log(error) {}

export default {
  init,
  log
};

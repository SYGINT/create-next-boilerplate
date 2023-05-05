#!/usr/bin/env node

import Tasks from "./helpers/tasks";
import { getPkgManager } from "./vendor/get-pkg-manager";

import { logger } from "./helpers/utilities";
const appName = process.argv[2] ?? "";
const tasks = new Tasks({ pkgManager: getPkgManager(), appName });
const { log, error } = logger();

log("initializing...");

if (!appName) {
  error("ERROR: no app name provided");
  process.exit(1);
}

tasks.createNextApp()
  .catch((error) => {
    console.log("Something went wrong");
    console.log(error);
  });

import promiseSpawn from "@npmcli/promise-spawn";

import { logger } from "./utilities";
import { createNextAppCommand } from "./createNextApp";

const { log } = logger();

interface Options {
  pkgManager: "npm" | "pnpm" | "yarn";
  appName: string;
}

export default class Tasks {
  private pkgManager: "npm" | "pnpm" | "yarn" = "npm";
  private pkgManagerPrefix = "";
  private appName = "";

  constructor({ pkgManager, appName }: Options) {
    this.pkgManager = pkgManager;
    this.pkgManagerPrefix = this.getPkgManagerPefix();
    this.appName = appName;
  }

  getPkgManagerPefix() {
    const pkgManagerMap = {
      npm: "npx",
      pnpm: "pnpx",
      yarn: "npx",
    };

    return pkgManagerMap.hasOwnProperty(this.pkgManager)
      ? pkgManagerMap[this.pkgManager]
      : "npx";
  }

  async createNextApp() {
    log("running create-next-app...");

    const [command, ...args] = `${
      this.pkgManagerPrefix
    } ${createNextAppCommand()}`.split(" ");
    await promiseSpawn(command, [...args, this.appName], {
      stdio: "inherit",
    });
  }
}

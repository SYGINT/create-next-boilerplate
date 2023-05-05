import chalk from "chalk";

export type FIXME = any;

export function logger() {
  return {
    log(data: string, isInit = false) {
      if (isInit) {
        data = "initializing " + data;
        data += "...";
      }

      console.log(`${chalk.bgBlue("[ CREATE-NEXT-BOILERPLATE ]")} ${data}`);
    },
    error(data: string) {
      console.error(chalk.bgRed("[ CREATE-NEXT-BOILERPLATE ]") + " " + data);
    }
  };
}

interface Options {
  typescript?: boolean;
  javascript?: boolean;
  tailwind?: boolean;
  eslint?: boolean;
  app?: boolean;
  srcDir?: boolean;
  npm?: boolean;
  pnpm?: boolean;
}

export function createNextAppCommand(options?: Options) {
  const removeOption = (options: string[], option: string) =>
    options.filter((o) => o !== option);

  const command = "create-next-app";

  let optionsFlags = [
    "--typescript",
    "--tailwind",
    "--eslint",
    "--no-experimental-app",
    "--src-dir",
    "--import-alias @/*",
  ];

  if (options !== undefined) {
    if (options.javascript === true) {
      optionsFlags.push("--javascript");
      optionsFlags = removeOption(optionsFlags, "--typescript");
    }

    if (options.tailwind === false) {
      optionsFlags.push("--no-tailwind");
      optionsFlags = removeOption(optionsFlags, "--tailwind");
    }

    if (options.eslint === false) {
      optionsFlags.push("--no-eslint");
      optionsFlags = removeOption(optionsFlags, "--eslint");
    }

    if (options.app === true) {
      optionsFlags.push("--experimental-app");
      optionsFlags = removeOption(optionsFlags, "--no-experimental-app");
    }

    if (options.srcDir === false) {
      optionsFlags.push("--no-src-dir");
      optionsFlags = removeOption(optionsFlags, "--src-dir");
    }

    if (options.npm === true) {
      optionsFlags.push("--use-npm");
    }

    if (options.pnpm === true) {
      optionsFlags.push("--use-pnpm");
    }
  }

  return `${command} ${optionsFlags.join(" ")}`;
}

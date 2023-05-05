import { describe, expect, test, afterEach, vi } from "vitest";
import chalk from "chalk";

import { logger } from "../../src/helpers/utilities";

describe("logger()", () => {
  interface LoggerTestCase {
    condition: string;
    value: string | [string, boolean];
    expected: string;
  }
  
  const PREFIX = "[ CREATE-NEXT-BOILERPLATE ]";
  const LOG_PREFIX = chalk.bgBlue(PREFIX);
  const ERROR_PREFIX = chalk.bgRed(PREFIX);
  
  const loggerTestCases: LoggerTestCase[] = [
    {
      condition: "standard log",
      value: "test",
      expected: LOG_PREFIX + " test",
    },
    {
      condition: "initializing log",
      value: ["test", true],
      expected: LOG_PREFIX + " initializing test...",
    },
    {
      condition: "error log",
      value: "test",
      expected: ERROR_PREFIX + " test",
    },
  ];

  afterEach(() => {
    vi.restoreAllMocks();
  });

  loggerTestCases.forEach(({ condition, value, expected }) => {
    const method = condition.includes("error") ? "error" : "log";

    test(`calls console.${method} with ${expected}`, () => {
      const spy = vi.spyOn(console, method);
      // silence console log/error once
      spy.mockImplementationOnce(() => {});

      if (Array.isArray(value)) {
        logger()[method](value[0], value[1]);
      } else {
        logger()[method](value);
      }

      expect(spy).toBeCalledTimes(1);
      expect(spy).toBeCalledWith(expected);
    });
  });
});

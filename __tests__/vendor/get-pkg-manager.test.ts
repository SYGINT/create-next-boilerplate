import { describe, expect, test, afterEach } from "vitest";

import { getPkgManager } from "../../src/vendor/get-pkg-manager";

describe("get-pkg-manager", () => {
  let agent = process.env.npm_config_user_agent;

  interface GetPkgManagerTestCase {
    value: string | undefined;
    expected: string;
  }

  const getPkgManagerTestCases: GetPkgManagerTestCase[] = [
    { value: "npm", expected: "npm" },
    { value: "pnpm", expected: "pnpm" },
    { value: "yarn", expected: "yarn" },
    { value: "test", expected: "npm" },
    { value: undefined, expected: "npm" },
  ];

  afterEach(() => {
    agent = process.env.npm_config_user_agent;
  });

  getPkgManagerTestCases.forEach(({ value, expected }) => {
    test(`should return "${expected}" when user agent is ${value === undefined ? "missing" : `"${value}"`}`, () => {
      process.env.npm_config_user_agent = `${value}/test/test/test/test`;

      if (value === undefined) {
        delete process.env.npm_config_user_agent;
      }

      expect(getPkgManager()).toBe(expected);
    });
  });
});

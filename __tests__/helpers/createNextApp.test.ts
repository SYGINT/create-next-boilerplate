import { describe, expect, test } from "vitest";

import { createNextAppCommand } from "../../src/helpers/createNextApp";

describe("createNextAppCommand()", () => {
  type setting =
    | "typescript"
    | "javascript"
    | "tailwind"
    | "eslint"
    | "app"
    | "srcDir"
    | "npm"
    | "pnpm";

  interface CreateNextAppCommandTestCase {
    value: {
      [k in setting]?: boolean;
    };
    expected: { toContain: string; notToContain?: string };
  }

  const createNextAppCommandTestCases: CreateNextAppCommandTestCase[] = [
    {
      value: { typescript: true },
      expected: {
        toContain: "--typescript",
        notToContain: "--javascript",
      },
    },
    {
      value: { javascript: true },
      expected: {
        toContain: "--javascript",
        notToContain: "--typescript",
      },
    },
    {
      value: { tailwind: true },
      expected: {
        toContain: "--tailwind",
        notToContain: "--no-tailwind",
      },
    },
    {
      value: { tailwind: false },
      expected: {
        toContain: "--no-tailwind",
        notToContain: "--tailwind",
      },
    },
    {
      value: { eslint: false },
      expected: {
        toContain: "--no-eslint",
        notToContain: "--eslint",
      },
    },
    {
      value: { app: true },
      expected: {
        toContain: "--experimental-app",
      },
    },
    {
      value: { srcDir: false },
      expected: {
        toContain: "--no-src-dir",
        notToContain: "--src-dir",
      },
    },
    {
      value: { npm: true },
      expected: {
        toContain: "--use-npm",
        notToContain: "--use-pnpm",
      },
    },
    {
      value: { pnpm: true },
      expected: {
        toContain: "--use-pnpm",
        notToContain: "--use-npm",
      },
    },
  ];

  test("should return command with defaults", () => {
    expect(createNextAppCommand()).toBe(
      "create-next-app --typescript --tailwind --eslint --no-experimental-app --src-dir --import-alias @/*"
    );
  });

  createNextAppCommandTestCases.forEach(({ value, expected }) => {
    const { toContain, notToContain } = expected;
    let description = `returns command with "${toContain}"`;

    if (notToContain) {
      description += ` and without "${notToContain}"`;
    }

    description += ` when ${Object.keys(value)[0]} is ${
      Object.values(value)[0]
    }`;

    test(description, () => {
      const result = createNextAppCommand(value);

      expect(result).toContain(toContain);
      notToContain && expect(result).not.toContain(notToContain);
    });
  });
});

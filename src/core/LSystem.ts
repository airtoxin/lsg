export type Rule = { from: string; to: string };

export class LSystem {
  exec(input: string, rules: Rule[], steps = 1): string {
    let result = input;
    for (let i = 0; i < steps; i++) {
      result = Array.from(result)
        .map((char) => {
          for (const { from, to } of rules) {
            if (char === from) return to;
          }
          return char;
        })
        .join("");
    }
    return result;
  }
}

export const lSystem = new LSystem();

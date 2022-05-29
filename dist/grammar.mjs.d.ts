type WithKind<T extends Record<string, object>> = {
  [K in keyof T]: T[K] & { kind: K };
}[keyof T];

type TopLevelParams = {
  enum: { values: string[] },
  interface: {
    base: string[];
    props: Record<string, Type>;
  }
};

type TopLevel = WithKind<TopLevelParams>;

type TypeParams = {
  literal: { value: string | boolean | null },
  reference: { name: string },
  array: { base: Type },
  union: { types: Type[] },
  object: { items: Record<string, Type> },
};

type Type = WithKind<TypeParams>;

type SpecExtension = Record<string, TopLevel>;

type Spec = SpecExtension & { __is_resolved__: true };

export const parser: {
  parse(src: string): SpecExtension
};

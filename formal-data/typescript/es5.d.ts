export interface Node {
  type: string;
  loc?: SourceLocation | null;
}

export interface SourceLocation {
  source?: string | null;
  start: Position;
  end: Position;
}

export interface Position {
  line: number;
  column: number;
}

export interface Identifier extends Node {
  type: "Identifier";
  name: string;
}

export interface Literal extends Node {
  type: "Literal";
  value?: string | boolean | null | number | RegExp;
}

export interface RegExpLiteral extends Literal {
  regex: {
    pattern: string;
    flags: string;
  };
}

export interface Program extends Node {
  type: "Program";
  body: Array<Directive | Statement>;
}

export interface Function extends Node {
  id?: Identifier | null;
  params: Array<Pattern>;
  body: FunctionBody;
}

export interface ExpressionStatement extends Node {
  type: "ExpressionStatement";
  expression: Expression;
}

export interface Directive extends Omit<ExpressionStatement, "expression"> {
  expression: Literal;
  directive: string;
}

export interface BlockStatement extends Node {
  type: "BlockStatement";
  body: Array<Statement>;
}

export interface FunctionBody extends Omit<BlockStatement, "body"> {
  body: Array<Directive | Statement>;
}

export interface EmptyStatement extends Node {
  type: "EmptyStatement";
}

export interface DebuggerStatement extends Node {
  type: "DebuggerStatement";
}

export interface WithStatement extends Node {
  type: "WithStatement";
  object: Expression;
  body: Statement;
}

export interface ReturnStatement extends Node {
  type: "ReturnStatement";
  argument?: Expression | null;
}

export interface LabeledStatement extends Node {
  type: "LabeledStatement";
  label: Identifier;
  body: Statement;
}

export interface BreakStatement extends Node {
  type: "BreakStatement";
  label?: Identifier | null;
}

export interface ContinueStatement extends Node {
  type: "ContinueStatement";
  label?: Identifier | null;
}

export interface IfStatement extends Node {
  type: "IfStatement";
  test: Expression;
  consequent: Statement;
  alternate?: Statement | null;
}

export interface SwitchStatement extends Node {
  type: "SwitchStatement";
  discriminant: Expression;
  cases: Array<SwitchCase>;
}

export interface SwitchCase extends Node {
  type: "SwitchCase";
  test?: Expression | null;
  consequent: Array<Statement>;
}

export interface ThrowStatement extends Node {
  type: "ThrowStatement";
  argument: Expression;
}

export interface TryStatement extends Node {
  type: "TryStatement";
  block: BlockStatement;
  handler?: CatchClause | null;
  finalizer?: BlockStatement | null;
}

export interface CatchClause extends Node {
  type: "CatchClause";
  param: Pattern;
  body: BlockStatement;
}

export interface WhileStatement extends Node {
  type: "WhileStatement";
  test: Expression;
  body: Statement;
}

export interface DoWhileStatement extends Node {
  type: "DoWhileStatement";
  body: Statement;
  test: Expression;
}

export interface ForStatement extends Node {
  type: "ForStatement";
  init?: VariableDeclaration | Expression | null;
  test?: Expression | null;
  update?: Expression | null;
  body: Statement;
}

export interface ForInStatement extends Node {
  type: "ForInStatement";
  left: VariableDeclaration | Pattern;
  right: Expression;
  body: Statement;
}

export interface FunctionDeclaration extends Function {
  type: "FunctionDeclaration";
  id: Identifier;
}

export interface VariableDeclaration extends Node {
  type: "VariableDeclaration";
  declarations: Array<VariableDeclarator>;
  kind: "var";
}

export interface VariableDeclarator extends Node {
  type: "VariableDeclarator";
  id: Pattern;
  init?: Expression | null;
}

export interface ThisExpression extends Node {
  type: "ThisExpression";
}

export interface ArrayExpression extends Node {
  type: "ArrayExpression";
  elements: Array<Expression | null>;
}

export interface ObjectExpression extends Node {
  type: "ObjectExpression";
  properties: Array<Property>;
}

export interface Property extends Node {
  type: "Property";
  key: Literal | Identifier;
  value: Expression;
  kind: "init" | "get" | "set";
}

export interface FunctionExpression extends Function {
  type: "FunctionExpression";
}

export interface UnaryExpression extends Node {
  type: "UnaryExpression";
  operator: UnaryOperator;
  prefix: boolean;
  argument: Expression;
}

export type UnaryOperator = "-" | "+" | "!" | "~" | "typeof" | "void" | "delete";

export interface UpdateExpression extends Node {
  type: "UpdateExpression";
  operator: UpdateOperator;
  argument: Expression;
  prefix: boolean;
}

export type UpdateOperator = "++" | "--";

export interface BinaryExpression extends Node {
  type: "BinaryExpression";
  operator: BinaryOperator;
  left: Expression;
  right: Expression;
}

export type BinaryOperator = "==" | "!=" | "===" | "!==" | "<" | "<=" | ">" | ">=" | "<<" | ">>" | ">>>" | "+" | "-" | "*" | "/" | "%" | "|" | "^" | "&" | "in" | "instanceof";

export interface AssignmentExpression extends Node {
  type: "AssignmentExpression";
  operator: AssignmentOperator;
  left: Pattern | Expression;
  right: Expression;
}

export type AssignmentOperator = "=" | "+=" | "-=" | "*=" | "/=" | "%=" | "<<=" | ">>=" | ">>>=" | "|=" | "^=" | "&=";

export interface LogicalExpression extends Node {
  type: "LogicalExpression";
  operator: LogicalOperator;
  left: Expression;
  right: Expression;
}

export type LogicalOperator = "||" | "&&";

export interface MemberExpression extends Node {
  type: "MemberExpression";
  object: Expression;
  property: Expression;
  computed: boolean;
}

export interface ConditionalExpression extends Node {
  type: "ConditionalExpression";
  test: Expression;
  alternate: Expression;
  consequent: Expression;
}

export interface CallExpression extends Node {
  type: "CallExpression";
  callee: Expression;
  arguments: Array<Expression>;
}

export interface NewExpression extends Node {
  type: "NewExpression";
  callee: Expression;
  arguments: Array<Expression>;
}

export interface SequenceExpression extends Node {
  type: "SequenceExpression";
  expressions: Array<Expression>;
}

export type Statement = (
  | ExpressionStatement
  | BlockStatement
  | EmptyStatement
  | DebuggerStatement
  | WithStatement
  | ReturnStatement
  | LabeledStatement
  | BreakStatement
  | ContinueStatement
  | IfStatement
  | SwitchStatement
  | ThrowStatement
  | TryStatement
  | WhileStatement
  | DoWhileStatement
  | ForStatement
  | ForInStatement
  | Declaration
);

export type Declaration = (
  | FunctionDeclaration
  | VariableDeclaration
);

export type Expression = (
  | Identifier
  | Literal
  | ThisExpression
  | ArrayExpression
  | ObjectExpression
  | FunctionExpression
  | UnaryExpression
  | UpdateExpression
  | BinaryExpression
  | AssignmentExpression
  | LogicalExpression
  | MemberExpression
  | ConditionalExpression
  | CallExpression
  | NewExpression
  | SequenceExpression
);

export type Pattern = (
  | Identifier
  | MemberExpression
);
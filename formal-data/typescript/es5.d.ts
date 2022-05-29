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

export interface Identifier extends Expression, Pattern {
  type: "Identifier";
  name: string;
}

export interface Literal extends Expression {
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

export interface Statement extends Node {}

export interface ExpressionStatement extends Statement {
  type: "ExpressionStatement";
  expression: Expression;
}

export interface Directive extends ExpressionStatement {
  expression: Literal;
  directive: string;
}

export interface BlockStatement extends Statement {
  type: "BlockStatement";
  body: Array<Statement>;
}

export interface FunctionBody extends BlockStatement {
  body: Array<Directive | Statement>;
}

export interface EmptyStatement extends Statement {
  type: "EmptyStatement";
}

export interface DebuggerStatement extends Statement {
  type: "DebuggerStatement";
}

export interface WithStatement extends Statement {
  type: "WithStatement";
  object: Expression;
  body: Statement;
}

export interface ReturnStatement extends Statement {
  type: "ReturnStatement";
  argument?: Expression | null;
}

export interface LabeledStatement extends Statement {
  type: "LabeledStatement";
  label: Identifier;
  body: Statement;
}

export interface BreakStatement extends Statement {
  type: "BreakStatement";
  label?: Identifier | null;
}

export interface ContinueStatement extends Statement {
  type: "ContinueStatement";
  label?: Identifier | null;
}

export interface IfStatement extends Statement {
  type: "IfStatement";
  test: Expression;
  consequent: Statement;
  alternate?: Statement | null;
}

export interface SwitchStatement extends Statement {
  type: "SwitchStatement";
  discriminant: Expression;
  cases: Array<SwitchCase>;
}

export interface SwitchCase extends Node {
  type: "SwitchCase";
  test?: Expression | null;
  consequent: Array<Statement>;
}

export interface ThrowStatement extends Statement {
  type: "ThrowStatement";
  argument: Expression;
}

export interface TryStatement extends Statement {
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

export interface WhileStatement extends Statement {
  type: "WhileStatement";
  test: Expression;
  body: Statement;
}

export interface DoWhileStatement extends Statement {
  type: "DoWhileStatement";
  body: Statement;
  test: Expression;
}

export interface ForStatement extends Statement {
  type: "ForStatement";
  init?: VariableDeclaration | Expression | null;
  test?: Expression | null;
  update?: Expression | null;
  body: Statement;
}

export interface ForInStatement extends Statement {
  type: "ForInStatement";
  left: VariableDeclaration | Pattern;
  right: Expression;
  body: Statement;
}

export interface Declaration extends Statement {}

export interface FunctionDeclaration extends Function, Declaration {
  type: "FunctionDeclaration";
  id: Identifier;
}

export interface VariableDeclaration extends Declaration {
  type: "VariableDeclaration";
  declarations: Array<VariableDeclarator>;
  kind: "var";
}

export interface VariableDeclarator extends Node {
  type: "VariableDeclarator";
  id: Pattern;
  init?: Expression | null;
}

export interface Expression extends Node {}

export interface ThisExpression extends Expression {
  type: "ThisExpression";
}

export interface ArrayExpression extends Expression {
  type: "ArrayExpression";
  elements: Array<Expression | null>;
}

export interface ObjectExpression extends Expression {
  type: "ObjectExpression";
  properties: Array<Property>;
}

export interface Property extends Node {
  type: "Property";
  key: Literal | Identifier;
  value: Expression;
  kind: "init" | "get" | "set";
}

export interface FunctionExpression extends Function, Expression {
  type: "FunctionExpression";
}

export interface UnaryExpression extends Expression {
  type: "UnaryExpression";
  operator: UnaryOperator;
  prefix: boolean;
  argument: Expression;
}

export type UnaryOperator = "-" | "+" | "!" | "~" | "typeof" | "void" | "delete";

export interface UpdateExpression extends Expression {
  type: "UpdateExpression";
  operator: UpdateOperator;
  argument: Expression;
  prefix: boolean;
}

export type UpdateOperator = "++" | "--";

export interface BinaryExpression extends Expression {
  type: "BinaryExpression";
  operator: BinaryOperator;
  left: Expression;
  right: Expression;
}

export type BinaryOperator = "==" | "!=" | "===" | "!==" | "<" | "<=" | ">" | ">=" | "<<" | ">>" | ">>>" | "+" | "-" | "*" | "/" | "%" | "|" | "^" | "&" | "in" | "instanceof";

export interface AssignmentExpression extends Expression {
  type: "AssignmentExpression";
  operator: AssignmentOperator;
  left: Pattern | Expression;
  right: Expression;
}

export type AssignmentOperator = "=" | "+=" | "-=" | "*=" | "/=" | "%=" | "<<=" | ">>=" | ">>>=" | "|=" | "^=" | "&=";

export interface LogicalExpression extends Expression {
  type: "LogicalExpression";
  operator: LogicalOperator;
  left: Expression;
  right: Expression;
}

export type LogicalOperator = "||" | "&&";

export interface MemberExpression extends Expression, Pattern {
  type: "MemberExpression";
  object: Expression;
  property: Expression;
  computed: boolean;
}

export interface ConditionalExpression extends Expression {
  type: "ConditionalExpression";
  test: Expression;
  alternate: Expression;
  consequent: Expression;
}

export interface CallExpression extends Expression {
  type: "CallExpression";
  callee: Expression;
  arguments: Array<Expression>;
}

export interface NewExpression extends Expression {
  type: "NewExpression";
  callee: Expression;
  arguments: Array<Expression>;
}

export interface SequenceExpression extends Expression {
  type: "SequenceExpression";
  expressions: Array<Expression>;
}

export interface Pattern extends Node {}
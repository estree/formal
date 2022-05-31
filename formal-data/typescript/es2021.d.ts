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
  value?: string | boolean | null | number | RegExp | bigint;
}

export interface RegExpLiteral extends Literal {
  regex: {
    pattern: string;
    flags: string;
  };
}

export interface Program extends Node {
  type: "Program";
  body: Array<Statement | ModuleDeclaration>;
  sourceType: "script" | "module";
}

export interface Function extends Node {
  id?: Identifier | null;
  params: Array<Pattern>;
  body: FunctionBody;
  generator: boolean;
  async: boolean;
}

export interface ExpressionStatement extends Node {
  type: "ExpressionStatement";
  expression: Expression;
}

export interface Directive extends ExpressionStatement {
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
  param?: Pattern | null;
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
  kind: "var" | "let" | "const";
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
  elements: Array<Expression | SpreadElement | null>;
}

export interface ObjectExpression extends Node {
  type: "ObjectExpression";
  properties: Array<Property | SpreadElement>;
}

export interface Property extends Node {
  type: "Property";
  key: Expression;
  value: Expression;
  kind: "init" | "get" | "set";
  method: boolean;
  shorthand: boolean;
  computed: boolean;
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

export type BinaryOperator = "==" | "!=" | "===" | "!==" | "<" | "<=" | ">" | ">=" | "<<" | ">>" | ">>>" | "+" | "-" | "*" | "/" | "%" | "|" | "^" | "&" | "in" | "instanceof" | "**";

export interface AssignmentExpression extends Node {
  type: "AssignmentExpression";
  operator: AssignmentOperator;
  left: Pattern;
  right: Expression;
}

export type AssignmentOperator = "=" | "+=" | "-=" | "*=" | "/=" | "%=" | "<<=" | ">>=" | ">>>=" | "|=" | "^=" | "&=" | "**=" | "||=" | "&&=" | "??=";

export interface LogicalExpression extends Node {
  type: "LogicalExpression";
  operator: LogicalOperator;
  left: Expression;
  right: Expression;
}

export type LogicalOperator = "||" | "&&" | "??";

export interface MemberExpression extends ChainElement {
  type: "MemberExpression";
  object: Expression | Super;
  property: Expression;
  computed: boolean;
}

export interface ConditionalExpression extends Node {
  type: "ConditionalExpression";
  test: Expression;
  alternate: Expression;
  consequent: Expression;
}

export interface CallExpression extends ChainElement {
  type: "CallExpression";
  callee: Expression | Super;
  arguments: Array<Expression | SpreadElement>;
}

export interface NewExpression extends Node {
  type: "NewExpression";
  callee: Expression;
  arguments: Array<Expression | SpreadElement>;
}

export interface SequenceExpression extends Node {
  type: "SequenceExpression";
  expressions: Array<Expression>;
}

export interface ForOfStatement extends Omit<ForInStatement, "type"> {
  type: "ForOfStatement";
  await: boolean;
}

export interface Super extends Node {
  type: "Super";
}

export interface SpreadElement extends Node {
  type: "SpreadElement";
  argument: Expression;
}

export interface ArrowFunctionExpression extends Omit<Function, "body"> {
  type: "ArrowFunctionExpression";
  body: FunctionBody | Expression;
  expression: boolean;
  generator: false;
}

export interface YieldExpression extends Node {
  type: "YieldExpression";
  argument?: Expression | null;
  delegate: boolean;
}

export interface TemplateLiteral extends Node {
  type: "TemplateLiteral";
  quasis: Array<TemplateElement>;
  expressions: Array<Expression>;
}

export interface TaggedTemplateExpression extends Node {
  type: "TaggedTemplateExpression";
  tag: Expression;
  quasi: TemplateLiteral;
}

export interface TemplateElement extends Node {
  type: "TemplateElement";
  tail: boolean;
  value: {
    cooked?: string | null;
    raw: string;
  };
}

export interface AssignmentProperty extends Omit<Property, "type" | "value"> {
  type: "Property";
  value: Pattern;
  kind: "init";
  method: false;
}

export interface ObjectPattern extends Node {
  type: "ObjectPattern";
  properties: Array<AssignmentProperty | RestElement>;
}

export interface ArrayPattern extends Node {
  type: "ArrayPattern";
  elements: Array<Pattern | null>;
}

export interface RestElement extends Node {
  type: "RestElement";
  argument: Pattern;
}

export interface AssignmentPattern extends Node {
  type: "AssignmentPattern";
  left: Pattern;
  right: Expression;
}

export interface Class extends Node {
  id?: Identifier | null;
  superClass?: Expression | null;
  body: ClassBody;
}

export interface ClassBody extends Node {
  type: "ClassBody";
  body: Array<MethodDefinition>;
}

export interface MethodDefinition extends Node {
  type: "MethodDefinition";
  key: Expression;
  value: FunctionExpression;
  kind: "constructor" | "method" | "get" | "set";
  computed: boolean;
  static: boolean;
}

export interface ClassDeclaration extends Class {
  type: "ClassDeclaration";
  id: Identifier;
}

export interface ClassExpression extends Class {
  type: "ClassExpression";
}

export interface MetaProperty extends Node {
  type: "MetaProperty";
  meta: Identifier;
  property: Identifier;
}

export interface ModuleSpecifier extends Node {
  local: Identifier;
}

export interface ImportDeclaration extends Node {
  type: "ImportDeclaration";
  specifiers: Array<ImportSpecifier | ImportDefaultSpecifier | ImportNamespaceSpecifier>;
  source: Literal;
}

export interface ImportSpecifier extends ModuleSpecifier {
  type: "ImportSpecifier";
  imported: Identifier;
}

export interface ImportDefaultSpecifier extends ModuleSpecifier {
  type: "ImportDefaultSpecifier";
}

export interface ImportNamespaceSpecifier extends ModuleSpecifier {
  type: "ImportNamespaceSpecifier";
}

export interface ExportNamedDeclaration extends Node {
  type: "ExportNamedDeclaration";
  declaration?: Declaration | null;
  specifiers: Array<ExportSpecifier>;
  source?: Literal | null;
}

export interface ExportSpecifier extends ModuleSpecifier {
  type: "ExportSpecifier";
  exported: Identifier;
}

export interface AnonymousDefaultExportedFunctionDeclaration extends Function {
  type: "FunctionDeclaration";
  id: null;
}

export interface AnonymousDefaultExportedClassDeclaration extends Class {
  type: "ClassDeclaration";
  id: null;
}

export interface ExportDefaultDeclaration extends Node {
  type: "ExportDefaultDeclaration";
  declaration: AnonymousDefaultExportedFunctionDeclaration | FunctionDeclaration | AnonymousDefaultExportedClassDeclaration | ClassDeclaration | Expression;
}

export interface ExportAllDeclaration extends Node {
  type: "ExportAllDeclaration";
  source: Literal;
  exported?: Identifier | null;
}

export interface AwaitExpression extends Node {
  type: "AwaitExpression";
  argument: Expression;
}

export interface BigIntLiteral extends Literal {
  bigint: string;
}

export interface ChainExpression extends Node {
  type: "ChainExpression";
  expression: ChainElement;
}

export interface ChainElement extends Node {
  optional: boolean;
}

export interface ImportExpression extends Node {
  type: "ImportExpression";
  source: Expression;
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
  | ClassDeclaration
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
  | ArrowFunctionExpression
  | YieldExpression
  | TemplateLiteral
  | TaggedTemplateExpression
  | ClassExpression
  | MetaProperty
  | AwaitExpression
  | ChainExpression
  | ImportExpression
);

export type Pattern = (
  | Identifier
  | MemberExpression
  | ObjectPattern
  | ArrayPattern
  | RestElement
  | AssignmentPattern
);

export type ModuleDeclaration = (
  | ImportDeclaration
  | ExportNamedDeclaration
  | ExportDefaultDeclaration
  | ExportAllDeclaration
);
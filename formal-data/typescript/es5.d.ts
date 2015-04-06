module ESTree {
  export interface Node {
    type: string;
    loc: SourceLocation;
  }

  export interface SourceLocation {
    source: string;
    start: Position;
    end: Position;
  }

  export interface Position {
    line: number;
    column: number;
  }

  export interface Program extends Node {
    body: Array<Statement>;
  }

  export interface Function extends Node {
    id: Identifier;
    params: Array<Pattern>;
    body: BlockStatement;
    generator: boolean;
    expression: boolean;
  }

  export interface Statement extends Node {}

  export interface EmptyStatement extends Statement {}

  export interface BlockStatement extends Statement {
    body: Array<Statement>;
  }

  export interface ExpressionStatement extends Statement {
    expression: Expression;
  }

  export interface IfStatement extends Statement {
    test: Expression;
    consequent: Statement;
    alternate: Statement;
  }

  export interface LabeledStatement extends Statement {
    label: Identifier;
    body: Statement;
  }

  export interface BreakStatement extends Statement {
    label: Identifier;
  }

  export interface ContinueStatement extends Statement {
    label: Identifier;
  }

  export interface WithStatement extends Statement {
    object: Expression;
    body: Statement;
  }

  export interface SwitchStatement extends Statement {
    discriminant: Expression;
    cases: Array<SwitchCase>;
    lexical: boolean;
  }

  export interface ReturnStatement extends Statement {
    argument: Expression;
  }

  export interface ThrowStatement extends Statement {
    argument: Expression;
  }

  export interface TryStatement extends Statement {
    block: BlockStatement;
    handler: CatchClause;
    finalizer: BlockStatement;
  }

  export interface WhileStatement extends Statement {
    test: Expression;
    body: Statement;
  }

  export interface DoWhileStatement extends Statement {
    body: Statement;
    test: Expression;
  }

  export interface ForStatement extends Statement {
    init: VariableDeclaration | Expression;
    test: Expression;
    update: Expression;
    body: Statement;
  }

  export interface ForInStatement extends Statement {
    left: VariableDeclaration | Expression;
    right: Expression;
    body: Statement;
  }

  export interface DebuggerStatement extends Statement {}

  export interface Declaration extends Statement {}

  export interface FunctionDeclaration extends Function, Declaration {
    id: Identifier;
  }

  export interface VariableDeclaration extends Declaration {
    declarations: Array<VariableDeclarator>;
    kind: string;
  }

  export interface VariableDeclarator extends Node {
    id: Pattern;
    init: Expression;
  }

  export interface Expression extends Node {}

  export interface ThisExpression extends Expression {}

  export interface ArrayExpression extends Expression {
    elements: Array<Expression>;
  }

  export interface ObjectExpression extends Expression {
    properties: Array<Property>;
  }

  export interface Property extends Node {
    key: Literal | Identifier;
    value: Expression;
    kind: string | string | string;
  }

  export interface FunctionExpression extends Function, Expression {}

  export interface SequenceExpression extends Expression {
    expressions: Array<Expression>;
  }

  export interface UnaryExpression extends Expression {
    operator: UnaryOperator;
    prefix: boolean;
    argument: Expression;
  }

  export interface BinaryExpression extends Expression {
    operator: BinaryOperator;
    left: Expression;
    right: Expression;
  }

  export interface AssignmentExpression extends Expression {
    operator: AssignmentOperator;
    left: Pattern | Expression;
    right: Expression;
  }

  export interface UpdateExpression extends Expression {
    operator: UpdateOperator;
    argument: Expression;
    prefix: boolean;
  }

  export interface LogicalExpression extends Expression {
    operator: LogicalOperator;
    left: Expression;
    right: Expression;
  }

  export interface ConditionalExpression extends Expression {
    test: Expression;
    alternate: Expression;
    consequent: Expression;
  }

  export interface CallExpression extends Expression {
    callee: Expression;
    arguments: Array<Expression>;
  }

  export interface NewExpression extends CallExpression {}

  export interface MemberExpression extends Expression, Pattern {
    object: Expression;
    property: Expression;
    computed: boolean;
  }

  export interface Pattern extends Node {}

  export interface SwitchCase extends Node {
    test: Expression;
    consequent: Array<Statement>;
  }

  export interface CatchClause extends Node {
    param: Pattern;
    guard: any;
    body: BlockStatement;
  }

  export interface Identifier extends Node, Expression, Pattern {
    name: string;
  }

  export interface Literal extends Node, Expression {
    value: string | boolean | number | RegExp;
  }

  export interface RegexLiteral extends Literal {
    regex: {
      pattern: string;
      flags: string;
    };
  }

  export type UnaryOperator = string;

  export type BinaryOperator = string;

  export type LogicalOperator = string;

  export type AssignmentOperator = string;

  export type UpdateOperator = string;
}
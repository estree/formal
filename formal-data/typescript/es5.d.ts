declare module ESTree {
  interface Node {
    type: string;
    loc?: SourceLocation;
  }

  interface SourceLocation {
    source?: string;
    start: Position;
    end: Position;
  }

  interface Position {
    line: number;
    column: number;
  }

  interface Program extends Node {
    body: Array<Statement>;
  }

  interface Function extends Node {
    id?: Identifier;
    params: Array<Pattern>;
    body: BlockStatement;
  }

  interface Statement extends Node {}

  interface EmptyStatement extends Statement {}

  interface BlockStatement extends Statement {
    body: Array<Statement>;
  }

  interface ExpressionStatement extends Statement {
    expression: Expression;
  }

  interface IfStatement extends Statement {
    test: Expression;
    consequent: Statement;
    alternate?: Statement;
  }

  interface LabeledStatement extends Statement {
    label: Identifier;
    body: Statement;
  }

  interface BreakStatement extends Statement {
    label?: Identifier;
  }

  interface ContinueStatement extends Statement {
    label?: Identifier;
  }

  interface WithStatement extends Statement {
    object: Expression;
    body: Statement;
  }

  interface SwitchStatement extends Statement {
    discriminant: Expression;
    cases: Array<SwitchCase>;
    lexical: boolean;
  }

  interface ReturnStatement extends Statement {
    argument?: Expression;
  }

  interface ThrowStatement extends Statement {
    argument: Expression;
  }

  interface TryStatement extends Statement {
    block: BlockStatement;
    handler?: CatchClause;
    finalizer?: BlockStatement;
  }

  interface WhileStatement extends Statement {
    test: Expression;
    body: Statement;
  }

  interface DoWhileStatement extends Statement {
    body: Statement;
    test: Expression;
  }

  interface ForStatement extends Statement {
    init?: VariableDeclaration | Expression;
    test?: Expression;
    update?: Expression;
    body: Statement;
  }

  interface ForInStatement extends Statement {
    left: VariableDeclaration | Expression;
    right: Expression;
    body: Statement;
  }

  interface DebuggerStatement extends Statement {}

  interface Declaration extends Statement {}

  interface FunctionDeclaration extends Function, Declaration {
    id: Identifier;
  }

  interface VariableDeclaration extends Declaration {
    declarations: Array<VariableDeclarator>;
    kind: string;
  }

  interface VariableDeclarator extends Node {
    id: Pattern;
    init?: Expression;
  }

  interface Expression extends Node {}

  interface ThisExpression extends Expression {}

  interface ArrayExpression extends Expression {
    elements: Array<Expression>;
  }

  interface ObjectExpression extends Expression {
    properties: Array<Property>;
  }

  interface Property extends Node {
    key: Literal | Identifier;
    value: Expression;
    kind: string;
  }

  interface FunctionExpression extends Function, Expression {}

  interface SequenceExpression extends Expression {
    expressions: Array<Expression>;
  }

  interface UnaryExpression extends Expression {
    operator: UnaryOperator;
    prefix: boolean;
    argument: Expression;
  }

  interface BinaryExpression extends Expression {
    operator: BinaryOperator;
    left: Expression;
    right: Expression;
  }

  interface AssignmentExpression extends Expression {
    operator: AssignmentOperator;
    left: Pattern | Expression;
    right: Expression;
  }

  interface UpdateExpression extends Expression {
    operator: UpdateOperator;
    argument: Expression;
    prefix: boolean;
  }

  interface LogicalExpression extends Expression {
    operator: LogicalOperator;
    left: Expression;
    right: Expression;
  }

  interface ConditionalExpression extends Expression {
    test: Expression;
    alternate: Expression;
    consequent: Expression;
  }

  interface CallExpression extends Expression {
    callee: Expression;
    arguments: Array<Expression>;
  }

  interface NewExpression extends CallExpression {}

  interface MemberExpression extends Expression, Pattern {
    object: Expression;
    property: Expression;
    computed: boolean;
  }

  interface Pattern extends Node {}

  interface SwitchCase extends Node {
    test?: Expression;
    consequent: Array<Statement>;
  }

  interface CatchClause extends Node {
    param: Pattern;
    guard: any;
    body: BlockStatement;
  }

  interface Identifier extends Node, Expression, Pattern {
    name: string;
  }

  interface Literal extends Node, Expression {
    value?: string | boolean | number | RegExp;
  }

  interface RegexLiteral extends Literal {
    regex: {
      pattern: string;
      flags: string;
    };
  }

  type UnaryOperator = string;

  type BinaryOperator = string;

  type LogicalOperator = string;

  type AssignmentOperator = string;

  type UpdateOperator = string;
}
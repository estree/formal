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
    sourceType: string | string;
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
    kind: string | string | string;
  }

  export interface VariableDeclarator extends Node {
    id: Pattern;
    init: Expression;
  }

  export interface Expression extends Node {}

  export interface ThisExpression extends Expression {}

  export interface ArrayExpression extends Expression {
    elements: Array<Expression | SpreadElement>;
  }

  export interface ObjectExpression extends Expression {
    properties: Array<Property>;
  }

  export interface Property extends Node {
    key: Expression;
    value: Expression;
    kind: string | string | string;
    method: boolean;
    shorthand: boolean;
    computed: boolean;
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
    left: Pattern | MemberExpression;
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
    arguments: Array<Expression | SpreadElement>;
  }

  export interface NewExpression extends CallExpression {}

  export interface MemberExpression extends Expression, Pattern {
    object: Expression | Super;
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

  export interface ForOfStatement extends ForInStatement {}

  export interface Super extends Node {}

  export interface SpreadElement extends Node {
    argument: Expression;
  }

  export interface ArrowFunctionExpression extends Function, Expression {
    body: BlockStatement | Expression;
    expression: boolean;
  }

  export interface YieldExpression extends Expression {
    argument: Expression;
  }

  export interface TemplateLiteral extends Expression {
    quasis: Array<TemplateElement>;
    expressions: Array<Expression>;
  }

  export interface TaggedTemplateExpression extends Expression {
    tag: Expression;
    quasi: TemplateLiteral;
  }

  export interface TemplateElement extends Node {
    tail: boolean;
    value: {
      cooked: string;
      value: string;
    };
  }

  export interface AssignmentProperty extends Property {
    value: Pattern;
    kind: string;
    method: boolean;
  }

  export interface ObjectPattern extends Pattern {
    properties: Array<AssignmentProperty>;
  }

  export interface ArrayPattern extends Pattern {
    elements: Array<Pattern>;
  }

  export interface RestElement extends Pattern {
    argument: Pattern;
  }

  export interface AssignmentPattern extends Pattern {
    left: Pattern;
    right: Expression;
  }

  export interface Class extends Node {
    id: Identifier;
    superClass: Expression;
    body: ClassBody;
  }

  export interface ClassBody extends Node {
    body: Array<MethodDefinition>;
  }

  export interface MethodDefinition extends Node {
    key: Identifier;
    value: FunctionExpression;
    kind: string | string | string | string;
    computed: boolean;
    static: boolean;
  }

  export interface ClassDeclaration extends Class, Declaration {
    id: Identifier;
  }

  export interface ClassExpression extends Class, Expression {}

  export interface MetaProperty extends Expression {
    meta: Identifier;
    property: Identifier;
  }

  export interface ImportDeclaration extends Node {
    specifiers: Array<ImportSpecifier | ImportDefaultSpecifier | ImportNamespaceSpecifier>;
    source: Literal;
  }

  export interface ImportSpecifier {
    imported: Identifier;
    local: Identifier;
  }

  export interface ImportDefaultSpecifier {
    local: Identifier;
  }

  export interface ImportNamespaceSpecifier {
    local: Identifier;
  }

  export interface ExportNamedDeclaration extends Node {
    declaration: Declaration;
    specifiers: Array<ExportSpecifier>;
    source: Literal;
  }

  export interface ExportSpecifier {
    exported: Identifier;
    local: Identifier;
  }

  export interface ExportDefaultDeclaration extends Node {
    declaration: Declaration | Expression;
  }

  export interface ExportAllDeclaration extends Node {
    source: Literal;
  }
}
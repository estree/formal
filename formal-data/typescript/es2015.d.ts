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

  interface Identifier extends Expression, Pattern {
    name: string;
  }

  interface Literal extends Expression {
    value?: string | boolean | number | RegExp;
  }

  interface RegExpLiteral extends Literal {
    regex: {
      pattern: string;
      flags: string;
    };
  }

  interface Program extends Node {
    body: Array<Statement | ModuleDeclaration>;
    sourceType: string;
  }

  interface Function extends Node {
    id?: Identifier;
    params: Array<Pattern>;
    body: FunctionBody;
    generator: boolean;
  }

  interface Statement extends Node {}

  interface ExpressionStatement extends Statement {
    expression: Expression;
  }

  interface Directive extends ExpressionStatement {
    expression: Literal;
    directive: string;
  }

  interface BlockStatement extends Statement {
    body: Array<Statement>;
  }

  interface FunctionBody extends BlockStatement {
    body: Array<Directive | Statement>;
  }

  interface EmptyStatement extends Statement {}

  interface DebuggerStatement extends Statement {}

  interface WithStatement extends Statement {
    object: Expression;
    body: Statement;
  }

  interface ReturnStatement extends Statement {
    argument?: Expression;
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

  interface IfStatement extends Statement {
    test: Expression;
    consequent: Statement;
    alternate?: Statement;
  }

  interface SwitchStatement extends Statement {
    discriminant: Expression;
    cases: Array<SwitchCase>;
  }

  interface SwitchCase extends Node {
    test?: Expression;
    consequent: Array<Statement>;
  }

  interface ThrowStatement extends Statement {
    argument: Expression;
  }

  interface TryStatement extends Statement {
    block: BlockStatement;
    handler?: CatchClause;
    finalizer?: BlockStatement;
  }

  interface CatchClause extends Node {
    param: Pattern;
    body: BlockStatement;
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
    left: VariableDeclaration | Pattern;
    right: Expression;
    body: Statement;
  }

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
    elements: Array<Expression | SpreadElement>;
  }

  interface ObjectExpression extends Expression {
    properties: Array<Property>;
  }

  interface Property extends Node {
    key: Expression;
    value: Expression;
    kind: string;
    method: boolean;
    shorthand: boolean;
    computed: boolean;
  }

  interface FunctionExpression extends Function, Expression {}

  interface UnaryExpression extends Expression {
    operator: UnaryOperator;
    prefix: boolean;
    argument: Expression;
  }

  type UnaryOperator = string;

  interface UpdateExpression extends Expression {
    operator: UpdateOperator;
    argument: Expression;
    prefix: boolean;
  }

  type UpdateOperator = string;

  interface BinaryExpression extends Expression {
    operator: BinaryOperator;
    left: Expression;
    right: Expression;
  }

  type BinaryOperator = string;

  interface AssignmentExpression extends Expression {
    operator: AssignmentOperator;
    left: Pattern;
    right: Expression;
  }

  type AssignmentOperator = string;

  interface LogicalExpression extends Expression {
    operator: LogicalOperator;
    left: Expression;
    right: Expression;
  }

  type LogicalOperator = string;

  interface MemberExpression extends Expression, Pattern {
    object: Expression | Super;
    property: Expression;
    computed: boolean;
  }

  interface ConditionalExpression extends Expression {
    test: Expression;
    alternate: Expression;
    consequent: Expression;
  }

  interface CallExpression extends Expression {
    callee: Expression | Super;
    arguments: Array<Expression | SpreadElement>;
  }

  interface NewExpression extends Expression {
    callee: Expression;
    arguments: Array<Expression | SpreadElement>;
  }

  interface SequenceExpression extends Expression {
    expressions: Array<Expression>;
  }

  interface Pattern extends Node {}

  interface ForOfStatement extends ForInStatement {}

  interface Super extends Node {}

  interface SpreadElement extends Node {
    argument: Expression;
  }

  interface ArrowFunctionExpression extends Function, Expression {
    body: FunctionBody | Expression;
    expression: boolean;
    generator: boolean;
  }

  interface YieldExpression extends Expression {
    argument?: Expression;
    delegate: boolean;
  }

  interface TemplateLiteral extends Expression {
    quasis: Array<TemplateElement>;
    expressions: Array<Expression>;
  }

  interface TaggedTemplateExpression extends Expression {
    tag: Expression;
    quasi: TemplateLiteral;
  }

  interface TemplateElement extends Node {
    tail: boolean;
    value: {
      cooked: string;
      raw: string;
    };
  }

  interface AssignmentProperty extends Property {
    value: Pattern;
    kind: string;
    method: boolean;
  }

  interface ObjectPattern extends Pattern {
    properties: Array<AssignmentProperty>;
  }

  interface ArrayPattern extends Pattern {
    elements: Array<Pattern>;
  }

  interface RestElement extends Pattern {
    argument: Pattern;
  }

  interface AssignmentPattern extends Pattern {
    left: Pattern;
    right: Expression;
  }

  interface Class extends Node {
    id?: Identifier;
    superClass?: Expression;
    body: ClassBody;
  }

  interface ClassBody extends Node {
    body: Array<MethodDefinition>;
  }

  interface MethodDefinition extends Node {
    key: Expression;
    value: FunctionExpression;
    kind: string;
    computed: boolean;
    static: boolean;
  }

  interface ClassDeclaration extends Class, Declaration {
    id: Identifier;
  }

  interface ClassExpression extends Class, Expression {}

  interface MetaProperty extends Expression {
    meta: Identifier;
    property: Identifier;
  }

  interface ModuleDeclaration extends Node {}

  interface ModuleSpecifier extends Node {
    local: Identifier;
  }

  interface ImportDeclaration extends ModuleDeclaration {
    specifiers: Array<ImportSpecifier | ImportDefaultSpecifier | ImportNamespaceSpecifier>;
    source: Literal;
  }

  interface ImportSpecifier extends ModuleSpecifier {
    imported: Identifier;
  }

  interface ImportDefaultSpecifier extends ModuleSpecifier {}

  interface ImportNamespaceSpecifier extends ModuleSpecifier {}

  interface ExportNamedDeclaration extends ModuleDeclaration {
    declaration?: Declaration;
    specifiers: Array<ExportSpecifier>;
    source?: Literal;
  }

  interface ExportSpecifier extends ModuleSpecifier {
    exported: Identifier;
  }

  interface AnonymousDefaultExportedFunctionDeclaration extends Function {
    id: any;
  }

  interface AnonymousDefaultExportedClassDeclaration extends Class {
    id: any;
  }

  interface ExportDefaultDeclaration extends ModuleDeclaration {
    declaration: AnonymousDefaultExportedFunctionDeclaration | FunctionDeclaration | AnonymousDefaultExportedClassDeclaration | ClassDeclaration | Expression;
  }

  interface ExportAllDeclaration extends ModuleDeclaration {
    source: Literal;
  }
}
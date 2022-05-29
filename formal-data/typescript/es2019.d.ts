declare module ESTree {
  interface Node {
    type: string;
    loc?: SourceLocation | null;
  }

  interface SourceLocation {
    source?: string | null;
    start: Position;
    end: Position;
  }

  interface Position {
    line: number;
    column: number;
  }

  interface Identifier extends Expression, Pattern {
    type: "Identifier";
    name: string;
  }

  interface Literal extends Expression {
    type: "Literal";
    value?: string | boolean | null | number | RegExp;
  }

  interface RegExpLiteral extends Literal {
    regex: {
      pattern: string;
      flags: string;
    };
  }

  interface Program extends Node {
    type: "Program";
    body: Array<Statement | ModuleDeclaration>;
    sourceType: "script" | "module";
  }

  interface Function extends Node {
    id?: Identifier | null;
    params: Array<Pattern>;
    body: FunctionBody;
    generator: boolean;
    async: boolean;
  }

  interface Statement extends Node {}

  interface ExpressionStatement extends Statement {
    type: "ExpressionStatement";
    expression: Expression;
  }

  interface Directive extends ExpressionStatement {
    expression: Literal;
    directive: string;
  }

  interface BlockStatement extends Statement {
    type: "BlockStatement";
    body: Array<Statement>;
  }

  interface FunctionBody extends BlockStatement {
    body: Array<Directive | Statement>;
  }

  interface EmptyStatement extends Statement {
    type: "EmptyStatement";
  }

  interface DebuggerStatement extends Statement {
    type: "DebuggerStatement";
  }

  interface WithStatement extends Statement {
    type: "WithStatement";
    object: Expression;
    body: Statement;
  }

  interface ReturnStatement extends Statement {
    type: "ReturnStatement";
    argument?: Expression | null;
  }

  interface LabeledStatement extends Statement {
    type: "LabeledStatement";
    label: Identifier;
    body: Statement;
  }

  interface BreakStatement extends Statement {
    type: "BreakStatement";
    label?: Identifier | null;
  }

  interface ContinueStatement extends Statement {
    type: "ContinueStatement";
    label?: Identifier | null;
  }

  interface IfStatement extends Statement {
    type: "IfStatement";
    test: Expression;
    consequent: Statement;
    alternate?: Statement | null;
  }

  interface SwitchStatement extends Statement {
    type: "SwitchStatement";
    discriminant: Expression;
    cases: Array<SwitchCase>;
  }

  interface SwitchCase extends Node {
    type: "SwitchCase";
    test?: Expression | null;
    consequent: Array<Statement>;
  }

  interface ThrowStatement extends Statement {
    type: "ThrowStatement";
    argument: Expression;
  }

  interface TryStatement extends Statement {
    type: "TryStatement";
    block: BlockStatement;
    handler?: CatchClause | null;
    finalizer?: BlockStatement | null;
  }

  interface CatchClause extends Node {
    type: "CatchClause";
    param?: Pattern | null;
    body: BlockStatement;
  }

  interface WhileStatement extends Statement {
    type: "WhileStatement";
    test: Expression;
    body: Statement;
  }

  interface DoWhileStatement extends Statement {
    type: "DoWhileStatement";
    body: Statement;
    test: Expression;
  }

  interface ForStatement extends Statement {
    type: "ForStatement";
    init?: VariableDeclaration | Expression | null;
    test?: Expression | null;
    update?: Expression | null;
    body: Statement;
  }

  interface ForInStatement extends Statement {
    type: "ForInStatement";
    left: VariableDeclaration | Pattern;
    right: Expression;
    body: Statement;
  }

  interface Declaration extends Statement {}

  interface FunctionDeclaration extends Function, Declaration {
    type: "FunctionDeclaration";
    id: Identifier;
  }

  interface VariableDeclaration extends Declaration {
    type: "VariableDeclaration";
    declarations: Array<VariableDeclarator>;
    kind: "var" | "let" | "const";
  }

  interface VariableDeclarator extends Node {
    type: "VariableDeclarator";
    id: Pattern;
    init?: Expression | null;
  }

  interface Expression extends Node {}

  interface ThisExpression extends Expression {
    type: "ThisExpression";
  }

  interface ArrayExpression extends Expression {
    type: "ArrayExpression";
    elements: Array<Expression | SpreadElement | null>;
  }

  interface ObjectExpression extends Expression {
    type: "ObjectExpression";
    properties: Array<Property | SpreadElement>;
  }

  interface Property extends Node {
    type: "Property";
    key: Expression;
    value: Expression;
    kind: "init" | "get" | "set";
    method: boolean;
    shorthand: boolean;
    computed: boolean;
  }

  interface FunctionExpression extends Function, Expression {
    type: "FunctionExpression";
  }

  interface UnaryExpression extends Expression {
    type: "UnaryExpression";
    operator: UnaryOperator;
    prefix: boolean;
    argument: Expression;
  }

  type UnaryOperator = "-" | "+" | "!" | "~" | "typeof" | "void" | "delete";

  interface UpdateExpression extends Expression {
    type: "UpdateExpression";
    operator: UpdateOperator;
    argument: Expression;
    prefix: boolean;
  }

  type UpdateOperator = "++" | "--";

  interface BinaryExpression extends Expression {
    type: "BinaryExpression";
    operator: BinaryOperator;
    left: Expression;
    right: Expression;
  }

  type BinaryOperator = "==" | "!=" | "===" | "!==" | "<" | "<=" | ">" | ">=" | "<<" | ">>" | ">>>" | "+" | "-" | "*" | "/" | "%" | "|" | "^" | "&" | "in" | "instanceof" | "**";

  interface AssignmentExpression extends Expression {
    type: "AssignmentExpression";
    operator: AssignmentOperator;
    left: Pattern;
    right: Expression;
  }

  type AssignmentOperator = "=" | "+=" | "-=" | "*=" | "/=" | "%=" | "<<=" | ">>=" | ">>>=" | "|=" | "^=" | "&=" | "**=";

  interface LogicalExpression extends Expression {
    type: "LogicalExpression";
    operator: LogicalOperator;
    left: Expression;
    right: Expression;
  }

  type LogicalOperator = "||" | "&&";

  interface MemberExpression extends Expression, Pattern {
    type: "MemberExpression";
    object: Expression | Super;
    property: Expression;
    computed: boolean;
  }

  interface ConditionalExpression extends Expression {
    type: "ConditionalExpression";
    test: Expression;
    alternate: Expression;
    consequent: Expression;
  }

  interface CallExpression extends Expression {
    type: "CallExpression";
    callee: Expression | Super;
    arguments: Array<Expression | SpreadElement>;
  }

  interface NewExpression extends Expression {
    type: "NewExpression";
    callee: Expression;
    arguments: Array<Expression | SpreadElement>;
  }

  interface SequenceExpression extends Expression {
    type: "SequenceExpression";
    expressions: Array<Expression>;
  }

  interface Pattern extends Node {}

  interface ForOfStatement extends ForInStatement {
    type: "ForOfStatement";
    await: boolean;
  }

  interface Super extends Node {
    type: "Super";
  }

  interface SpreadElement extends Node {
    type: "SpreadElement";
    argument: Expression;
  }

  interface ArrowFunctionExpression extends Function, Expression {
    type: "ArrowFunctionExpression";
    body: FunctionBody | Expression;
    expression: boolean;
    generator: false;
  }

  interface YieldExpression extends Expression {
    type: "YieldExpression";
    argument?: Expression | null;
    delegate: boolean;
  }

  interface TemplateLiteral extends Expression {
    type: "TemplateLiteral";
    quasis: Array<TemplateElement>;
    expressions: Array<Expression>;
  }

  interface TaggedTemplateExpression extends Expression {
    type: "TaggedTemplateExpression";
    tag: Expression;
    quasi: TemplateLiteral;
  }

  interface TemplateElement extends Node {
    type: "TemplateElement";
    tail: boolean;
    value: {
      cooked?: string | null;
      raw: string;
    };
  }

  interface AssignmentProperty extends Property {
    type: "Property";
    value: Pattern;
    kind: "init";
    method: false;
  }

  interface ObjectPattern extends Pattern {
    type: "ObjectPattern";
    properties: Array<AssignmentProperty | RestElement>;
  }

  interface ArrayPattern extends Pattern {
    type: "ArrayPattern";
    elements: Array<Pattern | null>;
  }

  interface RestElement extends Pattern {
    type: "RestElement";
    argument: Pattern;
  }

  interface AssignmentPattern extends Pattern {
    type: "AssignmentPattern";
    left: Pattern;
    right: Expression;
  }

  interface Class extends Node {
    id?: Identifier | null;
    superClass?: Expression | null;
    body: ClassBody;
  }

  interface ClassBody extends Node {
    type: "ClassBody";
    body: Array<MethodDefinition>;
  }

  interface MethodDefinition extends Node {
    type: "MethodDefinition";
    key: Expression;
    value: FunctionExpression;
    kind: "constructor" | "method" | "get" | "set";
    computed: boolean;
    static: boolean;
  }

  interface ClassDeclaration extends Class, Declaration {
    type: "ClassDeclaration";
    id: Identifier;
  }

  interface ClassExpression extends Class, Expression {
    type: "ClassExpression";
  }

  interface MetaProperty extends Expression {
    type: "MetaProperty";
    meta: Identifier;
    property: Identifier;
  }

  interface ModuleDeclaration extends Node {}

  interface ModuleSpecifier extends Node {
    local: Identifier;
  }

  interface ImportDeclaration extends ModuleDeclaration {
    type: "ImportDeclaration";
    specifiers: Array<ImportSpecifier | ImportDefaultSpecifier | ImportNamespaceSpecifier>;
    source: Literal;
  }

  interface ImportSpecifier extends ModuleSpecifier {
    type: "ImportSpecifier";
    imported: Identifier;
  }

  interface ImportDefaultSpecifier extends ModuleSpecifier {
    type: "ImportDefaultSpecifier";
  }

  interface ImportNamespaceSpecifier extends ModuleSpecifier {
    type: "ImportNamespaceSpecifier";
  }

  interface ExportNamedDeclaration extends ModuleDeclaration {
    type: "ExportNamedDeclaration";
    declaration?: Declaration | null;
    specifiers: Array<ExportSpecifier>;
    source?: Literal | null;
  }

  interface ExportSpecifier extends ModuleSpecifier {
    type: "ExportSpecifier";
    exported: Identifier;
  }

  interface AnonymousDefaultExportedFunctionDeclaration extends Function {
    type: "FunctionDeclaration";
    id: null;
  }

  interface AnonymousDefaultExportedClassDeclaration extends Class {
    type: "ClassDeclaration";
    id: null;
  }

  interface ExportDefaultDeclaration extends ModuleDeclaration {
    type: "ExportDefaultDeclaration";
    declaration: AnonymousDefaultExportedFunctionDeclaration | FunctionDeclaration | AnonymousDefaultExportedClassDeclaration | ClassDeclaration | Expression;
  }

  interface ExportAllDeclaration extends ModuleDeclaration {
    type: "ExportAllDeclaration";
    source: Literal;
  }

  interface AwaitExpression extends Expression {
    type: "AwaitExpression";
    argument: Expression;
  }
}
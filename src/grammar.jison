%{
    function toObject(array) {
        return array.reduce(function (obj, item) {
            obj[item.name] = item.value;
            return obj;
        }, Object.create(null));
    }

    function intf(name, props, base) {
        return {
            name: name,
            value: {
                kind: 'interface',
                props: props,
                base: base
            }
        };
    }
%}

/* lexical grammar */
%lex
%%
'//'.*                /* skip one-line comments */
'/*'[\s\S]*?'*/'      /* skip multi-line comments */
\s+                   /* skip whitespace */
'interface'           return 'INTERFACE'
'enum'                return 'ENUM'
'extend'              return 'EXTEND'
'"'.*?'"'             return 'STRING';
\d+                   return 'NUMBER';
'true'|'false'        return 'BOOLEAN';
'null'                return 'NULL';
[A-Za-z_][\w]*        return 'NAME';
[,;:[\]{}|]|'<:'      return yytext
<<EOF>>               return 'EOF'

/lex

/* operator associations and precedence */

%left ';'
%left ',' '|'

%start program

%ebnf

%% /* language grammar */

program
    : def* EOF { return toObject($$) }
    ;

def
    : EXTEND INTERFACE NAME object -> intf($NAME, $object, null)
    | INTERFACE NAME '<:' names object -> intf($NAME, $object, $names)
    | INTERFACE NAME object -> intf($NAME, $object, [])
    | ENUM NAME '{' enumBody '}' -> {name: $NAME, value: {kind: 'enum', values: $enumBody}}
    ;

names
    : names ',' NAME {
        $$.push($NAME);
    }
    | NAME -> [$NAME]
    ;

enumBody
    : enumBody '|' literal {
        $$.push($literal);
    }
    | literal -> [$literal]
    ;

object
    : '{' prop* '}' -> toObject($2)
    ;

prop
    : NAME ':' $type ';'? -> {name: $NAME, value: $type}
    ;

type
    : type '|' type {
      if ($$.kind !== 'union') $$ = {kind: 'union', types: [$$]};
      $$.types.push($type2);
    }
    | literal -> {kind: 'literal', value: $literal}
    | NAME -> {kind: 'reference', name: $NAME}
    | '[' type ']' -> {kind: 'array', base: $type}
    | object -> {kind: 'object', items: $object}
    ;

literal
    : STRING -> $STRING.slice(1, -1)
    | NUMBER -> Number($NUMBER)
    | BOOLEAN -> $BOOLEAN === 'true'
    | NULL -> null
    ;
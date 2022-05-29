var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[5,7,8,13],$V1=[1,16],$V2=[1,22],$V3=[9,16],$V4=[1,26],$V5=[1,27],$V6=[1,28],$V7=[1,29],$V8=[1,33],$V9=[14,17],$Va=[1,38],$Vb=[16,18],$Vc=[9,16,18,26,31],$Vd=[1,46],$Ve=[1,47],$Vf=[1,50];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"program":3,"program_repetition0":4,"EOF":5,"def":6,"EXTEND":7,"INTERFACE":8,"NAME":9,"<:":10,"names":11,"object":12,"ENUM":13,"{":14,"enumBody":15,"}":16,",":17,"|":18,"literal":19,"object_repetition0":20,"prop":21,":":22,"type":23,"prop_option0":24,"[":25,"]":26,"STRING":27,"NUMBER":28,"BOOLEAN":29,"NULL":30,";":31,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",7:"EXTEND",8:"INTERFACE",9:"NAME",10:"<:",13:"ENUM",14:"{",16:"}",17:",",18:"|",22:":",25:"[",26:"]",27:"STRING",28:"NUMBER",29:"BOOLEAN",30:"NULL",31:";"},
productions_: [0,[3,2],[6,6],[6,4],[6,5],[6,3],[6,6],[6,5],[11,3],[11,1],[15,3],[15,1],[12,3],[21,4],[23,3],[23,1],[23,1],[23,3],[23,1],[19,1],[19,1],[19,1],[19,1],[4,0],[4,2],[20,0],[20,2],[24,0],[24,1]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:

        return toObject(this.$, function (oldValue, newValue) {
            // Extend earlier found interface or return new one.
            if (oldValue.kind === 'interface' && newValue.kind === 'interface' && newValue.base === null) {
                Object.assign(oldValue.props, newValue.props);
                return oldValue;
            } else {
                return newValue;
            }
        });
    
break;
case 2: case 4:
this.$ = intf($$[$0-3], $$[$0], $$[$0-1]);
break;
case 3:
this.$ = intf($$[$0-1], $$[$0], null);
break;
case 5:
this.$ = intf($$[$0-1], $$[$0], []);
break;
case 6: case 7:
this.$ = {name: $$[$0-3], value: {kind: 'enum', values: $$[$0-1]}};
break;
case 8: case 10:

        this.$.push($$[$0]);
    
break;
case 9: case 11:
this.$ = [$$[$0]];
break;
case 12:
this.$ = toObject($$[$0-1]);
break;
case 13:
this.$ = {name: $$[$0-3], value: $$[$0-1]};
break;
case 14:

      if (this.$.kind !== 'union') this.$ = {kind: 'union', types: [this.$]};
      this.$.types.push($$[$0]);
    
break;
case 15:
this.$ = {kind: 'literal', value: $$[$0]};
break;
case 16:
this.$ = {kind: 'reference', name: $$[$0]};
break;
case 17:
this.$ = {kind: 'array', base: $$[$0-1]};
break;
case 18:
this.$ = {kind: 'object', items: $$[$0]};
break;
case 19:
this.$ = $$[$0].slice(1, -1);
break;
case 20:
this.$ = Number($$[$0]);
break;
case 21:
this.$ = $$[$0] === 'true';
break;
case 22:
this.$ = null;
break;
case 23: case 25:
this.$ = [];
break;
case 24: case 26:
$$[$0-1].push($$[$0]);
break;
}
},
table: [o($V0,[2,23],{3:1,4:2}),{1:[3]},{5:[1,3],6:4,7:[1,5],8:[1,6],13:[1,7]},{1:[2,1]},o($V0,[2,24]),{8:[1,8],13:[1,9]},{9:[1,10]},{9:[1,11]},{9:[1,12]},{9:[1,13]},{10:[1,14],12:15,14:$V1},{14:[1,17]},{10:[1,18],12:19,14:$V1},{14:[1,20]},{9:$V2,11:21},o($V0,[2,5]),o($V3,[2,25],{20:23}),{15:24,19:25,27:$V4,28:$V5,29:$V6,30:$V7},{9:$V2,11:30},o($V0,[2,3]),{15:31,19:25,27:$V4,28:$V5,29:$V6,30:$V7},{12:32,14:$V1,17:$V8},o($V9,[2,9]),{9:[1,36],16:[1,34],21:35},{16:[1,37],18:$Va},o($Vb,[2,11]),o($Vc,[2,19]),o($Vc,[2,20]),o($Vc,[2,21]),o($Vc,[2,22]),{12:39,14:$V1,17:$V8},{16:[1,40],18:$Va},o($V0,[2,4]),{9:[1,41]},o([5,7,8,9,13,16,18,26,31],[2,12]),o($V3,[2,26]),{22:[1,42]},o($V0,[2,7]),{19:43,27:$V4,28:$V5,29:$V6,30:$V7},o($V0,[2,2]),o($V0,[2,6]),o($V9,[2,8]),{9:$Vd,12:48,14:$V1,19:45,23:44,25:$Ve,27:$V4,28:$V5,29:$V6,30:$V7},o($Vb,[2,10]),o($V3,[2,27],{24:49,18:$Vf,31:[1,51]}),o($Vc,[2,15]),o($Vc,[2,16]),{9:$Vd,12:48,14:$V1,19:45,23:52,25:$Ve,27:$V4,28:$V5,29:$V6,30:$V7},o($Vc,[2,18]),o($V3,[2,13]),{9:$Vd,12:48,14:$V1,19:45,23:53,25:$Ve,27:$V4,28:$V5,29:$V6,30:$V7},o($V3,[2,28]),{18:$Vf,26:[1,54]},o($Vc,[2,14]),o($Vc,[2,17])],
defaultActions: {3:[2,1]},
parseError: function parseError (str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        var error = new Error(str);
        error.hash = hash;
        throw error;
    }
},
parse: function parse(input) {
    var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
            sharedState.yy[k] = this.yy[k];
        }
    }
    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);
    var ranges = lexer.options && lexer.options.ranges;
    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    _token_stack:
        var lex = function () {
            var token;
            token = lexer.lex() || EOF;
            if (typeof token !== 'number') {
                token = self.symbols_[token] || token;
            }
            return token;
        };
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push('\'' + this.terminals_[p] + '\'');
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = this.performAction.apply(yyval, [
                yytext,
                yyleng,
                yylineno,
                sharedState.yy,
                action[1],
                vstack,
                lstack
            ].concat(args));
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}};

    function toObject(array, resolveConflicts) {
        return array.reduce(function (obj, item) {
            var oldValue = obj[item.name];
            var newValue = item.value;
            if (oldValue && resolveConflicts) {
                newValue = resolveConflicts(oldValue, newValue);
            }
            obj[item.name] = newValue;
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

/* generated by jison-lex 0.3.4 */
var lexer = (function(){
var lexer = ({

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function(match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex () {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin (condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState () {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules () {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState (n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState (condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:/* skip one-line comments */
break;
case 1:/* skip multi-line comments */
break;
case 2:/* skip whitespace */
break;
case 3:return 8
break;
case 4:return 13
break;
case 5:return 7
break;
case 6:return 27;
break;
case 7:return 28;
break;
case 8:return 29;
break;
case 9:return 30;
break;
case 10:return 9;
break;
case 11:return yy_.yytext
break;
case 12:return 5
break;
}
},
rules: [/^(?:\/\/.*)/,/^(?:\/\*[\s\S]*?\*\/)/,/^(?:\s+)/,/^(?:interface\b)/,/^(?:enum\b)/,/^(?:extend\b)/,/^(?:".*?")/,/^(?:\d+)/,/^(?:true|false\b)/,/^(?:null\b)/,/^(?:[A-Za-z_][\w]*)/,/^(?:[,;:[\]{}|]|<:)/,/^(?:$)/],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
function Parser() { this.yy = {} };
Parser.prototype = parser;
parser.Parser = Parser;
export {parser, Parser};
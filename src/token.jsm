let idx = 1;

const TT_UNKNOWN = idx++;

// keywords
const KK_LET = idx++;
const KK_CONST = idx++;
const KK_CLASS = idx++;
const KK_FUNCTION = idx++;
const KK_IF = idx++;
const KK_ELSE = idx++;
const KK_NEW = idx++;
const KK_WHILE = idx++;
const KK_BREAK = idx++;
const KK_CONTINUE = idx++;
const KK_RETURN = idx++;

// preprocessor
const KK_INCLUDE = idx++;

// punctuators
const PP_LPAREN = idx++;
const PP_RPAREN = idx++;
const PP_LBRACK = idx++;
const PP_RBRACK = idx++;
const PP_LBRACE = idx++;
const PP_RBRACE = idx++;
const PP_DOT = idx++;
const PP_COLON = idx++;
const PP_COMMA = idx++;
const PP_SEMIC = idx++;

// operators
const OP_ASS = idx++;
const OP_ADD = idx++;
const OP_SUB = idx++;
const OP_MUL = idx++;
const OP_DIV = idx++;

// binary
const OP_OR = idx++;
const OP_AND = idx++;
const OP_NOT = idx++;
const OP_LT = idx++;
const OP_LTE = idx++;
const OP_GT = idx++;
const OP_GTE = idx++;
const OP_EQUAL = idx++;
const OP_NEQUAL = idx++;

const OP_BIN_OR = idx++;
const OP_BIN_AND = idx++;

const OP_ADD_ADD = idx++;
const OP_SUB_SUB = idx++;

const TT_NULL = idx++;
const TT_STRING = idx++;
const TT_NUMBER = idx++;
const TT_BOOLEAN = idx++;
const TT_IDENTIFIER = idx++;

const NN_PROGRAM = idx++;
const NN_UNKNOWN = idx++;
const NN_IF = idx++;
const NN_LET = idx++;
const NN_CONST = idx++;
const NN_FUNCTION = idx++;
const NN_UNARY_PREFIX_EXPRESSION = idx++;
const NN_UNARY_POSTFIX_EXPRESSION = idx++;
const NN_BINARY_EXPRESSION = idx++;
const NN_MEMBER_EXPRESSION = idx++;
const NN_COMPUTED_MEMBER_EXPRESSION = idx++;
const NN_OBJECT_EXPRESSION = idx++;
const NN_OBJECT_PROPERTY = idx++;
const NN_CALL_EXPRESSION = idx++;
const NN_WHILE = idx++;
const NN_RETURN = idx++;
const NN_BREAK = idx++;
const NN_CONTINUE = idx++;
const NN_LITERAL = idx++;
const NN_STRING_LITERAL = idx++;

// ## HALP METHODS ##

function isBlank(cc) {
  return (
    cc == 9 ||
    cc == 11 ||
    cc == 12 ||
    cc == 32 ||
    cc == 160
  );
};

function isQuote(cc) {
  return (
    cc == 39 ||
    cc == 34
  );
};

function isAlpha(cc) {
  return (
    cc >= 65 && cc <= 90 ||
    cc >= 97 && cc <= 122 ||
    cc == 95 || cc == 35
  );
};

function isNumber(cc) {
  return (
    cc >= 48 && cc <= 57
  );
};

function isBinaryOperator(token) {
  let kind = token.kind;
  return (
    (kind == OP_ASS ||
    kind == OP_ADD ||
    kind == OP_SUB ||
    kind == OP_MUL ||
    kind == OP_DIV ||
    kind == OP_OR ||
    kind == OP_AND ||
    kind == OP_NOT ||
    kind == OP_LT ||
    kind == OP_LTE ||
    kind == OP_GT ||
    kind == OP_GTE ||
    kind == OP_EQUAL ||
    kind == OP_NEQUAL ||
    kind == OP_BIN_OR ||
    kind == OP_BIN_AND) &&
    !isUnaryPrefixOperator(token)
  );
};

function isUnaryPrefixOperator(token) {
  let kind = token.kind;
  return (
    kind == OP_NOT ||
    kind == OP_ADD_ADD ||
    kind == OP_SUB_SUB
  );
};

function isUnaryPostfixOperator(token) {
  let kind = token.kind;
  return (
    kind == OP_ADD_ADD ||
    kind == OP_SUB_SUB
  );
};

function isLiteral(token) {
  let kind = token.kind;
  return (
    kind == TT_NULL ||
    kind == TT_STRING ||
    kind == TT_NUMBER ||
    kind == TT_BOOLEAN ||
    kind == TT_IDENTIFIER
  );
};

function processToken(tokens, value, line, column) {
  let kind = TT_UNKNOWN;
  // keywords
  if (value == "let") kind = KK_LET;
  else if (value == "new") kind = KK_NEW;
  else if (value == "const") kind = KK_CONST;
  else if (value == "class") kind = KK_CLASS;
  else if (value == "function") kind = KK_FUNCTION;
  else if (value == "if") kind = KK_IF;
  else if (value == "else") kind = KK_ELSE;
  else if (value == "while") kind = KK_WHILE;
  else if (value == "break") kind = KK_BREAK;
  else if (value == "continue") kind = KK_CONTINUE;
  else if (value == "return") kind = KK_RETURN;
  // preprocessor
  else if (value == "#include") kind = KK_INCLUDE;
  // boolean
  else if (value == "true" || value == "false") kind = TT_BOOLEAN;
  // null
  else if (value == "null") kind = TT_NULL;
  // punctuators
  else if (value == "(") kind = PP_LPAREN;
  else if (value == ")") kind = PP_RPAREN;
  else if (value == "[") kind = PP_LBRACK;
  else if (value == "]") kind = PP_RBRACK;
  else if (value == "{") kind = PP_LBRACE;
  else if (value == "}") kind = PP_RBRACE;
  else if (value == ".") kind = PP_DOT;
  else if (value == ":") kind = PP_COLON;
  else if (value == ",") kind = PP_COMMA;
  else if (value == ";") kind = PP_SEMIC;
  // operators
  else if (value == "!") kind = OP_NOT;
  else if (value == "=") kind = OP_ASS;
  else if (value == "+") kind = OP_ADD;
  else if (value == "-") kind = OP_SUB;
  else if (value == "*") kind = OP_MUL;
  else if (value == "/") kind = OP_DIV;
  else if (value == "<") kind = OP_LT;
  else if (value == "<=") kind = OP_LTE;
  else if (value == ">") kind = OP_GT;
  else if (value == ">=") kind = OP_GTE;
  else if (value == "|") kind = OP_BIN_OR;
  else if (value == "&") kind = OP_BIN_AND;
  else if (value == "==") kind = OP_EQUAL;
  else if (value == "!=") kind = OP_NEQUAL;
  else if (value == "||") kind = OP_OR;
  else if (value == "&&") kind = OP_AND;
  else if (value == "++") kind = OP_ADD_ADD;
  else if (value == "--") kind = OP_SUB_SUB;
  else kind = TT_IDENTIFIER;
  let token = createToken(kind, value, line, column-value.length);
  tokens.push(token);
  return (token);
};

function createToken(kind, value, line, column) {
  let token = {
    kind: kind,
    value: value,
    line: line,
    column: column
  };
  return (token);
};
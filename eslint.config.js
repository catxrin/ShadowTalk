import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,jsx}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off', //this is dumb, we don't need react everywhere
      'react/prop-types': 'off', // this fixes "missing prop validation error"
      'tailwindcss/no-custom-classname': 'off', // Ofc we will use custom classes

      'no-cond-assign': 2, // disallow assignment in conditional expressions
      'no-console': 1, // disallow use of console (off by default in the node environment)
      'no-debugger': 2, // disallow use of debugger
      'no-dupe-args': 2, // disallow duplicate arguments in functions
      'no-dupe-keys': 2, // disallow duplicate keys when creating object literals
      'no-empty': 2, // disallow empty statements
      'no-ex-assign': 2, // disallow assigning to the exception in a catch block
      'no-extra-parens': 0, // disallow unnecessary parentheses (off by default)
      'no-extra-semi': 2, // disallow unnecessary semicolons
      'no-invalid-regexp': 2, // disallow invalid regular expression strings in the RegExp constructor
      'no-control-regex': 0,
      'no-irregular-whitespace': 2, // disallow irregular whitespace outside of strings and comments
      'no-negated-in-lhs': 2, // disallow negation of the left operand of an in expression
      'no-unreachable': 2, // disallow unreachable statements after a return, throw, continue, or break statement
      'valid-typeof': 2, // Ensure that the results of typeof are compared against a valid string

      'guard-for-in': 2, // make sure for-in loops have an if statement (off by default)
      'no-eval': 2, // disallow use of eval()
      'no-extra-bind': 2, // disallow unnecessary function binding
      'no-fallthrough': 2, // disallow fallthrough of case statements
      'no-floating-decimal': 2, // disallow the use of leading or trailing decimal points in numeric literals (off by default)
      'no-implied-eval': 2, // disallow use of eval()-like methods
      'no-iterator': 2, // disallow usage of __iterator__ property
      'no-labels': 2, // disallow use of labeled statements
      'no-lone-blocks': 2, // disallow unnecessary nested blocks
      'no-multi-spaces': 2, // disallow use of multiple spaces
      'no-proto': 2, // disallow usage of __proto__ property
      'no-redeclare': 2, // disallow declaring the same variable more then once
      'no-return-assign': 2, // disallow use of assignment in return statement
      'no-script-url': 2, // disallow use of javascript: urls.
      'no-self-compare': 2, // disallow comparisons where both sides are exactly the same (off by default)
      'no-sequences': 2, // disallow use of comma operator
      'no-unused-expressions': 2, // disallow usage of expressions in statement position
      'no-void': 2, // disallow use of void operator (off by default)
      'vars-on-top': 2, // requires to declare all vars on top of their containing scope (off by default)
      'wrap-iife': 2, // require immediate function invocation to be wrapped in parentheses (off by default)
      yoda: 2, // require or disallow Yoda conditions

      'no-unused-vars': [1, { argsIgnorePattern: '^_', destructuredArrayIgnorePattern: '^_' }],
      // "no-use-before-define": 2
    },
  },
];

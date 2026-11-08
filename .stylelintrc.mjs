export default {
  extends: ['stylelint-config-standard-scss'],
  ignoreFiles: ['node_modules/**', 'dist/**', '.yarn/**'],
  rules: {
    'scss/dollar-variable-empty-line-before': [
      'always',
      {
        except: ['first-nested'],
        ignore: ['after-comment', 'inside-single-line-block', 'after-dollar-variable']
      }
    ],
    'selector-class-pattern': '^[A-Z][a-zA-Z0-9]*(?:__[a-z][a-z0-9-]*)?(?:_[a-z][a-z0-9-]*)?$',
    'selector-pseudo-class-no-unknown': [true, { ignorePseudoClasses: ['global', 'local'] }]
  }
};

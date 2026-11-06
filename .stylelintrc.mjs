export default {
  extends: ['stylelint-config-standard-scss'],
  ignoreFiles: ['node_modules/**', 'dist/**', '.yarn/**'],
  rules: {
    'selector-class-pattern': '^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$',
    'selector-pseudo-class-no-unknown': [true, { ignorePseudoClasses: ['global', 'local'] }]
  }
};

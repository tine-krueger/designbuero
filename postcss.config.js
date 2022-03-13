module.exports = {
    plugins: [
      'postcss-at-rules-variables',
      'postcss-import',
      [
        'postcss-each',
        {
          plugins: {
            beforeEach: [
              require('postcss-conditionals')
            ]
          }
        }
      ],
      'postcss-for',
      'postcss-conditionals',
      'postcss-custom-media',
      'postcss-nested-ancestors',
      'postcss-nested',
    ]
  }
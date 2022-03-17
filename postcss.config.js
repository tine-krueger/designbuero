module.exports = {
    plugins: [
      'postcss-at-rules-variables',
      'postcss-simple-vars',
      'postcss-import',
      // 'postcss-custom-properties',
      [
        'postcss-each',
        {
          plugins: {
            afterEach: [
              // require('postcss-nested'),
            ],
            beforeEach: [
              // require('postcss-nested'),
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
const processFiles = require('./process-files')

const stylusMixinsDefine = require('./plugins/mixins-define')

processFiles('./vars/css-mixins.styl', [stylusMixinsDefine])
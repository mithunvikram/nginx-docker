const sonarqubeScanner = require('sonarqube-scanner');
sonarqubeScanner({
  serverUrl: 'http://104.210.55.239:9000',
  options: {
    'sonar.sources': './src/app',
    'sonar.sourceEncoding': 'UTF-8',
    'sonar.exclusions': '**/node_modules/**,**/*.spec.ts,**/*.directive.ts',
    'sonar.tests': './src/app',
    'sonar.scm.disabled': 'false',
    'sonar.test.inclusions': '**/*.spec.ts',
    'sonar.ts.tslintconfigpath': 'tslint.json',
    'sonar.exclusions': '**/node_modules/**,**/*.spec.ts',
    'sonar.typescript.lcov.reportPaths': 'coverage/lcov.info',
    'sonar.typescript.exclusions': '**/node_modules/**,**/typings.d.ts,**/main.ts,**/environments/environment*.ts,**/*routing.module.ts,**/*.directive.ts'
  }
}, () => {});

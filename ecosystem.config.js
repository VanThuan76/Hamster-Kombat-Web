const argEnvIndex = process.argv.indexOf('--env');
let argEnv = (argEnvIndex !== -1 && process.argv[argEnvIndex + 1]) || 'env';

const RUN_ENV_MAP = {
  env: {
    instances: 4,
    max_memory_restart: '1G',
  },
};

if (!(argEnv in RUN_ENV_MAP)) {
  argEnv = 'env';
}

module.exports = {
  apps: [
    {
      name: 'lion_king_app',
      exec_mode: 'cluster',
      instances: 2,
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3001',
      watch: false,
      max_memory_restart: '250M',
      env: {
        APP_ENV: 'production',
        PORT: 3001,
      },
    },
  ],
};

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
      instances: RUN_ENV_MAP[argEnv].instances,
      script: 'pnpm',
      args: 'run dev',
      cwd: './app/docs',
      watch: false,
      max_memory_restart: RUN_ENV_MAP[argEnv].max_memory_restart,
      env: {
        APP_ENV: argEnv,
        NODE_ENV: 'production',
      },
    },
  ],
};

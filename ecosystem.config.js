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
      namespace: 'lion_king_app',
      name: 'docs',
      script: 'pnpm',
      args: 'start --port 3001',
      cwd: './apps/docs',
      watch: false,
      env: {
        PORT: 3001,
        NODE_ENV: argEnv,
      },
      exec_mode: 'cluster',
      instances: RUN_ENV_MAP[argEnv].instances,
      max_memory_restart: RUN_ENV_MAP[argEnv].max_memory_restart,
    },
  ],
};

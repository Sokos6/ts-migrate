import path from 'path';
import { forkTSServer, migrate, MigrateConfig } from 'ts-migrate-server';

import examplePluginTs from './example-plugin-ts';
import examplePluginText from './example-plugin-text';
import examplePluginJscodeshift from './example-plugin-jscodeshift';

// it will change content of the index.ts in the input folder
async function runMigration() {
  const inputDir = path.resolve(__dirname, 'input');
  const server = forkTSServer();

  process.on('exit', () => {
    server.kill();
  });

  const config = new MigrateConfig()
    .addPlugin(examplePluginJscodeshift, {})
    .addPlugin(examplePluginTs, { shouldReplaceText: true })
    .addPlugin(examplePluginText, {});

  const exitCode = await migrate({ rootDir: inputDir, config, server });

  server.kill();
  process.exit(exitCode);
}

runMigration();

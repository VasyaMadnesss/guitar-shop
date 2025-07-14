#!/usr/bin/env node
import {
  CLIApplication,
  HelpCommand,
  SeedCommand
} from './cli/index.js';

function bootstrap() {
  const cliApplication = new CLIApplication();
  cliApplication.registerCommands([
    new HelpCommand(),
    new SeedCommand(),
  ]);

  cliApplication.processCommand(process.argv);
}

bootstrap();


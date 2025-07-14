import { Command } from './command.interface.js';

export class HelpCommand implements Command {
  public getName(): string {
    return '--help';
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async execute(..._parameters: string[]): Promise<void> {
    console.info(`
        Программа для подготовки данных для REST API сервера.
        Пример:
            npx nx run cli-app:serve -- --<command> [--arguments]
        Команды:
            --help:                      # печатает этот текст
            --seed:                    # наполняет базу данных тестовыми данными
    `);
  }
}

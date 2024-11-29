import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppModule } from './app.module';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });

    it('testing groupBy"', () => {
      const tableData = [
        { code: 'BRA', cases: 5 },
        { code: 'CAN', cases: 3 },
      ];

      const grouped = Object.groupBy(tableData, (row) => row['code']);
      console.log('🚀 | it | grouped:', grouped);

      expect(grouped['BRA']?.[0].cases).toEqual(5);
    });
  });
});

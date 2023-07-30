import { Prisma } from '@prisma/client';
import { DateRange } from '@utils';

export const PrismaDateRangeComparator = {
  dateInsideRange: (
    dateRange?: Partial<DateRange>,
  ): Prisma.DateTimeFilter | undefined =>
    dateRange?.start || dateRange?.end
      ? {
          gte: dateRange?.start,
          lt: dateRange?.end,
        }
      : undefined,
};

import db from "@/lib/db";
import { mockDeep, mockReset } from "vitest-mock-extended";

const prisma = mockDeep<typeof db>();

beforeEach(() => {
  mockReset(prisma);
});

export default prisma;

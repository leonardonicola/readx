vi.mock("@/lib/db", async () => {
  const actual =
    await vi.importActual<typeof import("./prisma.mock")>("./prisma.mock");
  return {
    ...actual
  };
});

vi.mock("@/lib/logger", () => ({
  logger: { error: vi.fn() }
}));

vi.mock("@clerk/nextjs/server", () => ({
  auth: vi.fn()
}));

beforeEach(() => {
  vi.clearAllMocks();
});

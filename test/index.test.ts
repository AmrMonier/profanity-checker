import { Filter } from "../src";
describe("test profanity", () => {
  it("return false English", () => {
    const filter = new Filter();
    expect(filter.isProfane("he is going home")).toBe(false);
  });
  it("return true English", () => {
    const filter = new Filter();
    expect(filter.isProfane("he is going fucking home")).toBe(true);
  });

  it("return false Arabic", () => {
    const filter = new Filter({ languages: ["arabic"] });

    expect(filter.isProfane("ذهب محمد الى الحديقة")).toBe(false);
  });
  it("return true Arabic", () => {
    const filter = new Filter({ languages: ["arabic"] });

    expect(filter.isProfane("الراجل بتاع السوبر ماركت معرص")).toBe(true);
  });
});

import Footer from "@/components/base/footer";
import { render, screen } from "@testing-library/react";
import dayjs from "dayjs";

describe("base/Footer", () => {
  it("should render correctly", () => {
    render(<Footer />);
    const currYear = dayjs().year();
    expect(screen.getByTestId("footer").textContent).toEqual(
      `© Copyright ${currYear} Readx.`
    );
  });
});

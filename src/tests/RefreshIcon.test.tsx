import { render } from "@testing-library/react";
import { RefreshIcon } from "../components/RefreshIcon";

describe("RefreshIcon", () => {
    it("renders the RefreshIcon component", () => {
        const { container } = render(<RefreshIcon />);
        expect(container.querySelector("svg")).toBeInTheDocument();
    });
});

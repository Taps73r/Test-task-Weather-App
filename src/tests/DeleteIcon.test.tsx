import { render } from "@testing-library/react";
import { DeleteIcon } from "../components/DeleteIcon";

describe("DeleteIcon", () => {
    it("renders the DeleteIcon component", () => {
        const { container } = render(<DeleteIcon />);
        expect(container.querySelector("svg")).toBeInTheDocument();
    });
});

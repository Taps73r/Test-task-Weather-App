import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { AddCityModal } from "../components/AddCityModal";
import { useDispatch, useSelector } from "react-redux";
import { weatherThunk } from "../store/thunk/weatherThunk";
import { AppDispatch } from "../store/store";
import { useDisclosure } from "@nextui-org/react";

jest.mock("react-redux", () => ({
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
}));

jest.mock("../store/thunk/weatherThunk", () => ({
    weatherThunk: jest.fn(),
}));

jest.mock("@nextui-org/react", () => ({
    ...jest.requireActual("@nextui-org/react"),
    useDisclosure: jest.fn(),
}));

describe("AddCityModal", () => {
    const mockDispatch = jest.fn();
    const mockUseDisclosure = {
        isOpen: false,
        onOpen: jest.fn(),
        onOpenChange: jest.fn(),
        onClose: jest.fn(),
    };

    beforeEach(() => {
        jest.clearAllMocks();
        (useDispatch as unknown as jest.Mock<AppDispatch>).mockReturnValue(
            mockDispatch
        );
        (useSelector as unknown as jest.Mock).mockReturnValue(null);
        (useDisclosure as jest.Mock).mockReturnValue(mockUseDisclosure);
    });

    test("renders AddCityModal button and modal components", () => {
        render(<AddCityModal />);

        expect(screen.getByText("Add city")).toBeInTheDocument();
    });

    test("opens modal when 'Add city' button is clicked", () => {
        render(<AddCityModal />);

        fireEvent.click(screen.getByText("Add city"));

        expect(mockUseDisclosure.onOpen).toHaveBeenCalled();
    });

    test("closes modal when 'Close' button is clicked", async () => {
        (useDisclosure as jest.Mock).mockReturnValue({
            ...mockUseDisclosure,
            isOpen: true,
        });

        render(<AddCityModal />);

        fireEvent.click(screen.getByText("Close"));

        expect(mockUseDisclosure.onClose).toHaveBeenCalled();
    });

    test("dispatches weatherThunk action and closes modal on successful submission", async () => {
        const mockCityName = "New York";

        (useDisclosure as jest.Mock).mockReturnValue({
            ...mockUseDisclosure,
            isOpen: true,
        });

        render(<AddCityModal />);

        fireEvent.change(screen.getByPlaceholderText("Enter city name"), {
            target: { value: mockCityName },
        });

        fireEvent.click(screen.getByRole("button", { name: /Add city/i }));

        expect(mockDispatch).toHaveBeenCalledWith(weatherThunk(mockCityName));

        await waitFor(() => {
            expect(mockUseDisclosure.onClose).toHaveBeenCalled();
        });
    });

    test("displays error message when there is an error", () => {
        (useSelector as unknown as jest.Mock).mockReturnValue("Invalid city");

        (useDisclosure as jest.Mock).mockReturnValue({
            ...mockUseDisclosure,
            isOpen: true,
        });

        render(<AddCityModal />);

        expect(
            screen.getByText("Invalid city. Enter valid city name.")
        ).toBeInTheDocument();
    });
});

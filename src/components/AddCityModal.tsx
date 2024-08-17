import { useState, useEffect } from "react";
import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
} from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { weatherThunk } from "../store/thunk/weatherThunk";
import { AppDispatch, RootState } from "../store/store";

export function AddCityModal() {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    const dispatch = useDispatch<AppDispatch>();

    const [cityName, setCityName] = useState("");
    const [loading, setLoading] = useState(false);

    const error = useSelector(
        (state: RootState) => state.citiesWeatherReducer.error
    );

    useEffect(() => {
        if (!loading && !error) {
            onClose();
            setCityName("");
        }
    }, [loading, error, onClose]);

    const submitCity = () => {
        setLoading(true);
        dispatch(weatherThunk(cityName)).finally(() => setLoading(false));
    };

    return (
        <>
            <div className="flex flex-row justify-end p-4">
                <Button onPress={onOpen} color="primary">
                    Add city
                </Button>
            </div>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Add city
                            </ModalHeader>
                            <ModalBody>
                                <Input
                                    autoFocus
                                    label="City"
                                    placeholder="Enter city name"
                                    variant="bordered"
                                    value={cityName}
                                    onChange={(e) =>
                                        setCityName(e.target.value)
                                    }
                                    disabled={loading}
                                />
                                {error && (
                                    <p className="text-red-500 mt-2">{error}. Enter valid city name.</p>
                                )}
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="danger"
                                    variant="flat"
                                    onPress={onClose}
                                    disabled={loading}
                                >
                                    Close
                                </Button>
                                <Button
                                    color="primary"
                                    onPress={submitCity}
                                    isLoading={loading}
                                >
                                    Add city
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

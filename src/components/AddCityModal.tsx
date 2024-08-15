import { useState } from "react";
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
import { useDispatch } from "react-redux";
import { fetchWeather } from "../store/thunk/fetchWeather";
import { AppDispatch } from "../store/store";

export function AddCityModal() {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    const dispatch = useDispatch<AppDispatch>();

    const [cityName, setCityName] = useState("");

    const submitCity = () => {
        dispatch(fetchWeather(cityName));
        onClose();
        setCityName("");
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
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="danger"
                                    variant="flat"
                                    onPress={onClose}
                                >
                                    Close
                                </Button>
                                <Button color="primary" onPress={submitCity}>
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

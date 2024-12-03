import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalCloseButton,
    Button,
} from '@chakra-ui/react'
import React, { ReactNode } from 'react'

interface IProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    title: string;
    cancelTxt?: string;
    okTxt?: string;
    variant?: "solid" | "outline" | "ghost" | "link";
    colorScheme?: "gray" | "red" | "orange" | "yellow" | "green" | "teal" | "blue" | "pink";
    children: ReactNode;
    onOkClick: () => void;
    isLoading: boolean;
}

const CustomModal = ({
    isOpen, 
    onClose, 
    title, 
    cancelTxt = "Cancel", 
    okTxt= "Done", 
    variant= "solid", 
    colorScheme = "gray", 
    children,
    onOkClick,
    isLoading,
} : IProps) => {
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    return (
        <>
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                
                <ModalOverlay 
                    backdropFilter='auto'
                    backdropBlur='2px'
                />
                <ModalContent>
                    <ModalHeader>{title}</ModalHeader>
                    <ModalCloseButton />

                    {children}
        
                    <ModalFooter>
                        <Button     
                            onClick={onOkClick}
                            colorScheme={colorScheme}
                            variant={variant} 
                            mr={3}
                            isLoading={isLoading}
                        >
                            {okTxt}
                        </Button>
                        <Button onClick={onClose}>
                            {cancelTxt}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default CustomModal;
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
    Button,
} from '@chakra-ui/react'
import React from 'react'

interface IProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    title: string;
    description: string;
    cancelTxt?: string;
    okTxt?: string;
    variant?: "solid" | "outline" | "ghost" | "link";
    colorScheme?: "gray" | "red" | "orange" | "yellow" | "green" | "teal" | "blue" | "pink";
}

export default function CustomAlertDialog({isOpen, onOpen, onClose, title, description, cancelTxt = "Cancel", okTxt= "Yes", variant= "solid", colorScheme = "gray" } : IProps) {
    const cancelRef = React.useRef()

    return (
        <>
            <AlertDialog
                motionPreset='slideInBottom'
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isOpen={isOpen}
                isCentered
            >
                <AlertDialogOverlay />
        
                <AlertDialogContent>
                    <AlertDialogHeader>{title}</AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>
                        {description}
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            {cancelTxt}
                        </Button>
                        <Button colorScheme={colorScheme} ml={3} variant={variant}>
                            {okTxt}
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
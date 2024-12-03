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
    onOkHandler?: (id: string) => void
    isLoading?: boolean;

}

const CustomAlertDialog = ({
    isOpen, 
    onClose, 
    title, 
    description, 
    cancelTxt = "Cancel", 
    okTxt= "Yes", 
    variant= "solid", 
    colorScheme = "gray", 
    onOkHandler, 
    isLoading,
} : IProps) => {
    const cancelRef = React.useRef(null)

    return (
        <>
            <AlertDialog
                motionPreset='slideInBottom'
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isOpen={isOpen}
                isCentered
            >
                <AlertDialogOverlay
                    backdropFilter='auto'
                    backdropBlur='2px'
                />
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
                        <Button colorScheme={colorScheme} ml={3} variant={variant} onClick={onOkHandler} isLoading={isLoading}>
                            {okTxt}
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

export default CustomAlertDialog;
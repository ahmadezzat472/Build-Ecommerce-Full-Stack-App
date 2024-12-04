import { useToast } from "@chakra-ui/react";
import { ReactNode, useEffect, useRef, useState } from "react";
import { CiWifiOff } from "react-icons/ci";

interface IProps {
    children: ReactNode
}

const InternetConnectionProvider = ({children}: IProps) => {
    const [isOnline, setIsOnline] = useState<boolean>(true) 
    const toast = useToast()
    const toastIdRef = useRef<string | number | undefined>(undefined)

    function addToast() {
        toastIdRef.current = toast({
            title: "You are offline.",
            description: "Please check your internet connection.",
            status: "warning",
            duration: null,
            isClosable: true,
            icon: <CiWifiOff />,
        });
    }
    
    const closeAll = () => toast.closeAll();
    
    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);
    
        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);
    
        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);
    
    useEffect( () => {
        if (!isOnline) {
            addToast();
        } else {
            closeAll();
        }
    }, [isOnline]);
    
    return (
        <>{children}</>
    );
}

export default InternetConnectionProvider;

    // function addToast() {
    //     toastIdRef.current = toast({
    //         title: 'Account created.',
    //         description: "We've created your account for you.",
    //         status: 'warning',
    //         duration: null,
    //         isClosable: true,
    //         icon: <CiWifiOff />,
    //     })
    // }

    // const closeAll = () => toast.closeAll()

    // useEffect( () => {
    //     // ** navigator.onLine => if online return true else return false
    //     setIsOnline(navigator.onLine) 
    // }, [])

    // window.addEventListener("online", () => setIsOnline(true))
    // window.addEventListener("offline", () => setIsOnline(false))

    // if (!isOnline) {
    //     addToast();
    //     return <>{children}</>;
    // }

    // return (
    //     children
    // )

import { useToast } from "@chakra-ui/react";
import { ReactNode, useEffect, useRef } from "react";
import { CiWifiOff } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { networkMode } from "../app/features/networkSlice";

interface IProps {
    children: ReactNode
}

const InternetConnectionProvider = ({children}: IProps) => {
    const toast = useToast()
    const toastIdRef = useRef<string | number | undefined>(undefined)
    const dispatch = useDispatch();

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
    const handleOnline = () => {
        dispatch(networkMode(true))
        closeAll();
    }
    const handleOffline = () => {
        dispatch(networkMode(false))
        addToast();
    }

    useEffect(() => {
        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);
    
        // ** cleanup
        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);
    
    return children;
}

export default InternetConnectionProvider;

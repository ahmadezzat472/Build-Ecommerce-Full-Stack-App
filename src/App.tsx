import { RouterProvider } from "react-router-dom";
import router from "./router";
// import { ColorModeProvider } from "@/components/ui/color-mode"
// import { Theme } from "@chakra-ui/react"


function App() {

    return (
        <>  
            {/* <ColorModeProvider forcedTheme="dark">
                <Theme appearance="dark"> */}
                    <RouterProvider router={router} />
                {/* </Theme>
            </ColorModeProvider> */}
            
        </>
    )
}

export default App;

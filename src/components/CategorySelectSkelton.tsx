import { Skeleton, Stack, } from "@chakra-ui/react"


const CategorySelectSkelton = () => {
    return (
        <Stack
            justifyContent="center"
            alignItems={"center"}
            border={"1px solid #ffffff29"}
            rounded={"md"}
            p={3}
        >
            <Skeleton height="10px" width={"250px"} />
        </Stack>
    )
}

export default CategorySelectSkelton;
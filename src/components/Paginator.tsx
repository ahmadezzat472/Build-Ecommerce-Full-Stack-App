import { Box, Text, Button, Icon, Tabs, TabList, Tab, Badge } from "@chakra-ui/react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { ICategory } from "../interfaces";

interface IProps {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    isLoading: boolean;
    onClickPrev: () => void;
    onClickNext: () => void;
    data?: ICategory[];
    setCategoryClickedId?: (catId: string) => void;
}

const Paginator = ({
    currentPage,
    totalPages,
    isLoading,
    pageSize,
    onClickPrev,
    onClickNext,
    data: categories,
    setCategoryClickedId,
}: IProps) => {
    
    return (
        <Box display="flex" justifyContent="center" alignItems="center" mb={"70px"} mt={30}>
            <Text fontSize="sm" color="gray.600" mx={3}>
                Page{" "}
                <Text as="span" mx={1} fontWeight="semibold" >
                    <Badge colorScheme="green">{currentPage}</Badge>
                </Text> 
                {" "}to{" "}
                <Text as="span" mx={1} fontWeight="semibold" >
                    <Badge colorScheme="green">{totalPages == 0 ? 1 : totalPages}</Badge>
                </Text> 
                {" "}of{" "}
                <Text as="span" mx={1} fontWeight="semibold" >
                    <Badge colorScheme="green">{totalPages == 0 ? 0 : pageSize}</Badge>
                </Text> 
                {" "}Records
            </Text>

            <Button
                bg="gray.800"
                color="white"
                borderRadius="md"
                borderRight="1px"
                borderColor="gray.100"
                display="flex"
                alignItems="center"
                justifyContent="center"
                px={4}
                h={10}
                fontSize="base"
                fontWeight="medium"
                mr={3}
                _hover={{ bg: "indigo.600", color: "white" }}
                _disabled={{ bg: "gray.400", cursor: "not-allowed", _hover: { bg: "gray.400" } }}
                disabled={currentPage <= 1 || isLoading}
                onClick={onClickPrev}
            >
                <Icon as={IoIosArrowBack} w={4} h={4} mr={2} />
                Previous
            </Button>

            {
                categories && setCategoryClickedId && (
                    <Tabs variant='soft-rounded' colorScheme='green'>
                        <TabList>
                            <Tab onClick={() => setCategoryClickedId('')}>
                                All
                            </Tab>
                            {
                                categories.map( (cat) => 
                                    <Tab 
                                        key={cat.id}
                                        onClick={() => setCategoryClickedId(cat.id)}
                                    >
                                        {cat.name}
                                    </Tab>
                                )
                            }
                        </TabList>
                    </Tabs>
                )
            }

            <Button
                bg="gray.800"
                color="white"
                borderRadius="md"
                borderRight="1px"
                borderColor="gray.100"
                display="flex"
                alignItems="center"
                justifyContent="center"
                px={4}
                h={10}
                fontSize="base"
                fontWeight="medium"
                ml={3}
                _hover={{ bg: "indigo.600", color: "white" }}
                _disabled={{ bg: "gray.400", cursor: "not-allowed", _hover: { bg: "gray.400" } }}
                disabled={currentPage === totalPages || totalPages === 0 || isLoading}
                onClick={onClickNext}
            >
                Next
                <Icon as={IoIosArrowForward} w={4} h={4} mr={2} />
            </Button>
        </Box>
    )
}

export default Paginator;
import { useGetProductSliceQuery } from '../../app/services/productsSlice'
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Button,
    Image,
    useDisclosure,
    ButtonGroup,
} from '@chakra-ui/react'
import { IProduct } from '../../interfaces'
import ProductTableSkelton from '../../components/ProductTableSkelton'
import CustomAlertDialog from '../../components/AlertDialog'
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoEyeOutline } from 'react-icons/io5'
import { FaPen } from 'react-icons/fa6'


const DashboardProducts = () => {
    /* ___________________ State ___________________ */
    const serverUrl = import.meta.env.VITE_SERVER_URL
    const {isLoading, data, error, isError} = useGetProductSliceQuery({})
    const { isOpen, onOpen, onClose } = useDisclosure()


    if(isLoading) {
        return <ProductTableSkelton />
    }

    if (isError) {
        return <p>{error.data?.error?.message}</p>;
    }

    return (
        <>
            <TableContainer>
                <Table variant='simple'>
                    <TableCaption>Imperial to metric conversion factors</TableCaption>
                    <Thead >
                        <Tr >
                            <Th textAlign={"center"}>ID</Th>
                            <Th textAlign={"center"}>Title</Th>
                            <Th textAlign={"center"}>Category</Th>
                            <Th textAlign={"center"}>Thumbnail</Th>
                            <Th textAlign={"center"} >Price</Th>
                            <Th textAlign={"center"} >Stock</Th>
                            <Th textAlign={"center"}>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            data.data.map( (product: IProduct) => (
                                <Tr key={product.id} >
                                    <Td textAlign={"center"}>{product.id}</Td>
                                    <Td textAlign={"center"}>{product.title}</Td>
                                    <Td textAlign={"center"}>{product.category.title}</Td>
                                    <Td display='flex'
                                        alignItems='center'
                                        justifyContent='center'
                                    >
                                        <Image 
                                            borderRadius={"full"}
                                            objectFit={"cover"}
                                            boxSize={"40px"}
                                            alt={product.title}
                                            src={`${serverUrl}${product.thumbnail.url}`}
                                        />
                                    </Td>
                                    <Td textAlign={"center"}>{product.price}</Td>
                                    <Td textAlign={"center"}>{product.stock}</Td>
                                    <Td textAlign={"center"} gap={5}>
                                        <ButtonGroup>
                                            <Button colorScheme='purple'>
                                                <IoEyeOutline />
                                            </Button>
                                            <Button colorScheme='red' onClick={onOpen}>
                                                <RiDeleteBin6Line /> 
                                            </Button>
                                            <Button colorScheme='orange'>
                                                <FaPen />
                                            </Button>
                                        </ButtonGroup>
                                    </Td>
                                </Tr>
                            ))
                        }
                        
                    </Tbody>
                    <Tfoot>
                        <Tr>
                            <Th>To convert</Th>
                            <Th>into</Th>
                            <Th isNumeric>multiply by</Th>
                        </Tr>
                    </Tfoot>
                </Table>
            </TableContainer>
            <CustomAlertDialog 
                isOpen={isOpen} 
                onOpen={onOpen} 
                onClose={onClose} 
                title={"Discard Changes?"} 
                description={"Are you sure you want to Delete Product"}
                okTxt='Destroy'
                colorScheme="red"
            />
        </>
    )
}

export default DashboardProducts;
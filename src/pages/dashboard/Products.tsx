import { useDeleteProductSliceMutation, useGetProductSliceQuery } from '../../app/services/productsSlice'
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
    ModalBody,
    FormControl,
    Input,
    FormLabel,
    Textarea,
    NumberInput,
    NumberInputStepper,
    NumberInputField,
    NumberIncrementStepper,
    NumberDecrementStepper,
} from '@chakra-ui/react'
import { IProduct } from '../../interfaces'
import ProductTableSkelton from '../../components/ProductTableSkelton'
import CustomAlertDialog from '../../components/AlertDialog'
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoEyeOutline } from 'react-icons/io5'
import { FaPen } from 'react-icons/fa6'
import { useEffect, useState } from 'react'
import CustomModal from '../../components/Modal'
import React from 'react'

export interface IDefaultProduct {
    documentId: string;
    title: string;
    description: string;
    price: number;
    stock: number;
    category: {
        title: string;
    };
    thumbnail: File | undefined;
} 

const defaultProduct = {
    documentId: "",
    title: "",
    description: "",
    price: 0,
    stock: 0,
    category: {
        title: "",
    },
    thumbnail: undefined,
}

const DashboardProducts = () => {
    /* ___________________ State ___________________ */
    const serverUrl = import.meta.env.VITE_SERVER_URL
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen:isOpenModal , onOpen:onOpenModal, onClose:onCloseModal } = useDisclosure()
    const {isLoading, data, error, isError} = useGetProductSliceQuery({})
    const [ dispatchDeleteProduct, {isLoading: isLoadingDelete, isSuccess} ] = useDeleteProductSliceMutation()
    const [productClickedId, setProductClickedId] = useState<string>("")
    const [productClickedEdit, setProductClickedEdit] = useState<IDefaultProduct>(defaultProduct)

    useEffect( () => {
        if(isSuccess){
            setProductClickedId("")
            onClose()
        }
    }, [isSuccess])

    const onChangeHandler: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
        const {name, value} = event.target
        setProductClickedEdit({...productClickedEdit, [name]: value})
    }

    const onChangeHandlerPrice = (_valueAsString: string, valueAsNumber: number): void => {
        setProductClickedEdit({...productClickedEdit, price: valueAsNumber})
    }

    const onChangeHandlerStock = (_valueAsString: string, valueAsNumber: number): void => {
        setProductClickedEdit({...productClickedEdit, stock: valueAsNumber})
    }

    
    const thumbnailHandler: React.ChangeEventHandler<HTMLInputElement>= (e) => {
        const value = e.target.files?.[0];
        setProductClickedEdit({...productClickedEdit, thumbnail:value })
    }
    
    const submitUpdateHandler = () => {
        console.log(productClickedEdit);
        
    }

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
                                            <Button 
                                                colorScheme='red' 
                                                onClick={() => {
                                                    setProductClickedId(product.documentId)
                                                    onOpen()
                                                }}>
                                                <RiDeleteBin6Line /> 
                                            </Button>
                                            <Button 
                                                colorScheme='orange'
                                                onClick={() => {
                                                    setProductClickedEdit(product)
                                                    onOpenModal()
                                                }}
                                            >
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
                onOkHandler={() => dispatchDeleteProduct(productClickedId)}
                isLoading= {isLoadingDelete}
            />

            <CustomModal 
                isOpen={isOpenModal} 
                onOpen={onOpenModal} 
                onClose={onCloseModal} 
                title={"Update Product"} 
                okTxt='Updated'
                colorScheme="blue"
                onOkClick={submitUpdateHandler}
            >
                <ModalBody as={"form"} pb={6}>
                    <FormControl>
                        <FormLabel>Title</FormLabel>
                        <Input  
                            name='title' 
                            value={productClickedEdit.title} 
                            onChange={onChangeHandler}  
                        />
                    </FormControl>
        
                    <FormControl mt={4}>
                        <FormLabel>Description</FormLabel>
                        <Textarea 
                            placeholder='Here is a sample placeholder' 
                            name='description' 
                            value={productClickedEdit.description} 
                            onChange={onChangeHandler} 
                        />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Price</FormLabel>
                        <NumberInput name='price' defaultValue={productClickedEdit.price} onChange={onChangeHandlerPrice}>
                            <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Stock</FormLabel>
                        <NumberInput name='stock' defaultValue={productClickedEdit.stock} onChange={onChangeHandlerStock}>
                            <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </FormControl>

                    <FormControl>
                        <FormLabel>Thumbnail</FormLabel>
                        <Input 
                            name='thumbnail'    
                            // value={productClickedEdit.title} 
                            type='file' 
                            p={2} 
                            accept='image/png, image/gif, image/jpeg'  
                            onChange={thumbnailHandler}
                        />
                    </FormControl>
                </ModalBody>
            </CustomModal>
        </>
    )
}

export default DashboardProducts;
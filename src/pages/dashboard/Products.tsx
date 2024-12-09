import { useAddProductSliceMutation, useDeleteProductSliceMutation, useGetProductSliceQuery, useUpdateProductSliceMutation } from '../../app/services/productsSlice'
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
import { selectNetwork } from '../../app/features/networkSlice'
import { useSelector } from 'react-redux'


const defaultProduct: IProduct = {
    id: "",
    name: "",
    description: "",
    price: 0,
    avaliableItems: 0,
    category: "",
    images: {
        url: "",
    },
    defaultImage:{
        url: "",
    }
}

const DashboardProducts = () => {
    /* ___________________ State ___________________ */
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen:isOpenModal , onOpen:onOpenModal, onClose:onCloseModal } = useDisclosure()
    const { isOpen:isOpenModalAdd , onOpen:onOpenModalAdd, onClose:onCloseModalAdd } = useDisclosure()
    const {isLoading, data, isError} = useGetProductSliceQuery({})
    const [ dispatchDeleteProduct, {isLoading: isLoadingDelete, isSuccess: isSuccessDelete} ] = useDeleteProductSliceMutation()
    const [ dispatchUpdateProduct, {isLoading: isLoadingUpdate, isSuccess: isSuccessUpdate} ] = useUpdateProductSliceMutation()
    const [ dispatchAddProduct, {isLoading: isLoadingAdd, isSuccess: isSuccessAdd} ] = useAddProductSliceMutation()
    const [productClickedId, setProductClickedId] = useState<string>("")
    const [productClickedEdit, setProductClickedEdit] = useState<IProduct>(defaultProduct)
    const [subImagesProduct, setSubImagesProduct] = useState<File>()
    const [defaultImageProduct, setDefaultImageProduct] = useState<File>()
    const { isOnline } = useSelector(selectNetwork)
    


    useEffect( () => {
        if(isSuccessDelete){
            setProductClickedId("")
            onClose()
        }

        if(isSuccessUpdate){
            setProductClickedEdit(defaultProduct)
            onCloseModal()
        }

        if(isSuccessAdd){
            setProductClickedEdit(defaultProduct)
            onCloseModalAdd()
        }
    }, [isSuccessDelete, isSuccessUpdate])

    const onChangeHandler: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
        const {name, value} = event.target
        setProductClickedEdit({...productClickedEdit, [name]: value})
    }

    const onChangeHandlerPrice = (_valueAsString: string, valueAsNumber: number): void => {
        setProductClickedEdit({...productClickedEdit, price: valueAsNumber})
    }

    const onChangeHandlerStock = (_valueAsString: string, valueAsNumber: number): void => {
        setProductClickedEdit({...productClickedEdit, avaliableItems: valueAsNumber})
    }

    
    const subImagesHandler: React.ChangeEventHandler<HTMLInputElement>= (e) => {
        const value = e.target.files?.[0];
        setSubImagesProduct(value)
    }

    const defaultImageHandler: React.ChangeEventHandler<HTMLInputElement>= (e) => {
        const value = e.target.files?.[0];
        setDefaultImageProduct(value)
    }

    const handleUpdate = async (id: string, dataForm: FormData) => {
        await dispatchUpdateProduct({
            id,
            productData: dataForm,
        });
    };
    
    const submitUpdateHandler = () => {
        const formData = new FormData()
        formData.append("name", productClickedEdit.name)
        formData.append("description", productClickedEdit.description)
        formData.append("avaliableItems", String(productClickedEdit.avaliableItems))
        formData.append("price", String(productClickedEdit.price))
        formData.append("category", "6754ccad7905fad51ff16441")
        if (subImagesProduct){
            formData.append("subImages", subImagesProduct);
        }
        if(defaultImageProduct){
            formData.append("defaultImage", defaultImageProduct);
        }

        handleUpdate(productClickedEdit.id, formData)
    }
    
    const submitAddHandler = () => {
        const formData = new FormData()
        formData.append("name", productClickedEdit.name)
        formData.append("description", productClickedEdit.description)
        formData.append("avaliableItems", String(productClickedEdit.avaliableItems))
        formData.append("price", String(productClickedEdit.price))
        formData.append("category", "6754ccad7905fad51ff16441")
        if (defaultImageProduct && subImagesProduct) {
            formData.append("subImages", subImagesProduct);
            formData.append("defaultImage", defaultImageProduct);
        }
        
        dispatchAddProduct(formData)
        .unwrap()
        .then(() => console.log("Product added successfully"))
        .catch((error) => console.error("Error:", error));
    }



    if(isLoading || !isOnline) {
        return <ProductTableSkelton />
    }

    if (isError) {
        // return <p>{error.data?.error?.message}</p>;
    }

    return (
        <>
            <Button 
                onClick={onOpenModalAdd}
            >
                ADD
            </Button>
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
                            data.products.map( (product: IProduct, idx: number) => (
                                <Tr key={product.id} >
                                    <Td textAlign={"center"}>{idx+1}</Td>
                                    <Td textAlign={"center"}>{product.name}</Td>
                                    {/* <Td textAlign={"center"}>{product.category.title}</Td> */}
                                    <Td display='flex'
                                        alignItems='center'
                                        justifyContent='center'
                                    >
                                        <Image 
                                            borderRadius={"full"}
                                            objectFit={"cover"}
                                            boxSize={"40px"}
                                            alt={product.name}
                                            src={product.defaultImage.url}
                                        />
                                    </Td>
                                    <Td textAlign={"center"}>{product.price}</Td>
                                    <Td textAlign={"center"}>{product.avaliableItems}</Td>
                                    <Td textAlign={"center"} gap={5}>
                                        <ButtonGroup>
                                            <Button colorScheme='purple'>
                                                <IoEyeOutline />
                                            </Button>
                                            <Button 
                                                colorScheme='red' 
                                                onClick={() => {
                                                    setProductClickedId(product.id)
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
                isLoading={isLoadingUpdate}
            >
                <ModalBody as={"form"} pb={6}>
                    <FormControl>
                        <FormLabel>Name</FormLabel>
                        <Input  
                            name='name' 
                            value={productClickedEdit.name} 
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
                        <NumberInput name='avaliableItems' defaultValue={productClickedEdit.avaliableItems} onChange={onChangeHandlerStock}>
                            <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </FormControl>

                    <FormControl>
                        <FormLabel>default Image</FormLabel>
                        <Input 
                            name='defaultImage'    
                            type='file' 
                            p={2} 
                            accept='image/png, image/gif, image/jpeg, image/jpg'  
                            onChange={defaultImageHandler}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Sub Image</FormLabel>
                        <Input 
                            name='subImagesImage'    
                            type='file' 
                            p={2} 
                            accept='image/png, image/gif, image/jpeg, image/jpg'  
                            onChange={subImagesHandler}
                        />
                    </FormControl>
                </ModalBody>
            </CustomModal>

            <CustomModal 
                isOpen={isOpenModalAdd} 
                onOpen={onOpenModalAdd} 
                onClose={onCloseModalAdd} 
                title={"Add Product"} 
                okTxt='Add'
                colorScheme="blue"
                onOkClick={submitAddHandler}
                isLoading={isLoadingAdd}
            >
                <ModalBody as={"form"} pb={6}>
                    <FormControl>
                        <FormLabel>Name</FormLabel>
                        <Input  
                            name='name' 
                            value={productClickedEdit.name} 
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
                        <FormLabel>Avaliable Items</FormLabel>
                        <NumberInput name='avaliableItems' defaultValue={productClickedEdit.avaliableItems} onChange={onChangeHandlerStock}>
                            <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </FormControl>

                    <FormControl>
                        <FormLabel>default Image</FormLabel>
                        <Input 
                            name='defaultImage'    
                            type='file' 
                            p={2} 
                            accept='image/png, image/gif, image/jpeg, image/jpg'  
                            onChange={defaultImageHandler}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Sub Image</FormLabel>
                        <Input 
                            name='subImagesImage'    
                            type='file' 
                            p={2} 
                            accept='image/png, image/gif, image/jpeg, image/jpg'  
                            onChange={subImagesHandler}
                        />
                    </FormControl>
                </ModalBody>
            </CustomModal>
        </>
    )
}

export default DashboardProducts;
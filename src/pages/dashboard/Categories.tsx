import {
    Table,
    Thead,
    Tbody,
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
} from '@chakra-ui/react'
import { ICategory } from '../../interfaces'
import ProductTableSkelton from '../../components/ProductTableSkelton'
import CustomAlertDialog from '../../components/AlertDialog'
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaPen } from 'react-icons/fa6'
import { useEffect, useState } from 'react'
import CustomModal from '../../components/Modal'
import React from 'react'
import { selectNetwork } from '../../app/features/networkSlice'
import { useSelector } from 'react-redux'
import { useAddCategorySliceMutation, useDeleteCategorySliceMutation, useGetCategoriesSliceQuery, useUpdateCategorySliceMutation } from '../../app/services/CategorySlice'
import { MdProductionQuantityLimits } from 'react-icons/md';


const defaultCategory: ICategory = {
    id: "",
    name: "",
    image: {
        url: "",
    },
}

const DashboardCategories = () => {
    /* ___________________ State ___________________ */
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen:isOpenModalUpdate , onOpen:onOpenModalUpdate, onClose:onCloseModalUpdate } = useDisclosure()
    const { isOpen:isOpenModalAdd , onOpen:onOpenModalAdd, onClose:onCloseModalAdd } = useDisclosure()

    // const [page, setPage] = useState(1)
    const [categoryClickedId, setCategoryClickedId] = useState<string>("")
    const [categoryClicked, setCategoryClicked] = useState<ICategory>(defaultCategory)
    const [ImageCategory, setImageCategory] = useState<File>()

    const {isLoading, data} = useGetCategoriesSliceQuery({})
    const [ dispatchDeleteCategory, {isLoading: isLoadingDelete, isSuccess: isSuccessDelete} ] = useDeleteCategorySliceMutation()
    const [ dispatchUpdateCategory, {isLoading: isLoadingUpdate, isSuccess: isSuccessUpdate} ] = useUpdateCategorySliceMutation()
    const [ dispatchAddCategory, {isLoading: isLoadingAdd, isSuccess: isSuccessAdd} ] = useAddCategorySliceMutation()
    const { isOnline } = useSelector(selectNetwork)
    
    

    // const nextPageHandler = () => {
    //     setPage( prev => prev + 1 )
    // }

    // const prePageHandler = () => {
    //     setPage( prev => prev - 1 )
    // }


    useEffect( () => {
        if(isSuccessAdd){
            setCategoryClicked(defaultCategory)
            onCloseModalAdd()
        }

        if(isSuccessDelete){
            setCategoryClickedId("")
            onClose()
        }
        
        if(isSuccessUpdate){
            setCategoryClicked(defaultCategory)
            onCloseModalUpdate()
        }

    }, [isSuccessDelete, isSuccessUpdate, isSuccessAdd])

    const onChangeHandler: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
        const {name, value} = event.target
        setCategoryClicked({...categoryClicked, [name]: value})
    }


    const ImageHandler: React.ChangeEventHandler<HTMLInputElement>= (e) => {
        const value = e.target.files?.[0];
        setImageCategory(value)
    }

    const handleUpdate = async (id: string, dataForm: FormData) => {
        await dispatchUpdateCategory({
            id,
            productData: dataForm,
        });
    };
    
    const submitUpdateHandler = () => {
        const formData = new FormData()
        formData.append("name", categoryClicked.name)
        if (ImageCategory) {
            formData.append("category", ImageCategory);
        }

        handleUpdate(categoryClicked.id, formData)
    }
    
    const submitAddHandler = () => {
        const formData = new FormData()
        formData.append("name", categoryClicked.name)
        if (ImageCategory) {
            formData.append("category", ImageCategory);
        }
        
        dispatchAddCategory(formData)
        .unwrap()
        .then(() => console.log("category added successfully"))
        .catch((error) => console.error("Error:", error));
    }



    if(isLoading || !isOnline) {
        return <ProductTableSkelton />
    }

    if(!data) return <>no data</>

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
                            <Th textAlign={"center"}>Name</Th>
                            <Th textAlign={"center"}>Image</Th>
                            <Th textAlign={"center"}>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                    {
                        data.categories.map( (cat: ICategory, idx: number) => (
                            <Tr key={cat.id} >
                                <Td textAlign={"center"}>{idx+1}</Td>
                                <Td textAlign={"center"}>{cat.name}</Td>
                                <Td display='flex'
                                    alignItems='center'
                                    justifyContent='center'
                                >
                                    <Image 
                                        borderRadius={"full"}
                                        objectFit={"cover"}
                                        boxSize={"40px"}
                                        alt={cat.name}
                                        src={cat.image.url}
                                    />
                                </Td>
                                <Td textAlign={"center"} gap={5}>
                                    <ButtonGroup>
                                        <Button colorScheme='purple'>
                                            <MdProductionQuantityLimits />
                                        </Button>
                                        <Button 
                                            colorScheme='red' 
                                            onClick={() => {
                                                setCategoryClickedId(cat.id)
                                                onOpen()
                                            }}>
                                            <RiDeleteBin6Line /> 
                                        </Button>
                                        <Button 
                                            colorScheme='orange'
                                            onClick={() => {
                                                setCategoryClicked(cat)
                                                onOpenModalUpdate()
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
                </Table>
            </TableContainer>

            {/* Delete Product */}
            <CustomAlertDialog 
                isOpen={isOpen} 
                onOpen={onOpen} 
                onClose={onClose} 
                title={"Discard Changes?"} 
                description={"Are you sure you want to Delete Product"}
                okTxt='Destroy'
                colorScheme="red"
                onOkHandler={() => dispatchDeleteCategory(categoryClickedId)}
                isLoading= {isLoadingDelete}
            />

            {/* Update Product */}
            <CustomModal 
                isOpen={isOpenModalUpdate} 
                onOpen={onOpenModalUpdate} 
                onClose={onCloseModalUpdate} 
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
                            value={categoryClicked.name} 
                            onChange={onChangeHandler}  
                        />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Image</FormLabel>
                        <Input 
                            name='defaultImage'    
                            type='file' 
                            p={2} 
                            accept='image/png, image/gif, image/jpeg, image/jpg'  
                            onChange={ImageHandler}
                        />
                    </FormControl>
                </ModalBody>
            </CustomModal>

            {/* Add Product */}
            <CustomModal 
                isOpen={isOpenModalAdd} 
                onOpen={onOpenModalAdd} 
                onClose={onCloseModalAdd} 
                title={"Add Cayegory"} 
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
                            value={categoryClicked.name} 
                            onChange={onChangeHandler}  
                        />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Image</FormLabel>
                        <Input 
                            name='defaultImage'    
                            type='file' 
                            p={1} 
                            accept='image/png, image/gif, image/jpeg, image/jpg'  
                            onChange={ImageHandler}
                        />
                    </FormControl>
                </ModalBody>
            </CustomModal>
        </>
    )
}

export default DashboardCategories;
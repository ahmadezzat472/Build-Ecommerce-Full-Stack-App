/* ___________________ Import ___________________ */
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
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
import Paginator from '../../components/Paginator';
import PopOver from '../../components/PopOver';
import { useLazyGetFilterProductByCategorySliceQuery } from '../../app/services/productsSlice';


/* ___________________ Default Product Object ___________________ */
const defaultCategory: ICategory = {
    id: "",
    name: "",
    image: {
        url: "",
    },
}

const DashboardCategories = () => {
     /* ___________________ Modal State ___________________ */
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen:isOpenModalUpdate , onOpen:onOpenModalUpdate, onClose:onCloseModalUpdate } = useDisclosure()
    const { isOpen:isOpenModalAdd , onOpen:onOpenModalAdd, onClose:onCloseModalAdd } = useDisclosure()

    /* ___________________ State ___________________ */
    const [page, setPage] = useState(1)
    const [pageSize] = useState<number>(5); 
    const [categoryClickedId, setCategoryClickedId] = useState<string>("")
    const [categoryClicked, setCategoryClicked] = useState<ICategory>(defaultCategory)
    const [ImageCategory, setImageCategory] = useState<File>()

    /* ___________________ API Queries and Mutations ___________________ */
    const {isLoading, data} = useGetCategoriesSliceQuery({})
    const [refetch, {isLoading: isLoadingProductByCat, data: dataProductByCat}] = useLazyGetFilterProductByCategorySliceQuery()
    const [ dispatchAddCategory, {isLoading: isLoadingAdd, isSuccess: isSuccessAdd} ] = useAddCategorySliceMutation()
    const [ dispatchDeleteCategory, {isLoading: isLoadingDelete, isSuccess: isSuccessDelete} ] = useDeleteCategorySliceMutation()
    const [ dispatchUpdateCategory, {isLoading: isLoadingUpdate, isSuccess: isSuccessUpdate} ] = useUpdateCategorySliceMutation()
    const { isOnline } = useSelector(selectNetwork)
    
    /* ___________________ Paginate categories ___________________ */
    const totalCategories = data?.categories?.length || 0;
    const totalPages = Math.ceil(totalCategories / pageSize);
    const paginatedCategories = data?.categories?.slice(
        (page - 1) * pageSize,
        page * pageSize
    );

    /*  ___________________ Pagination Handlers ___________________ */
    const nextHandler = () => {
        setPage( prev => prev + 1 )
    }

    const prevHandler = () => {
        setPage( prev => prev - 1 )
    }

    /* ___________________ Side Effects ___________________ */
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

    /* ___________________ Input Handlers ___________________ */
    const onChangeHandler: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
        const {name, value} = event.target
        setCategoryClicked({...categoryClicked, [name]: value})
        // console.log(value, name, categoryClicked.name);
        
    }

    const ImageHandler: React.ChangeEventHandler<HTMLInputElement>= (e) => {
        const value = e.target.files?.[0];
        setImageCategory(value)
    }

    /* ___________________ API Handlers ___________________ */
    const handleUpdate = async (id: string, dataForm: FormData) => {
        try {
            const response = await dispatchUpdateCategory({ id, categoryData: dataForm }).unwrap();
            console.log("Update successful:", response);
        } catch (error) {
            console.error("Update failed:", error);
        }
        // console.log(dataForm);
        // await dispatchUpdateCategory({
        //     id,
        //     productData: dataForm,
        // })
        // .unwrap()
        // .then(() => console.log("category updated successfully"))
        // .catch((error) => console.error("Error:", error));
    };
    
    const submitUpdateHandler = () => {
        const formData = new FormData()
        console.log(categoryClicked.name);
        
        formData.append("name", categoryClicked.name)
        if (ImageCategory) {
            formData.append("category", ImageCategory);
        }

        // Iterate over FormData and print the key-value pairs
        for (const [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }
        console.log(categoryClicked.id);
        
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

    const handleproducts = (catId: string) => {
        refetch({catId})
    }

    /* ___________________ Fallback States ___________________ */
    if(isLoading || !isOnline) {
        return <ProductTableSkelton />
    }

    if(!data) return <>no data</>

    /* ___________________ Render ___________________ */
    return (
        <>
            <Button 
                onClick={onOpenModalAdd}
                mb={"40px"}
            >
                ADD CATEGORY
            </Button>

            <TableContainer>
                <Table variant='simple'>
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
                        paginatedCategories.map( (cat: ICategory, idx: number) => (
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
                                        <Button 
                                            colorScheme='purple'
                                            onClick={() => handleproducts(cat.id)}
                                        >
                                            <MdProductionQuantityLimits />
                                            <PopOver isLoading={isLoadingProductByCat} data={dataProductByCat} catId={cat.id} />
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

            <Paginator
                currentPage={page} 
                totalPages={totalPages} 
                pageSize={pageSize}
                onClickNext={nextHandler} 
                onClickPrev={prevHandler} 
                isLoading={isLoading}
            />

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
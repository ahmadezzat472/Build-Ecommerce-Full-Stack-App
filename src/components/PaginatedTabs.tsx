import { Tabs, TabList, Tab, Button, Flex } from '@chakra-ui/react';

interface ICategory {
    id: number;
    title: string;
    documentId: string;
}

interface IProps {
    data: ICategory[];
    page: number;
    pageCount: number;
    preHandler: () => void;
    nextHandler: () => void;
    setCategoryClickedId: (catId: number) => void;
}

const PaginatedTabs = ({page, pageCount, preHandler, nextHandler, setCategoryClickedId, data: categories} : IProps) => {

    return (
        <Flex gap={5}>
            <Button
                disabled={page==1}
                onClick={preHandler}
            >
                Pre
            </Button>

            <Tabs variant='soft-rounded' colorScheme='green'>
                <TabList>
                    <Tab onClick={() => setCategoryClickedId(0)}>
                        All
                    </Tab>
                    {
                        categories.map( (cat) => 
                            <Tab 
                                key={cat.id}
                                onClick={() => setCategoryClickedId(cat.id)}
                            >{cat.title}</Tab>
                        )
                    }
                </TabList>
            </Tabs>

            <Button
                disabled={page==pageCount}
                onClick={nextHandler}
            >
                Next
            </Button>
        </Flex>
    );
};

export default PaginatedTabs;

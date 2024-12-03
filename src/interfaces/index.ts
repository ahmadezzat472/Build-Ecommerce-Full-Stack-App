export interface IProduct {
    id: number | undefined;
    documentId: string;
    title: string;
    description: string;
    price: number;
    stock: number;
    category: {
        title: string;
    };
    thumbnail: {
        url: string;
    };
} 
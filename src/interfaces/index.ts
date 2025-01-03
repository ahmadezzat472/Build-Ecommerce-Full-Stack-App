// export interface IProduct {
//     id: number | undefined;
//     documentId: string;
//     title: string;
//     description: string;
//     price: number;
//     stock: number;
//     category: {
//         title: string;
//     };
//     thumbnail: {
//         url: string;
//     };
// } 

export interface IUser {
    email: string;
    password: string;
}

export interface IProduct {
    id: string;
    name: string;
    description: string;
    avaliableItems: number;
    price: number;
    category: ICategory;
    images: {
        url: string;
    };
    defaultImage:{
        url: string
    }
}

export interface ICategory {
    id: string;
    name: string;
    image: {
        url: string;
    }
}

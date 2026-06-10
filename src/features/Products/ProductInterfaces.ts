export interface APIimage{
    id:number,
    image:string 
}

export interface product {
    id: number,
    title: string,
    images:APIimage[],
    description: string,
    unit_price:number,
    price_with_tax:number,
    rating:number,
    inventory:number,
    collection:number,
    promotions:number[]
}

export interface PaginatedProductsResponse {
    count: number,
    next: string | null,
    previous: string | null,
    results: product[]
}

export interface Collection {
    id: number,
    title: string,
    products_count: number
}

export interface FetchProductsParams {
    page: number,
    collection?: number
}

export interface productInitialState {
    products : product[],
    productsCount:number,
    next: string | null,
    previous: string | null,
    status:string,
    error: string | null
}


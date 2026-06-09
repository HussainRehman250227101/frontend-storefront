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
    inventory:number,
    collection:number,
    promotions:number[]
}

export interface productInitialState {
    products : product[],
    productsCount:number,
    status:string,
    error: string | null
}


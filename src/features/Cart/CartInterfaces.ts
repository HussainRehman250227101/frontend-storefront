export interface image{
    id:number,
    image:string
}

export interface productType {
    id:number,
    title:string,
    unit_price :string,
    rating:number,
    featured_product:boolean,
    images:image[]

}

export interface itemType {
    id: number,
    product: productType,
    quantity:number,
    total_price: number
}

export type productIds ={
     [key:number]:boolean
}

export interface cartType {
    id:string,
    items : itemType[],
    total_price : number
}

export interface cartInitial {
    cart : cartType | null,
    productIDs : productIds,
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: string | null 
}

export interface postToCart {
    product_id : number,
    quantity: number
}
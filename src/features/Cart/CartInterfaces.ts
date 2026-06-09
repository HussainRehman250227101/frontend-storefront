export interface image{
    id:number,
    image:string
}

export interface productType {
    id:number,
    title:string,
    unit_price :string,
    images:image[]

}

export interface itemType {
    id: number,
    product: productType,
    quantity:number,
    total_price: number
}


export interface cartType {
    id:string,
    items : itemType[],
    total_price : number
}

export interface cartInitial {
    cart : cartType | null,
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: string | null 
}

export interface postToCart {
    product_id : number,
    quantity: number
}
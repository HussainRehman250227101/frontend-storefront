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
    featured_product:boolean,
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
    collection?: number,
    search?:string
}

export interface RecommendationResult {
    similarity: number | null,
    reasons: string[],
    matched_terms: string[],
    anchor_product_id: number | null,
    anchor_title: string | null,
    product: product
}

export interface RecommendationRequest {
    cartIds?: number[]
    visitedIds?: number[]
    search?: string
}

export interface RecommendationResponse {
    strategy: "content_based" | "cold_start",
    summary: string,
    seed_product_ids: number[],
    results: RecommendationResult[]
}

export interface productInitialState {
    products : product[],
    productsCount:number,
    next: string | null,
    previous: string | null,
    status:string,
    error: string | null
}


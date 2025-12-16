import type { Article, Author, Category, ApiResponse, PaginatedResponse, Language } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

class ApiClient {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    private async fetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
        const url = `${this.baseUrl}${endpoint}`;

        const response = await fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options?.headers,
            },
            next: { revalidate: 3600 }, // Revalidate every hour for ISR
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        return response.json();
    }

    // Articles
    async getArticles(params?: {
        lang?: Language;
        category?: string;
        page?: number;
        limit?: number;
        status?: string;
    }): Promise<PaginatedResponse<Article>> {
        const searchParams = new URLSearchParams();

        if (params?.lang) searchParams.set('lang', params.lang);
        if (params?.category) searchParams.set('category', params.category);
        if (params?.page) searchParams.set('page', params.page.toString());
        if (params?.limit) searchParams.set('limit', params.limit.toString());
        if (params?.status) searchParams.set('status', params.status);

        const query = searchParams.toString();
        return this.fetch<PaginatedResponse<Article>>(`/articles${query ? `?${query}` : ''}`);
    }

    async getArticleBySlug(slug: string): Promise<ApiResponse<Article>> {
        return this.fetch<ApiResponse<Article>>(`/articles/slug/${slug}`);
    }

    async getEditorsPicks(limit: number = 3): Promise<ApiResponse<Article[]>> {
        return this.fetch<ApiResponse<Article[]>>(`/articles/editors-picks?limit=${limit}`);
    }

    async getLatestArticles(limit: number = 6): Promise<ApiResponse<Article[]>> {
        return this.fetch<ApiResponse<Article[]>>(`/articles/latest?limit=${limit}`);
    }

    async getRelatedArticles(articleId: string, limit: number = 3): Promise<ApiResponse<Article[]>> {
        return this.fetch<ApiResponse<Article[]>>(`/articles/${articleId}/related?limit=${limit}`);
    }

    async getArticlesByCategory(categorySlug: string, params?: {
        page?: number;
        limit?: number;
    }): Promise<PaginatedResponse<Article>> {
        const searchParams = new URLSearchParams();
        if (params?.page) searchParams.set('page', params.page.toString());
        if (params?.limit) searchParams.set('limit', params.limit.toString());

        const query = searchParams.toString();
        return this.fetch<PaginatedResponse<Article>>(`/articles/category/${categorySlug}${query ? `?${query}` : ''}`);
    }

    // Categories
    async getCategories(): Promise<ApiResponse<Category[]>> {
        return this.fetch<ApiResponse<Category[]>>('/categories');
    }

    async getCategoryBySlug(slug: string): Promise<ApiResponse<Category>> {
        return this.fetch<ApiResponse<Category>>(`/categories/${slug}`);
    }

    // Authors
    async getAuthors(): Promise<ApiResponse<Author[]>> {
        return this.fetch<ApiResponse<Author[]>>('/authors');
    }

    async getAuthorById(id: string): Promise<ApiResponse<Author>> {
        return this.fetch<ApiResponse<Author>>(`/authors/${id}`);
    }

    // Sitemap data
    async getAllSlugs(): Promise<ApiResponse<{ slug: string; updatedAt: string }[]>> {
        return this.fetch<ApiResponse<{ slug: string; updatedAt: string }[]>>('/articles/slugs');
    }
}

export const api = new ApiClient(API_BASE_URL);
export default api;

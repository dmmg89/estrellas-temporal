// const API_BASE_URL = '/apiMock';
const API_BASE_URL = import.meta.env.VITE_API_URL;




// --- Cliente HTTP Genérico ---

export async function fetchData<ResponseType>(
    endpoint: string,
    queryParams?: Record<string, string | number>
): Promise<ResponseType> {
    const base = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL;
    const path = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
    const relativePath = `${base}/${path}`;

    const absoluteBase = typeof window !== 'undefined' ? window.location.origin : 'http://localhost'; // O una base configurable
    const url = new URL(relativePath, absoluteBase);

    if (queryParams) {
        Object.entries(queryParams).forEach(([key, value]) => url.searchParams.append(key, String(value)));
    }

    const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Error GET ${response.status}: ${errorData.mensaje || response.statusText}`);
    }
    return await response.json() as ResponseType;
}

// Para POST
export async function postData<RequestBodyType, ResponseType>(endpoint: string, body: RequestBodyType): Promise<ResponseType> {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        // ... manejo de errores robusto
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Error POST ${response.status}: ${errorData.mensaje || response.statusText}`);
    }
    if (response.status === 204) { // No Content
        return undefined as unknown as ResponseType;
    }
    return await response.json() as ResponseType;
}
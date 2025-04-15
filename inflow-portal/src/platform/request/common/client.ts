
class ApiClient {

    async post(url: string, data: any) {
        return this.fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
    }

    async get(url: string, data?: Record<string, any>) {
        if (data) {
            const params = new URLSearchParams(data);
            url = `${url}?${params.toString()}`;
        }
        return this.fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    private async fetch(url: string, options: any) {
        return fetch(url, options);
    }
}

export const apiClient = new ApiClient();

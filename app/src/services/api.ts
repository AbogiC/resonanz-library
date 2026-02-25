const API_BASE_URL: string =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

class ApiService {
  static async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      },
      ...options
    };

    // Safely stringify body if it's an object
    if (
      config.body &&
      typeof config.body === 'object' &&
      !(config.body instanceof FormData)
    ) {
      config.body = JSON.stringify(config.body);
    }

    try {
      const response = await fetch(url, config);

      // Handle empty responses safely
      const text = await response.text();
      const data = text ? JSON.parse(text) : null;

      if (!response.ok) {
        throw new Error(data?.message || 'API request failed');
      }

      return data as T;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  static async getScores(filters: Record<string, string | number | undefined> = {}) {
  const queryParams = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      queryParams.append(key, String(value));
    }
  });

  const query = queryParams.toString()
    ? `?${queryParams.toString()}`
    : '';

  return this.request(`/library${query}`);
}

}

export default ApiService;
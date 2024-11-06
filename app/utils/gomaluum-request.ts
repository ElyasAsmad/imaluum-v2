import { Dispatcher, request } from "undici";
import { BACKEND_URL } from "~/constants";

type APIResponseData<T> =
    T extends Record<string, unknown> ? T : Record<string, unknown>;

interface APIResponse<T> {
    status: number;
    message: string;
    data: APIResponseData<T>;
}

interface GmRequestConfig {
    method: Dispatcher.HttpMethod;
    body?: Record<string, unknown>;
}

export const gmRequest = async <T extends any>(
    url: string,
    { method, body }: GmRequestConfig,
) => {
    const requestOptions = {
        method,
        headers: {
            "Content-Type": "application/json",
        },
        ...(body && { body: JSON.stringify(body) }),
    };

    const res = await request(`${BACKEND_URL}${url}`, {
        method: requestOptions.method,
        headers: requestOptions.headers,
        body: requestOptions.body,
    });
    const responseBody = (await res.body.json()) as APIResponse<T>;

    if (res.statusCode !== 200) {
        return responseBody;
    }

    return responseBody;
};

const webApiUrl = "http://localhost/5000/api/tacks";

class SongService {
    get = async (urlParams) => {
        const options = {
            method: "GET",
        };
        const request = new Request(webApiUrl + "?" + urlParams, options);
        const response = await fetch(request);
        return response.json();
    };
    post = async (model) => {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        let options = {
            method: "POST",
            headers,
            body: JSON.stringify(model)
        };
        const request = new Request(webApiUrl, options);
        const response = await fetch(request);
        return response;
    };
    put = async (model) => {
        const headers = new Headers()
        headers.append("Content-Type", "application/json");
        let options = {
            method: "PUT",
            headers,
            body: JSON.stringify(model)
        };
        const request = new Request(webApiUrl, options);
        const response = await fetch(request);
        return response;
    };
    delete = async (id) => {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        const options = {
            method: "DELETE",
            headers
        };
        const request = new Request(webApiUrl + "/" + id, options);
        const response = await fetch(request);
        return response;
    };
}

export default SongService;
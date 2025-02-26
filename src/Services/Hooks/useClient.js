const UseClient = () => {
    const client = {
        callApi: async function (url, method) {
            const options = {
                method: method,
                headers: {
                    "Content-Type": "applicaition/json",
                }
            }
            const res = await fetch(url, options);
            const data = await res.json();
            return {
                response: res,
                data: data,
            }
        }
        get: function(url) {
            return this.callApi(url, "GET");
        }
    }

    return client;
}

export default UseClient;

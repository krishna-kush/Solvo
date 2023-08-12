import { useState, useEffect } from "react";

const useAxios = (configObj) => {
    const {
        axiosInstance,
        method,
        url,
        requestConfig = {}
    } = configObj;

    const [response, setResponse] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [reload, setReload] = useState(0);

    const refetch = () => setReload(prev => prev + 1);

    useEffect(() => {
        //let isMounted = true;
        const source = axios.CancelToken.source();

        const fetchData = async () => {
            try {
                const res = await axiosInstance[method.toLowerCase()](url, {
                    ...requestConfig,
                    cancelToken: source.token
                });
                console.log(res);
                setResponse(res.data);
            } catch (err) {
                if (axios.isCancel(error)) {
                    console.log('Request was canceled', error.message);
                } else {
                    console.log(err.message);
                    setError(err.message);
                }
            } finally {
                setLoading(false);
            }
        }

        // call the function
        fetchData();
        source.cancel('Request canceled by the user.');


        // useEffect cleanup function
        return () => {
            console.log('canceling request');
            source.cancel('Request canceled by the user.');
        }

        // eslint-disable-next-line
    }, [reload]);

    return [response, error, loading, refetch];
}

export default useAxios
import httpInstance from '../utils/http';

export const getMapAPI = () => {
    return httpInstance({
        url: '/api/indexMap/data',
    });
};

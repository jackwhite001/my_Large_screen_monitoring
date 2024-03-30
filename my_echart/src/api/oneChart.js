import httpInstance from '../utils/http';

export const getOneChartAPI = () => {
    return httpInstance({
        url: '/api/indexOne/data',
    });
};

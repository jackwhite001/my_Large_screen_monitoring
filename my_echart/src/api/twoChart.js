import httpInstance from '../utils/http';

export const getTwoChartAPI = () => {
    return httpInstance({
        url: '/api/indexTwo/data',
    });
};

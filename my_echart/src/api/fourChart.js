import httpInstance from '../utils/http';

export const getFourChartAPI = () => {
    return httpInstance({
        url: '/api/indexFour/data',
    });
};

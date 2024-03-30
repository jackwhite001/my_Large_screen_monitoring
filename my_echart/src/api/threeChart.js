import httpInstance from '../utils/http';

export const getThreeChartAPI = () => {
    return httpInstance({
        url: '/api/indexThree/data',
    });
};

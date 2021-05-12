import {create} from 'apisauce';
import settings from '../config/settings';

const apiClient = create({
    baseURL: settings.apiUrl,
});

export default apiClient;

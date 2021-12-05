import axios from 'axios';
import { toast } from 'react-toastify';
import configFile from '../config.json';

const http = axios.create({
  baseURL: configFile.baseURL,
});

http.interceptors.request.use(
  function (config) {
    if (configFile.isFireBase) {
      const containSlash = /\/$/gi.test(config.url);
      config.url = (containSlash ? config.url.slice(0, -1) : config.url) + '.json';
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

function TransformData(data) {
  return data ? Object.values(data) : [];
}

http.interceptors.response.use(
  res => {
    if (configFile.isFireBase) {
      res.data = { content: TransformData(res.data) };
    }
    return res;
  },
  function (error) {
    const expectedErrors = error.response && error.response.status >= 400 && error.response.status < 500;
    if (!expectedErrors) {
      console.log(error);
      toast.error('Something was wrong. Try it later');
    }
    return Promise.reject(error);
  }
);

const httpService = {
  get: http.get,
  post: http.post,
  put: http.put,
  delete: http.delete,
};

export default httpService;

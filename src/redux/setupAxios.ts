import axios from 'axios';
import { upperFirst ,camelCase} from 'lodash';
export function setupAxios(Axios:typeof axios, store:any) {
  Axios.interceptors.request.use(
    (config:any) => {
      const {auth: { authToken }} = store.getState();

      // Adding Auth token for authrization
      if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;
      }

      return config;
    },
    (err:any) => Promise.reject(err)
  );
}


// It's not a good practice to copy the back-end models but if
// We do that, we can camelize and pascalize model keys in req/res objects
const camelizeKeys = (obj:any):any => {
  if (Array.isArray(obj)) {
    return obj.map(v => camelizeKeys(v));
  } else if (obj !== null && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [String(camelCase(key))]: camelizeKeys(obj[key]),
      }),
      {},
    );
  }
  return obj;
};

const pascalizeKeys = (obj:any):any => {
  if (Array.isArray(obj)) {
    return obj.map(v => pascalizeKeys(v));
  } else if (obj !== null && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [String(upperFirst(key))]: pascalizeKeys(obj[key]),
      }),
      {},
    );
  }
  return obj;
};




export function applyInterceptors(Axios:typeof axios){
  Axios.interceptors.request.use((request)=>{
    if(request.data){
      request.data = JSON.stringify(pascalizeKeys(request.data));
      return request;
    }
    return request;
  }
  )
  Axios.interceptors.response.use((response)=>{
    if(response.data){
      response.data = camelizeKeys(response.data)
      return response;
    }
    return response;
  }
  )
}
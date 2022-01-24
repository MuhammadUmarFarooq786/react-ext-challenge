import regUsersTableMock from "./regUsersTableMock";
import { AUTH_URL } from "../constants";

export default function mockLogin(mock) {
  mock.onPost(`${AUTH_URL}/login`).reply(({ loginDetails }) => {
    const { emailOrPhone } = JSON.parse(loginDetails);
    let regUser=null;
    if (typeof emailOrPhone === number){
      regUser=regUsersTableMock.find(userDetails => userDetails.phone === emailOrPhone)      
    }
    else if(typeof emailOrPhone === string){
      regUser=regUsersTableMock.find(userDetails => userDetails.email === emailOrPhone)      
    }
    if (!regUser) {
      return [400];
    }
      return [200, { user: regUser }];
  });

}
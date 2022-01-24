import MockAdapter from "axios-mock-adapter";
import mockAuth from "../../app/modules/Auth/__mocks__/mockAuth";
// import mockDevices from "../../app/modules/DeviceManagement/__mocks__/mockDevice";
// import mockEmployees from "../../app/modules/EmployeeManagement/__mocks__/mockEmployee";

export default function mockAxios(axios) {
  const mock = new MockAdapter(axios, { delayResponse: 300 });

  // mockDevices(mock);
  // mockEmployees(mock);

  return mock;
}

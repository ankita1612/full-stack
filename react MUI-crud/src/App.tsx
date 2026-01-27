import AppLayout from "./layouts/AppLayout";
import LoginPage from "./components/LoginPage";
import EmployeeAdd from "./components/employee/EmployeeAdd";
import PropertyCRUD from "./components/property/PropertyCRUD";
function App() {
  return (
    <AppLayout>
      {/* <LoginPage></LoginPage> */}
      {/* <EmployeeAdd></EmployeeAdd> */}
      <PropertyCRUD></PropertyCRUD>
    </AppLayout>
  );
}

export default App;

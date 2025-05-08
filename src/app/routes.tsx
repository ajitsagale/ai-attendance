import { Route, Routes } from 'react-router-dom';
import DairyEntryForm from '../features/dairy-entry/pages/DairyEntryForm';
import EnterMilkCollection from '../features/dairy-entry/pages/EnterMilkCollection';
import AddCaseForm from '../features/dairy-entry/pages/AddCaseForm';
import QAPromptDashboard from '../features/dairy-entry/pages/QAPromptDashboard';
import RegisterForm from '../features/Registration/pages/RegisterForm';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DairyEntryForm />} />
      <Route path="/milk-collection" element={<EnterMilkCollection />} />
      <Route path="/AddCaseForm" element={<AddCaseForm />} />
      <Route path="/QAPromptDashboard" element={<QAPromptDashboard />} />
      <Route path="/RegisterForm" element={<RegisterForm />} />
      
        {/* Add more routes here */}
    </Routes>
  );
};

export default AppRoutes;

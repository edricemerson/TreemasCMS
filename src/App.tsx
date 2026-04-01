import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './page/login'
import Menu from './page/menu'
import Home from './page/home'
import Dashboard from './page/DashboardApp/Dashboard'
import WebsiteContent from './page/WebsiteContentApp/WebsiteContent'
import MasterData from './page/MasterDataApp/MasterData'
import AssesmentGroup from './page/AssesmentGroupApp/AssesmentGroup'
import Companies from './page/CompaniesApp/Companies'
import Reports from './page/ReportsApp/Reports'
import Settings from './page/SettingsApp/Settings'
import CompanyInfoForm from './page/form/CompanyInfoForm'
import { ContextProvider } from './page/WebsiteContentApp/DataStruct/ContextProvider'

function App() {
    return (
        <BrowserRouter>
        <ContextProvider>
           <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/menu" element={<Menu />}>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="website-content" element={<WebsiteContent />} />
                    <Route path="master-data" element={<MasterData />} />
                    <Route path="assessment-groups" element={<AssesmentGroup />} />
                    <Route path="companies" element={<Companies />} />
                    <Route path="reports" element={<Reports />} />
                    <Route path="settings" element={<Settings />} />
                </Route>
                <Route path="/home" element={<Home />} />
                <Route path="/form" element={<CompanyInfoForm />} />
            </Routes>
        </ContextProvider>
 
        </BrowserRouter>
    )
}

export default App

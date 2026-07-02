import React, { useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom"; 
import { useAuth } from "./AuthContext";

function Menu() {
    const navigate = useNavigate(); 
    const { logout, isAuthenticated } = useAuth(); 

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);

    const handleLogout = async () => {
        await logout();
        alert("Logout Successfully");
        window.location.href = ("/"); 
    };

    type IconType = React.FC<React.SVGProps<SVGSVGElement>>
    const icons: Record<string, IconType> = {
        dashboard: () => (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                <rect x="3" y="3" width="7" height="7" rx="2" />
                <rect x="14" y="3" width="7" height="7" rx="2" />
                <rect x="3" y="14" width="7" height="7" rx="2" />
                <rect x="14" y="14" width="7" height="7" rx="2" />
            </svg>
        ),
        websiteContent: () => (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                <path d="M6 2h9l5 5v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
                <polyline points="15 2 15 7 20 7" />
                <line x1="8" y1="13" x2="16" y2="13" />
                <line x1="8" y1="17" x2="16" y2="17" />
            </svg>
        ),
        masterData: () => (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                <ellipse cx="12" cy="5" rx="8" ry="3" />
                <path d="M4 5v6c0 2 3.6 3 8 3s8-1 8-3V5" />
                <path d="M4 11v6c0 2 3.6 3 8 3s8-1 8-3v-6" />
            </svg>
        ),
        AssessGroup: () => (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                <rect x="3" y="6" width="18" height="12" rx="2" />
                <line x1="3" y1="10" x2="21" y2="10" />
                <circle cx="8" cy="14" r="1" />
            </svg>
        ),
        companies: () => (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                <rect x="4" y="4" width="16" height="16" rx="2" />
                <line x1="8" y1="8" x2="8" y2="8" />
                <line x1="12" y1="8" x2="12" y2="8" />
                <line x1="16" y1="8" x2="16" y2="8" />
                <line x1="8" y1="12" x2="8" y2="12" />
                <line x1="12" y1="12" x2="12" y2="12" />
                <line x1="16" y1="12" x2="16" y2="12" />
            </svg>
        ),
        report: () => (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                <line x1="6" y1="20" x2="6" y2="10" />
                <line x1="12" y1="20" x2="12" y2="6" />
                <line x1="18" y1="20" x2="18" y2="14" />
                <line x1="3" y1="20" x2="21" y2="20" />
            </svg>
        ),
        setting: () => (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                <circle cx="12" cy="12" r="3" />
                <circle cx="12" cy="12" r="8" />
            </svg>
        ),
    }

    const sidebarData = [
        { id: 1, label: "Dashboard", path: "dashboard", icon: icons.dashboard },
        { id: 2, label: "Website Content", path: "website-content", icon: icons.websiteContent },
        { id: 3, label: "Master Data", path: "master-data", icon: icons.masterData },
        { id: 4, label: "Assessment Groups", path: "assessment-groups", icon: icons.AssessGroup },
        { id: 5, label: "Companies", path: "companies", icon: icons.companies },
        { id: 6, label: "Reports", path: "reports", icon: icons.report },
        { id: 7, label: "Settings", path: "settings", icon: icons.setting },
    ]
    
    return (
        <div className="min-h-screen flex flex-col">
            {/* HEADER */}
            <div className="fixed top-0 left-0 right-0 h-20 border-b flex items-center bg-white z-50">
                <div className="w-64 h-full flex items-center border-r text-2xl font-semibold pl-6">
                    CSR Platform
                </div>

                <div className="flex-1 flex justify-center px-6">
                    <input type="text" placeholder="Search..."
                        className="w-full h-12 px-4 rounded-lg border 
                    focus:outline-none focus:ring-2 focus:ring-teal-500"/>
                </div>

                <div className="w-64 h-full flex items-center justify-end mr-6 gap-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-gray-600 mr-4">
                        <path d="M18 8a6 6 0 10-12 0c0 7-3 7-3 7h18s-3 0-3-7" />
                        <path d="M13.73 21a2 2 0 01-3.46 0" />
                    </svg>
                    <img src="/userLogo.svg" className="w-9 h-9 text-gray-600 mr-2" />
                    <div className="text-sm">
                        <p className="text-base">Anonymous</p>
                        <p className="text-sm">anonymous@csr.com</p>
                    </div>
                </div>
            </div>

            {/* BODY */}
            <div className="pt-20"> 
                {/* SIDEBAR */}
                <div className="fixed top-20 left-0 w-64 h-[calc(100vh-5rem)] border-r p-6 bg-white flex flex-col">
                    {sidebarData.map((item) => {
                        const Icon = item.icon

                        return (
                            <NavLink
                                key={item.id}
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center gap-4 px-2 py-3 rounded-2xl transition
                                    ${
                                        isActive
                                            ? "bg-teal-100 text-teal-600"
                                            : "text-gray-600 hover:bg-gray-100 hover:text-teal-600"
                                    }`
                                }
                            >
                                <Icon className="w-5 h-5" />
                                <span className="text-sm font-medium">
                                    {item.label}
                                </span>
                            </NavLink>
                        )
                    })}

                    <button 
                        onClick={handleLogout}
                        className="mt-auto flex items-center gap-4 px-2 py-3 rounded-2xl transition text-red-600 hover:bg-red-50"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                            <polyline points="16 17 21 12 16 7"></polyline>
                            <line x1="21" y1="12" x2="9" y2="12"></line>
                        </svg>
                        <span className="text-sm font-medium">Logout</span>
                    </button>
                </div>

                {/* MAIN CONTENT */}
                <Outlet />
                
            </div>

        </div>
    )

}

export default Menu
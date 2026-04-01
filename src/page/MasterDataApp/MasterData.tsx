import { useState } from "react";
import LegalEntity from "./masterDataPage/LegalEntity";
import BusinessSector from "./masterDataPage/BusinessSector";
import IndustryType from "./masterDataPage/IndustryType";
import Province from "./masterDataPage/Province";
import CompanySize from "./masterDataPage/CompanySize";
import FinancialStatus from "./masterDataPage/FinancialStatus";
import AnnualRevenue from "./masterDataPage/AnnualRevenue";
import MarketScope from "./masterDataPage/MarketScope";
import EstimatedMarket from "./masterDataPage/EstimatedMarket";

function MasterData() {

    const [NavButtonActive, setNavButtonActive] = useState<number>(1);

    const NavButton = [
        { id: 1, label: "Legal Entity" },
        { id: 2, label: "Business Sector" },
        { id: 3, label: "Industry Type" },
        { id: 4, label: "Province" },
        { id: 5, label: "Company Size" },
        { id: 6, label: "Financial Status" },
        { id: 7, label: "Annual Revenue Range" },
        { id: 8, label: "Market Scope" },
        { id: 9, label: "Est. Market Position" },
    ];

    return (
        <div className="ml-64 p-8">

            <p className="text-3xl font-semibold pb-2">Master Data</p>
            <p className="text-gray-600 pb-6">
                Manage system-wide reference data
            </p>

            <div className="flex flex-row flex-wrap font-semibold gap-4">
                {NavButton.map((btn) => (
                    <button
                        key={btn.id}
                        onClick={() => setNavButtonActive(btn.id)}
                        className={`border border-gray-300 rounded-lg px-2 py-1 transition duration-200
                        ${NavButtonActive === btn.id
                            ? "bg-black text-white"
                            : "bg-white hover:bg-gray-300"
                        }`}
                    >
                        {btn.label}
                    </button>
                ))}
            </div>

            {/* render section */}
            {NavButtonActive === 1 && <LegalEntity />}
            {NavButtonActive === 2 && <BusinessSector />}
            {NavButtonActive === 3 && <IndustryType />}
            {NavButtonActive === 4 && <Province />}
            {NavButtonActive === 5 && <CompanySize />}
            {NavButtonActive === 6 && <FinancialStatus />} {/* following figma */}
            {NavButtonActive === 7 && <AnnualRevenue />} 
            {NavButtonActive === 8 && <MarketScope />} 
            {NavButtonActive === 9 && <EstimatedMarket />} {/* following figma */}

        </div>
    );
}

export default MasterData;
import { useState } from "react";
import BusinessMaturity from "./masterDataPage/BusinessMaturity";
import BusinessType from "./masterDataPage/BusinessType";
import CompanySize from "./masterDataPage/CompanySize";
import Province from "./masterDataPage/Province";
import AnnualRevRange from "./masterDataPage/AnnualRevRange";
// import FinancialStatus from "./masterDataPage/FinancialStatus";
// import AnnualRevenue from "./masterDataPage/AnnualRevenue";
// import MarketScope from "./masterDataPage/MarketScope";
// import EstimatedMarket from "./masterDataPage/EstimatedMarket";
import Button from "../Button";

function MasterData() {

    const [NavButtonActive, setNavButtonActive] = useState<number>(1);

    const NavButton = [
        { id: 1, label: "Business Maturity" },
        { id: 2, label: "Business Type" },
        { id: 3, label: "Company Size" },
        { id: 4, label: "Province" },
        { id: 5, label: "Annual Revenue Range" },
        // { id: 6, label: "Financial Status" },
        // { id: 7, label: "Annual Revenue Range" },
        // { id: 8, label: "Market Scope" },
        // { id: 9, label: "Est. Market Position" },
    ];

    return (
        <div className="ml-64 p-8">

            <p className="text-3xl font-semibold pb-2">Master Data</p>
            <p className="text-gray-600 pb-6">
                Manage system-wide reference data
            </p>

            <div className="flex flex-row flex-wrap font-semibold gap-4">
                {NavButton.map((btn) => (
                    <Button
                        key={btn.id}
                        onClick={() => setNavButtonActive(btn.id)}
                        className={`border border-gray-300 rounded-lg px-2 py-1 transition duration-200
                        ${NavButtonActive === btn.id
                            ? "bg-black text-white"
                            : "bg-white hover:bg-gray-300"
                        }`}
                    >
                        {btn.label}
                    </Button>
                ))}
            </div>

            {/* render section */}
            {NavButtonActive === 1 && <BusinessMaturity />}
            {NavButtonActive === 2 && <BusinessType />}
            {NavButtonActive === 3 && <CompanySize />}
            {NavButtonActive === 4 && <Province />}
            {NavButtonActive === 5 && <AnnualRevRange />}
            {/* {NavButtonActive === 6 && <FinancialStatus />} following figma */}
            {/* {NavButtonActive === 7 && <AnnualRevenue />}  */}
            {/* {NavButtonActive === 8 && <MarketScope />}  */}
            {/* {NavButtonActive === 9 && <EstimatedMarket />} following figma */}

        </div>
    );
}

export default MasterData;
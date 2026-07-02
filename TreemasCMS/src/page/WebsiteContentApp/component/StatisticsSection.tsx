import { useData } from "../DataStruct/Context"

export default function StatisticsSection() {
    const { contextData, setContextData } = useData()

    const boxStyle =
        "bg-gray-200 rounded-xl p-2 text-sm w-full outline-none"

    const containerStyle =
        "rounded-2xl p-8 shadow-sm space-y-6 border"

    const labelStyle =
        "font-semibold text-sm mb-2 block"

    return (
        <div className={containerStyle}>
            <h2 className="font-semibold">Statistics Section</h2>

            <div className="grid grid-cols-4 gap-6">

                <div>
                    <label className={labelStyle}>Businesses Assessed</label>
                    <input
                        type="number"
                        step={1}
                        value={contextData.statistic.businesses}
                        onChange={(e) =>
                            setContextData({
                                ...contextData,
                                statistic: {
                                    ...contextData.statistic,
                                    businesses: parseInt(e.target.value),
                                },
                            })
                        }
                        className={boxStyle}
                    />
                </div>

                <div>
                    <label className={labelStyle}>Provinces Covered</label>
                    <input
                        type="number"
                        step={1}
                        value={contextData.statistic.provinces}
                        onChange={(e) =>
                            setContextData({
                                ...contextData,
                                statistic: {
                                    ...contextData.statistic,
                                    provinces: parseInt(e.target.value),
                                },
                            })
                        }
                        className={boxStyle}
                    />
                </div>

                <div>
                    <label className={labelStyle}>Assessment Areas</label>
                    <input
                        type="number"
                        step={1}
                        value={contextData.statistic.areas}
                        onChange={(e) =>
                            setContextData({
                                ...contextData,
                                statistic: {
                                    ...contextData.statistic,
                                    areas: parseInt(e.target.value),
                                },
                            })
                        }
                        className={boxStyle}
                    />
                </div>

                <div>
                    <label className={labelStyle}>Satisfaction Rate (%)</label>
                    <input
                        type="number"
                        step="1"
                        value={contextData.statistic.satisfaction}
                        onChange={(e) =>
                            setContextData({
                                ...contextData,
                                statistic: {
                                    ...contextData.statistic,
                                    satisfaction: parseFloat(e.target.value),
                                },
                            })
                        }
                        className={boxStyle}
                    />
                </div>

            </div>
        </div>
    )
}
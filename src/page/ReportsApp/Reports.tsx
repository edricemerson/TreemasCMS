import { useState } from 'react'
import Diagram from './Diagram'

function Reports() {
    const [selectedUser, setSelectedUser] = useState<string | null>(null)
    const [insights, setInsights] = useState<string[]>([''])

    return (
        <div className="ml-64 p-6">
            <div>
                    <p className="text-3xl font-semibold pb-2">
                        Reports
                    </p>
                    <p className="text-gray-600">
                        See the scoring of your company and extract insights here
                    </p>
                    <div className="mt-4 flex gap-7">
                        <div className="flex-1">
                            <p className="text-lg font-semibold">
                                View User
                            </p>
                            <div className="bg-white rounded-2xl p-4 mt-6 border">
                                <div className="flex mx-3">
                                    <p className="flex-1 font-bold">
                                        NO
                                    </p>
                                    <p className="flex-8 font-bold">
                                        NAME
                                    </p>
                                </div>
                                <div className="border-b w-full mt-2 border-gray-400"></div>

                                <div className="bg-gray-200 mt-2 p-2 transition 
                                    hover:bg-gray-500 hover:text-white cursor-pointer"
                                    onClick={() => setSelectedUser('DUMMY DATA')}
                                >
                                    DUMMY DATA
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            {/* Modal */}
            {selectedUser && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-6 w-7xl shadow-xl">
                        <h2 className="text-lg font-bold">User's {selectedUser} Report</h2>
                        <div className="border-b border-gray-300 mb-4" />
                        <div className='flex justify-center'>
                            {/* <p className='text-6xl flex'> VIEW DISINI</p> */}
                            <Diagram />
                        </div>

                        <form className='flex flex-col'>
                            <div  className='flex mb-3'>
                                <div className='flex'>
                                    <label className='text-lg mr-4 font-semibold'>
                                        Insights
                                    </label>

                                    <button type='button' disabled={insights.length >= 5}
                                        className={`border px-2 py-1 rounded-xl text-white 
                                        transition duration-300 ease-in-out ${insights.length >= 5 
                                        ? 'bg-gray-400 cursor-not-allowed opacity-50' : 
                                        'bg-black hover:bg-slate-800'}`}
                                        onClick={() => setInsights(prev => [...prev, ''])}
                                    >
                                        + Add More Insights
                                    </button >
                                </div>

                                <div className='flex ml-auto'>
                                    <button type='button' className="border px-3 py-1 
                                        rounded-xl text-white  transition duration-300 
                                        ease-in-out bg-black hover:bg-slate-800 "
                                    >
                                        Print
                                    </button>
                                </div>
                            </div>
                            

                            {insights.map((value, i) => (
                                <div key={i} className='flex items-center gap-2 my-1'>
                                    <input
                                        className='w-full border rounded-lg px-3 py-1 bg-gray-50'
                                        placeholder='Write insights here'
                                        value={value}
                                        onChange={(e) => setInsights(prev => prev.map((v, idx) => idx === i ? e.target.value : v))}
                                    />
                                    <button type='button' className='text-gray-400 font-normal text-lg 
                                        hover:text-red-500 hover:font-bold transition duration-200'
                                        onClick={() => setInsights(prev => prev.filter((_, idx) => idx !== i))}
                                    >
                                        X
                                    </button>
                                </div>
                            ))}
                        </form>
                    </div>  
                </div>
            )}
        </div>
    )
}

export default Reports

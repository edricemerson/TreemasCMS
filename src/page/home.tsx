import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Home() {
    const [menuOpen, setMenuOpen] = useState(false)
 //   const navigate = useNavigate()

    const [landingData, setLandingData] = useState<any>({
        isLoading: true,
        title: "",
        description: "",
        backgroundImage: "",
        components: [],
        about: "",
        statistic: { businesses: 0, provinces: 0, areas: 0, satisfaction: 0 },
        contact: { email: "", phone: "", address: "" },
        social: { linkedin: "", instagram: "", twitter: "" },
        solutions: [],
        people: []
    });

    useEffect(() => {
        const fetchLandingData = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/cms/public/landing");
                const result = await response.json();

                if (result.success) {
                    const { settings, solutions, team } = result.data;

                    setLandingData({
                        isLoading: false,
                        title: settings.hero_title || "",
                        description: settings.hero_desc || "",
                        backgroundImage: settings.hero_bg_image || "",
                        components: settings.hero_components ? JSON.parse(settings.hero_components) : [],
                        
                        about: settings.about_content || "",
                        
                        statistic: {
                            businesses: Number(settings.statistic_businesses) || 0,
                            provinces: Number(settings.statistic_provinces) || 0,
                            areas: Number(settings.statistic_areas) || 0,
                            satisfaction: Number(settings.statistic_satisfaction) || 0,
                        },

                        contact: {
                            email: settings.contact_email || "",
                            phone: settings.contact_phone || "",
                            address: settings.contact_address || "",
                        },
                        
                        social: {
                            linkedin: settings.social_linkedin || "",
                            instagram: settings.social_instagram || "",
                            twitter: settings.social_x || "",
                        },
                        solutions: solutions.map((s: any) => ({
                            id: s.id,
                            title: s.title,
                            description: s.description,
                            image: s.image_url
                        })),

                        // Mapping team
                        people: team.map((t: any) => ({
                            id: t.id,
                            name: t.name,
                            position: t.title,
                            image: t.image_url
                        }))
                    });
                }
            } catch (error) {
                console.error("Gagal menarik data Landing Page:", error);
                setLandingData((prev: any) => ({ ...prev, isLoading: false }));
            }
        };

        fetchLandingData();
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id)
        if (!element) return
        const yOffset = -120 
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
        window.scrollTo({ top: y, behavior: "smooth" })
    }
    if (landingData.isLoading) {
        return <div className="h-screen flex items-center justify-center text-2xl font-bold text-teal-600">Loading TMS CSR...</div>;
    }

    return (
        <>
            {/* --- NAVBAR DESKTOP --- */}
            <div className="fixed top-0 left-0 w-full bg-white border-b z-40">
                <div className="flex flex-col md:flex-row items-center gap-8 px-6 md:px-12 lg:px-16 py-2">
                    <div className="flex items-center flex-1 gap-2">
                        <img src="/logo.svg" className="w-12 h-12 md:w-16 md:h-16" />
                        <div className="font-bold underline text-xl">TMS CSR</div>
                    </div>

                    <div className="hidden md:flex items-center gap-6">
                        <button onClick={() => scrollToSection("solution")} className="px-4 py-2 rounded-md hover:bg-gray-100 transition">Solutions</button>
                        <button onClick={() => scrollToSection("people")} className="px-4 py-2 rounded-md hover:bg-gray-100 transition">People</button>
                        <button onClick={() => scrollToSection("about")} className="px-4 py-2 rounded-md hover:bg-gray-100 transition">About</button>
                    </div>

                    <button className="md:hidden flex flex-col gap-1" onClick={() => setMenuOpen(!menuOpen)}>
                        <span className="w-6 h-0.5 bg-black" />
                        <span className="w-6 h-0.5 bg-black" />
                        <span className="w-6 h-0.5 bg-black" />
                    </button>
                </div>
            </div>

            {menuOpen && <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" onClick={() => setMenuOpen(false)} />}

            {/* --- SIDEBAR MOBILE --- */}
            <div className={`fixed top-0 right-0 h-full w-72 bg-white z-50 transform transition-transform duration-300 ${menuOpen ? "translate-x-0" : "translate-x-full"}`}>
                <div className="flex justify-start items-center p-4">
                    <button onClick={() => setMenuOpen(false)} className='pl-2'>✕</button>
                    <img src='/logo.svg' className='size-7 ml-4' />
                    <div className='font-bold pl-6'>TMS CSR</div>
                </div>
                <div className="flex flex-col gap-4 px-6 pt-6 text-lg items-center">
                    <button onClick={() => { scrollToSection("solution"), setMenuOpen(false)}} className="px-20 py-2 rounded-md hover:bg-gray-100 transition">Solution</button>
                    <button onClick={() => { scrollToSection("people"), setMenuOpen(false)}} className="px-20 py-2 rounded-md hover:bg-gray-100 transition">People</button>
                    <button onClick={() => { scrollToSection("about"), setMenuOpen(false)}} className="px-20 py-2 rounded-md hover:bg-gray-100 transition">About</button>
                    <Link to="/form" className="inline-flex justify-center items-center bg-teal-600 mt-6 py-3 px-7 rounded-lg text-white text-xl font-semibold shadow-lg w-full md:w-auto hover:bg-teal-800 transition">Assess Now</Link>
                </div>
            </div>

            {/* --- HERO SECTION --- */}
            <div className="mx-auto px-6 md:px-12 lg:px-24 pt-48">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    <div className="flex-1 flex justify-center order-1 md:order-2">
                        <div className="bg-teal-100 rounded-3xl p-8">
                            <img src={landingData.backgroundImage || "/logo.svg"} className="w-40 md:w-56" />
                        </div>
                    </div>
                    <div className="flex-1 text-center md:text-left w-full order-2 md:order-1">
                        <h1 className="font-semibold text-4xl md:text-5xl leading-tight">{landingData.title || "Write a Title..."}</h1>
                        <p className="mt-6 max-w-2xl text-xl leading-relaxed text-gray-500">{landingData.description || "Write a Description..."}</p>
                        
                        <div className="grid grid-cols-4 gap-6 mt-6">
                            {landingData.components.map((item: any) => (
                                <div key={item.id} className="flex items-center gap-3 bg-white px-4 py-2 border rounded-full">
                                    {item.image && (<img src={item.image} className="w-6 h-6" />)}
                                    <span className="text-base font-normal">{item.label}</span>
                                </div>
                            ))}
                        </div>

                        <Link to="/form" className="inline-flex justify-center items-center bg-teal-600 mt-12 py-3 px-7 rounded-lg text-white text-xl font-semibold shadow-lg w-full md:w-auto hover:bg-teal-800 transition">
                            Assess Now
                        </Link>
                    </div>
                </div>
            </div>

            {/* --- SOLUTIONS SECTION --- */}
            <div id="solution" className="pt-48 pb-36">
                <div className="px-6 md:px-12 lg:px-24">
                    <div className="text-center mb-14">
                        <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">Our Solutions</h2>
                        <p className="mt-4 text-gray-500 max-w-2xl mx-auto">Tailored assessment tools and strategic support designed for Indonesian SMEs</p>
                    </div>
                    <div className={`grid gap-8 ${landingData.solutions.length === 1 ? "grid-cols-1 max-w-md mx-auto" : landingData.solutions.length === 2 ? "grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto" : "grid-cols-1 md:grid-cols-3"}`}>
                        {landingData.solutions.map((item: any) => (
                            <div key={item.id} className="bg-white rounded-2xl p-10 text-center border hover:shadow-2xl transition">
                                {item.image && (
                                    <div className="flex justify-center mb-6">
                                        <img src={item.image} className="w-10 h-10" />
                                    </div>
                                )}
                                <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                                <p className="text-gray-500 leading-relaxed">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* --- PEOPLE SECTION --- */}
            <div id="people" className="pt-40 pb-44 bg-gray-100">
                <div className="px-6 md:px-12 lg:px-24">
                    <div className="text-center mb-14">
                        <h2 className="text-3xl md:text-4xl font-semibold">Our People</h2>
                        <p className="mt-4 text-gray-500 max-w-2xl mx-auto">Meet the team dedicated to empowering your business success</p>
                    </div>
                    <div className={`grid gap-8 ${landingData.people.length === 1 ? "grid-cols-1 max-w-md mx-auto" : landingData.people.length === 2 ? "grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto" : "grid-cols-1 md:grid-cols-3"}`}>
                        {landingData.people.map((person: any) => (
                            <div key={person.id} className="bg-white rounded-2xl p-10 text-center border hover:shadow-2xl transition">
                                {person.image && (
                                    <div className="flex justify-center mb-6">
                                        <img src={person.image} className="w-20 h-20 object-cover rounded-full" />
                                    </div>
                                )}
                                <h3 className="text-xl font-semibold mb-2">{person.name}</h3>
                                <p className="text-gray-500">{person.position}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* --- ABOUT SECTION --- */}
            <div id='about' className="pt-40 mb-20">
                <div className="px-6 md:px-12 lg:px-24">
                    <div className="text-center mb-14">
                        <h2 className="text-3xl md:text-4xl font-semibold">About TMS CSR</h2>
                        <p className="mt-4 text-gray-500 max-w-2xl mx-auto whitespace-pre-line">
                            {landingData.about || "Write something about your company in the dashboard."}
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="text-center bg-gray-100 border rounded-xl py-6">
                            <div className="text-4xl font-bold text-teal-600 mb-2">{landingData.statistic.businesses.toLocaleString() || "0"}</div>
                            <h3 className="text-base font-medium text-gray-600">Business Assessments</h3>
                        </div>
                        <div className="text-center bg-gray-100 border rounded-xl py-6">
                            <div className="text-4xl font-bold text-teal-600 mb-2">{landingData.statistic.provinces || "0"}</div>
                            <h3 className="text-base font-medium text-gray-600">Provinces Covered</h3>
                        </div>
                        <div className="text-center bg-gray-100 border rounded-xl py-6">
                            <div className="text-4xl font-bold text-teal-600 mb-2">{landingData.statistic.areas || "0"}</div>
                            <h3 className="text-base font-medium text-gray-600">Assessment Areas</h3>
                        </div>
                        <div className="text-center bg-gray-100 border rounded-xl py-6">
                            <div className="text-4xl font-bold text-teal-600 mb-2">{landingData.statistic.satisfaction || "0"}%</div>
                            <h3 className="text-base font-medium text-gray-600">Satisfaction Rate</h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- FOOTER --- */}
            <footer>
                <div className="bg-gray-100 border-t-2 px-6 md:px-12 lg:px-24 py-10 flex flex-col md:flex-row gap-10">
                    <div className="flex-1">
                        <div className="flex items-center gap-3">
                            <img src="/logo.svg" className="w-12" />
                            <div className="font-bold text-xl">TMS CSR</div>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed mt-3">
                            Empowering Indonesian SMEs with comprehensive business assessment tools.
                        </p>
                    </div>
                    <div className="flex-1">
                        <div className="font-bold text-lg">Contact</div>
                        <div className="text-gray-600 text-sm mt-2 space-y-1">
                            {landingData.contact.email && <p>{landingData.contact.email}</p>}
                            {landingData.contact.phone && <p>{landingData.contact.phone}</p>}
                            {landingData.contact.address && <p>{landingData.contact.address}</p>}
                            {!landingData.contact.email && !landingData.contact.phone && !landingData.contact.address && (
                                <p>Contact information not set yet.</p>
                            )}
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="font-bold text-lg mb-3">Follow Us</div>
                        <div className="flex flex-wrap gap-3">
                            {landingData.social.linkedin && (
                                <a href={landingData.social.linkedin} target="_blank" rel="noopener noreferrer" className="bg-white p-2 rounded-lg text-gray-600 w-12 mx-2 hover:bg-teal-600 hover:text-white transition duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M18.44,3.06H5.56a2.507,2.507,0,0,0-2.5,2.5V18.44a2.507,2.507,0,0,0,2.5,2.5H18.44a2.5,2.5,0,0,0,2.5-2.5V5.56A2.5,2.5,0,0,0,18.44,3.06Zm1.5,15.38a1.511,1.511,0,0,1-1.5,1.5H5.56a1.511,1.511,0,0,1-1.5-1.5V5.56a1.511,1.511,0,0,1,1.5-1.5H18.44a1.511,1.511,0,0,1,1.5,1.5Z" />
                                        <path d="M6.376,10.748a1,1,0,1,1,2,0v6.5a1,1,0,0,1-2,0Z" />
                                        <circle cx="7.376" cy="6.744" r="1" />
                                        <path d="M17.62,13.37v3.88a1,1,0,1,1-2,0V13.37a1.615,1.615,0,1,0-3.23,0v3.88a1,1,0,0,1-2,0v-6.5a1.016,1.016,0,0,1,1-1,.94.94,0,0,1,.84.47,3.609,3.609,0,0,1,5.39,3.15Z" />
                                    </svg>
                                </a>
                            )}
                            {landingData.social.instagram && (
                                <a href={landingData.social.instagram} target="_blank" rel="noopener noreferrer" className="bg-white p-2 rounded-lg text-gray-600 w-12 mx-2 hover:bg-teal-600 hover:text-white transition duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z" />
                                    </svg>
                                </a>
                            )}
                            {landingData.social.twitter && (
                                <a href={landingData.social.twitter} target="_blank" rel="noopener noreferrer" className="bg-white p-2 rounded-lg text-gray-600 w-12 mx-2 hover:bg-teal-600 hover:text-white transition duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" fill="currentColor" fillRule="evenodd">
                                        <path d="M818 800 498.11 333.745l.546.437L787.084 0h-96.385L455.738 272 269.15 0H16.367l298.648 435.31-.036-.037L0 800h96.385l261.222-302.618L565.217 800zM230.96 72.727l448.827 654.546h-76.38L154.217 72.727z" transform="translate(103 112)" />
                                    </svg>
                                </a>
                            )}
                        </div>
                    </div>
                </div>
                <div className="bg-gray-100 text-gray-600 text-center py-8 border-t-2 border-gray-300 px-6 md:px-12">
                    © 2026 TMS CSR. All rights reserved.
                </div>
            </footer>
        </>
    )
}

export default Home
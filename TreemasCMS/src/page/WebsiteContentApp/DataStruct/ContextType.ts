export type HeroComponent = {
    id: string;
    label_en: string; // Menggantikan label biasa
    label_id: string;
    icon: string;
};

export type SolutionType = {
    id: string;
    title_en: string; // Sesuai DB
    title_id: string;
    icon: string;
    description_en: string; // Sesuai DB
    description_id: string;
};

export type PeopleType = {
    id: string;
    labelName: string; 
    name: string;
    title_en: string; // Menggunakan 'title' sesuai ERD, bukan 'position'
    title_id: string;
    description_en: string; // Sesuai DB
    description_id: string;
    image: string;
};

export type ContactType = {
    email: string;
    phone: string;
    address: string;
};

export type PrefooterType = {
    title1_en: string;
    title1_id: string;
    title2_en: string;
    title2_id: string;
    description_en: string;
    description_id: string;
    backgroundImage: string;
    buttonLink: string;
};

export type StatisticsType = {
    businesses: number;
    provinces: number;
    areas: number;
    satisfaction: number;
};

export type SocialItemType = {
    platform: string;
    url: string;
    icon: string;
};

export type AllDataType = {
    title_en: string; // Hero title EN
    title_id: string; // Hero title ID
    description_en: string; // Hero desc EN
    description_id: string; // Hero desc ID
    backgroundImage: string;
    components: HeroComponent[];
    solutions: SolutionType[];
    people: PeopleType[];
    about_en: string; // About content EN
    about_id: string; // About content ID
    statistic: StatisticsType;
    contact: ContactType;
    prefooter: PrefooterType;
    social: SocialItemType[];
};
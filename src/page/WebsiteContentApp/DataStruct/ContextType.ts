export type HeroComponent = {
    id: string
    label: string
    icon: string
}

export type SolutionType = {
    id: string
    title: string
    icon: string
    description: string
}

export type PeopleType = {
    id: string
    labelName: string
    name: string
    position: string
    description: string
    image: string
}

export type ContactType = {
    email: string
    phone: string
    address: string
}

export type PrefooterType = {
    title1: string
    title2: string
    description: string
    backgroundImage: string
    buttonLink: string
}

export type StatisticsType = {
    businesses: number
    provinces: number
    areas: number
    satisfaction: number
}

export type SocialItemType = {
    platform: string;
    url: string;
    icon: string;
};


export type AllDataType = {
    title: string
    description: string
    backgroundImage: string
    components: HeroComponent[]
    solutions: SolutionType[]
    people: PeopleType[]
    about: string
    statistic: StatisticsType
    contact: ContactType
    prefooter: PrefooterType
    social: SocialItemType[]
}

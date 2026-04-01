export type HeroComponent = {
    id: string
    label: string
    image: string
}

export type SolutionType = {
    id: string
    title: string
    description: string
    image: string
}

export type PeopleType = {
    id: string
    name: string
    position: string
    image: string
}

export type ContactType = {
    email: string
    phone: string
    address: string
}

export type StatisticsType = {
    businesses: number
    provinces: number
    areas: number
    satisfaction: number
}

export type SocialType = {
    linkedin: string
    instagram: string
    twitter: string
}

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
    social: SocialType
}
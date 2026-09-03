import orinav1 from './assets/orinav/orinav-1.webp'
import orinavBase from './assets/orinav/orinav-base.webp'
import orinavInIn from './assets/orinav/orinav-inin.webp'
import orinavTesting2 from './assets/orinav/orinav-testing-2.webp'
import orinavScHome from './assets/orinav/screenshot-home.webp'
import orinavScNavigate from './assets/orinav/screenshot-navigate.webp'
import orinavScExplore from './assets/orinav/screenshot-explore.webp'
import a11y from './assets/a11ylab/a11ylab.webp'
import a11ya1 from './assets/a11ylab/a11ylab-a1.webp'
import a11ya2 from './assets/a11ylab/a11ylab-a2.webp'
import a11ya3 from './assets/a11ylab/a11ylab-a3.webp'
import a11ya4 from './assets/a11ylab/a11ylab-a4.webp'
import a11yWe1 from './assets/a11ylab/we-1.webp'
import a11yWe2 from './assets/a11ylab/we-2.webp'
import a11yWe3 from './assets/a11ylab/we-3.webp'
import a11yWe4 from './assets/a11ylab/we-4.webp'
import a11yLeaflets from './assets/a11ylab/leaflets.webp'
import a11yGroup from './assets/a11ylab/group-photo.webp'
import wa1 from './assets/webartistry/1.webp'
import wa2 from './assets/webartistry/2.webp'
import wa3 from './assets/webartistry/3.webp'
import wa4 from './assets/webartistry/4.webp'
import wa6 from './assets/webartistry/6.webp'
import wa8 from './assets/webartistry/8.webp'
import wa9 from './assets/webartistry/9.webp'
import wa11 from './assets/webartistry/11.webp'
import wa12 from './assets/webartistry/12.webp'
import waHelium1 from './assets/webartistry/helium-1.webp'
import waHelium2 from './assets/webartistry/helium-2.webp'
import waLinkBAID from './assets/webartistry/linkbaid.webp'
import waWhale from './assets/webartistry/whale.webp'
import a11yLabCover from './assets/cover/a11ylab.webp'
import heliumCover from './assets/cover/helium.webp'
import orinavCover from './assets/cover/orinav.webp'
import pioneerCover from './assets/cover/pioneer.webp'
import webArtistryCover from './assets/cover/webartistry.webp'
import whaleCover from './assets/cover/whale.webp'
import whaleMenu from './assets/whale/menu.webp'
import whaleCheckout from './assets/whale/checkout.webp'
import whaleManagement from './assets/whale/management.webp'
import whaleDetails from './assets/whale/details.webp'
import heliumAtAGlance from './assets/helium/at-a-glance.webp'
import heliumPageEditor from './assets/helium/page-editor.webp'
import heliumMedia from './assets/helium/media.webp'
import heliumMeta from './assets/helium/meta.webp'
import heliumApproval from './assets/helium/approval.webp'
import heliumBackup from './assets/helium/backup.webp'
import himcmCover from './assets/cover/himcm.webp'
import himcmParisModel from './assets/himcm/paris-model.webp'
import himcmPublicOpinion from './assets/himcm/public-opinion.webp'
import himcmWeightTrends from './assets/himcm/weight-trends.webp'
import himcmGovernmentWeights from './assets/himcm/government-weights.webp'
import himcmIsingModel from './assets/himcm/ising-model.webp'
import pioneerAlignment from './assets/pioneer/sequence-alignment.svg'
import pioneerHardware from './assets/pioneer/hardware-landscape.svg'
import pioneerOptimizations from './assets/pioneer/optimizations.svg'
import pioneerFutureDirections from './assets/pioneer/future-directions.svg'
import pioneerBenchmark from './assets/pioneer/benchmark.svg'
import type { ProjectId } from './projectRoutes'

export type { ProjectId } from './projectRoutes'

type ProjectImageBase = {
    alt: string
    position?: string
}

export type ProjectImage =
    | ProjectImageBase & {
    kind: 'project-cover'
}
    | ProjectImageBase & {
    kind: 'image'
    src: string
}

export type FourProjectImages = readonly [
    ProjectImage,
    ProjectImage,
    ProjectImage,
    ProjectImage
]

export type ThreeProjectImages = readonly [
    ProjectImage,
    ProjectImage,
    ProjectImage
]

export type ProjectStatistic = {
    description: string
    value: string
}

export type ProjectStatistics = readonly ProjectStatistic[]

type ProjectSectionBase = {
    id: string
}

export type TitleProjectSection = ProjectSectionBase & {
    breadcrumb?: readonly {
        href?: string
        label: string
    }[]
    eyebrow?: string
    title: string
    type: 'title'
}

export type TextImageProjectSection = ProjectSectionBase & {
    body: readonly string[]
    heading?: string
    image: ProjectImage
    imagePosition?: 'left' | 'right'
    type: 'text-image'
}

export type TextProjectSection = ProjectSectionBase & {
    alignment?: 'center' | 'left'
    body: readonly string[]
    heading?: string
    type: 'text'
}

export type ImageProjectSection = ProjectSectionBase & {
    image: ProjectImage
    type: 'image'
}

export type ImageGridProjectSection = ProjectSectionBase & {
    images: FourProjectImages
    type: 'image-grid'
}

export type TextImageGridProjectSection = ProjectSectionBase & {
    body: readonly string[]
    heading?: string
    images: FourProjectImages
    type: 'text-image-grid'
}

export type PhoneImageGridProjectSection = ProjectSectionBase & {
    images: ThreeProjectImages
    type: 'phone-image-grid'
}

export type TextPhoneImageGridProjectSection = ProjectSectionBase & {
    body: readonly string[]
    heading?: string
    images: ThreeProjectImages
    type: 'text-phone-image-grid'
}

export type StatisticsGridProjectSection = ProjectSectionBase & {
    items: ProjectStatistics
    type: 'statistics-grid'
}

export type SmallTextProjectSection = ProjectSectionBase & {
    button?: {
        href: string
        label: string
    }
    text: string
    type: 'small-text'
}

export type ProjectSection =
    | TitleProjectSection
    | TextImageProjectSection
    | TextProjectSection
    | ImageProjectSection
    | ImageGridProjectSection
    | TextImageGridProjectSection
    | PhoneImageGridProjectSection
    | TextPhoneImageGridProjectSection
    | StatisticsGridProjectSection
    | SmallTextProjectSection

export type Project = {
    color: string
    id: ProjectId
    label: string
    path: string
    sections: readonly ProjectSection[]
    seo: {
        description: string
        image: string
        title: string
    }
}

export const PROJECTS = [
    {
        color: '#7300ff',
        id: 'orinav',
        label: 'Orinav: navigation app for people with visual impairments',
        path: '/projects/orinav',
        seo: {
            title: 'Orinav: Accessible Navigation App',
            description: 'Explore Orinav, Lin\'s navigation app helping 700+ people with visual impairments across 5 countries travel more independently.',
            image: orinavCover
        },
        sections: [
            {
                type: 'title',
                id: 'o1',
                eyebrow: 'Founder & Project Lead',
                title: 'Orinav: navigation app for people with visual impairments'
            },
            {
                type: 'text-image',
                id: 'o2',
                body: [ 'Today, 700+ people with visual impairments across 5 countries are enjoying a better way to explore the world: Orinav.' ],
                imagePosition: 'right',
                image: {
                    kind: 'image',
                    src: orinav1,
                    alt: 'Several people with visual impairments walking with Orinav open; volunteers nearby are recording their feedback.'
                }
            },
            {
                type: 'text',
                id: 'o3',
                alignment: 'left',
                heading: 'Explore freely, move boldly.',
                body: [
                    'Independent outdoor travel requires more than just knowing the route.',
                    'For people with visual impairments, it also requires awareness of obstacles, crossings, and hazards—information not readily available without sight.',
                    'However, existing navigation apps provide limited to no support for this task. Orinav is a better mobile navigation app that addresses this problem.'
                ]
            },
            {
                type: 'text-phone-image-grid',
                id: 'o6',
                body: [
                    'Developed in collaboration with the Institute of Accessibility Development at Tsinghua University, Orinav integrates obstacle detection, crossing assistance, traffic light recognition, turn-by-turn guidance, and sidewalk-orientation in one app.'
                ],
                images: [
                    {
                        kind: 'image',
                        src: orinavScHome,
                        alt: 'Orinav\'s home screen, prominently displaying a search button.'
                    },
                    {
                        kind: 'image',
                        src: orinavScNavigate,
                        alt: 'Orinav\'s Navigate screen, simplified to remove the clutter of a traditional interactive map.'
                    },
                    {
                        kind: 'image',
                        src: orinavScExplore,
                        alt: 'Orinav\'s Explore screen, helping users navigate nearby obstacles and traffic lights with ease.'
                    }
                ]
            },
            {
                type: 'statistics-grid',
                id: 'o5',
                items: [
                    {
                        description: 'On common suburban routes, Orinav has been experimentally proven to reduce navigation time by up to 12%.',
                        value: '12%'
                    },
                    {
                        description: 'It reduces the number of hesitations by up to 44% compared to traditional navigation apps.',
                        value: '44%'
                    },
                    {
                        description: 'Orinav can also decrease the number of hazardous approaches by up to 43% compared to traditional navigation apps.',
                        value: '43%'
                    },
                    {
                        description: 'Orinav earns an 85/100 System Usability Scale score, indicating a high level of usability and user satisfaction.',
                        value: '85/100'
                    }
                ]
            },
            {
                type: 'text-image-grid',
                id: 'o4',
                body: [ 'We have collaborated with Hequn Public Welfare, a registered Chinese disability charity with 5,000+ volunteers, to bring Orinav to people with visual impairments in Beijing.' ],
                images: [
                    {
                        kind: 'image',
                        src: orinavBase,
                        alt: 'Volunteers from Team Orinav interviewing people with visual impairments and experiencing the navigation process with them.'
                    },
                    {
                        kind: 'image',
                        src: orinavTesting2,
                        alt: 'An early prototype of Orinav being tested by a blind user, with Lin nearby.'
                    },
                    {
                        kind: 'image',
                        src: a11ya1,
                        alt: 'A group walks along a tree-lined path, led by a man wearing sunglasses and using a white cane, with several companions walking beside and behind him.'
                    },
                    {
                        kind: 'image',
                        src: a11ya2,
                        alt: 'A man using a white cane stands with a group beside a city street as several companions raise their hands and gesture toward something ahead.'
                    }
                ]
            },
            {
                type: 'statistics-grid',
                id: 'o9',
                items: [
                    {
                        description: 'Today, 700+ active users across 5 countries are using Orinav to improve their travels session by session.',
                        value: '700'
                    },
                    {
                        description: 'Users of Orinav hail from China, the Netherlands, Egypt, the United Kingdom, and the United States.',
                        value: '5'
                    },
                    {
                        description: 'Each user launched 11.2 navigation tasks on average during the first month of Orinav\'s launch.',
                        value: '11.2'
                    }
                ]
            },
            {
                type: 'text-image',
                id: 'o8',
                body: [ 'Orinav has been presented to more than 1,200 experts across various fields, including at Inclusive Innovations, an event hosted by assistive technology company Envision.' ],
                image: {
                    kind: 'image',
                    src: orinavInIn,
                    alt: 'Lin speaks at Inclusive Innovations, a conference on assistive technology hosted by Envision Technologies in the Netherlands.'
                }
            },
            {
                type: 'statistics-grid',
                id: 'o11',
                items: [
                    {
                        description: 'Orinav has been selected for 5/100 projects to be presented at Inclusive Innovations—and is the only high school project to be selected.',
                        value: '5/100'
                    },
                    {
                        description: 'Orinav has been designated as one among 3 "Highly Commended" projects at the Tech4Good Awards out of 36 finalists from 200+ entrants.',
                        value: '3/200+'
                    },
                    {
                        description: 'Orinav has been featured on reports from The Beijing News, Beijing Media Network\'s News Express, and AbilityNet.',
                        value: 'News'
                    }
                ]
            },
            {
                type: 'small-text',
                id: 'o7',
                text: 'Orinav is a product from A11yLab: The Beijing Academy Student Accessibility Initiative. Learn more on our website.',
                button: {
                    href: 'https://orinav.com/',
                    label: 'Learn More'
                }
            }
        ]
    },
    {
        color: '#390099',
        id: 'a11ylab',
        label: 'A11yLab: The Beijing Academy Student Accessibility Initiative',
        path: '/projects/a11ylab',
        seo: {
            title: 'A11yLab: Student Accessibility Initiative',
            description: 'See how Lin founded A11yLab, a 23-member student initiative whose accessibility programs have reached more than 900 community members.',
            image: a11yLabCover
        },
        sections: [
            {
                type: 'title',
                id: 'a1',
                eyebrow: 'Founder & President',
                title: 'A11yLab: The Beijing Academy Student Accessibility Initiative'
            },
            {
                type: 'text-image',
                id: 'a2',
                body: [ '900+ community members—with or without disabilities—have benefitted from A11yLab\'s programs dedicated to making accessibility understood and lived.' ],
                imagePosition: 'right',
                image: {
                    kind: 'image',
                    src: a11y,
                    alt: 'A volunteer guides a student experiencing the use of a white cane while blindfolded.'
                }
            },
            {
                type: 'text',
                id: 'a3',
                alignment: 'left',
                heading: 'Love Without Barriers',
                body: [
                    'A11yLab: The Beijing Academy Student Accessibility Initiative dedicates itself to making accessibility understood and realized.',
                    'We do this through awareness campaigns, volunteer service, student-built assistive technology, and collaborations with NGOs, higher-education institutions, and accessibility practitioners.'
                ]
            },
            {
                type: 'text-image-grid',
                id: 'a10',
                body: [ 'A11yLab\'s White Cane Experience brings students a glimpse of accessibility through an engaging, scalable hands-on experience.',
                    'At its debut, more than 120 participants joined in just 1.5 hours, gaining a initial understanding of how impairments interact with inaccessible environments to create disability.' ],
                images: [
                    {
                        kind: 'image',
                        src: a11yWe1,
                        alt: 'Students gather outdoors beside a Disability Impairment Accessibility event poster, with one student holding a white cane as others prepare for the activity.'
                    },
                    {
                        kind: 'image',
                        src: a11yWe2,
                        alt: 'A blindfolded student walks across the school courtyard using a white cane while another student accompanies them and classmates watch nearby.'
                    },
                    {
                        kind: 'image',
                        src: a11yWe3,
                        alt: 'A blindfolded student practices navigating with a white cane across an open paved area while another student walks alongside.'
                    },
                    {
                        kind: 'image',
                        src: a11yWe4,
                        alt: 'A blindfolded adult participant walks with a white cane during the accessibility activity, accompanied by a student as several adults observe in the background.'
                    }
                ]
            },
            {
                type: 'statistics-grid',
                id: 'a4',
                items: [
                    {
                        description: '23 volunteers, including a 5-member core team, are at the heart of all that we do at A11yLab.',
                        value: '23'
                    },
                    {
                        description: 'Our debut event, the White Cane Experience, has received 122 participants over 1.5 hours of activities.',
                        value: '120+'
                    },
                    {
                        description: '463 leaflets helped community members understand accessibility basics and how they can contribute.',
                        value: '460+'
                    },
                    {
                        description: 'A11yLab produces Orinav, a navigation app used by 700+ active users across 5 countries to explore the world safely and independently.',
                        value: '700+'
                    }
                ]
            },
            {
                type: 'text-image',
                id: 'a8',
                body: [ 'A11yLab\'s signature educational leaflet, "Disability, Impairment, Accessibility," is your first introduction to the world of accessibility.',
                    'Designed in collaboration with the Tsinghua University Institute for Accessibility Development, the leaflet has been distributed to over 460 community members in a single day.' ],
                imagePosition: 'right',
                image: {
                    kind: 'image',
                    src: a11yLeaflets,
                    alt: 'A close-up of a stack of leaflets with the title "Disability, Impairment, Accessibility."'
                }
            },
            {
                type: 'text-image-grid',
                id: 'a5',
                body: [ 'Over the past July, A11yLab launched a collaboration with Hequn Public Welfare—a registered Chinese disability charity with 5,000+ volunteers—to promote disability inclusion through a museum group visit.' ],
                images: [
                    {
                        kind: 'image',
                        src: a11ya1,
                        alt: 'A group walks along a tree-lined path, led by a man wearing sunglasses and using a white cane, with several companions walking beside and behind him.'
                    },
                    {
                        kind: 'image',
                        src: a11ya2,
                        alt: 'A man using a white cane stands with a group beside a city street as several companions raise their hands and gesture toward something ahead.'
                    },
                    {
                        kind: 'image',
                        src: a11ya3,
                        alt: 'Three people sit together indoors, smiling for the camera; Lin in the center raises a peace sign while the man on the left has a visual impairment.'
                    },
                    {
                        kind: 'image',
                        src: a11ya4,
                        alt: 'A large group of adults and students poses for a group photo inside the China Scientists Museum beneath the Pillars of the Republic exhibition display.'
                    }
                ]
            },
            {
                type: 'text-image',
                id: 'a6',
                body: [ 'Special thanks to our 23 volunteers, 5 faculty coordinators, Hequn Public Welfare, and Tsinghua ADI — A11yLab wouldn’t have been possible without your support.' ],
                imagePosition: 'left',
                image: {
                    kind: 'image',
                    src: a11yGroup,
                    alt: 'A group photo of A11yLab volunteers, posing around the White Cane Experience stand-up poster.'
                }
            }
        ]
    },
    {
        color: '#ffbd00',
        id: 'webartistry',
        label: 'WebArtistry: the Beijing Academy programming and technology club',
        path: '/projects/webartistry',
        seo: {
            title: 'WebArtistry: Programming and Technology Club',
            description: 'Explore WebArtistry, Lin\'s 33-member student technology club building school platforms and expanding computer science education.',
            image: webArtistryCover
        },
        sections: [
            {
                type: 'title',
                id: 'w1',
                eyebrow: 'Founder & President',
                title: 'WebArtistry: the Beijing Academy programming and technology club'
            },
            {
                type: 'text-image',
                id: 'w2',
                body: [ 'Welcome to WebArtistry!', 'Through WebArtistry Projects and WebArtistry Learning, we develop the technical backbone of the Beijing Academy community and teach our members fundamental computational skills of the 21st century.' ],
                imagePosition: 'right',
                image: {
                    kind: 'image',
                    src: wa4,
                    alt: 'Students gather around the sofa of Beijing Academy\'s lobby to participate in WebArtistry\'s bi-semester computational knowledge quiz.'
                }
            },
            {
                type: 'text',
                id: 'w3',
                alignment: 'left',
                heading: 'Let\'s build everything!',
                body: [
                    'WebArtistry is the programming and technology club of the Beijing Academy community.',
                    'We are a student-led initiative that builds websites, apps, and other digital products for Beijing Academy and teach students at and beyond Beijing Academy fundamental computational skills in the 21st century.'
                ]
            },
            {
                type: 'text-image-grid',
                id: 'w4',
                body: [ 'WebArtistry Projects are the backbone of everyday life at Beijing Academy.',
                    'Almost 97% of Beijing Academy International Division students have interacted with our services.',
                    'And they serve 50+ students every single day.' ],
                images: [
                    {
                        kind: 'image',
                        src: waHelium1,
                        alt: 'Beijing Academy International Education About Us webpage, showing a top navigation bar, the school mission statement about cultivating globally minded future leaders, a large About Us heading, and a campus photograph beneath.'
                    },
                    {
                        kind: 'image',
                        src: waHelium2,
                        alt: 'Website content-management editor for Beijing Academy International Education, displaying a Chinese homepage preview titled 一览北中. The page features cards about the school motto, university admissions, international student destinations, academics, sports, and an international faculty, with draggable page components listed in a sidebar.'
                    },
                    {
                        kind: 'image',
                        src: waLinkBAID,
                        alt: 'LinkBAID login page for Beijing Academy, with the school logo above two large sign-in options: Seiue LMS for students and Feishu for faculty. A note below explains that login access is provided during onboarding and directs users to IT services for help.'
                    },
                    {
                        kind: 'image',
                        src: waWhale,
                        alt: 'The Whale Café online ordering page, showing a menu of flavored Americanos and lattes with product images, descriptions, ¥11 prices, and Add buttons. An empty shopping-cart panel on the right shows a total of ¥0 and a checkout button.'
                    }
                ]
            },
            {
                type: 'statistics-grid',
                id: 'w5',
                items: [
                    {
                        description: '33 members, including a 4-member developer team, are at the heart of WebArtistry\'s work.',
                        value: '33'
                    },
                    {
                        description: 'WebArtistry\'s products have been used by 320+ people across the Beijing Academy International Division community—that\'s almost 97% of the student body!',
                        value: '320+'
                    },
                    {
                        description: 'The economic value of WebArtistry products is estimated to be ~CN¥110,000.',
                        value: '~ ¥110,000'
                    },
                    {
                        description: 'WebArtistry\'s products serve 50+ students every single day, helping them navigate the BAID community with ease.',
                        value: '50+'
                    }
                ]
            },
            {
                type: 'text-image',
                id: 'w10',
                body: [ 'We believe in the power of computer science to transform the future of brilliant young minds.',
                    'That\'s why we have developed our signature Introduction to Computer Science and Web Development course, tailored to the needs of high school students.',
                    'Rating their satisfaction 4.8/5 on average, these students are part of the WebArtistry Learning community\'s Class of 2024.' ],
                image: {
                    kind: 'image',
                    src: wa11,
                    alt: 'A group photo of WebArtistry Class of 2024, with Lin lying in the center.'
                }
            },
            {
                type: 'text-image-grid',
                id: 'w8',
                body: [ 'Everyone deserves the chance to discover what they can create through computer science.',
                    'Driven by that belief, WebArtistry partnered with Zhoushan Nanhai School to bring 3 computer science seminars and exchanges to 44 students.',
                    'Together, these students completed 11 capstone projects—an exciting demonstration of their newfound programming skills.' ],
                images: [
                    {
                        kind: 'image',
                        src: wa6,
                        alt: 'A WebArtistry instructor demonstrates HTML code at the front of a computer classroom, with the code projected onto a large display behind him.'
                    },
                    {
                        kind: 'image',
                        src: wa8,
                        alt: 'Students attend a WebArtistry coding session in a computer lab while an instructor’s code is projected at the front of the room.'
                    },
                    {
                        kind: 'image',
                        src: wa9,
                        alt: 'A student works through a web development exercise in Visual Studio Code, with HTML code open on the monitor and printed instructions beside the computer.'
                    },
                    {
                        kind: 'image',
                        src: wa12,
                        alt: 'Two students collaborate on a web development task, reviewing code on their monitors and using printed guides as they work.'
                    }
                ]
            },
            {
                type: 'statistics-grid',
                id: 'w9',
                items: [
                    {
                        description: 'lessons cover the basics of computer usage, programming, and web development, and are delivered in a hands-on format.',
                        value: '18'
                    },
                    {
                        description: 'students across different provinces are members of the WebArtistry Learning community.',
                        value: '~ 100'
                    },
                    {
                        description: 'hours of instruction have cemented a computer science foundation in students across provinces.',
                        value: '150+'
                    }
                ]
            },
            {
                type: 'text-image-grid',
                id: 'w6',
                body: [ 'WebArtistry brings computer science to life across Beijing Academy through extensive community engagement.' ],
                images: [
                    {
                        kind: 'image',
                        src: wa1,
                        alt: 'Kahoot winners displayed on a festive results screen.'
                    },
                    {
                        kind: 'image',
                        src: wa2,
                        alt: 'Students participating in a WebArtistry activity with laptops and a microphone.'
                    },
                    {
                        kind: 'image',
                        src: wa3,
                        alt: 'Two students presenting with laptops and a microphone.'
                    },
                    {
                        kind: 'image',
                        src: wa4,
                        alt: 'WebArtistry students gathered together during a group activity.'
                    }
                ]
            },
            {
                type: 'text',
                id: 'w7',
                alignment: 'left',
                heading: '12 events and ongoing!',
                body: [ 'At the end of every semester, WebArtistry brings something new to the table: Kahoot quizzes, live demos... activities that attract students from across BAID.',
                    'These events have become a cornerstone of campus life. Almost every student has joined a WebArtistry event at least once.' ]
            },
            {
                type: 'small-text',
                id: 'w11',
                text: 'Learn more about WebArtistry Projects on our GitHub.',
                button: {
                    href: 'https://github.com/WebArtistryBAID',
                    label: 'Learn More'
                }
            }
        ]
    },
    {
        color: '#00b8a9',
        id: 'whale',
        label: 'Project Whale: an online ordering system for the student-run The Whale Café',
        path: '/projects/whale',
        seo: {
            title: 'Project Whale: Café Ordering Platform',
            description: 'See how Project Whale\'s café ordering platform serves 40+ daily users while raising payment completion to 98% and monthly revenue by over 30%.',
            image: whaleCover
        },
        sections: [
            {
                type: 'title',
                id: 'w1',
                eyebrow: 'Founder & Project Lead',
                title: 'Project Whale: an online ordering system for the student-run The Whale Café'
            },
            {
                type: 'text-image',
                id: 'w2',
                body: [ 'With professional order tracking and management, Project Whale empowers The Whale Café to provide a seamless and efficient ordering experience for their customers.' ],
                imagePosition: 'right',
                image: {
                    kind: 'image',
                    src: whaleCover,
                    alt: 'A matcha latte with a heart shape made of milk on the surface.'
                }
            },
            {
                type: 'text',
                id: 'w3',
                alignment: 'left',
                heading: 'The Whale Café had a problem.',
                body: [
                    'For a student-run café that only operated during lunch break, it was doing unexpectedly well, receiving 20+ orders an hour...',
                    'If only they actually made the drinks!',
                    'Because of a slow and inefficient ordering process, the café had a whopping 34% refund rate as customers constantly complained of missing drinks.',
                    'And the payment rate was only 55% due to a "pay later" system that was difficult to manage.'
                ]
            },
            {
                type: 'text-image-grid',
                id: 'w4',
                body: [ 'Developed with Next.js, Project Whale integrates the school identity portal to track student orders and payments, enabling data-driven decisions about café operations.',
                    'It also supports pre-ordering when the café is closed and provides a dynamic quota to ensure that the café never runs out of drinks.' ],
                images: [
                    {
                        kind: 'image',
                        src: whaleMenu,
                        alt: 'The Whale Café online ordering page displays a bilingual drink menu with flavored Americanos and lattes, item images, prices, Add buttons, and an empty cart panel.'
                    },
                    {
                        kind: 'image',
                        src: whaleDetails,
                        alt: 'Product customization page for an Apricot Americano, featuring a large apricot illustration, drink description, sugar, size, temperature options, quantity controls, and an Add button.',
                        position: 'center 20%'
                    },
                    {
                        kind: 'image',
                        src: whaleCheckout,
                        alt: 'Checkout page showing a ¥11 order total, 10-minute estimated wait, Weixin Pay and Stripe options, selectable pickup times, coupon field, and Pay button.',
                        position: 'center 8%'
                    },
                    {
                        kind: 'image',
                        src: whaleManagement,
                        alt: 'The Whale Café staff order dashboard shows pre-order status and three active orders with order numbers, customer names, pickup times, drink customizations, and Done and Details buttons.',
                        position: 'center 30%'
                    }
                ]
            },
            {
                type: 'statistics-grid',
                id: 'w5',
                items: [
                    {
                        description: 'Project Whale serves 40+ users every single day.',
                        value: '40+'
                    },
                    {
                        description: 'Payment rate raised from 55% to 98% after Project Whale\'s launch.',
                        value: '98%'
                    },
                    {
                        description: 'Monthly revenue has increased by 30%+ with targeted, data-driven promotions.',
                        value: '30%+'
                    },
                    {
                        description: 'Refund rate dropped to 0.6% with implementation of dynamic quota.',
                        value: '0.6%'
                    }
                ]
            },
            {
                type: 'small-text',
                id: 'w6',
                text: 'If you are a Beijing Academy student, why don\'t you grab a drink now? Project Whale is live and ready to serve you!',
                button: {
                    href: 'https://whaleservices.cc/',
                    label: 'Order Now'
                }
            }
        ]
    },
    {
        color: '#eb004d',
        id: 'helium',
        label: 'Beijing Academy Website Modernization Project',
        path: '/projects/helium',
        seo: {
            title: 'Beijing Academy Website Modernization',
            description: 'Explore Lin\'s Beijing Academy website modernization, featuring a 34-component editor and faster loading, with estimated savings of CN¥100,000.',
            image: heliumCover
        },
        sections: [
            {
                type: 'title',
                id: 'h1',
                eyebrow: 'Project Lead',
                title: 'Beijing Academy Website Modernization Project'
            },
            {
                type: 'text-image',
                id: 'h2',
                body: [ 'The new Beijing Academy website delivers a faster, more modern workflow with Feishu and Seiue integration and 40% shorter loading times. It\'s estimated to save ¥100,000 over third-party solutions.' ],
                imagePosition: 'right',
                image: {
                    kind: 'image',
                    src: heliumAtAGlance,
                    alt: 'Beijing Academy International Education webpage featuring an At a Glance overview with the school motto, college outcomes, faculty statistics, global destinations, academic excellence, student life, and international faculty highlights.'
                }
            },
            {
                type: 'text',
                id: 'h3',
                alignment: 'left',
                heading: 'This is Beijing Academy',
                body: [
                    'Launched in 2013, Beijing Academy\'s original website has gone more than a decade without a major upgrade. Its age becomes apparent as soon as you open it: 73% of links on the homepage are dead or stale, while limited English translation makes the site unsuitable for an international audience.',
                    'The new website brings Beijing Academy up to date with a faster, more modern platform built around the school\'s current needs and global community.'
                ]
            },
            {
                type: 'text-image',
                id: 'h4',
                body: [ 'Our modernized, Puck-based page editor comes with 34 pre-designed components, allowing for uniform yet finessed control over the website\'s appearance.' ],
                imagePosition: 'right',
                image: {
                    kind: 'image',
                    src: heliumPageEditor,
                    alt: 'Beijing Academy\'s website editor displays the Academics page in a visual content-management interface, with reusable components on the left, a live page preview in the center, and page settings and publishing controls on the right.'
                }
            },
            {
                type: 'text-image',
                id: 'h5',
                body: [ 'Media files are uploaded centrally and automatically optimized to the modern WebP format, improving first-load time by up to 40%.' ],
                imagePosition: 'left',
                image: {
                    kind: 'image',
                    src: heliumMedia,
                    alt: 'Helium\'s media library displays a paginated gallery of school photos and graphics, with upload controls and sidebar access to pages, site settings, user management, backups, and content tools.',
                    position: 'left'
                }
            },
            {
                type: 'text-image',
                id: 'h6',
                body: [ 'Built-in search engine optimization and generative AI optimization make the website up to 3 times more discoverable by Google and ChatGPT.' ],
                imagePosition: 'right',
                image: {
                    kind: 'image',
                    src: heliumMeta,
                    alt: 'Helium\'s site settings page allows administrators to edit bilingual website information, manage navigation links, switch languages, and review or publish changes from a centralized interface.',
                    position: 'left'
                }
            },
            {
                type: 'text-image',
                id: 'h7',
                body: [ 'An approval process integrates trusted identity verification through the school portal. Each page must be approved by 3 independent parties, ensuring the website\'s security.' ],
                imagePosition: 'left',
                image: {
                    kind: 'image',
                    src: heliumApproval,
                    alt: 'Helium\'s review and publishing workflow tracks content from drafting through editor and administrator approval, with Feishu review notifications and clear publication status for each article.',
                    position: 'left'
                }
            },
            {
                type: 'text-image',
                id: 'h8',
                body: [ 'A backup and recovery system ensures that all data can be restored in case of unforeseen circumstances.' ],
                imagePosition: 'right',
                image: {
                    kind: 'image',
                    src: heliumBackup,
                    alt: 'Helium\'s backup management page lists automatic and manual website backups with creation dates, file sizes, and controls to download, restore, or delete each backup.',
                    position: 'left'
                }
            },
            {
                type: 'statistics-grid',
                id: 'h9',
                items: [
                    {
                        description: 'Automatic optimization of media files improves first-load speed by up to 40%.',
                        value: '40%'
                    },
                    {
                        description: 'Modern server-side rendering technologies improve Lighthouse score by up to 60 points.',
                        value: '+60'
                    },
                    {
                        description: 'With a DeepSeek-powered automatic translation workflow, it only takes 78 seconds on average to synchronize one WeChat article to the website.',
                        value: '78s'
                    },
                    {
                        description: 'Our in-house solution saves the school approximately CN¥100,000 compared to third-party solutions.',
                        value: '¥100,000'
                    }
                ]
            },
            {
                type: 'small-text',
                id: 'h10',
                text: 'Visit the Beijing Academy website now to feel the difference.',
                button: {
                    href: 'https://baid.beijingacademy.com.cn/',
                    label: 'Visit Now'
                }
            }
        ]
    },
    {
        color: '#ff5400',
        id: 'himcm',
        label: 'To Play or Not To Play: Modeling Future Olympic Games',
        path: '/projects/himcm',
        seo: {
            title: 'HiMCM: Olympic Sports Selection Model',
            description: 'Explore the HiMCM Finalist PARIS model, which evaluates 41 sports across 12 factors to forecast additions to the 2032 Brisbane Olympics.',
            image: himcmCover
        },
        sections: [
            {
                type: 'title',
                id: 'hm1',
                eyebrow: 'Research · HiMCM 2024 Finalist',
                title: 'To Play or Not To Play: Modeling Future Olympic Games'
            },
            {
                type: 'text-image',
                id: 'hm2',
                body: [ 'How should the Olympics decide the sports to add in future programs? Our team built PARIS, a quantitative model evaluating 41 sports through public opinion and government priorities, then forecasts which events best fit the 2032 Brisbane Games.' ],
                imagePosition: 'right',
                image: {
                    kind: 'image',
                    src: himcmCover,
                    alt: 'Low-angle view of Beijing\'s Olympic Tower rising against a blue sky, framed by golden autumn foliage.'
                }
            },
            {
                type: 'text',
                id: 'hm3',
                alignment: 'left',
                heading: 'Selecting tomorrow\'s Olympic sports',
                body: [
                    'Sports enter and leave the Olympic Games as the audience and host cities change.',
                    'The International Olympic Committee considers broad criteria ranging from popularity and accessibility to sustainability, innovation, gender equity, inclusivity, and safety. PARIS measures these criteria in 12 factors, then combines public opinion with government priorities to score each candidate.'
                ]
            },
            {
                type: 'text-image',
                id: 'hm4',
                body: [
                    'PARIS begins by using BERT to measure how closely social media discussions relate to each factor. AHP estimates government priorities from policy research. Regression projects how both sets of weights change over time, while an Ising model adjusts their relative weights.'
                ],
                imagePosition: 'right',
                image: {
                    kind: 'image',
                    src: himcmParisModel,
                    alt: 'The five stages of the PARIS model: public opinion analysis, government weighting, regression, an Ising model, and final scoring.'
                }
            },
            {
                type: 'statistics-grid',
                id: 'hm5',
                items: [
                    {
                        description: 'We evaluated 41 sports, including established Olympic events and potential candidates.',
                        value: '41'
                    },
                    {
                        description: '12 measurable factors cover public interest, access, sustainability, inclusion, and safety.',
                        value: '12'
                    },
                    {
                        description: 'The model was validated against Olympic program decisions across the 2020, 2024, and 2028 Games.',
                        value: '3 Games'
                    },
                    {
                        description: 'Input changes of up to ±2% produced only slight score adjustments during sensitivity analysis.',
                        value: '±2%'
                    }
                ]
            },
            {
                type: 'text-image-grid',
                id: 'hm6',
                body: [
                    'Public opinion weights came from Olympic discussions on Reddit and Twitter. BERT embeddings and cosine similarity measured how strongly each comment related to the 12 factors.',
                    'Government weights came from 12 × 12 AHP comparison matrices informed by policy research and historical events.',
                    'Regression captured changes in each factor over time. An Ising model adjusted the balance between public influence and government decisions as social participation varies.'
                ],
                images: [
                    {
                        kind: 'image',
                        src: himcmPublicOpinion,
                        alt: 'Diagram of BERT token embeddings and cosine similarity used to measure how strongly social media comments relate to each Olympic selection factor.'
                    },
                    {
                        kind: 'image',
                        src: himcmWeightTrends,
                        alt: 'Twelve charts showing changes in public opinion weights from 2012 to 2024, including increasing attention to gender equality and environmental impact.'
                    },
                    {
                        kind: 'image',
                        src: himcmGovernmentWeights,
                        alt: 'Ten heat maps of 12 by 12 AHP pairwise comparison matrices used to derive government weights from 1988 to 2024.'
                    },
                    {
                        kind: 'image',
                        src: himcmIsingModel,
                        alt: 'Diagram comparing social influence among individuals with interacting spins in an Ising model, used to vary the balance between public and government weights.'
                    }
                ]
            },
            {
                type: 'text',
                id: 'hm7',
                alignment: 'left',
                heading: 'The model validated recent Olympic decisions.',
                body: [
                    'For 2020, all six newly included sports ranked among the top eight candidates that had been absent from the previous Games. For 2024, breaking ranked second among previously excluded sports.',
                    'For 2028, cricket ranked sixth overall, while flag football placed among the leading candidates at nineteenth. Football, basketball, swimming, athletics, and cycling consistently remained within the top 10 across different years and host countries.'
                ]
            },
            {
                type: 'small-text',
                id: 'hm10',
                text: 'Selected as a HiMCM 2024 Finalist in the top 5% of 1,055 teams, our solution was one of 11 finalist papers featured for outstanding model development and the only featured paper recognized as an "exceptional example" of AI use.',
                button: {
                    href: 'https://www.contest.comap.com/highschool/contests/himcm/flyers/Cons_HiMCM.pdf',
                    label: 'Read Judge Comments'
                }
            }
        ]
    },
    {
        color: '#9e0059',
        id: 'pioneer',
        label: 'Advancements in Hardware Accelerators for Sequence Alignment Algorithms',
        path: '/projects/pioneer',
        seo: {
            title: 'Hardware Accelerators for Sequence Alignment',
            description: 'Read Lin\'s research project on hardware accelerators for genomic sequence alignment, including two PyRTL reimplementations and benchmarks.',
            image: pioneerCover
        },
        sections: [
            {
                type: 'title',
                id: 'p1',
                eyebrow: 'Research · Pioneer Research Institute 2025',
                title: 'Advancements in Hardware Accelerators for Sequence Alignment Algorithms'
            },
            {
                type: 'text-image',
                id: 'p2',
                body: [
                    'Under the mentorship of Hamilton College Professor Mark Bailey, I investigated how specialized hardware can accelerate sequence alignment, a computational foundation of genomic analysis.',
                    'I reviewed 13 accelerator designs, reimplemented two representative architectures in PyRTL, and wrote a 25-page research paper.'
                ],
                imagePosition: 'right',
                image: {
                    kind: 'project-cover',
                    alt: 'A close view of an analog computer.'
                }
            },
            {
                type: 'text',
                id: 'p3',
                alignment: 'left',
                heading: 'Finding speed at the software boundary',
                body: [
                    'Next-generation sequencing produces vast numbers of short DNA fragments. Sequence alignment maps those reads to reference genomes, supporting applications from gene identification to phylogenetic analysis.',
                    'The volume of genomic data creates performance bottlenecks for conventional software. My research examines how FPGAs, ASICs, and processing-in-memory architectures address those limits.'
                ]
            },
            {
                type: 'statistics-grid',
                id: 'p4',
                items: [
                    {
                        description: 'hardware accelerator designs reviewed across recent literature',
                        value: '13'
                    },
                    {
                        description: 'academic sources synthesized across architectures and biological applications.',
                        value: '35'
                    },
                    {
                        description: 'representative architectures independently implemented and benchmarked in PyRTL',
                        value: '2'
                    },
                    {
                        description: 'professor-awarded grade, #1 in cohort',
                        value: 'A'
                    }
                ]
            },
            {
                type: 'text-image',
                id: 'p5',
                body: [
                    'I reimplemented an FPGA systolic-array design by El-Wafa et al. and a shift-register design by Di Tucci et al. Both ran on the same 4,096-base reference and 50 synthetic 512-base queries generated with a fixed random seed.',
                    'The shift-register architecture reached 511.75 cell updates per cycle, compared with 0.5 for the sequential baseline.'
                ],
                imagePosition: 'right',
                image: {
                    kind: 'image',
                    src: pioneerBenchmark,
                    alt: 'Logarithmic dot plot showing throughput of 0.5, 1, and 1.5 cell updates per cycle for El-Wafa variants, compared with 511.75 for the Di Tucci shift-register architecture.'
                }
            },
            {
                type: 'text-image-grid',
                id: 'p6',
                body: [
                    'The paper traces the field from FPGA systolic arrays through ASICs and processing-in-memory designs.',
                    'Across these designs, I identified seven recurring optimization methods.'
                ],
                images: [
                    {
                        kind: 'image',
                        src: pioneerAlignment,
                        alt: 'Diagram aligning two DNA sequences and marking matches, a mismatch, and a gap.'
                    },
                    {
                        kind: 'image',
                        src: pioneerHardware,
                        alt: 'Diagram showing sequence-alignment acceleration progressing from CPUs to FPGAs, ASICs, and processing-in-memory architectures.'
                    },
                    {
                        kind: 'image',
                        src: pioneerOptimizations,
                        alt: 'Seven recurring accelerator optimizations: bit-level encoding, anti-diagonal parallelism, dynamic banding, windowing and tiling, lookahead and pipelining, traceback compression, and early termination.'
                    },
                    {
                        kind: 'image',
                        src: pioneerFutureDirections,
                        alt: 'Three future directions: biologically meaningful scoring, systems supporting both short and long reads, and standardized datasets and metrics.'
                    }
                ]
            },
            {
                type: 'text',
                id: 'p7',
                alignment: 'left',
                heading: 'A roadmap for faster genomic analysis',
                body: [
                    'The review found a mapping between workflows and optimal designs. Banded Smith-Waterman and Bitap-based accelerators are suitable for short reads, while tile-based and wavefront approaches are more scalable for long reads.',
                    'I identify two hardware research directions: extending Bitap accelerators to support biologically meaningful scoring and designing general-purpose systems for both short and long reads. Standardized datasets and metrics are also needed for fair comparison.'
                ]
            },
            {
                type: 'small-text',
                id: 'p8',
                text: 'Professor Mark Bailey, Chair of Computer Science at Hamilton College, awarded the paper an A and rated all four evaluated research qualities Excellent. He placed my potential for undergraduate academic work in the top 10% of students he has mentored and commented that the paper was "exceptional work."'
            }
        ]
    }
] as const satisfies readonly Project[]

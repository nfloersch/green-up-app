export default {
    session : {
        user: {
            _id: null,
            firstName: 'Zoey',
            lastName: 'James',
            email: 'z@z.com',
            messages: [
                {
                    _id: '123',
                    title: 'Hello World',
                    text: 'Bonjour tout le monde'
                }, {
                    _id: '345',
                    title: 'I love your shoes',
                    text: 'Can I borrow them?'
                }
            ],
            teams: [
                {
                    _id: '12345',
                    name: 'Gentle Pediatrics',
                    description: 'Our first Green Up Event , Yay!',
                    notes: [
                        'note 1', 'note 2'
                    ],
                    location: 'Rt 15 near the McDonalds',
                    start: new Date(),
                    end: new Date(),
                    active: true,
                    members: [
                        {
                            _id: '12345',
                            userId: '23455',
                            firstName: 'Bob',
                            lastName: 'Roberts',
                            email: 'bob@bobco.com'
                        }, {
                            _id: '12346',
                            userId: '23456',
                            firstName: 'Robert',
                            lastName: 'Bobbs',
                            email: 'robert@bobco.com'
                        }, {
                            _id: '123456',
                            userId: '123456',
                            firstName: 'Andy',
                            lastName: 'Pants',
                            email: 'andy.pants@example.com'
                        }
                    ],
                    zones: [
                        {}
                    ],
                    isPublic: true,
                    created: new Date(),
                    owner: {
                        _id: '123457',
                        userId: '234557',
                        firstName: 'Zoey',
                        lastName: 'James',
                        email: 'z@z.com'
                    },
                    invitationPending: true,
                    acceptancePending: false,
                    userIsOwner: false
                }, {
                    _id: '123456',
                    name: 'Any Pants Green Up Team',
                    description: 'Awesome Team, Yay!',
                    notes: [
                        'note 1', 'note 2'
                    ],
                    location: 'Rt 2 near the McDonalds',
                    start: new Date(),
                    end: new Date(),
                    active: true,
                    members: [
                        {
                            _id: '12345',
                            userId: '23455',
                            firstName: 'Bob',
                            lastName: 'Roberts',
                            email: 'bob@bobco.com'
                        }, {
                            _id: '12346',
                            userId: '23456',
                            firstName: 'Robert',
                            lastName: 'Bobbs',
                            email: 'robert@bobco.com'
                        }
                    ],
                    zones: [
                        {}
                    ],
                    isPublic: true,
                    created: new Date(),
                    owner: {
                        _id: '123456',
                        userId: '123456',
                        firstName: 'Andy',
                        lastName: 'Pants',
                        email: 'andy.pants@example.com'
                    },
                    invitationPending: false,
                    acceptancePending: false,
                    userIsOwner: true
                }, {
                    _id: '123457',
                    name: 'Boy Scout Troup 101',
                    description: 'Our first Green Up Event , Yay!',
                    notes: [
                        'note 1', 'note 2'
                    ],
                    location: 'Rt 15 near the McDonalds',
                    start: new Date(),
                    end: new Date(),
                    active: true,
                    members: [
                        {
                            _id: '12345',
                            userId: '23455',
                            firstName: 'Bob',
                            lastName: 'Roberts',
                            email: 'bob@bobco.com'
                        }, {
                            _id: '12346',
                            userId: '23456',
                            firstName: 'Robert',
                            lastName: 'Bobbs',
                            email: 'robert@bobco.com'
                        }, {
                            _id: '123456',
                            userId: '123456',
                            firstName: 'Andy',
                            lastName: 'Pants',
                            email: 'andy.pants@example.com'
                        }
                    ],
                    zones: [
                        {}
                    ],
                    isPublic: true,
                    created: new Date(),
                    owner: {
                        _id: '123457',
                        userId: '234557',
                        firstName: 'Zoey',
                        lastName: 'James',
                        email: 'z@z.com'
                    },
                    invitationPending: false,
                    acceptancePending: false,
                    userIsOwner: false
                }, {
                    _id: '123458',
                    name: 'My Awesome GU Team',
                    description: 'Awesome Team, Yay!',
                    notes: [
                        'note 1', 'note 2'
                    ],
                    location: 'Rt 2 near the McDonalds',
                    start: new Date(),
                    end: new Date(),
                    active: true,
                    members: [
                        {
                            _id: '12345',
                            userId: '23455',
                            firstName: 'Bob',
                            lastName: 'Roberts',
                            email: 'bob@bobco.com'
                        }, {
                            _id: '12346',
                            userId: '23456',
                            firstName: 'Robert',
                            lastName: 'Bobbs',
                            email: 'robert@bobco.com'
                        }
                    ],
                    zones: [
                        {}
                    ],
                    isPublic: true,
                    created: new Date(),
                    owner: {
                        _id: '1234567',
                        userId: '1234567',
                        firstName: 'Zoey',
                        lastName: 'James',
                        email: 'andy.pants@example.com'
                    },
                    invitationPending: false,
                    acceptancePending: false,
                    userIsOwner: false
                }, {
                    _id: '123459',
                    name: 'Mater Christi School',
                    description: 'Our first Green Up Event , Yay!',
                    notes: [
                        'note 1', 'note 2'
                    ],
                    location: 'Rt 15 near the McDonalds',
                    start: new Date(),
                    end: new Date(),
                    active: true,
                    members: [
                        {
                            _id: '12345',
                            userId: '23455',
                            firstName: 'Bob',
                            lastName: 'Roberts',
                            email: 'bob@bobco.com'
                        }, {
                            _id: '12346',
                            userId: '23456',
                            firstName: 'Robert',
                            lastName: 'Bobbs',
                            email: 'robert@bobco.com'
                        }, {
                            _id: '123456',
                            userId: '123456',
                            firstName: 'Andy',
                            lastName: 'Pants',
                            email: 'andy.pants@example.com'
                        }
                    ],
                    zones: [
                        {}
                    ],
                    isPublic: true,
                    created: new Date(),
                    owner: {
                        _id: '123457',
                        userId: '234557',
                        firstName: 'Zoey',
                        lastName: 'James',
                        email: 'z@z.com'
                    },
                    invitationPending: false,
                    acceptancePending: false,
                    userIsOwner: false
                }, {
                    _id: '123460',
                    name: 'Another Team',
                    description: 'Awesome Team, Yay!',
                    notes: [
                        'note 1', 'note 2'
                    ],
                    location: 'Rt 2 near the McDonalds',
                    start: new Date(),
                    end: new Date(),
                    active: true,
                    members: [
                        {
                            _id: '12345',
                            userId: '23455',
                            firstName: 'Bob',
                            lastName: 'Roberts',
                            email: 'bob@bobco.com'
                        }, {
                            _id: '12346',
                            userId: '23456',
                            firstName: 'Robert',
                            lastName: 'Bobbs',
                            email: 'robert@bobco.com'
                        }
                    ],
                    zones: [
                        {
                        }
                    ],
                    isPublic: true,
                    created: new Date(),
                    owner: {
                        _id: '1234569',
                        userId: '1234569',
                        firstName: 'Amanda',
                        lastName: 'Mann',
                        email: 'amanda.mann@example.com'
                    },
                    invitationPending: false,
                    acceptancePending: true,
                    userIsOwner: false
                }
            ],
            markers: [
                {_id: '12345',
                    bagCount: '20',
                    status: 'Awaiting PickUp',
                    active: true,
                    tags: 'string',
                    coordinate: 'Coordinate',
                    created: Date}
            ]
        }
    },
    selectedTeam : {
        name: 'Intial Team',
        location: 'Some place in Vermont',
        startTime: 'May 4 12:00 am',
        endTime: 'May 5 3:00 pm'
    },
    aboutPageContent : {
        aboutGreenUp: 'Green Up Vermont is a nonprofit organization with 501(c) (3) status.\n\nGreen Up’s mission is to promote the stewardship of our state’s natural landscape and waterways and the livability of our communities by involving people in Green Up Day and raising public awareness about the benefits of a litter-free environment.',
        aboutContacts: 'Green Up Vermont staff:\nMelinda Vieux, President\nMelanie Phelps, Operations Manager \n\nContact Us:\n\tPhone:\n\t802-229-4586\n\t800-974-3259\n\tEmail: greenup@greenupvermont.org\n\n\tBy mail: Green Up Vermont\n\tP. O. Box 1191\n\tMontpelier, VT 05601-1191\n\nVisit the Green Up Vermont Board of Directors page for detailed information about our board.\n\nIf you are a town clerk looking for the 2016 report for Town Meeting, click here: Town Report 2016\n\nOur office is   located in Montpelier at 14-16 Baldwin Street, Montpelier, Vermont: Untitled',
        aboutFAQ: 'Frequently Asked Questions: \nWhat is Green Up Day? \nAlways the first Saturday in May, Green Up Day is an annual statewide event when over 22,000 volunteers come together to remove litter from Vermont’s roadsides and public spaces.\n\nIs Green Up a state-funded organization?\nNo, Green Up is a non-profit organization. Green Up relies on the generous donations from individuals and businesses to keep the organization going.\n\nWhen is Green Up Day? \nGreen Up Day is the first Saturday in May.\n\nWhen was the first Green Up Day?\nThe first Green Up Day was April 18, 1970. It was started by Governor Deane C. Davis. In 1979, Green Up became a non-profit organization.\n\nHow do the Green Up bags make their way out to the roadsides?\nWith the help of Vtrans, the bags are distributed to the nine district garages and then out to the towns for distribution in mid-April.\n\nHow is Green Up Day organized?\nGreen Up Day happens all over the state and wouldn’t happen without the dedicated help of our coordinators. Each town has a coordinator that volunteers can contact to get their Green Up bags. To find your town’s coordinator, go to the How to Participate page.\n\nHow can I volunteer?\nYou can go to the How to Participate page of our website to find your town coordinator. You will see the contact name, phone number and email for you town’s coordinator. You can contact them for information on where to pick up Green Up bags and for other events that your town may be putting on. There will also be details on where to pick up and drop off bags on that page, for your town.\n\nWhat else happens on Green Up Day?\nMany communities provide refreshments, breakfast, picnic lunch or BBQ, dinner and even live music and entertainment. Contact your town coordinator to see what the local traditions may be.\n\nI am a girl or boy scout leader, or other community group leader. How do I get my kids involved in Green Up Day?\nContact your town coordinator for information about the day’s events and how your group can make a difference.\n\nI am a teacher. How can my students get involved?\nYou can have them participate in the annual poster and writing contests. Go to the Poster and Writing Contests page to learn more. On that page, there are also two activity books for grades K-2 which can be downloaded.\n\nHow many people participate in Green Up Day?\nOver 22,000 people volunteer annually in picking up litter on Green Up Day. Over 50,000 bags of trash are collected annually.\n\nHow can I donate?\nYou can make a secure donation online by clicking here. You can also send a check, made payable to Green Up Vermont, to PO Box 1191, Montpelier, VT 05601-1191.\n\nWant to learn more?\nVisit the Green Up Guides page.',
        aboutTP: 'Talking Points – a summary of the Green Up Day program, to be used in interviews or when writing articles:\n\nWHAT is it? and HOW did it get started?\nA special day when thousands of volunteers come out in their communities for a massive spring clean up of litter.  It is the largest statewide volunteer event in Vermont with over 22,000 taking part. Launched in 1970 by Governor Deane Davis, four days before the first Earth Day, with the idea to “marshal an army of thousands of volunteers to clean up litter from roadsides.”  There was a lot of roadside litter back then.  The Interstate Highway System was closed from nine to noon and the clean up drew national media coverage.\n\nHOW has it CHANGED?\nIt is no longer organized by a state agency. Instead, Green Up Vermont is a non-profit organization responsible for carrying on this great annual tradition, providing over 50,000 Green Up bags every year!\n\nWHERE does it take place?\nEvery community in Vermont has a Green Up Day. Roadsides, natural and public spaces, and waterways throughout the entire state are the focus for the litter clean up.\n\nWHO takes part?\nEveryone can take part – people of all ages and all walks of life. Lots of families go out together to involve young children in learning about negative effects of littering. Local community groups can help organize food and festivities for volunteers – some towns have a breakfast, many have a BBQ lunch.\n\nHOW can people get involved?\nGo to the Green Up Vermont web site at Green Up Vermont, to find out who is their Town Coordinator and where to get Green Up bags.  Also all seven Vermont Subaru dealers are official sites for bag pick up and drop off.'
    },
    teamSearchResults : []
};

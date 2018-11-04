const firebase = require('firebase');
require('firebase/firestore');
const firebaseConfig = {
    apiKey: 'AIzaSyAjwSCpOvLPgYcFr26V3gmfwJlGb-VtWAs',
    authDomain: 'greenupvermont-de02b.firebaseapp.com',
    databaseURL: 'https://greenupvermont-de02b.firebaseio.com',
    projectId: 'greenupvermont-de02b',
    storageBucket: 'greenupvermont-de02b.appspot.com',
    messagingSenderId: '439621369113'
};

firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore through Firebase
const db = firebase.firestore();

// Disable deprecated features
db.settings({
    timestampsInSnapshots: true
});

function updateTown(name, town) {
    db.collection('towns').doc(name).set(town);
}

const townData = {
    'ADDISON': {
        'dropoffLocations': [{
            'address': '4970 VT 22A, Addison, VT 05491',
            'coordinates': {
                'latitude': 44.0886671,
                'longitude': -73.3028997
            },
            'name': 'Addison Baptist Church'
        }],
        'name': 'ADDISON',
        'pickupLocations': [{
            'address': '',
            'name': '',
            'notes': 'Call Starr to Pick up bags, call beforehand.\nDrop off at AHC behind the Church. There\nwill be a Town dump truck parked there\nall weekend from Friday PM to Monday\nearly AM.'
        }],
        'roadsideDropoffAllowed': false
    },
    'ALBANY': {
        'dropoffLocations': [{
            'address': '569 Delano Rd., Albany, VT 05820',
            'coordinates': {
                'latitude': 44.7580711,
                'longitude': -72.3284556
            },
            'name': 'Albany Town Garage'
        }],
        'name': 'ALBANY',
        'pickupLocations': [{
            'address': '827 Main St, Albany, VT 05820',
            'coordinates': {
                'latitude': 44.73107539999999,
                'longitude': -72.3793231
            },
            'name': 'Town Clerk\'s Office',
            'notes': 'Bags available at the Town Clerk\'s Office.\nLeave bags at the Town Garage.'
        }],
        'roadsideDropoffAllowed': false
    },
    'ALBURGH': {
        'dropoffLocations': [{
            'address': '1 N Main St, Alburg, VT 05440',
            'coordinates': {
                'latitude': 44.977025,
                'longitude': -73.300195
            },
            'name': 'Town Clerk\'s Office'
        }],
        'name': 'ALBURGH',
        'pickupLocations': [{
            'address': '260 Dump Road, Alburgh, VT  05440',
            'coordinates': {
                'latitude': 44.9608232,
                'longitude': -73.2742027
            },
            'name': 'Transfer Station',
            'notes': 'Bags can be picked up at Transfer Station or Town Clerk\'s Office a week prior to GUD. Bags can be left on roadsides or brought to Town Clerk\'s Office where you can receive coupons for discounts on your trash.'
        }, {
            'address': '1 N Main St, Alburg, VT 05440',
            'coordinates': {
                'latitude': 44.977025,
                'longitude': -73.300195
            },
            'name': 'Town Clerk\'s Office',
            'notes': 'Bags can be picked up at Transfer Station or Town Clerk\'s Office a week prior to GUD. Bags can be left on roadsides or brought to Town Clerk\'s Office where you can receive coupons for discounts on your trash.'
        }],
        'roadsideDropoffAllowed': true
    },
    'ANDOVER': {
        'dropoffLocations': [{
            'address': '953 Andover Rd., Chester, VT 05143',
            'coordinates': {
                'latitude': 43.2714471,
                'longitude': -72.6734994
            },
            'name': 'Andover Town Garage'
        }],
        'name': 'ANDOVER',
        'pickupLocations': [{
            'address': '953 Andover Rd, Andover, VT 05143',
            'coordinates': {
                'latitude': 43.277695,
                'longitude': -72.699303
            },
            'name': 'Town Office',
            'notes': 'Bags can be picked up at the Andover Town Office prior to GU Day or at Town Hall on GU Day. Bags need to be dropped off at the Town Garage dumpster.'
        }],
        'roadsideDropoffAllowed': false
    },
    'ARLINGTON': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'ARLINGTON',
        'pickupLocations': [{
            'address': '3828 VT Route 7A, Arlington, VT',
            'coordinates': {
                'latitude': 43.073772,
                'longitude': -73.15401299999999
            },
            'name': 'Town Clerk\'s Office',
            'notes': 'Bags available at Town Clerk\'s Office. Leave bags along roadsides.'
        }],
        'roadsideDropoffAllowed': true
    },
    'ATHENS': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'ATHENS',
        'pickupLocations': [{
            'address': '',
            'name': '',
            'notes': 'Sign up for # of bags at Town Meeting \nand they will be delivered before GU Day.\nLeave full bags and large debris along\nroadsides for pick up.'
        }],
        'roadsideDropoffAllowed': true
    },
    'AVERILL': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'Averill',
        'pickupLocations': [{
            'address': '',
            'name': '',
            'notes': 'Coordinating the towns of\nAverill, Avery\'s Gore, Lewis,\nFerdinand, Warren Gore,\nWarner\'s Grant. Bags available at the UTG Office. Bring bags to UTG Office.'
        }],
        'roadsideDropoffAllowed': true
    },
    'AVERY_S_GORE': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'Avery\'s Gore',
        'pickupLocations': [{
            'address': '',
            'name': '',
            'notes': 'Coordinating the towns of\nAverill, Avery\'s Gore, Lewis,\nFerdinand, Warren Gore,\nWarner\'s Grant. Bags available at the UTG Office. Bring bags to UTG Office.'
        }],
        'roadsideDropoffAllowed': true
    },
    'BAKERSFIELD': {
        'dropoffLocations': [{
            'address': '43 VT Route 108, Bakersfield, VT 05441',
            'coordinates': {
                'latitude': 44.7826691,
                'longitude': -72.8013684
            },
            'name': 'Bakersfield Town Park'
        }],
        'name': 'BAKERSFIELD',
        'pickupLocations': [{
            'address': '40 E Bakersfield Rd, Bakersfield, VT 05441',
            'coordinates': {
                'latitude': 44.7817759,
                'longitude': -72.80091829999999
            },
            'name': 'Town Clerk\'s Office',
            'notes': 'Bags available at town clerk\'s office. Bags can be left on State Highway 108, do not leave on other roadsides. Consolidate bags in the village at the town park.'
        }],
        'roadsideDropoffAllowed': false
    },
    'BALTIMORE': {
        'dropoffLocations': [{
            'address': '1902 Baltimore Rd, Baltimore, VT 05143',
            'coordinates': {
                'latitude': 43.3616726,
                'longitude': -72.57138139999999
            },
            'name': 'Town Office'
        }],
        'name': 'BALTIMORE',
        'pickupLocations': [{
            'address': '1902 Baltimore Rd, Baltimore, VT 05143',
            'coordinates': {
                'latitude': 43.3616726,
                'longitude': -72.57138139999999
            },
            'name': 'Town Office',
            'notes': 'Bags available at Town Office. Please \nsign up letting us know how many\npeople and what section of town you\nare Greening Up. Bags can be left at\nTown Office or along roadsides. Thank\nyou for your support!'
        }],
        'roadsideDropoffAllowed': true
    },
    'BARNARD': {
        'dropoffLocations': [{
            'address': '157 Chateauguay Rd., Barnard, VT 05031',
            'coordinates': {
                'latitude': 43.755531,
                'longitude': -72.63589499999999
            },
            'name': 'Barnard Recycling Center'
        }],
        'name': 'BARNARD',
        'pickupLocations': [{
            'address': '6231 Vermont 12, Barnard, VT 05031',
            'coordinates': {
                'latitude': 43.7290293,
                'longitude': -72.6204712
            },
            'name': 'Barnard General Store',
            'notes': 'Bags at Barnard General Store after 8am.\nBring full bags to recycling center or\nthe dump trailer at the BGS.'
        }],
        'roadsideDropoffAllowed': false
    },
    'BARNET': {
        'dropoffLocations': [{
            'address': '151 Bimson Dr., Barnet, VT 05821',
            'coordinates': {
                'latitude': 44.292766,
                'longitude': -72.05860299999999
            },
            'name': 'Barnet Fire Dept'
        }],
        'name': 'BARNET',
        'pickupLocations': [{
            'address': '1743 US-5, Barnet, VT 05821',
            'coordinates': {
                'latitude': 44.2971385,
                'longitude': -72.0482165
            },
            'name': 'Town Clerk\'s Office',
            'notes': 'pick up bags at Post\nOffice, town clerk, stores. Drop off\nat Fire House after 10am, with picnic at Noon, provided by donors.'
        }, {
            'address': '30 Monument Cir, Barnet, VT 05821',
            'coordinates': {
                'latitude': 44.2967447,
                'longitude': -72.0492395
            },
            'name': 'Post Office',
            'notes': 'pick up bags at Post\nOffice, town clerk, stores. Drop off\nat Fire House after 10am, with picnic at Noon, provided by donors.'
        }],
        'roadsideDropoffAllowed': false
    },
    'BARRE_CITY': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'BARRE CITY',
        'pickupLocations': [{
            'address': '6 N Main St # 6, Barre, VT 05641',
            'coordinates': {
                'latitude': 44.1967517,
                'longitude': -72.5017846
            },
            'name': 'City Clerk Office',
            'notes': 'Bags at City Clerk\'s office. Leave bags on roadsides, city workers pick\nup bags for 3-4 days after GU Day.'
        }, {
            'address': '155 Ayers St, Barre, VT 05641',
            'coordinates': {
                'latitude': 44.1890599,
                'longitude': -72.4939017
            },
            'name': 'Spaulding High School',
            'notes': 'Bags at Spaulding\nHS'
        }, {
            'address': '361 N Main St, Barre, VT 05641',
            'coordinates': {
                'latitude': 44.20198449999999,
                'longitude': -72.50650209999999
            },
            'name': 'Merchants Bank',
            'notes': 'Bags at Merchants Bank'
        }],
        'roadsideDropoffAllowed': true
    },
    'BARRE_TOWN': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'BARRE TOWN',
        'pickupLocations': [{
            'address': '149 Websterville Road, \nWebsterville, VT 05678-0116',
            'coordinates': {
                'latitude': 44.168423,
                'longitude': -72.4772879
            },
            'name': 'Town Office',
            'notes': 'Bags available at Town Office. Leave \nbags along roadsides. BBQ/picnic at\nnoon on GU Day for volunteers.'
        }],
        'roadsideDropoffAllowed': true
    },
    'BARTON': {
        'dropoffLocations': [{
            'address': '210 May Farm Rd, Barton, VT 05822',
            'coordinates': {
                'latitude': 44.784336,
                'longitude': -72.20960199999999
            },
            'name': 'Town Garage'
        }],
        'name': 'BARTON',
        'pickupLocations': [{
            'address': '34 Main St, Barton, VT 05822',
            'coordinates': {
                'latitude': 44.7463567,
                'longitude': -72.1747231
            },
            'name': 'Town Clerk\'s Office',
            'notes': '\nBags available at the Town Clerk\'s Office.\nLeave bags along roadsides or bring to\ndumpster at Town Garage on Route 5.'
        }],
        'roadsideDropoffAllowed': true
    },
    'BELVIDERE': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'BELVIDERE',
        'pickupLocations': [{
            'address': '3996 VT-109, Belvidere Center, VT 05442',
            'coordinates': {
                'latitude': 44.74979,
                'longitude': -72.692291
            },
            'name': 'Town Clerk\'s Office',
            'notes': 'Bags available at the Town Clerk\'s Office.\nLeave bags along roadsides.  '
        }],
        'roadsideDropoffAllowed': true
    },
    'BENNINGTON': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'BENNINGTON',
        'pickupLocations': [{
            'address': '527 N Bennington Rd, Bennington, VT 05201',
            'coordinates': {
                'latitude': 42.9107759,
                'longitude': -73.2214296
            },
            'name': 'Bennington Subaru',
            'notes': 'Green Up bags available at Bennington Subaru. Refreshments provided for all volunteers! http://www.subaruofnewengland.com/green-up-vermont-2017.htm'
        }, {
            'address': '205 South St, Bennington, VT 05201',
            'coordinates': {
                'latitude': 42.877351,
                'longitude': -73.1977174
            },
            'name': 'Town Office',
            'notes': 'Bags are available at Town Office. Please\ncontact the Bennington Town Office to let\nus know the location of where you will\nbe picking up, this will help us to facilitate\ncollection of bags. Leave on roadsides at intersections.'
        }],
        'roadsideDropoffAllowed': true
    },
    'BENSON': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'BENSON',
        'pickupLocations': [{
            'address': '2760 Stage Rd, Benson, VT 05743',
            'coordinates': {
                'latitude': 43.708937,
                'longitude': -73.3096588
            },
            'name': 'Town Office',
            'notes': 'Bags available at the two stores, town\noffice and transfer station. Leave bags\nalong roadside and the town crew will\npick them up.'
        }],
        'roadsideDropoffAllowed': true
    },
    'BERKSHIRE': {
        'dropoffLocations': [{
            'address': '4454 Water Tower Rd, Enosburg Falls, VT 05450',
            'coordinates': {
                'latitude': 44.971746,
                'longitude': -72.774079
            },
            'name': 'Berkshire Town Garage'
        }],
        'name': 'BERKSHIRE',
        'pickupLocations': [{
            'address': '4454 Water Tower Rd, Enosburg Falls, VT 05450',
            'coordinates': {
                'latitude': 44.971746,
                'longitude': -72.774079
            },
            'name': 'Town Clerk\'s Office',
            'notes': 'Bags available at Town Clerk\'s Office. Bring bags to the Town Garage or leave along roadsides.'
        }],
        'roadsideDropoffAllowed': true
    },
    'BERLIN': {
        'dropoffLocations': [{
            'address': '108 Shed Rd, Berlin, VT 05602',
            'coordinates': {
                'latitude': 44.2117405,
                'longitude': -72.5779039
            },
            'name': 'Town Office'
        }],
        'name': 'BERLIN',
        'pickupLocations': [{
            'address': '108 Shed Rd, Berlin, VT 05602',
            'coordinates': {
                'latitude': 44.2117405,
                'longitude': -72.5779039
            },
            'name': 'Town Office',
            'notes': 'pick up and drop off bags at Twin City Subaru.  Refreshments and prizes available for enthusiastic participants from 8-4.  Thanks for helping out Green Up Vermont!'
        }],
        'roadsideDropoffAllowed': true
    },
    'BETHEL': {
        'dropoffLocations': [{
            'address': '',
            'name': ''
        }],
        'name': 'BETHEL',
        'pickupLocations': [{
            'address': '134 S Main St, Bethel, VT 05032',
            'coordinates': {
                'latitude': 43.826854,
                'longitude': -72.629673
            },
            'name': 'Town Clerk\'s Office',
            'notes': 'Bags available at the Town Clerk\'s Office.\n'
        }],
        'roadsideDropoffAllowed': false
    },
    'BLOOMFIELD': {
        'dropoffLocations': [{
            'address': '15 Grant Rd., Colebrook, NH 03576',
            'coordinates': {
                'latitude': 44.8623858,
                'longitude': -71.5418652
            },
            'name': 'Jeffers Sand and Gravel Pit'
        }],
        'name': 'BLOOMFIELD',
        'pickupLocations': [{
            'address': '27 Schoolhouse Rd, Bloomfield, VT 05905',
            'coordinates': {
                'latitude': 44.75453599999999,
                'longitude': -71.62863899999999
            },
            'name': 'Town Clerk\'s Office',
            'notes': 'Bags available at Town Clerk\'s office. \nBring bags to Jeffer\'s Gravel Pit, across from the State shed.'
        }],
        'roadsideDropoffAllowed': false
    },
    'BOLTON': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'BOLTON',
        'pickupLocations': [{
            'address': '3045 Theodore Roosevelt Highway (US Route 2) Bolton, Vermont 05676',
            'coordinates': {
                'latitude': 44.3731989,
                'longitude': -72.884014
            },
            'name': 'Town Clerk\'s Office',
            'notes': 'Bags available at Town Clerk\'s Office.\nLeave bags along roadsides.'
        }],
        'roadsideDropoffAllowed': true
    },
    'BRADFORD': {
        'dropoffLocations': [{
            'address': '359 Fairground Rd, Bradford, VT 05033',
            'coordinates': {
                'latitude': 44.0055979,
                'longitude': -72.12135959999999
            },
            'name': 'Bradford Town Garage'
        }],
        'name': 'BRADFORD',
        'pickupLocations': [{
            'address': '',
            'name': 'Bradford Academy',
            'notes': 'Bags available one week prior to \nGU Day at Bradford Academy. Bring bags to the container located at the Bradford Town Garage. Please place all Green Up bags in the container.'
        }],
        'roadsideDropoffAllowed': false
    },
    'BRAINTREE': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections,',
            'name': ''
        }],
        'name': 'BRAINTREE',
        'pickupLocations': [{
            'address': '932 VT-12A, Braintree, VT 05060',
            'coordinates': {
                'latitude': 43.9315423,
                'longitude': -72.689503
            },
            'name': 'Town Clerk\'s Office',
            'notes': 'Bags available at Town Clerk\'s Office,\nTown Hall, Braintree School, and \nSnowsville Store. Bring bags to the \ndumpster at the Town Garage.'
        }],
        'roadsideDropoffAllowed': true
    },
    'BRANDON': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'BRANDON',
        'pickupLocations': [{
            'address': '25 Grove Street\nRoute 7\nBrandon, VT  05733',
            'coordinates': {
                'latitude': 43.80199,
                'longitude': -73.09510449999999
            },
            'name': 'Gazebo Inn',
            'notes': 'pick up bags ath the Gazebo. Bring bags to transfer station or Leave on roadsides at intersections.'
        }],
        'roadsideDropoffAllowed': true
    },
    'BRATTLEBORO': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'BRATTLEBORO',
        'pickupLocations': [{
            'address': '1234 Putney Rd, Brattleboro, VT 05301',
            'coordinates': {
                'latitude': 42.8878381,
                'longitude': -72.5561132
            },
            'name': 'Brattleboro Subaru',
            'notes': 'Green Up bags available at Brattleboro \nSubaru. Coffee and donuts 8-12.\nhttp://www.subaruofnewengland.com/green-up-vermont-2017.htm'
        }, {
            'address': '180 Main St, Brattleboro, VT 05301',
            'coordinates': {
                'latitude': 42.853539,
                'longitude': -72.55882629999999
            },
            'name': 'Chamber of Commerce',
            'notes': 'Prior to GU Day bags available at Chamber of Comm. '
        }, {
            'address': '2 Main St, Brattleboro, VT 05301',
            'coordinates': {
                'latitude': 42.8503732,
                'longitude': -72.55828509999999
            },
            'name': 'Brattleboro Co-op',
            'notes': ' On GU Day at Brattleboro Co-op,'
        }, {
            'address': '134 Elliot St, Brattleboro, VT 05301',
            'coordinates': {
                'latitude': 42.8511055,
                'longitude': -72.56126859999999
            },
            'name': 'Restless Rooster',
            'notes': 'Restless Rooster'
        }, {
            'address': '16 South St, Brattleboro, VT 05301',
            'coordinates': {
                'latitude': 42.8533453,
                'longitude': -72.60045029999999
            },
            'name': 'Fire Station',
            'notes': 'Meet on the Green in front of \nFire Station 9am. Refreshments\n9am-12pm. Leave bags along roadsides and curbs. No tires or bulky waste. We discourage pick ups from rivers and streams.'
        }],
        'roadsideDropoffAllowed': true
    },
    'BRIDGEWATER': {
        'dropoffLocations': [{
            'address': '65 Schoolhouse Rd, Bridgewater Corners, VT 05034',
            'coordinates': {
                'latitude': 43.5868107,
                'longitude': -72.65821679999999
            },
            'name': ''
        }],
        'name': 'BRIDGEWATER',
        'pickupLocations': [{
            'address': '7335 US-4, Bridgewater, VT 05034',
            'coordinates': {
                'latitude': 43.5881972,
                'longitude': -72.6244028
            },
            'name': 'Town Clerk\'s Office',
            'notes': 'pick up bags at Town Clerk\'s Office prior\n to GU Day or at 8am the day of. Leave bags along roadsides or bring to Fast Trash 8-11.'
        }],
        'roadsideDropoffAllowed': true
    },
    'BRIDPORT': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections',
            'name': ''
        }],
        'name': 'BRIDPORT',
        'pickupLocations': [{
            'address': '82 Crown Point Rd, Bridport, VT 05734',
            'coordinates': {
                'latitude': 43.984423,
                'longitude': -73.31526699999999
            },
            'name': 'Town Clerk\'s Office',
            'notes': 'Bags available at Town Clerk\'s Office. Please bring full bags back to trucks\nparked at the Town Clerk\'s office.\n'
        }],
        'roadsideDropoffAllowed': true
    },
    'BRIGHTON': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'BRIGHTON',
        'pickupLocations': [{
            'address': '62 Cross St, Island Pond, VT 05846',
            'coordinates': {
                'latitude': 44.81423119999999,
                'longitude': -71.8813258
            },
            'name': 'Gervais Ace Hardware',
            'notes': 'Bags available at Gervais Ace Hardware. \n'
        }, {
            'address': '28 Cross St, Island Pond, VT 05846',
            'coordinates': {
                'latitude': 44.8147084,
                'longitude': -71.88132639999999
            },
            'name': 'Hearth and Home Country Store',
            'notes': 'Bags available at Hearth and Home Country Store. \nBring bags to the dumpster behind town hall, do not Leave on roadsides at intersections.'
        }],
        'roadsideDropoffAllowed': true
    },
    'BRISTOL': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections',
            'name': ''
        }],
        'name': 'BRISTOL',
        'pickupLocations': [{
            'address': '1 South St, Bristol, VT 05443',
            'coordinates': {
                'latitude': 44.13298409999999,
                'longitude': -73.07895169999999
            },
            'name': 'Town Office',
            'notes': 'pick up bags during the week before Green Up Day at Town\nOffice. Leave bags along roadsides or\nbring to the Transfer Station.'
        }],
        'roadsideDropoffAllowed': true
    },
    'BROOKFIELD': {
        'dropoffLocations': [{
            'address': '40-74 VT Route 65, Brookfield, VT 05036',
            'coordinates': {
                'latitude': 44.0304891,
                'longitude': -72.5841694
            },
            'name': 'Brookfield Town Garage'
        }],
        'name': 'BROOKFIELD',
        'pickupLocations': [{
            'address': '40 Ralph Rd, Brookfield, VT 05036',
            'coordinates': {
                'latitude': 44.043159,
                'longitude': -72.602768
            },
            'name': 'Town Clerk\'s Office',
            'notes': 'Young families, please circle the first Saturday in May in green ink on your calendars and come out and Green Up! Bags available at the Town Clerk\'s Office or the school. Bring bags to the Town Garage.'
        }],
        'roadsideDropoffAllowed': false
    },
    'BROOKLINE': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'BROOKLINE',
        'pickupLocations': [{
            'address': '736 Grassy Brook Rd, Brookline, VT 05345',
            'coordinates': {
                'latitude': 43.0217223,
                'longitude': -72.6037808
            },
            'name': 'Town Office',
            'notes': 'Bags available at the Town Office 1 week \nprior to GU Day. Leave full bags along \nroadsides for pick up.'
        }],
        'roadsideDropoffAllowed': true
    },
    'BROWNINGTON': {
        'dropoffLocations': [{
            'address': ' 622 Schoolhouse Rd, Brownington, VT 05860',
            'coordinates': {
                'latitude': 44.81885399999999,
                'longitude': -72.135358
            },
            'name': 'Town Clerk\'s Office'
        }],
        'name': 'BROWNINGTON',
        'pickupLocations': [{
            'address': ' 622 Schoolhouse Rd, Brownington, VT 05860',
            'coordinates': {
                'latitude': 44.81885399999999,
                'longitude': -72.135358
            },
            'name': 'Town Clerk\'s Office',
            'notes': 'Bags available at Town Clerk\'s Office. \nDrop off bags at town office 8-4 on\nGU Day or leave along roadsides.'
        }],
        'roadsideDropoffAllowed': true
    },
    'BUEL_S_GORE': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides along Route 17',
            'name': ''
        }],
        'name': 'BUEL\'S GORE',
        'pickupLocations': [{
            'address': '',
            'name': '',
            'notes': 'Contact Maura for bags. Leave full bags\nalong Route 17.'
        }],
        'roadsideDropoffAllowed': true
    },
    'BURKE': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'BURKE',
        'pickupLocations': [{
            'address': '212 School Street, West Burke, VT 05871',
            'coordinates': {
                'latitude': 44.6418629,
                'longitude': -71.8901953
            },
            'name': 'Town Clerk\'s Office',
            'notes': 'Bags available at Town Clerk\'s Office.\nLeave bags along roadsides.\n'
        }],
        'roadsideDropoffAllowed': true
    },
    'BURLINGTON': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'BURLINGTON',
        'pickupLocations': [{
            'address': '149 Church St, Burlington, VT 05401',
            'coordinates': {
                'latitude': 44.4763481,
                'longitude': -73.2129002
            },
            'name': 'CEDO - City Hall',
            'notes': 'City Hall - Pick up week prior to Green Up day - regular business hours'
        }, {
            'address': '585 Pine Street Burlington, Vermont 05401',
            'coordinates': {
                'latitude': 44.463748,
                'longitude': -73.215513
            },
            'name': 'Burlington Electric',
            'notes': 'Burlington Electric - Pick up week prior to Green Up day - regular business hours'
        }, {
            'address': '645 Pine St. Suite A Burlington, VT 05401',
            'coordinates': {
                'latitude': 44.4616894,
                'longitude': -73.21554429999999
            },
            'name': 'Departments of Public Works/Parks & Recreation',
            'notes': 'DPW/Parks & Rec  - Pick up week prior to Green Up day - regular business hours'
        }, {
            'address': '316 Pine St #114, Burlington, VT 05401',
            'coordinates': {
                'latitude': 44.4706803,
                'longitude': -73.214242
            },
            'name': 'Citizen Cider',
            'notes': 'Sustainability Academy at Lawrence Barnes School  - Pick up week prior to Green Up day - regular business hours'
        }, {
            'address': '351 Shelburne Rd, Burlington, VT 05401',
            'coordinates': {
                'latitude': 44.4555549,
                'longitude': -73.2092043
            },
            'name': 'Burlington Subuaru',
            'notes': 'Green Up bags available at Burlington Subaru. Refreshments provided for all volunteers!'
        }, {
            'address': '130 Gosse Ct, Burlington, VT 05408',
            'coordinates': {
                'latitude': 44.51345449999999,
                'longitude': -73.2466707
            },
            'name': 'Miller Community Center',
            'notes': 'Miller Community Center - Pick up week prior to Green Up day - regular business hours and Pickup up on Green Up Day - 8-12'
        }, {
            'address': '20 Allen St, Burlington, VT 05401',
            'coordinates': {
                'latitude': 44.4839584,
                'longitude': -73.2150235
            },
            'name': 'St. Joseph\'s School',
            'notes': 'St. Joseph\'s School - Pick up week prior to Green Up day - regular business hours and Pickup up on Green Up Day - 8-12'
        }],
        'roadsideDropoffAllowed': true
    },
    'CABOT': {
        'dropoffLocations': [{
            'address': '2947 Main St., Cabot VT, 05647',
            'coordinates': {
                'latitude': 44.4012937,
                'longitude': -72.3134826
            },
            'name': 'Cabot Fire Station '
        }],
        'name': 'CABOT',
        'pickupLocations': [{
            'address': '3084 Main St, Cabot, VT 05647',
            'coordinates': {
                'latitude': 44.402111,
                'longitude': -72.310997
            },
            'name': 'Town Office',
            'notes': 'pick up bags at Town Office and Hardware Store a week before Green Up Day and at the Fire Station on Green Up Day. Bring bags to the Cabot Fire Station between 9 and 2. Special arrangements can be made with coordinators for roadside pick up of bags.'
        }],
        'roadsideDropoffAllowed': false
    },
    'CALAIS': {
        'dropoffLocations': [{
            'address': '123-653 Moscow Woods Rd., E. Calais, VT 05650',
            'coordinates': {
                'latitude': 44.3684908,
                'longitude': -72.43823429999999
            },
            'name': 'Calais Transfer Station'
        }],
        'name': 'CALAIS',
        'pickupLocations': [{
            'address': '3120 Pekin Brook Rd, East Calais, VT 05650',
            'coordinates': {
                'latitude': 44.36866999999999,
                'longitude': -72.467992
            },
            'name': 'Town Clerk\'s Office',
            'notes': 'Bags available at town stores and Town\nClerk\'s Office. Bring bags to recycling\ndepot, Moscow Woods Rd., 9-12 on \nGU Day. Do not Leave on roadsides at intersections, they \nwill NOT be picked up.'
        }],
        'roadsideDropoffAllowed': false
    },
    'CAMBRIDGE': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'CAMBRIDGE',
        'pickupLocations': [{
            'address': '85 Church St, Jeffersonville, VT 05464',
            'coordinates': {
                'latitude': 44.64364339999999,
                'longitude': -72.831295
            },
            'name': 'Town Clerk\'s Office',
            'notes': 'pick up bags at Town Clerk\'s office prior to Green Up Day.'
        }, {
            'address': '113 S Main St, Cambridge, VT 05444',
            'coordinates': {
                'latitude': 44.6445745,
                'longitude': -72.8766895
            },
            'name': 'Cambridge Village Market a.k.a. King\'s Market',
            'notes': 'pick up bags at King\'s Market prior to Green Up Day '
        }, {
            'address': '168 S Vermont 108, Cambridge, VT 05464',
            'coordinates': {
                'latitude': 44.64601500000001,
                'longitude': -72.828339
            },
            'name': 'The Farm Store',
            'notes': 'pick up bags at The Farm Store prior to Green Up Day'
        }, {
            'address': '4879 VT-15, Jeffersonville, VT 05464',
            'coordinates': {
                'latitude': 44.64549400000001,
                'longitude': -72.83367
            },
            'name': 'Aubochon\'s',
            'notes': 'pick up bags at Aubochon\'s prior to Green Up Day '
        }, {
            'address': '168 S Vermont 108, Cambridge, VT 05444',
            'coordinates': {
                'latitude': 44.64601500000001,
                'longitude': -72.828339
            },
            'name': 'The Village Sampler',
            'notes': 'pick up bags at The Village Sampler prior to Green Up Day '
        }, {
            'address': '186 School Rd, Jeffersonville, VT 05464',
            'coordinates': {
                'latitude': 44.6444743,
                'longitude': -72.82677149999999
            },
            'name': 'Cambridge Elementary School',
            'notes': 'pick up bags on GU day at Rotary\'s Pie for Breakfast event at Cambridge Elementary at 9am. Leave full bags at closest intersection \ntown road to be picked up by road crew.'
        }],
        'roadsideDropoffAllowed': true
    },
    'CANAAN': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'CANAAN',
        'pickupLocations': [{
            'address': '',
            'name': '',
            'notes': 'Call or email Renee for Green Up bags. Leave full bags on the side of the road, or\ntalk to Renee about where to bring\nthem.'
        }],
        'roadsideDropoffAllowed': true
    },
    'CASTLETON': {
        'dropoffLocations': [{
            'address': 'Staso Rd, Castleton, VT 05735',
            'coordinates': {
                'latitude': 43.5996911,
                'longitude': -73.1707572
            },
            'name': 'Transfer Station'
        }],
        'name': 'CASTLETON',
        'pickupLocations': [{
            'address': '218 VT-4A, Castleton, VT 05735',
            'coordinates': {
                'latitude': 43.6136093,
                'longitude': -73.1704057
            },
            'name': 'Slate Valley Physical Therapy',
            'notes': 'Bags can be picked up at Slate Valley PT \non Route 4 next to the Iron Lantern or call \nthe coordinator to arrange delivery. Bring\nbags to the transfer station or leave along\nthe roadsides in pile for pick up.'
        }],
        'roadsideDropoffAllowed': true
    },
    'CAVENDISH': {
        'dropoffLocations': [{
            'address': '354 Route 131, Springfield, VT 05156',
            'coordinates': {
                'latitude': 43.3880608,
                'longitude': -72.59896429999999
            },
            'name': 'Cavendish Transfer Station'
        }],
        'name': 'CAVENDISH',
        'pickupLocations': [{
            'address': '37 High St, Cavendish, VT 05142',
            'coordinates': {
                'latitude': 43.3828573,
                'longitude': -72.607771
            },
            'name': 'Town Clerk\'s Office',
            'notes': 'Bags available at the Town Clerk\'s Office.\nBring bags to the Transfer Station, do not Leave on roadsides at intersections.'
        }],
        'roadsideDropoffAllowed': false
    },
    'CHARLESTON': {
        'dropoffLocations': [{
            'address': '5063 VT Route 105, Charleston, VT 05872',
            'coordinates': {
                'latitude': 44.8505219,
                'longitude': -72.0254412
            },
            'name': 'Charleston Town Office'
        }],
        'name': 'CHARLESTON',
        'pickupLocations': [{
            'address': '5063 VT-105, West Charleston, VT 05872',
            'coordinates': {
                'latitude': 44.850746,
                'longitude': -72.025505
            },
            'name': 'Town Clerk\'s Office',
            'notes': 'pick up bags at Town Clerk\'s Office, Scampy\'s Deli, Post Offices, or NorthWoods Stewardship Center. Truck will be at the Town Office for drop off of bags Sat & Sun. No tires.\nDo not leave bags on roadsides.'
        }],
        'roadsideDropoffAllowed': false
    },
    'CHARLOTTE': {
        'dropoffLocations': [{
            'address': '408 Hinesburg Rd., Charlotte, VT 05445',
            'coordinates': {
                'latitude': 44.31517119999999,
                'longitude': -73.22640659999999
            },
            'name': 'Charlotte Central School'
        }],
        'name': 'CHARLOTTE',
        'pickupLocations': [{
            'address': '408 Hinesburg Rd., Charlotte, VT 05445',
            'coordinates': {
                'latitude': 44.31517119999999,
                'longitude': -73.22640659999999
            },
            'name': 'Charlotte Central School',
            'notes': 'pick up bags at Charlotte Central School Quonset Hut Sat 9-3.  All bags should be brought back to the Quonset Hut. Do not leave bags on roadsides.  www.charlottevtgreenupday.com'
        }, {
            'address': '159 Ferry Rd, Charlotte, VT 05445',
            'coordinates': {
                'latitude': 44.310165,
                'longitude': -73.249634
            },
            'name': 'Town Hall',
            'notes': 'pick up bags Sun 9-12 or prior to Green Up Day at Town Hall. All bags should be brought back to the Quonset Hut. Do not leave bags on roadsides.www.charlottevtgreenupday.com'
        }, {
            'address': '20 Jackson Hill Rd, Charlotte, VT 05445',
            'coordinates': {
                'latitude': 44.3190439,
                'longitude': -73.1885413
            },
            'name': 'Spears Corner Store',
            'notes': 'pick up bags Sun 9-12 or prior to Green Up Day at Spears Corner Store. All bags should be brought back to the Quonset Hut. Do not leave bags on roadsides.www.charlottevtgreenupday.com'
        }, {
            'address': '290 Ferry Rd, Charlotte, VT 05445',
            'coordinates': {
                'latitude': 44.310773,
                'longitude': -73.252776
            },
            'name': 'Old Brick Store',
            'notes': 'pick up bags Sun 9-12 or prior to Green Up Day at  Old Brick Store. All bags should be brought back to the Quonset Hut. Do not leave bags on roadsides.www.charlottevtgreenupday.com'
        }, {
            'address': '115 Ferry Rd, Charlotte, VT 05445',
            'coordinates': {
                'latitude': 44.310692,
                'longitude': -73.249382
            },
            'name': 'Charlotte Library',
            'notes': 'pick up bags Sun 9-12 or prior to Green Up Day at  Charlotte Library. All bags should be brought back to the Quonset Hut. Do not leave bags on roadsides.www.charlottevtgreenupday.com'
        }],
        'roadsideDropoffAllowed': false
    },
    'CHELSEA': {
        'dropoffLocations': [{
            'address': '72 Washington Turnpike, Chelsea, VT  05038',
            'coordinates': {
                'latitude': 44.016907,
                'longitude': -72.4420901
            },
            'name': 'Transfer Station'
        }],
        'name': 'CHELSEA',
        'pickupLocations': [{
            'address': '',
            'name': '',
            'notes': 'pick up bags at area stores, Green Up\nyour road, Leave on roadsides at intersections or drop off bags at transfer station or participate in G U Day -  meet at 9:30 Basketball Court. Bring gloves and proper footwear.'
        }],
        'roadsideDropoffAllowed': true
    },
    'CHESTER': {
        'dropoffLocations': [{
            'address': '44 Town Garage Rd., Chester, VT 05143',
            'coordinates': {
                'latitude': 43.2662607,
                'longitude': -72.5889925
            },
            'name': 'Chester Town Garage'
        }],
        'name': 'CHESTER',
        'pickupLocations': [{
            'address': '556 Elm St, Chester, VT 05143',
            'coordinates': {
                'latitude': 43.2685058,
                'longitude': -72.58910519999999
            },
            'name': 'Town Hall',
            'notes': 'Green Up for Chester is organized by the\nChester Conservation Committee. Bags\navailable one week prior to GUD at\nTown Hall, Chester Hardware or at\nChester Elementary. Thanks for helping\nGreen Up Chester! Contact Frank for more\ninfo.'
        }],
        'roadsideDropoffAllowed': false
    },
    'CHITTENDEN': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'CHITTENDEN',
        'pickupLocations': [{
            'address': '347 Holden Rd, Chittenden, VT 05737',
            'coordinates': {
                'latitude': 43.708015,
                'longitude': -72.948741
            },
            'name': 'Church of the Wildwood ',
            'notes': 'pick up bags at the Church of the \nWildwood from 8-11:30, enjoy free\ncoffee and donuts. Leave bags along \nroadsides for pick up.'
        }],
        'roadsideDropoffAllowed': true
    },
    'CLARENDON': {
        'dropoffLocations': [{
            'address': '279 Middle Rd, North Clarendon, VT 05759',
            'coordinates': {
                'latitude': 43.5204625,
                'longitude': -72.9719633
            },
            'name': 'Town Hall'
        }],
        'name': 'CLARENDON',
        'pickupLocations': [{
            'address': '279 Middle Rd, North Clarendon, VT 05759',
            'coordinates': {
                'latitude': 43.5204625,
                'longitude': -72.9719633
            },
            'name': 'Town Hall',
            'notes': 'Bags available at Town Hall, Chippenhook\nBallfield and Clarendon Post Office. Leave\nfull bags along roadsides for pick up or bring to the dumpster behind Town Hall.'
        }],
        'roadsideDropoffAllowed': true
    },
    'COLCHESTER': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'COLCHESTER',
        'pickupLocations': [{
            'address': '835 Blakely Rd, Colchester, VT 05446',
            'coordinates': {
                'latitude': 44.5357999,
                'longitude': -73.2054383
            },
            'name': 'Police Station',
            'notes': 'Bag distribution at Police Station \n8-12pm. Rotary sponsors free Hot\nDog roast for all volunteers at noon. Bags can be left on the roadsides or brought to bag distribution site.'
        }],
        'roadsideDropoffAllowed': true
    },
    'CONCORD': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'CONCORD',
        'pickupLocations': [{
            'address': '374 Main St, Concord, VT 05824',
            'coordinates': {
                'latitude': 44.4286406,
                'longitude': -71.8880711
            },
            'name': 'Town Clerk\'s Office',
            'notes': 'Bags available at Town Clerk\'s Office.\nLeave bags along roadsides.'
        }],
        'roadsideDropoffAllowed': true
    },
    'CORINTH': {
        'dropoffLocations': [{
            'address': '2628 Goose Green Rd., Corinth, VT 05076',
            'coordinates': {
                'latitude': 44.0133509,
                'longitude': -72.260798
            },
            'name': 'Casella Transfer Station'
        }],
        'name': 'CORINTH',
        'pickupLocations': [{
            'address': ' 1387 Cookeville Rd, Corinth, VT 05039',
            'coordinates': {
                'latitude': 44.023802,
                'longitude': -72.2901333
            },
            'name': 'Town Office',
            'notes': 'Bags available at Town Offices, Blake\nMemorial Library, and on the weekend\nbefore GU Day we will distribute bags at\nthe Transfer Station. Remember to sign up\non the Town of Corinth sign-up map during\nTown Meeting! The map will stay up at the \nTown Offices from Town Meeting Day\nuntil Green Up Day.\n'
        }],
        'roadsideDropoffAllowed': false
    },
    'CORNWALL': {
        'dropoffLocations': [{
            'address': '112 School Rd, Cornwall VT 05753',
            'coordinates': {
                'latitude': 43.963902,
                'longitude': -73.2063979
            },
            'name': 'Bingham Memorial School'
        }],
        'name': 'CORNWALL',
        'pickupLocations': [{
            'address': '112 School Rd, Cornwall, VT 05753',
            'coordinates': {
                'latitude': 43.963902,
                'longitude': -73.2063979
            },
            'name': 'Bingham Memorial School / Cornwall School',
            'notes': 'Bring bags and other roadside trash to the Cornwall School, where the town trucks are parked from Friday PM to Sunday midday. Do not leave bags along roadsides. Thank you for Greening up Cornwall!'
        }],
        'roadsideDropoffAllowed': false
    },
    'COVENTRY': {
        'dropoffLocations': [{
            'address': '403 Landfill Lane, Coventry, VT 05825',
            'coordinates': {
                'latitude': 44.91093799999999,
                'longitude': -72.223486
            },
            'name': 'Coventry Landfill'
        }],
        'name': 'COVENTRY',
        'pickupLocations': [{
            'address': '168 Main St, Coventry, VT 05825',
            'coordinates': {
                'latitude': 44.866705,
                'longitude': -72.264473
            },
            'name': 'Town Clerk\'s Office',
            'notes': 'Bags available at the Town Clerk\'s Office.\nBring bags to the landfill.'
        }],
        'roadsideDropoffAllowed': false
    },
    'CRAFTSBURY': {
        'dropoffLocations': [{
            'address': '46 Town Garage Rd., Craftsbury, VT 05826',
            'coordinates': {
                'latitude': 44.6371277,
                'longitude': -72.3713927
            },
            'name': 'Craftsbury Town Garage'
        }],
        'name': 'CRAFTSBURY',
        'pickupLocations': [{
            'address': '85 S Craftsbury Rd, Craftsbury, VT 05826',
            'coordinates': {
                'latitude': 44.635154,
                'longitude': -72.3719686
            },
            'name': 'Town Clerk\'s Office',
            'notes': 'Bags available at Town Clerk\'s Office. Bring bags to the Town Garage.'
        }],
        'roadsideDropoffAllowed': false
    },
    'DANBY': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'DANBY',
        'pickupLocations': [{
            'address': '426 Danby Mountain Rd, Danby, VT 05739',
            'coordinates': {
                'latitude': 43.344231,
                'longitude': -73.05117
            },
            'name': 'Smokey House',
            'notes': 'Bags available on Green Up Day at\nSmokey House or at the Barn on Main St.\nLeave bags along roadsides.'
        }],
        'roadsideDropoffAllowed': true
    },
    'DANVILLE': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'DANVILLE',
        'pickupLocations': [{
            'address': '36 US-2, Danville, VT 05828',
            'coordinates': {
                'latitude': 44.411739,
                'longitude': -72.140878
            },
            'name': 'Town Clerk\'s Office',
            'notes': 'Bags available at Town Clerk\'s Office.\nLeave bags along roadsides.\n'
        }],
        'roadsideDropoffAllowed': true
    },
    'DERBY': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'DERBY',
        'pickupLocations': [{
            'address': '124 Main St, Derby, VT  05829',
            'coordinates': {
                'latitude': 44.9526842,
                'longitude': -72.1318484
            },
            'name': 'Town Clerk\'s Office',
            'notes': 'Bags available at Town Clerk\'s Office.\nLeave bags along roadsides.'
        }],
        'roadsideDropoffAllowed': true
    },
    'DORSET': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'DORSET',
        'pickupLocations': [{
            'address': '112 Mad Tom Rd, East Dorset, VT 05253',
            'coordinates': {
                'latitude': 43.2392416,
                'longitude': -73.0079192
            },
            'name': 'Town Office',
            'notes': 'Bags available at Town Clerk\'s Office. Leave bags along roadsides.'
        }],
        'roadsideDropoffAllowed': true
    },
    'DOVER': {
        'dropoffLocations': [{
            'address': '11 Landfill Rd, West Dover, VT 05356',
            'coordinates': {
                'latitude': 42.9303062,
                'longitude': -72.8198858
            },
            'name': 'Transfer Station'
        }],
        'name': 'DOVER',
        'pickupLocations': [{
            'address': '9 Schoolhouse Road East Dover, Vermont 05341',
            'coordinates': {
                'latitude': 42.938863,
                'longitude': -72.80991
            },
            'name': 'Dover School',
            'notes': 'Meet at Dover School at 9 for bags and assignments. Lunch 11:30-12 at the Dover School. Leave bags on roadsides or take to the dump.'
        }],
        'roadsideDropoffAllowed': true
    },
    'DUMMERSTON': {
        'dropoffLocations': [{
            'address': 'Dummerston, VT 05301',
            'coordinates': {
                'latitude': 42.9215017,
                'longitude': -72.5838146
            },
            'name': 'Dummerston Common'
        }],
        'name': 'DUMMERSTON',
        'pickupLocations': [{
            'address': 'Dummerston, VT 05301',
            'coordinates': {
                'latitude': 42.9215017,
                'longitude': -72.5838146
            },
            'name': 'Dummerston Center Church',
            'notes': 'Meet 9am Dummerston Center\nChurch. Bring picnic lunch to eat\non the Common. Drop bags off at the Common.'
        }],
        'roadsideDropoffAllowed': false
    },
    'DUXBURY': {
        'dropoffLocations': [{
            'address': '5421 VT Route 100, Duxbury, VT 05676',
            'coordinates': {
                'latitude': 44.3196029,
                'longitude': -72.7598694
            },
            'name': 'Duxbury Town Garage'
        }],
        'name': 'DUXBURY',
        'pickupLocations': [{
            'address': '5421 VT-100, Duxbury, VT 05676',
            'coordinates': {
                'latitude': 44.3195443,
                'longitude': -72.75976299999999
            },
            'name': 'Town Clerk\'s Office',
            'notes': 'Bags are available at Town Clerk\'s Office and a North Duxbury and a South Duxbury residence (to be announced on FPF and the Next Door site). Do not leave bags on roadsides, they will not be picked up. Bring bags to one of the following locations: Town Garage or pull-off in front of the railroad crossing gate, past the GMP dam on the left-side of River Rd. No drop off in S. Duxbury - bring to Town Garage.'
        }],
        'roadsideDropoffAllowed': false
    },
    'EAST_HAVEN': {
        'dropoffLocations': [{
            'address': '634 Community Road\nEast Haven, VT 05837',
            'coordinates': {
                'latitude': 44.6400615,
                'longitude': -71.89147
            },
            'name': 'Community Building'
        }],
        'name': 'EAST HAVEN',
        'pickupLocations': [{
            'address': '634 Community Road\nEast Haven, VT 05837',
            'coordinates': {
                'latitude': 44.6400615,
                'longitude': -71.89147
            },
            'name': 'Community Building',
            'notes': 'Meet at the Comm. Bldg.  At 10am for bags\nand routes. Lunch will be provided for all  \nvolunteers. Leave bags on roadsides or bring bags to the Community\nBuilding, next to the recycling center\n in East Haven.'
        }],
        'roadsideDropoffAllowed': true
    },
    'EAST_MONTPELIER': {
        'dropoffLocations': [{
            'address': '665 Vincent Flats Rd, E. Montpelier, VT 05651',
            'coordinates': {
                'latitude': 44.28661710000001,
                'longitude': -72.4953304
            },
            'name': 'East Montpelier Elementary'
        }],
        'name': 'EAST MONTPELIER',
        'pickupLocations': [{
            'address': '40 Kelton Rd, East Montpelier, VT 05651',
            'coordinates': {
                'latitude': 44.27286429999999,
                'longitude': -72.4855788
            },
            'name': 'Town Office',
            'notes': 'Bags available at Town Office and Dudley\'s Store, and East Montpelier Elementary. Drop off bags 9-3 at East Montpelier Elementary School. Free community lunch for all volunteers.'
        }, {
            'address': '2915 US-2, East Montpelier, VT 05651',
            'coordinates': {
                'latitude': 44.270687,
                'longitude': -72.487375
            },
            'name': 'Dudley\'s Store',
            'notes': 'Bags available at Town Office and Dudley\'s Store, and East Montpelier Elementary. Drop off bags 9-3 at East Montpelier Elementary School. Free community lunch for all volunteers.'
        }, {
            'address': '665 Vincent Flats Rd, E. Montpelier, VT 05651',
            'coordinates': {
                'latitude': 44.28661710000001,
                'longitude': -72.4953304
            },
            'name': 'East Montpelier Elementary',
            'notes': 'Bags available at Town Office and Dudley\'s Store, and East Montpelier Elementary. Drop off bags 9-3 at East Montpelier Elementary School. Free community lunch for all volunteers.'
        }],
        'roadsideDropoffAllowed': false
    },
    'EDEN': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'EDEN',
        'pickupLocations': [{
            'address': '71 Old Schoolhouse Rd, Eden, VT 05653',
            'coordinates': {
                'latitude': 44.7107993,
                'longitude': -72.5380709
            },
            'name': 'Town Clerk\'s Office',
            'notes': 'Bags available at the Town Clerk\'s Office.\nLeave bags along roadsides.  '
        }],
        'roadsideDropoffAllowed': true
    },
    'ELMORE': {
        'dropoffLocations': [{
            'address': '343 Beach Rd., Elmore, VT 05657',
            'coordinates': {
                'latitude': 44.5403375,
                'longitude': -72.5311737
            },
            'name': 'Elmore Town Garage'
        }],
        'name': 'ELMORE',
        'pickupLocations': [{
            'address': '1208 Montpelier Morrisville Sthwy, Wolcott, VT 05680',
            'coordinates': {
                'latitude': 44.54041230000001,
                'longitude': -72.5233362
            },
            'name': 'Elmore Store',
            'notes': 'Bags available at the Elmore Store. Bring\nfull bags to Town Garage, 8 to 4, on \nGreen Up Day.'
        }],
        'roadsideDropoffAllowed': false
    },
    'ENOSBURG': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'ENOSBURG',
        'pickupLocations': [{
            'address': '239 Main St, Enosburg Falls, VT 05450',
            'coordinates': {
                'latitude': 44.9061426,
                'longitude': -72.8059444
            },
            'name': 'Town Clerk\'s Office',
            'notes': 'Bags available at Town Clerk\'s Office.\nContact the town office to find out what\nto do with the bags after.'
        }],
        'roadsideDropoffAllowed': true
    },
    'ESSEX': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'ESSEX',
        'pickupLocations': [{
            'address': '81 Main Street, Essex, VT',
            'coordinates': {
                'latitude': 44.4938521,
                'longitude': -73.1049939
            },
            'name': 'Town Clerk\'s Office',
            'notes': 'Bags available at Town Clerk\'s Office.\nBring bags to the Town Common, the\nHighway Garage/Fire Station or the \nIndian Brook Reservoir.'
        }, {
            'address': '2 Lincoln Street ? Essex Junction, Vermont 05452',
            'coordinates': {
                'latitude': 44.4909246,
                'longitude': -73.1114632
            },
            'name': 'Village Office',
            'notes': 'Essex Junction\nPick up bags at Village Office. GU Day, pick\nup bags at 5 Corners 9-12. Leave\nbags along roadsides.'
        }, {
            'address': '75 Maple Street\nEssex Junction, VT 05452',
            'coordinates': {
                'latitude': 44.4864066,
                'longitude': -73.1022065
            },
            'name': 'Parks & Rec',
            'notes': 'Essex Junction\nPick up bags at Parks & Rec. office. GU Day, pick\nup bags at 5 Corners 9-12. Leave\nbags along roadsides.'
        }, {
            'address': ' 6 Lincoln Street, Essex Junction, Vermont 05452',
            'coordinates': {
                'latitude': 44.4913652,
                'longitude': -73.11153999999999
            },
            'name': 'Brownell Library',
            'notes': 'Essex Junction\nPick up bags at Library. GU Day, pick\nup bags at 5 Corners 9-12. Leave\nbags along roadsides.'
        }, {
            'address': 'Intersection of Main, Lincoln, Pearl, Paark and Maple Streets, Essex Junction, VT 05452',
            'coordinates': {
                'latitude': 44.4905402,
                'longitude': -73.1112742
            },
            'name': '5 Corners',
            'notes': 'Essex Junction\nGU Day, pick\nup bags at 5 Corners 9-12. Leave\nbags along roadsides.'
        }],
        'roadsideDropoffAllowed': true
    },
    'FAIRFAX': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'FAIRFAX',
        'pickupLocations': [{
            'address': '12 Buck Hollow Rd, Fairfax, VT 05454',
            'coordinates': {
                'latitude': 44.7054985,
                'longitude': -73.0066198
            },
            'name': 'Town Clerk\'s Office',
            'notes': 'Bags available at Town Clerk\'s Office.\nContact the town office to find out what\nto do with the bags after.'
        }],
        'roadsideDropoffAllowed': true
    },
    'FAIRFIELD': {
        'dropoffLocations': [{
            'address': '12 Gilbert Hill, Fairfield, VT 05445',
            'coordinates': {
                'latitude': 44.802999,
                'longitude': -72.93741899999999
            },
            'name': 'Fairfield Town Garage'
        }],
        'name': 'FAIRFIELD',
        'pickupLocations': [{
            'address': '25 N Rd, Fairfield, VT 05455',
            'coordinates': {
                'latitude': 44.8018669,
                'longitude': -72.9447133
            },
            'name': 'Town Clerk\'s Office',
            'notes': 'Bags available at Town Clerk\'s office.\nBring bags to the dumpster at the Town Garage.'
        }],
        'roadsideDropoffAllowed': false
    },
    'FAIRLEE': {
        'dropoffLocations': [{
            'address': '55 Town Common Rd, Fairlee, VT 05045',
            'coordinates': {
                'latitude': 43.9081789,
                'longitude': -72.142603
            },
            'name': 'Fairlee Community Church'
        }],
        'name': 'FAIRLEE',
        'pickupLocations': [{
            'address': '75 Town Common Rd, Fairlee, VT 05045',
            'coordinates': {
                'latitude': 43.9083852,
                'longitude': -72.1423228
            },
            'name': 'Town Clerk\'s Office',
            'notes': 'Bags available week before Green Up at Town Clerk\'s Office. GU Day, volunteers meet at Fairlee Community Church at 10am. Bags can be dropped off at the Fairlee Comm. Church between 10 and 1 on GU Day. Refreshments provided.'
        }],
        'roadsideDropoffAllowed': true
    },
    'FAIR_HAVEN': {
        'dropoffLocations': [{
            'address': 'Fair Haven, VT 05743',
            'coordinates': {
                'latitude': 43.593757,
                'longitude': -73.266501
            },
            'name': 'Village Green'
        }],
        'name': 'FAIR HAVEN',
        'pickupLocations': [{
            'address': 'Fair Haven, VT 05743',
            'coordinates': {
                'latitude': 43.593757,
                'longitude': -73.266501
            },
            'name': 'Village Green',
            'notes': 'Bags are distributed on Green Up Day at the north end of of the Town Green from\n8-12. Bags can be left along the roadsides or returned to the Town Green.'
        }],
        'roadsideDropoffAllowed': true
    },
    'FAYSTON': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'FAYSTON',
        'pickupLocations': [{
            'address': '',
            'name': '',
            'notes': 'Green Up bags placed at street intersections a few days prior to\nGU Day. Leave full bags on roadsides, please do not take them to the transfer station. Last bag pick up is Monday morning by the road crew.'
        }],
        'roadsideDropoffAllowed': true
    },
    'FERDINAND': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'Ferdinand',
        'pickupLocations': [{
            'address': '',
            'name': '',
            'notes': 'Coordinating the towns of\nAverill, Avery\'s Gore, Lewis,\nFerdinand, Warren Gore,\nWarner\'s Grant. Bags available at the UTG Office. Bring bags to UTG Office.'
        }],
        'roadsideDropoffAllowed': true
    },
    'FERRISBURGH': {
        'dropoffLocations': [{
            'address': 'Th 33, Ferrisburg, VT 05456',
            'coordinates': {
                'latitude': 44.2050042,
                'longitude': -73.2503356
            },
            'name': 'Ferrisburgh Town Garage'
        }],
        'name': 'FERRISBURGH',
        'pickupLocations': [{
            'address': '3279 US-7, Ferrisburgh, VT 05456',
            'coordinates': {
                'latitude': 44.20781299999999,
                'longitude': -73.245705
            },
            'name': 'Town Clerk\'s Office',
            'notes': 'Bags available at Town Clerk\'s Office\nprior to GU Day or at the Ferrisburgh Central School from 9-10am on Green Up Day. Drop off bags across from the Town Garage from 10am-4pm Green Up Day only. Drop off site will be monitored.'
        }, {
            'address': '56 Little Chicago Rd, Ferrisburgh, VT 05456',
            'coordinates': {
                'latitude': 44.206608,
                'longitude': -73.247734
            },
            'name': 'Ferrisburgh Central School',
            'notes': 'Bags available at Town Clerk\'s Office\nprior to GU Day or at the Ferrisburgh Central School from 9-10am on Green Up Day. Drop off bags across from the Town Garage from 10am-4pm Green Up Day only. Drop off site will be monitored.'
        }],
        'roadsideDropoffAllowed': false
    },
    'FLETCHER': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'FLETCHER',
        'pickupLocations': [{
            'address': '33 Shaw Rd, Fletcher, VT 05444',
            'coordinates': {
                'latitude': 44.6752232,
                'longitude': -72.9235411
            },
            'name': 'Town Clerk\'s Office',
            'notes': 'Bags available at Town Clerk\'s Office.\nContact the town office to find out what\nto do with the bags after.\n'
        }],
        'roadsideDropoffAllowed': true
    },
    'FRANKLIN': {
        'dropoffLocations': [{
            'address': '5154 Main St, Franklin, VT 05457',
            'coordinates': {
                'latitude': 44.98144,
                'longitude': -72.915128
            },
            'name': 'Fire Station'
        }],
        'name': 'FRANKLIN',
        'pickupLocations': [{
            'address': '5167 Main St, Franklin, VT 05457',
            'coordinates': {
                'latitude': 44.9814999,
                'longitude': -72.9158025
            },
            'name': 'Town Clerk\'s Office',
            'notes': 'pick up bags at Town Clerk\'s Office\nor at school. Bring bags to Franklin Fire Station or leave bags at\nmajor intersections with State Highways.\nRoadside litter only, please no household trash or tires!'
        }],
        'roadsideDropoffAllowed': true
    },
    'GEORGIA': {
        'dropoffLocations': [{
            'address': '158 Morse Dr, Fairfax, VT 05454',
            'coordinates': {
                'latitude': 44.6973936,
                'longitude': -73.1032975
            },
            'name': 'Northwest Vt. Solid Waste Management'
        }],
        'name': 'GEORGIA',
        'pickupLocations': [{
            'address': '47 Town Common Rd N, Georgia, VT 05478',
            'coordinates': {
                'latitude': 44.729191,
                'longitude': -73.1167467
            },
            'name': 'Town Hall',
            'notes': 'Bags available at Town Hall. '
        }, {
            'address': '1697 Ethan Allen Hwy, Fairfax, VT 05454',
            'coordinates': {
                'latitude': 44.703182,
                'longitude': -73.10530899999999
            },
            'name': 'Library',
            'notes': 'Bags available at Library. '
        }, {
            'address': '962 Ethan Allen Hwy, Georgia, VT 05454',
            'coordinates': {
                'latitude': 44.6927785,
                'longitude': -73.1078966
            },
            'name': 'Georgia Market',
            'notes': 'Bags available at Georgia Market. We encourage volunteers to bring bags to Northwest Solid Waste District at 158 Morse Dr., off Skunk Hill Rd. near Exit 18. The town will be able to pick up roadside  bags but please consider completing your volunteer effort if at all possible by bringing bags to NWSWD.'
        }],
        'roadsideDropoffAllowed': true
    },
    'GLOVER': {
        'dropoffLocations': [{
            'address': '1600 Dry Pond Rd, Glover, VT 05839',
            'coordinates': {
                'latitude': 44.6651547,
                'longitude': -72.1939671
            },
            'name': 'Town Garage'
        }],
        'name': 'GLOVER',
        'pickupLocations': [{
            'address': '51 Bean Hill Rd, Glover, VT 05839',
            'coordinates': {
                'latitude': 44.70702,
                'longitude': -72.188042
            },
            'name': 'Town Clerk\'s Office',
            'notes': 'pick up bags at the Town Clerk, Currier\'s Market, Parker Pie or Recycling Center. Bring  bags to Town Garage or if leaving bags on roadsides contact Richard for pick up.'
        }],
        'roadsideDropoffAllowed': true
    },
    'GOSHEN': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'GOSHEN',
        'pickupLocations': [{
            'address': '',
            'name': '',
            'notes': 'Green Up Day BBQ for all volunteers\n12-2pm. Leave bags along roadsides.'
        }],
        'roadsideDropoffAllowed': true
    },
    'GRAFTON': {
        'dropoffLocations': [{
            'address': '778 VT-121, Grafton, VT 05146',
            'coordinates': {
                'latitude': 43.17429000000001,
                'longitude': -72.594803
            },
            'name': 'Town Garage'
        }],
        'name': 'GRAFTON',
        'pickupLocations': [{
            'address': '117 Main St, Grafton, VT 05146',
            'coordinates': {
                'latitude': 43.17266739999999,
                'longitude': -72.6083779
            },
            'name': 'Town Office',
            'notes': 'Bags can be picked up at the Town Office and then brought to the Town Garage where we have dumpster and ice cream for volunteers.'
        }],
        'roadsideDropoffAllowed': true
    },
    'GRANBY': {
        'dropoffLocations': [{
            'address': '9005 Granby Rd., Granby, VT 05840',
            'coordinates': {
                'latitude': 44.5699963,
                'longitude': -71.75835479999999
            },
            'name': 'Granby Town Office'
        }],
        'name': 'GRANBY',
        'pickupLocations': [{
            'address': '',
            'name': '',
            'notes': 'Meet at the Bunnell\'s at 9am. Hot Dogs,\nchips,and cookies will be at the town hall\nat Noon for any that help.'
        }],
        'roadsideDropoffAllowed': false
    },
    'GRAND_ISLE': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'GRAND ISLE',
        'pickupLocations': [{
            'address': '9 Hyde Rd, Grand Isle, VT 05458',
            'coordinates': {
                'latitude': 44.72213199999999,
                'longitude': -73.295247
            },
            'name': 'Town Clerk\'s Office',
            'notes': 'Bags are available at the Town Office prior to GUD. '
        }, {
            'address': '22 Hanson Lane, Grand Isle, VT 05458',
            'coordinates': {
                'latitude': 44.682533,
                'longitude': -73.326019
            },
            'name': 'Transfer Station',
            'notes': 'Bags are available at the Transfer Station prior to GUD. '
        }, {
            'address': '1 Donaldson RoadGrand Isle, Vermont 05458',
            'coordinates': {
                'latitude': 44.6922577,
                'longitude': -73.3002861
            },
            'name': 'Donaldson Park',
            'notes': 'On GUD go to Donaldson Park beginning at\n8am. Come back to the park beginning at\n11am for a BBQ sponsored by Rec. Committee Selectboard. Leave bags on roadsides or bring  town truck on site. Let\'s Go Green!'
        }],
        'roadsideDropoffAllowed': true
    },
    'GRANVILLE': {
        'dropoffLocations': [{
            'address': '82 Post Office Hill Road\nGranville, Vermont 05747',
            'coordinates': {
                'latitude': 43.9849061,
                'longitude': -72.8464085
            },
            'name': 'Moss Glen Grange Hall'
        }],
        'name': 'GRANVILLE',
        'pickupLocations': [{
            'address': '82 Post Office Hill Road\nGranville, Vermont 05747',
            'coordinates': {
                'latitude': 43.9849061,
                'longitude': -72.8464085
            },
            'name': 'Moss Glen Grange Hall',
            'notes': 'Anyone participating should check-in at the\nMoss Glen Grange Hall. Bags and items\ncollected should be brought to the same\nlocation for collection by our local solid\nwaste contractor to collect.'
        }],
        'roadsideDropoffAllowed': true
    },
    'GREENSBORO': {
        'dropoffLocations': [{
            'address': '81 Lauredon Ave, Greensboro, VT 05841',
            'coordinates': {
                'latitude': 44.579344,
                'longitude': -72.2953272
            },
            'name': 'Recycling Center'
        }],
        'name': 'GREENSBORO',
        'pickupLocations': [{
            'address': '81 Lauredon Ave, Greensboro, VT 05841',
            'coordinates': {
                'latitude': 44.579344,
                'longitude': -72.2953272
            },
            'name': 'Town Clerk\'s Office',
            'notes': 'Bags available at the Town Clerk\'s Office.\nBring bags to the Recycling Center behind\nTown Hall.'
        }],
        'roadsideDropoffAllowed': true
    },
    'GROTON': {
        'dropoffLocations': [{
            'address': '1476 Scott Highway, Groton, VT 05046',
            'coordinates': {
                'latitude': 44.2115517,
                'longitude': -72.1973407
            },
            'name': 'Groton Town Office'
        }],
        'name': 'GROTON',
        'pickupLocations': [{
            'address': '1476 Scott Hwy, Groton, VT 05046',
            'coordinates': {
                'latitude': 44.2115517,
                'longitude': -72.1973407
            },
            'name': 'Town Hall',
            'notes': 'Bags available a week ahead, and a week after in case of bad weather, available at the Town Hall and the Library. Bring full bags to the Town Hall parking lot for pick up.'
        }, {
            'address': '1304 Scott Hwy, Groton, VT 05046',
            'coordinates': {
                'latitude': 44.2104448,
                'longitude': -72.1942387
            },
            'name': 'Library',
            'notes': 'Bags available a week ahead, and a week after in case of bad weather, available at the Town Hall and the Library. Bring full bags to the Town Hall parking lot for pick up.'
        }],
        'roadsideDropoffAllowed': false
    },
    'GUILDHALL': {
        'dropoffLocations': [{
            'address': '13 Courthouse Dr., Guildhall, VT 05905',
            'coordinates': {
                'latitude': 44.5650017,
                'longitude': -71.56205
            },
            'name': 'Guildhall Town Office'
        }],
        'name': 'GUILDHALL',
        'pickupLocations': [{
            'address': '13 Courthouse Drive \nGuildhall, Vermont 05905',
            'coordinates': {
                'latitude': 44.5650017,
                'longitude': -71.56205
            },
            'name': 'Town Clerk\'s Office',
            'notes': 'Bags available at Town Clerk\'s Office.\nBring bags back to Town Office.'
        }],
        'roadsideDropoffAllowed': false
    },
    'GUILFORD': {
        'dropoffLocations': [{
            'address': '3940 Guilford Center Rd, Guilford, VT 05301',
            'coordinates': {
                'latitude': 42.79366599999999,
                'longitude': -72.624535
            },
            'name': 'Broad Brook Grange'
        }],
        'name': 'GUILFORD',
        'pickupLocations': [{
            'address': '3940 Guilford Center Rd, Guilford, VT 05301',
            'coordinates': {
                'latitude': 42.79366599999999,
                'longitude': -72.624535
            },
            'name': 'Broad Brook Grange',
            'notes': 'Broad Brook Grange 8:00-5:00, bags\navailable, sign in. Bring full bags to Grange \nuntil 5. No tires accepted.  Refreshments all day.'
        }],
        'roadsideDropoffAllowed': true
    },
    'HALIFAX': {
        'dropoffLocations': [{
            'address': '246 Branch Rd, West Halifax, VT 05358',
            'coordinates': {
                'latitude': 42.784431,
                'longitude': -72.768503
            },
            'name': 'Halifax West School'
        }],
        'name': 'HALIFAX',
        'pickupLocations': [{
            'address': '246 Branch Rd, West Halifax, VT 05358',
            'coordinates': {
                'latitude': 42.784431,
                'longitude': -72.768503
            },
            'name': 'Town Clerk\'s Office',
            'notes': 'Bags available at Town Clerk\'s Office\nprior to GU Day, or 10-12 at the Halifax\nSchool on GU Day. Bring full bags back to\nthe rear parking lot of the school. Refreshments served.'
        }],
        'roadsideDropoffAllowed': true
    },
    'HANCOCK': {
        'dropoffLocations': [{
            'address': '1091 Route 100, Hancock, VT 05748',
            'coordinates': {
                'latitude': 43.9247787,
                'longitude': -72.84061129999999
            },
            'name': 'Hancock Town Hall'
        }],
        'name': 'HANCOCK',
        'pickupLocations': [{
            'address': '1091 VT-100, Hancock, VT 05748',
            'coordinates': {
                'latitude': 43.9247787,
                'longitude': -72.84061129999999
            },
            'name': 'Hancock Town Hall ',
            'notes': 'Meet at Hancock Town Hall at 9 to\nget assignments. Bring bags back at \n12 to town hall. Bring gloves/rake.\nLunch served at 12.'
        }],
        'roadsideDropoffAllowed': false
    },
    'HARDWICK': {
        'dropoffLocations': [{
            'address': '333 Wolcott St., Hardwick, VT 05843',
            'coordinates': {
                'latitude': 44.507867,
                'longitude': -72.371869
            },
            'name': 'Hardwick Fire Dept'
        }],
        'name': 'HARDWICK',
        'pickupLocations': [{
            'address': '20 Church St, Hardwick, VT 05843',
            'coordinates': {
                'latitude': 44.5055225,
                'longitude': -72.3647539
            },
            'name': 'Town Office',
            'notes': 'pick up bags at Town Office and Gagnon\'s Video before Green Up Day and at the drop off site on GU Day. Drop off trash at Town Fire Station 9-3.'
        }, {
            'address': '28 Mill St, Hardwick, VT 05843',
            'coordinates': {
                'latitude': 44.5042688,
                'longitude': -72.3657405
            },
            'name': 'Gagnon\'s Video',
            'notes': 'pick up bags at Town Office and Gagnon\'s Video before Green Up Day and at the drop off site on GU Day. Drop off trash at Town Fire Station 9-3.'
        }],
        'roadsideDropoffAllowed': false
    },
    'HARTFORD': {
        'dropoffLocations': [{
            'address': '2590 N. Hartland Rd., White River Jct., VT 05001',
            'coordinates': {
                'latitude': 43.617477,
                'longitude': -72.353729
            },
            'name': 'Hartford Recycling Center'
        }],
        'name': 'HARTFORD',
        'pickupLocations': [{
            'address': '171 Bridge Street\nWhite River Junction, VT 05001',
            'coordinates': {
                'latitude': 43.6509268,
                'longitude': -72.3171613
            },
            'name': 'Hartford Municipal Building',
            'notes': 'Bags available at the Hartford Mun. \nBuilding M-F 8-5. On GU Day meet\nat 9am at Mun. Building for \nConservation Comm. Clean up project.\nBring bags to Municipal Bldg., Quechee\nGreen or Hartford Recycling Center.'
        }],
        'roadsideDropoffAllowed': false
    },
    'HARTLAND': {
        'dropoffLocations': [{
            'address': '57 VT Route 12, Hartland, VT 05048',
            'coordinates': {
                'latitude': 43.5446859,
                'longitude': -72.4078021
            },
            'name': 'Hartland Fire Station'
        }],
        'name': 'HARTLAND',
        'pickupLocations': [{
            'address': '57 VT Route 12, Hartland, VT 05048',
            'coordinates': {
                'latitude': 43.5446859,
                'longitude': -72.4078021
            },
            'name': 'Hartland Fire Station',
            'notes': 'Bags may be picked up at Damon Hall\nprior to GU Day or at 8am at 3 Corners\nFire Station on GU Day. Free lunch at 11:30 at Damon Hall. Return full bags\nto Fire Station. Recycle containers\navailable. Conservation Comm. hosts a\nwriting contest.'
        }],
        'roadsideDropoffAllowed': false
    },
    'HIGHGATE': {
        'dropoffLocations': [{
            'address': '2996 VT-78, Highgate Center, VT 05459',
            'coordinates': {
                'latitude': 44.9379157,
                'longitude': -73.04687609999999
            },
            'name': 'Town Clerk\'s Office'
        }],
        'name': 'HIGHGATE',
        'pickupLocations': [{
            'address': '2996 VT-78, Highgate Center, VT 05459',
            'coordinates': {
                'latitude': 44.9379157,
                'longitude': -73.04687609999999
            },
            'name': 'Town Clerk\'s Office',
            'notes': 'Bags available at Town Clerk\'s Office or \nfrom coordinator. Full bags can be left along  roadsides or brought back to the Town Office.'
        }],
        'roadsideDropoffAllowed': true
    },
    'HINESBURG': {
        'dropoffLocations': [{
            'address': '907 Beecher Hill Rd, Hinesburg, VT 05461',
            'coordinates': {
                'latitude': 44.32071699999999,
                'longitude': -73.07511099999999
            },
            'name': 'Town Garage'
        }],
        'name': 'HINESBURG',
        'pickupLocations': [{
            'address': '10632 VT Route 116\nHinesburg VT 05461',
            'coordinates': {
                'latitude': 44.3292595,
                'longitude': -73.11071729999999
            },
            'name': 'Town Hall',
            'notes': 'pick up bags up to 10 days early at Town\nHall.  Mark\nmap where you plan to Green Up. Town\nHall is open on GUD 8-2 to sign up and\nget bags. '
        }, {
            'address': '69 Ballards Corner Rd, Hinesburg, VT 05461',
            'coordinates': {
                'latitude': 44.3416198,
                'longitude': -73.1185895
            },
            'name': 'Carpenter Carse Library',
            'notes': 'pick up bags up to 10 days early at Carpenter Carse Library. Mark\nmap where you plan to Green Up. Leave along roadsides or bring\nto Town Garage next to CCSD Trans.\nStation on GUD 8-3:30. Community BBQ\nat Town Hall 12:00-1:00 on GUD.'
        }],
        'roadsideDropoffAllowed': true
    },
    'HOLLAND': {
        'dropoffLocations': [{
            'address': '26 School Rd, Derby Line, VT 05830',
            'coordinates': {
                'latitude': 44.9730783,
                'longitude': -72.0133074
            },
            'name': 'Holland School'
        }],
        'name': 'HOLLAND',
        'pickupLocations': [{
            'address': '120 School Road Holland, VT 05830',
            'coordinates': {
                'latitude': 44.9744277,
                'longitude': -72.0136059
            },
            'name': 'Town Clerk\'s Office',
            'notes': 'pick up bags at Town Clerk\'s Office.\nBring bags to the Holland School.\n'
        }],
        'roadsideDropoffAllowed': true
    },
    'HUBBARDTON': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'HUBBARDTON',
        'pickupLocations': [{
            'address': '1831 Monument Hill Rd, Castleton, VT 05735',
            'coordinates': {
                'latitude': 43.7175765,
                'longitude': -73.15878200000002
            },
            'name': 'Town Clerk\'s Office',
            'notes': 'pick up bags at Town Clerk\'s Office,\nTown Garage. Drop off at Town Hall on Monument Hill or Leave on roadsides at intersections.\nAll bags will be picked up Monday AM by the Hubbardton Highway Dept.'
        }],
        'roadsideDropoffAllowed': true
    },
    'HUNTINGTON': {
        'dropoffLocations': [{
            'address': '4930 Main Rd., Huntington, VT 05462',
            'coordinates': {
                'latitude': 44.295249,
                'longitude': -72.966302
            },
            'name': 'Huntington Town Garage'
        }],
        'name': 'HUNTINGTON',
        'pickupLocations': [{
            'address': '4930 Main Rd, Huntington, VT 05462',
            'coordinates': {
                'latitude': 44.295249,
                'longitude': -72.966302
            },
            'name': 'Town Clerk\'s Office',
            'notes': 'Get bags early and sign up for specific\nroads at the Town Clerk\'s Office. Bring\nbags to the Town Garage on GUD \n8:30-1:30pm. Boy Scouts available to make assignments, pass out bags and help unload. Refreshments provided, courtesy of Huntington Selectboard. Coffee  compliments of Beaudry\'s Store.'
        }],
        'roadsideDropoffAllowed': false
    },
    'HYDE_PARK': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'HYDE PARK',
        'pickupLocations': [{
            'address': '344 VT-15, Hyde Park, VT 05655',
            'coordinates': {
                'latitude': 44.598595,
                'longitude': -72.622581
            },
            'name': 'Town Office',
            'notes': 'Bags available the week prior at Town\nOffice and also in the outside hallway on Green Up Day. Leave bags\nalong town road for pick up.'
        }],
        'roadsideDropoffAllowed': true
    },
    'IRA': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'IRA',
        'pickupLocations': [{
            'address': '51 W Rd, West Rutland, VT 05777',
            'coordinates': {
                'latitude': 43.5347292,
                'longitude': -73.0656588
            },
            'name': 'Town Clerk\'s Office',
            'notes': 'Bags available at the Town Clerk\'s Office.\nLeave bags along roadsides.  '
        }],
        'roadsideDropoffAllowed': true
    },
    'IRASBURG': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'IRASBURG',
        'pickupLocations': [{
            'address': '161 VT-58, Irasburg, VT 05845',
            'coordinates': {
                'latitude': 44.803698,
                'longitude': -72.276303
            },
            'name': 'Town Clerk\'s Office',
            'notes': 'Bags can be picked up at the Town Clerk\'s Office prior to Green Up Day and bags can be left along roadsides for pick up or piled\nnext to the Town Garage.'
        }],
        'roadsideDropoffAllowed': true
    },
    'ISLE_LA_MOTTE': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'ISLE LA MOTTE',
        'pickupLocations': [{
            'address': '42 School St, Isle La Motte, VT 05463',
            'coordinates': {
                'latitude': 44.88242,
                'longitude': -73.345398
            },
            'name': 'Isle La Motte School',
            'notes': 'Meet at Isle La Motte School at 8:30am for road assignments, bags, gloves, safety vests, water and pick up sticks. Bags and other trash can be left on roadsides. Lunch served at 11:30am at the Isle La Motte Church, 67 Church Street.'
        }],
        'roadsideDropoffAllowed': true
    },
    'JAMAICA': {
        'dropoffLocations': [{
            'address': '141 Castle Hill Rd, Jamaica, VT 05343',
            'coordinates': {
                'latitude': 43.095016,
                'longitude': -72.785439
            },
            'name': 'Transfer Station'
        }],
        'name': 'JAMAICA',
        'pickupLocations': [{
            'address': '17 Pikes Falls Rd, Jamaica, VT 05343',
            'coordinates': {
                'latitude': 43.0984051,
                'longitude': -72.7812325
            },
            'name': 'Town Office',
            'notes': 'Bags available at the Town Office and Transfer Station before\nand after GU Day. Bring bags to the Transfer Station from 8 to 4 on Green Up Day.'
        }],
        'roadsideDropoffAllowed': true
    },
    'JAY': {
        'dropoffLocations': [{
            'address': '1036 VT-242, Jay, VT 05859',
            'coordinates': {
                'latitude': 44.9472848,
                'longitude': -72.4411758
            },
            'name': 'Town Hall'
        }],
        'name': 'JAY',
        'pickupLocations': [{
            'address': '1036 VT-242, Jay, VT 05859',
            'coordinates': {
                'latitude': 44.9472848,
                'longitude': -72.4411758
            },
            'name': 'Town Hall',
            'notes': 'pick up bags at 8am at Jay Town Hall. Please separate trash from recyclables from redeemables. Enjoy muffins, juice, coffee and  conversation before you head out. To volunteer or "claim your area" call Sally.  Leave bags on roadsides or bring to \nJay Town Hall.'
        }],
        'roadsideDropoffAllowed': true
    },
    'JERICHO': {
        'dropoffLocations': [{
            'address': '510 Brown\'s Trace Rd., Jericho, VT 05465',
            'coordinates': {
                'latitude': 44.4544823,
                'longitude': -72.97048529999999
            },
            'name': 'Jericho Highway Dept'
        }],
        'name': 'JERICHO',
        'pickupLocations': [{
            'address': '67 VT-15, Jericho, VT 05465',
            'coordinates': {
                'latitude': 44.506133,
                'longitude': -72.9953567
            },
            'name': 'Town Hall',
            'notes': 'pick up bags and sign up for a road at \nTown Hall. '
        }, {
            'address': '25 Jericho Center Cir, Jericho, VT 05465',
            'coordinates': {
                'latitude': 44.4699714,
                'longitude': -72.9732587
            },
            'name': 'Jericho Country Store',
            'notes': 'pick up bags and sign up for a road at Jericho Country Store. Drop in for GU Breakfast 8:30-10:30 on GU Day at Comm. Center. Bring full bags to Town Garage from 10-2 on GU Day.'
        }],
        'roadsideDropoffAllowed': false
    },
    'JOHNSON': {
        'dropoffLocations': [{
            'address': '53 Lower Main St E, Johhson, VT 05656',
            'coordinates': {
                'latitude': 44.635295,
                'longitude': -72.677939
            },
            'name': 'Johnson Town Green'
        }],
        'name': 'JOHNSON',
        'pickupLocations': [{
            'address': '293 Lower Main St W, Johnson, VT 05656',
            'coordinates': {
                'latitude': 44.63618,
                'longitude': -72.684743
            },
            'name': 'Town Office',
            'notes': 'Green Up bags available at Town Office leading up to GU Day. Bags are available at the Town Green from 8-2 on GU Day. Bring bags back to the Town Green by 1pm.'
        }, {
            'address': '53 Lower Main St E, Johhson, VT 05656',
            'coordinates': {
                'latitude': 44.635295,
                'longitude': -72.677939
            },
            'name': 'Johnson Town Green',
            'notes': 'Green Up bags available at Town Office leading up to GU Day. Bags are available at the Town Green from 8-2 on GU Day. Bring bags back to the Town Green by 1pm.'
        }],
        'roadsideDropoffAllowed': false
    },
    'KILLINGTON': {
        'dropoffLocations': [{
            'address': '2981 River Road, Killington, VT 05751',
            'coordinates': {
                'latitude': 43.67223,
                'longitude': -72.775558
            },
            'name': 'Transfer Station'
        }],
        'name': 'KILLINGTON',
        'pickupLocations': [{
            'address': '2706 River Rd, Killington, VT 05751',
            'coordinates': {
                'latitude': 43.675102,
                'longitude': -72.779701
            },
            'name': 'Town Clerk\'s Office',
            'notes': 'Bags available at the Town Clerk\'s Office.\nBring bags to the River Rd. Transfer Stat.\nBBQ for volunteers at the Killngton Rd. Firehouse.'
        }],
        'roadsideDropoffAllowed': true
    },
    'KIRBY': {
        'dropoffLocations': [{
            'address': 'Leaves on roadsides.',
            'name': ''
        }],
        'name': 'KIRBY',
        'pickupLocations': [{
            'address': '346 Town Hall Road\nKirby, VT 05851',
            'coordinates': {
                'latitude': 44.5222438,
                'longitude': -71.9380833
            },
            'name': 'Town Office',
            'notes': 'Green Up bags can be picked up at the Town Office the week prior to Green Up Day during regular office hours. Filled bags can be dropped off prior to 1pm at the Town Transfer Station or left along roadsides.'
        }],
        'roadsideDropoffAllowed': true
    },
    'LANDGROVE': {
        'dropoffLocations': [{
            'address': '88 Landgrove Road, Landgrove, VT  05148',
            'coordinates': {
                'latitude': 43.2662959,
                'longitude': -72.85734599999999
            },
            'name': 'Town Hall'
        }],
        'name': 'LANDGROVE',
        'pickupLocations': [{
            'address': '88 Landgrove Road, Landgrove, VT 05148',
            'coordinates': {
                'latitude': 43.2662959,
                'longitude': -72.85734599999999
            },
            'name': 'Town Hall',
            'notes': 'Gather at Town Hall at 9am on the First Saturday in May to get road assignments, bags and donuts. Collected trash can be brought to Town Hall or left on roadsides.'
        }],
        'roadsideDropoffAllowed': true
    },
    'LEICESTER': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'LEICESTER',
        'pickupLocations': [{
            'address': '',
            'name': '',
            'notes': 'Cookout and Raffle Prizes. \nEncouraging pellet stove owners to reuse their pellet bags for GU Day. Leave bags\non roadsides or bring to Town Garage on\nFern Lake Rd.'
        }],
        'roadsideDropoffAllowed': true
    },
    'LEWIS': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'LEWIS',
        'pickupLocations': [{
            'address': '',
            'name': '',
            'notes': 'Coordinating the towns of\nAverill, Avery\'s Gore, Lewis,\nFerdinand, Warren Gore,\nWarner\'s Grant. Bags available at the UTG Office. Bring bags to UTG Office.'
        }],
        'roadsideDropoffAllowed': true
    },
    'LINCOLN': {
        'dropoffLocations': [{
            'address': '34 Gove Hill Rd, Lincoln, VT 05443',
            'coordinates': {
                'latitude': 44.1052136,
                'longitude': -72.9970561
            },
            'name': 'Lincoln Fire Dept'
        }],
        'name': 'LINCOLN',
        'pickupLocations': [{
            'address': '34 Gove Hill Rd, Lincoln, VT 05443',
            'coordinates': {
                'latitude': 44.1052136,
                'longitude': -72.9970561
            },
            'name': 'Lincoln Fire Dept',
            'notes': '8am - 11am pick up bags, get road assignment; 11am - 1pm drop off bags, enjoy picnic lunch, try your luck at popular raffle table and a Kids Only raffle. 12:30 Raffle Winners picked. MUST BE PRESENT TO WIN. LOCATION: Lincoln Fire Dept.'
        }],
        'roadsideDropoffAllowed': false
    },
    'LONDONDERRY': {
        'dropoffLocations': [{
            'address': '60 Main St., South Londondrry, VT 05155',
            'coordinates': {
                'latitude': 43.1920058,
                'longitude': -72.8143673
            },
            'name': 'South Londonderry Fire Station'
        }],
        'name': 'LONDONDERRY',
        'pickupLocations': [{
            'address': '100 Old School Rd, South Londonderry, VT 05155',
            'coordinates': {
                'latitude': 43.190544,
                'longitude': -72.81057
            },
            'name': 'Town Office',
            'notes': 'pick up bags at People\'s Bank, Clark\'s IGA, Town Office, Transfer Station a week in advance.  Drop off on day of event to town trucks at Mill Parking Area, South Londonderry Fire Station, or the Transfer Station.'
        }],
        'roadsideDropoffAllowed': false
    },
    'LOWELL': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'LOWELL',
        'pickupLocations': [{
            'address': '2170 VT Rte 100 Lowell, VT05847',
            'coordinates': {
                'latitude': 44.806247,
                'longitude': -72.448179
            },
            'name': 'Town Clerk\'s Office',
            'notes': 'Bags are available at the Town Clerk\'s\nOffice and the School. Bring bags to\ndumpster at Town Clerk\'s Office Wed or Leave on roadsides at intersections. \nbefore through the following Wednesday\nafter GU Day.'
        }],
        'roadsideDropoffAllowed': true
    },
    'LUDLOW': {
        'dropoffLocations': [{
            'address': 'RR 100, Ludlow, VT 05149',
            'coordinates': {
                'latitude': 43.3958564,
                'longitude': -72.70052559999999
            },
            'name': 'Transfer Station'
        }],
        'name': 'LUDLOW',
        'pickupLocations': [{
            'address': '37 Main St, Ludlow, Vermont 05149',
            'coordinates': {
                'latitude': 43.3970512,
                'longitude': -72.6872705
            },
            'name': 'Community Center',
            'notes': 'Volunteers meet at 9:30 at Ludlow Comm.\nCenter in the morning for coffee and\ndonuts. Afternoon BBQ for all volunteers.\nLet coordinator know what roadsides you\nwill be leaving bags on or bring to the\nTransfer Station.'
        }],
        'roadsideDropoffAllowed': true
    },
    'LUNENBURG': {
        'dropoffLocations': [{
            'address': '47 Transfer Station, Lunenburg, VT 05906',
            'coordinates': {
                'latitude': 44.461368,
                'longitude': -71.6632209
            },
            'name': 'Transfer Station'
        }],
        'name': 'LUNENBURG',
        'pickupLocations': [{
            'address': '9 W Main St, Lunenburg, VT 05906',
            'coordinates': {
                'latitude': 44.462888,
                'longitude': -71.68267
            },
            'name': 'Town Office',
            'notes': 'pick up bags at the Town Office. Bring bags to Transfer Station or Leave on roadsides at intersections.'
        }],
        'roadsideDropoffAllowed': true
    },
    'LYNDON': {
        'dropoffLocations': [{
            'address': '1192 Vt 122, Lyndon, VT 05851',
            'coordinates': {
                'latitude': 44.5532055,
                'longitude': -72.02880259999999
            },
            'name': 'Lyndon Town Office'
        }],
        'name': 'LYNDON',
        'pickupLocations': [{
            'address': '1192 Vt 122, Lyndon, VT 05851',
            'coordinates': {
                'latitude': 44.5532055,
                'longitude': -72.02880259999999
            },
            'name': 'Lyndon Town Office',
            'notes': 'Get bags early and sign up for routes at\nthe Municipal Offices prior to Green Up \nDay. Drop off bags at the large dumpster\nbehind the Municipal Offices on Saturday,\nMay 6th from 9-1pm. The Boy Scouts\nwill be on hand with refreshments and to\nhelp unload. Please do not leave bags on\nroadsides as there is no roadside pick up.'
        }],
        'roadsideDropoffAllowed': false
    },
    'MAIDSTONE': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'MAIDSTONE',
        'pickupLocations': [{
            'address': '508 VT-102, Maidstone, VT 05905',
            'coordinates': {
                'latitude': 44.5775298,
                'longitude': -71.5546478
            },
            'name': 'Town Clerk\'s Office',
            'notes': 'Bags available at Town Clerk\'s Office.\nLeave bags along Route 102 or roadside\nalong Lake Maidstone.'
        }],
        'roadsideDropoffAllowed': true
    },
    'MANCHESTER': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'MANCHESTER',
        'pickupLocations': [{
            'address': '137 North St, Bennington, VT 05201',
            'coordinates': {
                'latitude': 42.8795969,
                'longitude': -73.196877
            },
            'name': 'VFW',
            'notes': 'Meet at VFW GU Day morning for\nbags and assignments. Leave bags on\nroadsides.'
        }],
        'roadsideDropoffAllowed': true
    },
    'MARLBORO': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'MARLBORO',
        'pickupLocations': [{
            'address': '510 South Road, Marlboro, VT 05344',
            'coordinates': {
                'latitude': 42.85986339999999,
                'longitude': -72.7258997
            },
            'name': 'Town Office',
            'notes': 'Bags available at Town Office and \nElementary School. Town map in\nglass case outside Town Office, \nhighlight where you will GU.\nLeave bags along roadsides.'
        }],
        'roadsideDropoffAllowed': true
    },
    'MARSHFIELD': {
        'dropoffLocations': [{
            'address': '122 School St. #1, Marshfield, VT 05658',
            'coordinates': {
                'latitude': 44.349356,
                'longitude': -72.355082
            },
            'name': 'Marshfield Town Garage'
        }],
        'name': 'MARSHFIELD',
        'pickupLocations': [{
            'address': '122 School St # 1, Marshfield, VT 05658',
            'coordinates': {
                'latitude': 44.349356,
                'longitude': -72.355082
            },
            'name': 'Town Office',
            'notes': 'Bags available at Town Office.\nBring bags to Town Garage on School \nStreet from 8am until Noon.'
        }],
        'roadsideDropoffAllowed': false
    },
    'MENDON': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections',
            'name': ''
        }],
        'name': 'MENDON',
        'pickupLocations': [{
            'address': '2282 US-4, Mendon, VT 05701',
            'coordinates': {
                'latitude': 43.6474382,
                'longitude': -72.9283871
            },
            'name': 'Town Office',
            'notes': 'Bags available at the Town Office. Bags can be left on the roadsides of any town highway. We welcome early participation the week before, as well as an ongoing effort throughout the year. If you see a problem area in Mendon that you want to clean up, contact the town office for assistance.'
        }],
        'roadsideDropoffAllowed': true
    },
    'MIDDLEBURY': {
        'dropoffLocations': [{
            'address': '1020 South Route 7, Middlebury, VT 05753',
            'coordinates': {
                'latitude': 44.0099621,
                'longitude': -73.1699551
            },
            'name': 'Middlebury Public Works Building'
        }, {
            'address': '298 Buttolph Dr, Middlebury, VT 05753',
            'coordinates': {
                'latitude': 44.0129355,
                'longitude': -73.1611338
            },
            'name': 'Middlebury Municipal Pool'
        }, {
            'address': '50 Franklin Street Middlebury College Middlebury, VT 05753',
            'coordinates': {
                'latitude': 44.00825950000001,
                'longitude': -73.1773152
            },
            'name': 'Park across from Twilight Hall'
        }],
        'name': 'MIDDLEBURY',
        'pickupLocations': [{
            'address': '77 Main St, Middlebury, VT 05753',
            'coordinates': {
                'latitude': 44.01236309999999,
                'longitude': -73.1691677
            },
            'name': 'Town Clerk\'s Office',
            'notes': 'Bags available the Town Clerk\'s office. Filled bags can be dropped\noff 10-3 at town trucks located at 1) Parking\nLot by the town pool; 2) "New" park across\nfrom Twilight; 3) Town Public Works bldg\non Route 7.'
        }],
        'roadsideDropoffAllowed': false
    },
    'MIDDLESEX': {
        'dropoffLocations': [{
            'address': 'Shady Rill Rd., Middlesex, VT 05602',
            'coordinates': {
                'latitude': 44.3428577,
                'longitude': -72.58830069999999
            },
            'name': 'Middlesex Town Garage'
        }],
        'name': 'MIDDLESEX',
        'pickupLocations': [{
            'address': '5 Church St, Middlesex, VT 05602',
            'coordinates': {
                'latitude': 44.292568,
                'longitude': -72.679512
            },
            'name': 'Town Office',
            'notes': 'Bags can be picked up at the Town Office \nand Rumney School. Do not leave bags on\nroadsides, please bring to the Town Garage\non Shady Rill Road between 9:00 and 3:00.'
        }],
        'roadsideDropoffAllowed': false
    },
    'MIDDLETOWN_SPRINGS': {
        'dropoffLocations': [{
            'address': '8 Firehouse Lane, Middletown Springs, VT 05757',
            'name': 'Transfer Station'
        }],
        'name': 'MIDDLETOWN SPRINGS',
        'pickupLocations': [{
            'address': '10 Park Ave, Middletown Springs, VT 05757',
            'coordinates': {
                'latitude': 43.4861934,
                'longitude': -73.11801799999999
            },
            'name': 'Town Clerk\'s Office',
            'notes': 'pick up bags at the Town Green 8-12 \non GU Day or call the coordinator for bags to be delivered to your house. Drop off bags at Transfer Station. Refreshments provided.'
        }],
        'roadsideDropoffAllowed': true
    },
    'MILTON': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections or take to \nTown Garage \n43 Bombardier Rd, Milton, VT 05468',
            'name': 'Town Garage'
        }],
        'name': 'MILTON',
        'pickupLocations': [{
            'address': '43 Bombardier Rd.\nMilton, VT 05468',
            'coordinates': {
                'latitude': 44.619045,
                'longitude': -73.1239631
            },
            'name': 'Town Office',
            'notes': 'Bags available prior to GU Day at \ntown office, limit 5 bags,. Bring bags to Town Garage or leave bags along roadsides.'
        }, {
            'address': '43 Bombardier Rd.\nMilton, VT 05468',
            'coordinates': {
                'latitude': 44.619045,
                'longitude': -73.1239631
            },
            'name': 'Rec Park',
            'notes': 'GU Day,\n8-12 sign up and bag distribution at Milton Rec Park on Middle Road. Cookout from Noon to 1pm. Bring bags to Town Garage or leave bags along roadsides.'
        }],
        'roadsideDropoffAllowed': true
    },
    'MONKTON': {
        'dropoffLocations': [{
            'address': '4047 States Prison Rd, Monkton, VT 05469',
            'coordinates': {
                'latitude': 44.253113,
                'longitude': -73.119225
            },
            'name': 'Monkton Highway Dept'
        }],
        'name': 'MONKTON',
        'pickupLocations': [{
            'address': '280 Monkton Ridge, North Ferrisburgh, VT 05473',
            'coordinates': {
                'latitude': 44.253892,
                'longitude': -73.1241531
            },
            'name': 'Town Hall',
            'notes': 'Monkton Maples distribute bags at the Town Hall on GU Day. Take trash to Town\nGarage.'
        }],
        'roadsideDropoffAllowed': false
    },
    'MONTGOMERY': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'MONTGOMERY',
        'pickupLocations': [{
            'address': '98 S Main St, Montgomery Center, VT 05471',
            'coordinates': {
                'latitude': 44.8753195,
                'longitude': -72.6076585
            },
            'name': 'Town Clerk\'s Office',
            'notes': 'Bags available at Town Clerk\'s Office.\nLeave bags along roadsides.\n'
        }],
        'roadsideDropoffAllowed': true
    },
    'MONTPELIER': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'MONTPELIER',
        'pickupLocations': [{
            'address': '',
            'name': '',
            'notes': 'Bags are picked up at our registration table at the Farmer\'s Market and full bags can be left curbside for the Dept. of Public Works to pick up.'
        }],
        'roadsideDropoffAllowed': true
    },
    'MORETOWN': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'MORETOWN',
        'pickupLocations': [{
            'address': '',
            'name': 'Town Clerk\'s Office',
            'notes': 'Bags available at Town Clerk\'s Office.\nLeave along roadsides for pick up.'
        }],
        'roadsideDropoffAllowed': true
    },
    'MORGAN': {
        'dropoffLocations': [{
            'address': '2042-, 2186 VT-111, Morgan, VT 05853',
            'coordinates': {
                'latitude': 44.8601904,
                'longitude': -71.93914579999999
            },
            'name': 'Transfer Station'
        }],
        'name': 'MORGAN',
        'pickupLocations': [{
            'address': '8411 Vt Rt 111, Morgan, VT 05853',
            'coordinates': {
                'latitude': 44.9131016,
                'longitude': -72.0145495
            },
            'name': 'Morgan Country Store',
            'notes': 'Bags available at the Morgan Country Store. Bring bags to the dump or contact Tammy if you can?t get there.'
        }],
        'roadsideDropoffAllowed': true
    },
    'MORRISTOWN': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'MORRISTOWN',
        'pickupLocations': [{
            'address': '43 Portland St, Morrisville, VT 05661',
            'coordinates': {
                'latitude': 44.5624068,
                'longitude': -72.5987823
            },
            'name': 'Town Clerk\'s Office',
            'notes': 'Bags available at the Town Clerk\'s Office.\nLeave full bags along roadsides for\npick up by the Morristown Hwy Dept.'
        }],
        'roadsideDropoffAllowed': true
    },
    'MOUNT_HOLLY': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'MOUNT HOLLY',
        'pickupLocations': [{
            'address': '26 Maple Hill Rd, Mount Holly, VT 05758',
            'coordinates': {
                'latitude': 43.4108701,
                'longitude': -72.81944899999999
            },
            'name': 'Mount Holly Library',
            'notes': 'Bags and road assignments are given out at the Mount Holly Library. Lunch for all volunteers at Belmont General Store. The Librarian visits the Elementary School with a basket of summer fun toys which children can sign up to win when they come to get their bags on Saturday morning. Leaves bags on roadsides, town crews will pick up Monday.'
        }],
        'roadsideDropoffAllowed': true
    },
    'MOUNT_TABOR': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'MOUNT TABOR',
        'pickupLocations': [{
            'address': '522 Mt Tabor Rd, Mt Tabor, VT 05739',
            'coordinates': {
                'latitude': 43.3502509,
                'longitude': -72.98326519999999
            },
            'name': 'Town Clerk\'s Office',
            'notes': 'Bags available at the Town Clerk\'s Office.\nBring bags to Mt. Tabor Transfer Station\nTues. 3-5pm and Sat. 9-2pm.'
        }],
        'roadsideDropoffAllowed': false
    },
    'NEWARK': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'NEWARK',
        'pickupLocations': [{
            'address': '',
            'name': '',
            'notes': 'Contact town coordinator for bags and information. Bags can be left on roadsides.'
        }],
        'roadsideDropoffAllowed': true
    },
    'NEWBURY': {
        'dropoffLocations': [{
            'address': 'Main St (at Pulaski St), Newbury, VT 05051',
            'coordinates': {
                'latitude': 44.0781576,
                'longitude': -72.0585068
            },
            'name': 'Newbury Common'
        }],
        'name': 'NEWBURY',
        'pickupLocations': [{
            'address': '4991 US-5, Newbury, VT 05051',
            'coordinates': {
                'latitude': 44.0790666,
                'longitude': -72.05764769999999
            },
            'name': 'Newbury Village Store',
            'notes': 'Bags available from coordinators and also\navailable at the Newbury Village Store.\nBring bags to Newbury Common on Green\nUp Day. If there are items that are too large to handle please report them to the coordinator.'
        }],
        'roadsideDropoffAllowed': false
    },
    'NEWFANE': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'NEWFANE',
        'pickupLocations': [{
            'address': '555 VT-30, Newfane, VT 05345',
            'coordinates': {
                'latitude': 42.9838837,
                'longitude': -72.6562181
            },
            'name': 'Town Office',
            'notes': 'Bags are available at the Town Office and the Newfane Market. Full bags should be left visible on the side of the road for pick up early Monday morning by the road crew.'
        }],
        'roadsideDropoffAllowed': true
    },
    'NEWPORT_CITY': {
        'dropoffLocations': [{
            'address': '155 Gardner Park Rd, Newport, VT 05855',
            'coordinates': {
                'latitude': 44.93890750000001,
                'longitude': -72.2025829
            },
            'name': 'Gardner Memorial Park'
        }],
        'name': 'NEWPORT CITY',
        'pickupLocations': [{
            'address': '155 Gardner Park Rd, Newport, VT 05855',
            'coordinates': {
                'latitude': 44.93890750000001,
                'longitude': -72.2025829
            },
            'name': 'Gardner Memorial Park',
            'notes': 'pick up bags and routes at 10am at\nthe Garnder Memorial Park skate shack.\nLight refreshments provided. Bring bags\nto Skate Shack in Gardner Park in\ndowntown Newport.'
        }],
        'roadsideDropoffAllowed': true
    },
    'NEW_HAVEN': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'NEW HAVEN',
        'pickupLocations': [{
            'address': '',
            'name': '',
            'notes': 'Please come to the Town Green between 9 and 11 on GU Day to register for a road and pick up your bags, gloves, safety tips and updates, and free bottled water, sunscreen and bug spray. Please leave full bags along roadsides for the town crew to pick up on Monday.'
        }],
        'roadsideDropoffAllowed': true
    },
    'NORTHFIELD': {
        'dropoffLocations': [{
            'address': '128 Wall St, Northfield, VT 05663',
            'coordinates': {
                'latitude': 44.148795,
                'longitude': -72.65877700000001
            },
            'name': 'Firehouse'
        }],
        'name': 'NORTHFIELD',
        'pickupLocations': [{
            'address': '128 Wall St, Northfield, VT 05663',
            'coordinates': {
                'latitude': 44.148795,
                'longitude': -72.65877700000001
            },
            'name': 'Firehouse',
            'notes': 'Bags available starting at 9am on GU Day\nbehind firehouse. Return bags to firehouse by 12, light refreshments.'
        }],
        'roadsideDropoffAllowed': true
    },
    'NORTH_HERO': {
        'dropoffLocations': [{
            'address': '769 South End Rd., N. Hero, VT 05474',
            'coordinates': {
                'latitude': 44.781242,
                'longitude': -73.309235
            },
            'name': 'Camp Ingalls'
        }],
        'name': 'NORTH HERO',
        'pickupLocations': [{
            'address': '6441 US Route 2, North Hero, VT 05474',
            'coordinates': {
                'latitude': 44.8506814,
                'longitude': -73.2633819
            },
            'name': 'Town Office',
            'notes': 'pick up Green Up bags at the Town Office. Town truck will be parked at Camp Ingalls on Green Up Day. North Hero Parks & Rec Committee will host a  complimentary lunch at Noon for volunteers at Camp Ingalls. Join us to celebrate in this annual Vermont tradition!'
        }],
        'roadsideDropoffAllowed': false
    },
    'NORTON': {
        'dropoffLocations': [{
            'address': '249 VT Route 114 South, Norton, VT 05907',
            'coordinates': {
                'latitude': 45.005775,
                'longitude': -71.79789
            },
            'name': 'Norton Recycling Center'
        }],
        'name': 'NORTON',
        'pickupLocations': [{
            'address': '12 VT-114, Norton, VT 05907',
            'coordinates': {
                'latitude': 45.008935,
                'longitude': -71.795112
            },
            'name': 'Town Office',
            'notes': 'Bags available at Town Office. Bring bags to the Recycling Center, 249 VT Route 114 South. Please do not Leave on roadsides at intersections.'
        }],
        'roadsideDropoffAllowed': false
    },
    'NORWICH': {
        'dropoffLocations': [{
            'address': '63 US-5 Norwich,VT05055',
            'coordinates': {
                'latitude': 43.7053422,
                'longitude': -72.3087572
            },
            'name': 'Car Store'
        }],
        'name': 'NORWICH',
        'pickupLocations': [{
            'address': '300 S Main St, Norwich, VT 05055',
            'coordinates': {
                'latitude': 43.7139021,
                'longitude': -72.30792149999999
            },
            'name': 'Town Clerk\'s Office',
            'notes': 'pick up bags at Town Clerk\'s Office or the transfer station. Bags will be picked up by Norwich Public Works along the roadsides. A roll-off is provided by Casella Waste at the Car Store in Norwich. Refereshments and t-shirts also available at the Car Store on Green Up Day.'
        }],
        'roadsideDropoffAllowed': true
    },
    'ORANGE': {
        'dropoffLocations': [{
            'address': '144 Richardson Rd, Orange, VT 05641',
            'coordinates': {
                'latitude': 44.13881629999999,
                'longitude': -72.40663599999999
            },
            'name': 'Town Garage'
        }],
        'name': 'ORANGE',
        'pickupLocations': [{
            'address': '392 US-302, Orange, VT 05641',
            'coordinates': {
                'latitude': 44.148013,
                'longitude': -72.40122389999999
            },
            'name': 'Town Clerk\'s Office',
            'notes': 'Bags can be picked up at Town Clerk\'s Office. BBQ for volunteers at 12:30. \nPlease leave bags along roadsides or bring them to the Town Garage from 8-12.'
        }],
        'roadsideDropoffAllowed': true
    },
    'ORWELL': {
        'dropoffLocations': [{
            'address': '606 Main St., Orwell, VT 05760',
            'coordinates': {
                'latitude': 43.803636,
                'longitude': -73.291198
            },
            'name': 'Orwell Town Garage'
        }],
        'name': 'ORWELL',
        'pickupLocations': [{
            'address': '436 Main St, Orwell, VT 05760',
            'coordinates': {
                'latitude': 43.803726,
                'longitude': -73.3013689
            },
            'name': 'Town Clerk\'s Office',
            'notes': 'pick up bags at Town Clerk\'s office  Drop off\nat Town Garage on Green Up Day, 8-3pm.'
        }, {
            'address': '499 Main St, Orwell, VT 05760',
            'coordinates': {
                'latitude': 43.803524,
                'longitude': -73.298363
            },
            'name': 'Buxton\'s',
            'notes': 'pick up bags at Buxton\'s.  Drop off\nat Town Garage on Green Up Day, 8-3pm.'
        }, {
            'address': '330 VT-22A, Orwell, VT 05760',
            'coordinates': {
                'latitude': 43.803875,
                'longitude': -73.305397
            },
            'name': 'Orwell Gas N Go',
            'notes': 'pick up bags at Orwell Gas N Go. Drop off\nat Town Garage on Green Up Day, 8-3pm.'
        }],
        'roadsideDropoffAllowed': false
    },
    'PANTON': {
        'dropoffLocations': [{
            'address': '2163 Panton Rd, Panton, VT 05491',
            'coordinates': {
                'latitude': 44.154015,
                'longitude': -73.300133
            },
            'name': 'Town Garage'
        }],
        'name': 'PANTON',
        'pickupLocations': [{
            'address': '3176 Jersey Street\nPanton, VT 05491',
            'coordinates': {
                'latitude': 44.147621,
                'longitude': -73.34156
            },
            'name': 'Town Office',
            'notes': 'Bags available at the Town Office.  '
        }, {
            'address': '2163 Panton Rd, Panton, VT 05491',
            'coordinates': {
                'latitude': 44.154015,
                'longitude': -73.300133
            },
            'name': 'Town Garage',
            'notes': 'Bags available at the Town Garage. Roadside pick up or bring to Town Garage. '
        }],
        'roadsideDropoffAllowed': true
    },
    'PAWLET': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'PAWLET',
        'pickupLocations': [{
            'address': '122 School St, Pawlet, VT 05761',
            'coordinates': {
                'latitude': 43.3456,
                'longitude': -73.178932
            },
            'name': 'Town Clerk\'s Office',
            'notes': 'Bags are distributed through Mettawee \nSchool, Town Clerk\'s Office, with extra\nbags left on Town Clerk porch on GUD.\nLeave bags at intersections or bring to\nTown Shed. Bags collected on Monday by Town Highway Dept. Visit pawletfire.org for more info. '
        }],
        'roadsideDropoffAllowed': true
    },
    'PEACHAM': {
        'dropoffLocations': [{
            'address': '340 Bayley-Hazen Rd., Peacham, VT 05862',
            'coordinates': {
                'latitude': 44.3257535,
                'longitude': -72.1671083
            },
            'name': 'Peacham Elementary'
        }],
        'name': 'PEACHAM',
        'pickupLocations': [{
            'address': '340 Bayley-Hazen Road\nPeacham, Vermont 05862',
            'coordinates': {
                'latitude': 44.3257535,
                'longitude': -72.1671083
            },
            'name': 'Elementary School',
            'notes': 'Coffee, donuts, GU bags available 7:30\nto 12 on GU Day at Elem. School. Picnic\nat noon at Elem. School. Return filled bags to dump trucks at school on Sat. or\nto transfer station afterwards.'
        }],
        'roadsideDropoffAllowed': false
    },
    'PERU': {
        'dropoffLocations': [{
            'address': '402 Main St., Peru, VT 05152',
            'coordinates': {
                'latitude': 43.229553,
                'longitude': -72.900955
            },
            'name': 'Town Center Parking Lot'
        }],
        'name': 'PERU',
        'pickupLocations': [{
            'address': '402 Main St., Peru, VT 05152',
            'coordinates': {
                'latitude': 43.229553,
                'longitude': -72.900955
            },
            'name': 'Town Center',
            'notes': 'Refreshments for volunteers, pick up bags at Town Center (Tues & Thur 8:30-4). Drop off in Town Center parking lot. Call for assignments.'
        }],
        'roadsideDropoffAllowed': false
    },
    'PITTSFIELD': {
        'dropoffLocations': [{
            'address': '40 Village Green, Pittsfield, VT 05762',
            'coordinates': {
                'latitude': 43.7706423,
                'longitude': -72.812383
            },
            'name': 'Pittsfield Town Office'
        }],
        'name': 'PITTSFIELD',
        'pickupLocations': [{
            'address': '40 Village Green, Pittsfield, VT 05762',
            'coordinates': {
                'latitude': 43.7706423,
                'longitude': -72.812383
            },
            'name': 'Town Clerk\'s Office',
            'notes': 'pick up bags starting at 8am at Town\nClerk\'s Office. Drop off there when \nyou are done. Refreshments provided.'
        }],
        'roadsideDropoffAllowed': false
    },
    'PITTSFORD': {
        'dropoffLocations': [{
            'address': '426 Plains Rd., Pittsford, VT 05763',
            'coordinates': {
                'latitude': 43.715443,
                'longitude': -73.028183
            },
            'name': 'Pittsford Town Office'
        }],
        'name': 'PITTSFORD',
        'pickupLocations': [{
            'address': '426 Plains Rd, Pittsford, VT 05763',
            'coordinates': {
                'latitude': 43.715443,
                'longitude': -73.028183
            },
            'name': 'Town Clerk\'s Office',
            'notes': 'Bags available at the Town Clerk\'s Office. \nPlease bring full bags back to the Town \nOffices.'
        }],
        'roadsideDropoffAllowed': false
    },
    'PLAINFIELD': {
        'dropoffLocations': [{
            'address': '99 Cameron Rd., Plainfield, VT 05667',
            'coordinates': {
                'latitude': 44.26609759999999,
                'longitude': -72.4096562
            },
            'name': 'Plainfield Town Garage'
        }],
        'name': 'PLAINFIELD',
        'pickupLocations': [{
            'address': '',
            'name': '',
            'notes': 'pick up bags at the Rec Field from 9-12. Deliver full bags, debris, tires, etc, to Town Garage until 4pm. Let coordinators know if anything needs to be picked up.'
        }],
        'roadsideDropoffAllowed': false
    },
    'PLYMOUTH': {
        'dropoffLocations': [{
            'address': '1515 Lynds Hill Rd., Plymouth, VT 05056',
            'coordinates': {
                'latitude': 43.520805,
                'longitude': -72.710846
            },
            'name': 'Plymouth Transfer Station'
        }],
        'name': 'PLYMOUTH',
        'pickupLocations': [{
            'address': '68 Town Office Rd, Plymouth, VT 05056',
            'coordinates': {
                'latitude': 43.5341949,
                'longitude': -72.74292
            },
            'name': 'Plymouth Municipal Building',
            'notes': 'Meet 8am at Plymouth Municipal Bldg, sign\nin, pick up bags and a route, a free t-shirt\nor hat. Pick up trucks are also needed to\nhaul trash back to Trans. Station. Meet back at Mun. Bldg. at noon, potluck, bring\na dish to share.'
        }],
        'roadsideDropoffAllowed': false
    },
    'POMFRET': {
        'dropoffLocations': [{
            'address': '100 LaBounty Rd., N. Pomfret, VT 05053',
            'coordinates': {
                'latitude': 43.6979284,
                'longitude': -72.52079789999999
            },
            'name': 'Pomfret Town Garage'
        }],
        'name': 'POMFRET',
        'pickupLocations': [{
            'address': '100 La Bounty Rd, North Pomfret, VT 05053',
            'coordinates': {
                'latitude': 43.6979284,
                'longitude': -72.52079789999999
            },
            'name': 'Town Garage',
            'notes': 'Bags pickup and drop off at Town Garage on LaBounty Rd. from 8 to 1pm. No roadside pick up! Bring all materials to the Town Garage by Sunday afternoon. Household trash and tires will NOT be accepted.'
        }],
        'roadsideDropoffAllowed': false
    },
    'POULTNEY': {
        'dropoffLocations': [{
            'address': '611 Hillside Rd, Poultney, VT 05764',
            'coordinates': {
                'latitude': 43.536274,
                'longitude': -73.20518500000001
            },
            'name': 'Transfer Station'
        }],
        'name': 'POULTNEY',
        'pickupLocations': [{
            'address': '9 Main St, Poultney, VT 05764',
            'coordinates': {
                'latitude': 43.5165324,
                'longitude': -73.2330867
            },
            'name': 'Town Clerk\'s Office',
            'notes': 'Bags available at the Town Clerk\'s Office.\nBring bags to the Transfer Station.'
        }],
        'roadsideDropoffAllowed': true
    },
    'POWNAL': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'POWNAL',
        'pickupLocations': [{
            'address': '467 Center St, Pownal, VT 05261',
            'coordinates': {
                'latitude': 42.795143,
                'longitude': -73.22367899999999
            },
            'name': 'Town Clerk\'s Office',
            'notes': 'pick up bags at Town Clerk\'s office or\nTransfer Station. Drop off at Transfer\nStation 8-4 on GU Day.'
        }, {
            'address': 'RD1, Pownal, VT  05261',
            'name': 'Transfer Station',
            'notes': 'pick up bags at Town Clerk\'s office or\nTransfer Station. Drop off at Transfer\nStation 8-4 on GU Day.'
        }],
        'roadsideDropoffAllowed': true
    },
    'PROCTOR': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'PROCTOR',
        'pickupLocations': [{
            'address': '45 Main St, Proctor, VT 05765',
            'coordinates': {
                'latitude': 43.6620169,
                'longitude': -73.0360772
            },
            'name': 'Town Office',
            'notes': 'Bags available prior to GUD at Town Office. On Green Up Day at Town Green 8 to 3pm. Town road crew picks up bags\nleft on roadsides.'
        }],
        'roadsideDropoffAllowed': true
    },
    'PUTNEY': {
        'dropoffLocations': [{
            'address': '127 Main St, Putney, VT 05346',
            'coordinates': {
                'latitude': 42.9746259,
                'longitude': -72.52210029999999
            },
            'name': 'Town Hall'
        }],
        'name': 'PUTNEY',
        'pickupLocations': [{
            'address': '127 Main St, Putney, VT 05346',
            'coordinates': {
                'latitude': 42.9746259,
                'longitude': -72.52210029999999
            },
            'name': 'Town Hall',
            'notes': 'A Putney Town Truck will be parked\nat usual spot next to Town Hall through Monday am. 8am bags available all day. Take only  what you need, full bags in back of truck.'
        }],
        'roadsideDropoffAllowed': true
    },
    'RANDOLPH': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'RANDOLPH',
        'pickupLocations': [{
            'address': '7 Summer St, Randolph, VT 05060',
            'coordinates': {
                'latitude': 43.9236764,
                'longitude': -72.6666286
            },
            'name': 'Town Hall',
            'notes': 'Bags at Town Hall, local stores prior to GU Day. On GU Day at Town Hall 9-12. Tie up bags and Leave on roadsides at intersections for Monday pick up by road crew. Please use GU bags for roadside trash only.'
        }],
        'roadsideDropoffAllowed': true
    },
    'READING': {
        'dropoffLocations': [{
            'address': '5024 VT Route 106, Perkinsville, VT 05151',
            'coordinates': {
                'latitude': 43.410191,
                'longitude': -72.5136179
            },
            'name': 'Weathersfield Transfer Station'
        }],
        'name': 'READING',
        'pickupLocations': [{
            'address': '799 Route 106, Reading, VT 05062',
            'coordinates': {
                'latitude': 43.4556288,
                'longitude': -72.5374319
            },
            'name': 'Town Hall',
            'notes': 'Bags can be picked up the week prior to Green Up Day at the Greenhouse, Town Hall and the General Store. Free coffee and donuts are offered at the Town Hall on Green Up Day where bags and assignments are given. Bring bags to the Weathersfield Transfer Station for free or leave at Town Hall parking lot prior to Noon for pick up. '
        }],
        'roadsideDropoffAllowed': false
    },
    'READSBORO': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'READSBORO',
        'pickupLocations': [{
            'address': 'Main Street, Readsboro, VT',
            'coordinates': {
                'latitude': 42.7736363,
                'longitude': -72.9509989
            },
            'name': 'Gazebo ',
            'notes': 'Bags at Gazebo 9-1 on GU Day, \nrefreshments provided by American\nLegion. Let Jody know where you are \ncleaning up and she will make sure bags\nget picked up. If done on a different day\nbring bags to the Bandstand.'
        }],
        'roadsideDropoffAllowed': true
    },
    'RICHFORD': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'RICHFORD',
        'pickupLocations': [{
            'address': '94 Main St, Richford, VT 05476',
            'coordinates': {
                'latitude': 44.99483,
                'longitude': -72.673603
            },
            'name': 'Town Clerk\'s Office',
            'notes': 'Bags can be picked up at the Town Clerk\'s Oiffce until Friday at 12, after that call Deborah. When bags are full, they can be left on roadsides or taken to the dumpster at the Town Garage.'
        }],
        'roadsideDropoffAllowed': true
    },
    'RICHMOND': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'RICHMOND',
        'pickupLocations': [{
            'address': '203 Bridge St, Richmond, VT 05477',
            'coordinates': {
                'latitude': 44.4026218,
                'longitude': -72.9952696
            },
            'name': 'Town Office',
            'notes': 'pick up bags at town office before\nGreen Up Day. Leave bags on roadside or\nbring to Town Garage.'
        }],
        'roadsideDropoffAllowed': true
    },
    'RIPTON': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'RIPTON',
        'pickupLocations': [{
            'address': '1311 VT-125, Ripton, VT 05766',
            'coordinates': {
                'latitude': 43.9751445,
                'longitude': -73.03649589999999
            },
            'name': 'Town Office',
            'notes': 'pick up bags at Town Office, Ripton Country Store, or the town shed on GU Day. Drop off bags through the following Saturday at town shed. Food at Town Shed on GU Day 11-12.'
        }, {
            'address': '1192 VT-125, Ripton, VT 05766',
            'coordinates': {
                'latitude': 43.9741952,
                'longitude': -73.0385919
            },
            'name': 'Ripton Country Store',
            'notes': 'pick up bags at Town Office, Ripton Country Store, or the town shed on GU Day. Drop off bags through the following Saturday at town shed. Food at Town Shed on GU Day 11-12.'
        }, {
            'address': '',
            'name': 'Town Shed',
            'notes': 'pick up bags at Town Office, Ripton Country Store, or the town shed on GU Day. Drop off bags through the following Saturday at town shed. Food at Town Shed on GU Day 11-12.'
        }],
        'roadsideDropoffAllowed': true
    },
    'ROCHESTER': {
        'dropoffLocations': [{
            'address': '222 S. Main St., Rochester, VT 05767',
            'coordinates': {
                'latitude': 43.872193,
                'longitude': -72.809173
            },
            'name': 'Rochester Elementary'
        }],
        'name': 'ROCHESTER',
        'pickupLocations': [{
            'address': '67 School St, Rochester, VT 05767',
            'coordinates': {
                'latitude': 43.87588400000001,
                'longitude': -72.807113
            },
            'name': 'Town Clerk\'s Office',
            'notes': 'Bags available at the Town Clerk\'s Office. \nBring bags to the school yard, there will\nbe a truck there.'
        }],
        'roadsideDropoffAllowed': false
    },
    'ROCKINGHAM': {
        'dropoffLocations': [{
            'address': '19 Blake St, Bellows Falls, VT 05101',
            'coordinates': {
                'latitude': 43.129891,
                'longitude': -72.453546
            },
            'name': 'Town Garage'
        }],
        'name': 'ROCKINGHAM',
        'pickupLocations': [{
            'address': '7 Square, Bellows Falls VT 05101',
            'coordinates': {
                'latitude': 43.1340054,
                'longitude': -72.4448156
            },
            'name': 'Bellows Falls Town Hall',
            'notes': 'Bags available at Bellows Falls Town Hall. Bags can be dropped off at the Recycle Center or Fire Station in Saxtons River, and Town Garages in Bellows Falls and Rockingham.'
        }],
        'roadsideDropoffAllowed': true
    },
    'ROXBURY': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'ROXBURY',
        'pickupLocations': [{
            'address': '1664 Roxbury Rd, Roxbury, VT 05669',
            'coordinates': {
                'latitude': 44.09099579999999,
                'longitude': -72.7343283
            },
            'name': 'Town Office',
            'notes': 'pick up bags at Claire\'s house or\nTown Office, leave by roadside. \nActivities at Comm. Center all day,\nfree picnic at Firehouse at noon.'
        }],
        'roadsideDropoffAllowed': true
    },
    'ROYALTON': {
        'dropoffLocations': [{
            'address': '57 Park St., S. Royalton, VT 05068',
            'coordinates': {
                'latitude': 43.8191791,
                'longitude': -72.5210189
            },
            'name': 'South Royalton Green'
        }],
        'name': 'ROYALTON',
        'pickupLocations': [{
            'address': '2460 VT-14, South Royalton, VT 05068',
            'coordinates': {
                'latitude': 43.8243062,
                'longitude': -72.5208444
            },
            'name': 'Town Clerk\'s Office',
            'notes': 'Bags available at the Town Clerk\'s Office.\nBring bags to the large trucks parked\non the town green.'
        }],
        'roadsideDropoffAllowed': false
    },
    'RUPERT': {
        'dropoffLocations': [{
            'address': '2673 VT Route 153 West Rupert,VT 05768',
            'coordinates': {
                'latitude': 43.22521870000001,
                'longitude': -73.2620707
            },
            'name': 'Fire Station'
        }],
        'name': 'RUPERT',
        'pickupLocations': [{
            'address': '2673 VT Route 153 West Rupert,VT 05768',
            'coordinates': {
                'latitude': 43.22521870000001,
                'longitude': -73.2620707
            },
            'name': 'Fire Station',
            'notes': 'Bags available prior to GUD by contacting\ncoordinator. On Green Up Day bags\navailable at Fire Station. Bring bags to\ndumptruck at Fire Station or leave on\nroadsides. Also Metal weekend for our\ntown so bring metal to dumptruck. Mark\nhazardous waste and let coordinator\nknow location.'
        }],
        'roadsideDropoffAllowed': true
    },
    'RUTLAND': {
        'dropoffLocations': [{
            'address': '14 Gleason Rd, Rutland, VT 05701',
            'coordinates': {
                'latitude': 43.620892,
                'longitude': -72.95135499999999
            },
            'name': 'Transfer Station'
        }],
        'name': 'RUTLAND',
        'pickupLocations': [{
            'address': '181 Business Route 4\nCenter Rutland, VT. 05736-0102',
            'coordinates': {
                'latitude': 43.6042087,
                'longitude': -73.0076632
            },
            'name': 'Town Office',
            'notes': 'Bags at the Town Office or at the Transfer Station on the Wed. before GU Day or on GU Day. Bring bags by 12pm to Transfer Station on GU Day. If left on roadsides, call and leave a message where bags are located.'
        }],
        'roadsideDropoffAllowed': true
    },
    'RUTLAND_CITY': {
        'dropoffLocations': [{
            'address': '128 US-7, Rutland, VT 05701',
            'coordinates': {
                'latitude': 43.6069664,
                'longitude': -72.97213099999999
            },
            'name': 'Kinney Subaru'
        }],
        'name': 'RUTLAND CITY',
        'pickupLocations': [{
            'address': '128 US-7, Rutland, VT 05701',
            'coordinates': {
                'latitude': 43.6069664,
                'longitude': -72.97213099999999
            },
            'name': 'Kinney Subaru',
            'notes': 'Green Up bags available at Kinney Subaru.\nRefreshments provided for all volunteers!\nhttp://www.subaruofnewengland.com/green-up-vermont-2017.htm'
        }, {
            'address': '1 Strongs Avenue, Rutland, VT 05701',
            'coordinates': {
                'latitude': 43.605184,
                'longitude': -72.977876
            },
            'name': 'Rutland City Office',
            'notes': 'Bags will be available at the City Office one week prior to Green Up Day and on Green Up Day morning. Drop bags off\nat Kinney Subaru.'
        }],
        'roadsideDropoffAllowed': true
    },
    'RYEGATE': {
        'dropoffLocations': [{
            'address': '32 Witherspoon Rd., Ryegate, VT 05042',
            'coordinates': {
                'latitude': 44.2086056,
                'longitude': -72.10432039999999
            },
            'name': 'Ryegate Town Garage'
        }],
        'name': 'RYEGATE',
        'pickupLocations': [{
            'address': '18 S Bayley Hazen Rd, Ryegate, VT 05042',
            'coordinates': {
                'latitude': 44.2083419,
                'longitude': -72.1037362
            },
            'name': 'Town Clerk\'s Office',
            'notes': 'pick up bags at Town Clerk\'s Office or at coordinator\'s house. Drop off at Town Garage.'
        }],
        'roadsideDropoffAllowed': false
    },
    'SALISBURY': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'SALISBURY',
        'pickupLocations': [{
            'address': '1457 Lake Dunmore Rd, Salisbury, VT 05769',
            'coordinates': {
                'latitude': 43.8639284,
                'longitude': -73.06616819999999
            },
            'name': 'Kampersville Store',
            'notes': 'Bags and routes distributed early to early bird email list. The remainder of routes and bags are distributed on GU Day at Kampersville Store, Route 53, between 8-10. Bags can be left on roadsides and will be picked up the following Wednesday and Saturday, allowing residents a week to complete their assigned route.'
        }],
        'roadsideDropoffAllowed': true
    },
    'SANDGATE': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'SANDGATE',
        'pickupLocations': [{
            'address': '3266 Sandgate Road\nSandgate, VT 05250',
            'coordinates': {
                'latitude': 43.1481243,
                'longitude': -73.1982515
            },
            'name': 'Town Clerk\'s Office',
            'notes': 'Bags available at Town Meeting in March and at Town Clerk\'s Office, during the week prior to Green Up Day. Leave bags on roadsides.'
        }],
        'roadsideDropoffAllowed': true
    },
    'SEARSBURG': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'SEARSBURG',
        'pickupLocations': [{
            'address': '18 Town Garage Rd, Searsburg, VT 05363',
            'coordinates': {
                'latitude': 42.8959553,
                'longitude': -72.9777986
            },
            'name': 'Town Clerk\'s Office',
            'notes': 'Bags available at Town Clerk\'s Office. Leave bags along roadsides.'
        }],
        'roadsideDropoffAllowed': true
    },
    'SHAFTSBURY': {
        'dropoffLocations': [{
            'address': '61 Buck Hill Rd, Shaftsbury, VT 05262',
            'coordinates': {
                'latitude': 42.9465829,
                'longitude': -73.209824
            },
            'name': 'Town Offices'
        }],
        'name': 'SHAFTSBURY',
        'pickupLocations': [{
            'address': '61 Buck Hill Rd, Shaftsbury, VT 05262',
            'coordinates': {
                'latitude': 42.9465829,
                'longitude': -73.209824
            },
            'name': 'Town Offices',
            'notes': 'Bags available at Town Offices, Cole Hall,\n61 Buck Road. Bring bags back to Town\nOffices (dumpster on GU Day), the Landfill,\nor leave bags along roadsides.'
        }],
        'roadsideDropoffAllowed': true
    },
    'SHARON': {
        'dropoffLocations': [{
            'address': 'VT-14, Sharon, VT 05065',
            'coordinates': {
                'latitude': 43.7530419,
                'longitude': -72.4492193
            },
            'name': 'Town Garage'
        }],
        'name': 'SHARON',
        'pickupLocations': [{
            'address': '69 VT-132, Sharon, VT 05065',
            'coordinates': {
                'latitude': 43.7853039,
                'longitude': -72.453744
            },
            'name': 'Town Office',
            'notes': 'Bags available at Town Office. Drop off\nat Town Garage 8-4 on GU Day. Refreshments provided, plants and bake sale at Town Garage. Community potluck and party at Seven Stars Center in the evening.'
        }],
        'roadsideDropoffAllowed': true
    },
    'SHEFFIELD': {
        'dropoffLocations': [{
            'address': '',
            'name': ''
        }],
        'name': 'SHEFFIELD',
        'pickupLocations': [{
            'address': 'Municipal Building, 37 Dane Rd, Sheffield, VT 05866',
            'coordinates': {
                'latitude': 44.6000514,
                'longitude': -72.1165967
            },
            'name': 'Town Clerk\'s Office',
            'notes': 'Bags available at Town Clerk\'s Office, Sheffield Transfer Station, and any of the posted warning bulletin board locations the week prior to GU Day. Bags can be left along roadsides or brought to Transfer Station 8-5 on GU Day.'
        }],
        'roadsideDropoffAllowed': true
    },
    'SHELBURNE': {
        'dropoffLocations': [{
            'address': '154 Turtle Lane, Shelburne, VT 05482',
            'coordinates': {
                'latitude': 44.38468899999999,
                'longitude': -73.23599200000001
            },
            'name': 'Town Dump Truck'
        }],
        'name': 'SHELBURNE',
        'pickupLocations': [{
            'address': '5420 Shelburne Rd, Shelburne, VT 05482',
            'coordinates': {
                'latitude': 44.3785788,
                'longitude': -73.22902959999999
            },
            'name': 'Town Clerk\'s Office',
            'notes': 'Bags available at Town Clerk\'s Office.'
        }, {
            'address': '20 Shelburne Shopping Park, Shelburne, VT 05482',
            'coordinates': {
                'latitude': 44.37874739999999,
                'longitude': -73.2252479
            },
            'name': 'Shelburne Supermarket',
            'notes': 'Bags available at Shelburne Supermarket. Filled bags should be left in the town dump truck at Turtle Lane 7-3\non Green Up Day, please do not leave \nbags on roadsides.'
        }],
        'roadsideDropoffAllowed': false
    },
    'SHELDON': {
        'dropoffLocations': [{
            'address': '649 Bridge St, Sheldon, VT 05483',
            'coordinates': {
                'latitude': 44.8820943,
                'longitude': -72.9377616
            },
            'name': 'Town Garage'
        }],
        'name': 'SHELDON',
        'pickupLocations': [{
            'address': '',
            'name': '',
            'notes': 'Contact the town office to find out what\nto do with the bags after.\nBring bags to the Town Garage.'
        }],
        'roadsideDropoffAllowed': true
    },
    'SHOREHAM': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'SHOREHAM',
        'pickupLocations': [{
            'address': '',
            'name': '',
            'notes': 'Green Up bags, gloves and the sign-up map\nand info are available at the Town RecyclingCenter prior to and on Green Up Day. Collected items can be left on roadsides to\nbe picked up by the town road crew. \nRefreshments and energy committee info\navailable at the church in the morning.'
        }],
        'roadsideDropoffAllowed': true
    },
    'SHREWSBURY': {
        'dropoffLocations': [{
            'address': '130 Mountain School Rd., Shrewbury, VT 05738',
            'coordinates': {
                'latitude': 43.525455,
                'longitude': -72.832939
            },
            'name': 'Northam Trasfer Station'
        }],
        'name': 'SHREWSBURY',
        'pickupLocations': [{
            'address': '9823 Cold River Rd, Shrewsbury, VT 05738',
            'coordinates': {
                'latitude': 43.529507,
                'longitude': -72.8283299
            },
            'name': 'Town Hall',
            'notes': 'pick up bags, select route, breakfast at Town Hall 8-10. Garbage sorting (bottle, cans, plastic) from 10-1 at Transfer Station. Bring bags to Transfer Station.'
        }],
        'roadsideDropoffAllowed': false
    },
    'SOUTH_BURLINGTON': {
        'dropoffLocations': [{
            'address': '575 Dorset St., S. Burlington, VT 05403',
            'coordinates': {
                'latitude': 44.45433999999999,
                'longitude': -73.1796
            },
            'name': 'South Burlington City Hall'
        }],
        'name': 'SOUTH BURLINGTON',
        'pickupLocations': [{
            'address': '575 Dorset St., S. Burlington, VT 05403',
            'coordinates': {
                'latitude': 44.45433999999999,
                'longitude': -73.1796
            },
            'name': 'South Burlington City Hall',
            'notes': 'pick up bags at City Hall, 575 Dorset St., Wed to Saturday. Drop off ALL trash at City Hall, on Saturday 8-2, where there are exhibits, contests, free food and a great community feel!'
        }],
        'roadsideDropoffAllowed': false
    },
    'SOUTH_HERO': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'SOUTH HERO',
        'pickupLocations': [{
            'address': '2nd Floor, 308 US-2, South Hero, VT 05486',
            'coordinates': {
                'latitude': 44.645905,
                'longitude': -73.303513
            },
            'name': 'South Hero Land Trust',
            'notes': 'Bags available at South Hero Land Trust office. Sign up for your street or one of our group volunteer activities. Bags, recycling and debris can be left on roadsides. Annual thank you BBQ in afternoon at Folsom Education & Comm. Center. '
        }],
        'roadsideDropoffAllowed': true
    },
    'SPRINGFIELD': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'SPRINGFIELD',
        'pickupLocations': [{
            'address': '56 Main St #2, Springfield, VT 05156',
            'coordinates': {
                'latitude': 43.2978812,
                'longitude': -72.481641
            },
            'name': 'Chamber of Commerce',
            'notes': 'Bags available at the Chamber of Commerce, 56 Main St.\nLeave bags along roadside.'
        }],
        'roadsideDropoffAllowed': true
    },
    'STAMFORD': {
        'dropoffLocations': [{
            'address': '986 Main Rd, Stamford, VT 05352',
            'coordinates': {
                'latitude': 42.7548249,
                'longitude': -73.06741099999999
            },
            'name': 'Stamford Recycling Center'
        }],
        'name': 'STAMFORD',
        'pickupLocations': [{
            'address': '986 Main Rd, Stamford, VT 05352',
            'coordinates': {
                'latitude': 42.7548249,
                'longitude': -73.06741099999999
            },
            'name': 'Town Clerk\'s Office',
            'notes': 'Bags available at Town Clerk\'s Office. Bring bags to the sign-in location or to the Recycling Center.'
        }],
        'roadsideDropoffAllowed': false
    },
    'STANNARD': {
        'dropoffLocations': [{
            'address': '615 Stannard Mountain Road Stannard, VT 05842',
            'coordinates': {
                'latitude': 44.542811,
                'longitude': -72.213075
            },
            'name': 'Town Office'
        }],
        'name': 'STANNARD',
        'pickupLocations': [{
            'address': '615 Stannard Mountain Road Stannard, VT 05842',
            'coordinates': {
                'latitude': 44.542811,
                'longitude': -72.213075
            },
            'name': 'Town Office',
            'notes': 'pick up bags at the Town Office. \nDrop off there as well on GU Day,\n9:30 to Noon. Lunch served at Noon.'
        }],
        'roadsideDropoffAllowed': true
    },
    'STARKSBORO': {
        'dropoffLocations': [{
            'address': '3904 VT-116, Starksboro, VT 05487',
            'coordinates': {
                'latitude': 44.2409595,
                'longitude': -73.0575535
            },
            'name': 'Town Garage'
        }],
        'name': 'STARKSBORO',
        'pickupLocations': [{
            'address': '2849 VT-116, Starksboro, VT 05487',
            'coordinates': {
                'latitude': 44.225506,
                'longitude': -73.05729699999999
            },
            'name': 'Town Office',
            'notes': 'Green Up bags and gloves will be available 1 week prior to Green Up Day.  All bags must be dropped off at the Town Garage on Green Up Day from 8am to 3pm. Trash collected on State Highways will be collected by state trucks.'
        }, {
            'address': '3904 VT-116, Starksboro, VT 05487',
            'coordinates': {
                'latitude': 44.2409595,
                'longitude': -73.0575535
            },
            'name': 'Town Garage',
            'notes': 'Green Up bags and gloves will be available 1 week prior to Green Up Day.  All bags must be dropped off at the Town Garage on Green Up Day from 8am to 3pm. Trash collected on State Highways will be collected by state trucks.'
        }, {
            'address': '1858 VT-17, Bristol, VT 05443',
            'coordinates': {
                'latitude': 44.12881489999999,
                'longitude': -73.1080678
            },
            'name': 'Jerusalem Corners',
            'notes': 'Green Up bags and gloves will be available 1 week prior to Green Up Day. All bags must be dropped off at the Town Garage on Green Up Day from 8am to 3pm. Trash collected on State Highways will be collected by state trucks.'
        }],
        'roadsideDropoffAllowed': true
    },
    'STOCKBRIDGE': {
        'dropoffLocations': [{
            'address': '2933 VT-107, Stockbridge, VT 05772',
            'coordinates': {
                'latitude': 43.7650764,
                'longitude': -72.7126241
            },
            'name': 'Stockbridge Central School'
        }],
        'name': 'STOCKBRIDGE',
        'pickupLocations': [{
            'address': '2933 VT-107, Stockbridge, VT 05772',
            'coordinates': {
                'latitude': 43.7650764,
                'longitude': -72.7126241
            },
            'name': 'Stockbridge Central School',
            'notes': 'Green Up Day runs 8-12, meet at Stockbridge Central School for bag pick up and road coordination.Arrangements are made at time of bag dispensing on whether the bags will be roadside pick up or bought to the school.'
        }],
        'roadsideDropoffAllowed': true
    },
    'STOWE': {
        'dropoffLocations': [{
            'address': '140 Cottage Club Rd., Stowe, VT 05672',
            'coordinates': {
                'latitude': 44.4771459,
                'longitude': -72.715366
            },
            'name': 'Sunset Grille'
        }],
        'name': 'STOWE',
        'pickupLocations': [{
            'address': '140 Cottage Club Rd, Stowe, VT 05672',
            'coordinates': {
                'latitude': 44.4771459,
                'longitude': -72.715366
            },
            'name': 'Sunset Grille',
            'notes': 'Meet at Sunset Grille starting at 8am\non GU Day for bags and refreshments.\nBags must be brought back to the Grille\nby 1pm. You must notify either the\nCons. Comm. Or the Hwy Dept about \nlarger items.'
        }],
        'roadsideDropoffAllowed': false
    },
    'STRAFFORD': {
        'dropoffLocations': [{
            'address': '233 Route 132, South Strafford, VT 05070',
            'coordinates': {
                'latitude': 43.8350531,
                'longitude': -72.3638217
            },
            'name': 'South Strafford Park and Ride'
        }],
        'name': 'STRAFFORD',
        'pickupLocations': [{
            'address': '227 Justin Morrill Memorial Hwy, Strafford, VT 05072',
            'coordinates': {
                'latitude': 43.8645877,
                'longitude': -72.377106
            },
            'name': 'Town Clerk\'s Office',
            'notes': 'Bags available at Town Clerk\'s Office or\nat Coburns General Store. Bring bags to\nthe South Strafford Park N Ride 9-12\non GU Day. Popsicle coupon for each child who brings in a bag.'
        }],
        'roadsideDropoffAllowed': false
    },
    'STRATTON': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'STRATTON',
        'pickupLocations': [{
            'address': '9 W Jamaica Rd, Stratton, VT 05360',
            'coordinates': {
                'latitude': 43.04319,
                'longitude': -72.908974
            },
            'name': 'Town Hall',
            'notes': '7:30 to 10:30am Town Hall open. Pick up\nbags, road routes, refreshments: coffee,\njuice and donuts. Leave bags along \nroadside but let the Town Hall know if\nthere are larger or hazardous items.'
        }],
        'roadsideDropoffAllowed': true
    },
    'ST__ALBANS_CITY': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'ST. ALBANS CITY',
        'pickupLocations': [{
            'address': '100 North Main Street\nSt. Albans, VT 05478',
            'coordinates': {
                'latitude': 44.813335,
                'longitude': -73.0835895
            },
            'name': 'City Clerk"s Office',
            'notes': 'Bags available at City Clerk\'s Office'
        }, {
            'address': '133 N Main St #7, St Albans City, VT 05478',
            'coordinates': {
                'latitude': 44.81504330000001,
                'longitude': -73.0818276
            },
            'name': '14th Star Brewery',
            'notes': 'Bags available at City Clerk\'s Office, and\non GUD at 14th Star Brewery.'
        }, {
            'address': '101 Lake St, St Albans City, VT 05478',
            'coordinates': {
                'latitude': 44.812059,
                'longitude': -73.0872171
            },
            'name': 'Food City',
            'notes': 'Bags available at  Food City\nParking Lot.'
        }, {
            'address': '36 N Main St, St Albans City, VT 05478',
            'coordinates': {
                'latitude': 44.8116566,
                'longitude': -73.08346
            },
            'name': 'Taylor Park',
            'notes': 'Bags available at Taylor Park.  Leave bags at intersections for pick up.\nSchool and Houghton Park. Sign up for a volunteer BBQ at 14th\nStar Brewery. Free ice cream for volunteers at Taylor Park (or across the street in St. Paul\'s Church  in case of rain) at noon.'
        }],
        'roadsideDropoffAllowed': true
    },
    'ST__ALBANS_TOWN': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'ST. ALBANS TOWN',
        'pickupLocations': [{
            'address': '579 Lake Road\nSt. Albans, VT 05478',
            'coordinates': {
                'latitude': 44.8086322,
                'longitude': -73.1392304
            },
            'name': 'Town Clerk\'s Office',
            'notes': 'Bags available at Town Clerk\'s Office,\nprior to GU Day, Mon-Fri 8-4. Leave bags along roadsides.'
        }],
        'roadsideDropoffAllowed': true
    },
    'ST__GEORGE': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'ST. GEORGE',
        'pickupLocations': [{
            'address': '21 Barber Rd, St George, VT 05495',
            'coordinates': {
                'latitude': 44.3786589,
                'longitude': -73.12670539999999
            },
            'name': 'Town Hall',
            'notes': 'All volunteers should either come to Town Hall around 8:30am on Green Up Day to pick up bags, say where they are going to work and have refreshments! If you want bags before Green Up Day, stop by Town Hall to get bags and sign in where you will be picking up. All bags\nwill be picked up by 11:30am on Green Up\nDay. '
        }],
        'roadsideDropoffAllowed': true
    },
    'ST__JOHNSBURY': {
        'dropoffLocations': [{
            'address': '9273, 664 Memorial Dr, St Johnsbury, VT 05819',
            'coordinates': {
                'latitude': 44.4420107,
                'longitude': -72.01402159999999
            },
            'name': 'Saint J Subaru'
        }],
        'name': 'ST. JOHNSBURY',
        'pickupLocations': [{
            'address': '9273, 664 Memorial Dr, St Johnsbury, VT 05819',
            'coordinates': {
                'latitude': 44.4420107,
                'longitude': -72.01402159999999
            },
            'name': 'Saint J Subaru',
            'notes': 'Green Up bags available at Saint J Subaru. Bring bags back to Saint J Subaru or leave on roadsides. Refreshments provided for all volunteers!'
        }],
        'roadsideDropoffAllowed': true
    },
    'SUDBURY': {
        'dropoffLocations': [{
            'address': '12 Williams Lane, Sudbury, VT 05733',
            'coordinates': {
                'latitude': 43.8214253,
                'longitude': -73.17345809999999
            },
            'name': 'Sudbury Recycling Center'
        }],
        'name': 'SUDBURY',
        'pickupLocations': [{
            'address': '36 Blacksmith Ln, Sudbury, VT 05733',
            'coordinates': {
                'latitude': 43.799732,
                'longitude': -73.2050019
            },
            'name': 'Town Office',
            'notes': 'Bags available at the Town Office. Bring\nfull bags to the Recycling Center on or\nbefore Green Up Day, where volunteers\nwill sort them.'
        }],
        'roadsideDropoffAllowed': false
    },
    'SUNDERLAND': {
        'dropoffLocations': [{
            'address': '3039 Sunderland Hl Rd, Sunderland, VT 05250',
            'coordinates': {
                'latitude': 43.10836399999999,
                'longitude': -73.119415
            },
            'name': 'Town Garage'
        }],
        'name': 'SUNDERLAND',
        'pickupLocations': [{
            'address': '104 Mountain View Rd, Sunderland, VT 05250',
            'coordinates': {
                'latitude': 43.104681,
                'longitude': -73.11905900000001
            },
            'name': 'Town Clerk\'s Office',
            'notes': 'Bags available at Town Clerk\'s Office.\nBring bags to the Town Garage after.'
        }],
        'roadsideDropoffAllowed': true
    },
    'SUTTON': {
        'dropoffLocations': [{
            'address': '691 Burke Rd, Sutton, VT 05867',
            'coordinates': {
                'latitude': 44.6315488,
                'longitude': -72.01243219999999
            },
            'name': 'Fire Station'
        }],
        'name': 'SUTTON',
        'pickupLocations': [{
            'address': '691 Burke Rd, Sutton, VT 05867',
            'coordinates': {
                'latitude': 44.6315488,
                'longitude': -72.01243219999999
            },
            'name': 'Fire Station',
            'notes': 'Meet at Fire Station at 8:30 am for coffee,\nbags and assignments. Leave bags\nroadside or bring to Fire Station. Hot Dog\nBBQ at Noon at Fire Station for volunteers.'
        }],
        'roadsideDropoffAllowed': true
    },
    'SWANTON': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'SWANTON',
        'pickupLocations': [{
            'address': '1 Academy St, Swanton, VT 05488',
            'coordinates': {
                'latitude': 44.917113,
                'longitude': -73.1243708
            },
            'name': 'Town Office',
            'notes': 'Bags available at Town Office the week prior to Green Up Day. '
        }, {
            'address': '120 1st St, Swanton, VT 05488',
            'coordinates': {
                'latitude': 44.920675,
                'longitude': -73.1129859
            },
            'name': 'Village Office',
            'notes': 'Bags available at Village Office and area stores the week prior to Green Up Day. Bring bags to Swanton Municipal parking lot. Dump truck available. Please sign in your location when you pick up bags. Gloves and t-shirt available upon request.'
        }],
        'roadsideDropoffAllowed': true
    },
    'THETFORD': {
        'dropoffLocations': [{
            'address': '3901 VT Route 113, Thetford, VT 05075',
            'coordinates': {
                'latitude': 43.8313419,
                'longitude': -72.2475901
            },
            'name': 'Thetford Town Garage'
        }],
        'name': 'THETFORD',
        'pickupLocations': [{
            'address': '3910 VT-113, Thetford Center, VT 05075',
            'coordinates': {
                'latitude': 43.8315157,
                'longitude': -72.24674879999999
            },
            'name': 'Town Clerk\'s Office',
            'notes': 'Bags available at the Town Clerk\'s Office.\nBring all roadside trash to the Town Shed between 9 and 4 on Green Up Day.'
        }],
        'roadsideDropoffAllowed': false
    },
    'TINMOUTH': {
        'dropoffLocations': [{
            'address': '537 Route 140, Tinmouth, VT 05773',
            'coordinates': {
                'latitude': 43.4485575,
                'longitude': -73.04800929999999
            },
            'name': 'Tinmouth Transfer Station'
        }],
        'name': 'TINMOUTH',
        'pickupLocations': [{
            'address': '9 Mountain View Rd, Tinmouth, VT 05773',
            'coordinates': {
                'latitude': 43.44817,
                'longitude': -73.050224
            },
            'name': 'Town Clerk\'s Office',
            'notes': 'Meet at 9:00 am on GU Day at the Transfer\nStation to get road assignments and\nbags. We reconvene at Transfer Station\nat 11:00 am to dump bags in dumpster\nand to enjoy free ice cream. The Elem. \nSchool kids Green Up on a separate day,\ncontact the school for date and time. You\ncan also get bags from the Town Clerk\nthe week prior during office hours.'
        }],
        'roadsideDropoffAllowed': false
    },
    'TOPSHAM': {
        'dropoffLocations': [{
            'address': '2628 Goose Green Rd., Topsham, VT 05076',
            'name': 'Casella Transfer Station'
        }],
        'name': 'TOPSHAM',
        'pickupLocations': [{
            'address': '',
            'name': '',
            'notes': 'Volunteer sign up sheet available at Town \nMeeting or email me to sign up. Bags \navailable prior to GU Day. All GU bags must\nbe taken to Transfer Station on GU Day\nonly, 7:30 to 12:30.'
        }],
        'roadsideDropoffAllowed': false
    },
    'TOWNSHEND': {
        'dropoffLocations': [{
            'address': '93-1 Common Rd., Tonwshend, VT 05353',
            'coordinates': {
                'latitude': 43.0469236,
                'longitude': -72.668295
            },
            'name': 'Townshend Common'
        }],
        'name': 'TOWNSHEND',
        'pickupLocations': [{
            'address': '2006 VT-30, Townshend, VT 05353',
            'coordinates': {
                'latitude': 43.045905,
                'longitude': -72.666915
            },
            'name': 'Town Office',
            'notes': 'Bags available at Town Office and \nElementary School week before and\n11am to 1pm on Green Up Day. Bring bags back to the town truck on the green or to the dump. Entertainment from 1-3pm the Townshend Common!'
        }],
        'roadsideDropoffAllowed': false
    },
    'TROY': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'TROY',
        'pickupLocations': [{
            'address': '142 Main St, North Troy, VT 05859',
            'coordinates': {
                'latitude': 44.9954884,
                'longitude': -72.40510309999999
            },
            'name': 'Town Clerk\'s Office',
            'notes': 'pick up bags at Town Clerk\'s Office. \nDrop off bags at the town garage or \nleave along roadside for pick up.'
        }],
        'roadsideDropoffAllowed': true
    },
    'TUNBRIDGE': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'TUNBRIDGE',
        'pickupLocations': [{
            'address': '271 VT-110, Tunbridge, VT 05077',
            'coordinates': {
                'latitude': 43.8878394,
                'longitude': -72.49365159999999
            },
            'name': 'Town Clerk\'s Office',
            'notes': 'Bags available at the Town Clerk\'s Office.\nLeave bags on roadsides.'
        }],
        'roadsideDropoffAllowed': true
    },
    'UNDERHILL': {
        'dropoffLocations': [{
            'address': '75 New Rd., Underhill, VT 05489',
            'coordinates': {
                'latitude': 44.5195249,
                'longitude': -72.8858923
            },
            'name': 'Underhill Town Garage'
        }],
        'name': 'UNDERHILL',
        'pickupLocations': [{
            'address': '12 Pleasant Valley Road, Underhill, VT  05489',
            'coordinates': {
                'latitude': 44.5075431,
                'longitude': -72.8986979
            },
            'name': 'Town Hall',
            'notes': 'Bags available at Town Hall and local \nstores. Bring full bags to Town Garage at 75 New Road or the Fire Dept on Route 15\non Green Up Day, 9-12. No hazardous materials, no appliances, and please\ndon\'t leave bags on roadsides.'
        }],
        'roadsideDropoffAllowed': false
    },
    'VERGENNES': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'VERGENNES',
        'pickupLocations': [{
            'address': '120 Main St, Vergennes, VT 05491',
            'coordinates': {
                'latitude': 44.1686777,
                'longitude': -73.2509867
            },
            'name': 'City Hall',
            'notes': 'Bags available a few days befor GU Day\nat City Hall.  Volunteers are asked to leave\nbags near intersections of city streets.'
        }, {
            'address': '179 Main St, Vergennes, VT 05491',
            'coordinates': {
                'latitude': 44.167824,
                'longitude': -73.25148
            },
            'name': 'City Park',
            'notes': 'Bags available on GU Day from 7-12 at\nCity Park.  Volunteers are asked to leave\nbags near intersections of city streets.'
        }],
        'roadsideDropoffAllowed': true
    },
    'VERNON': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'VERNON',
        'pickupLocations': [{
            'address': '',
            'name': '',
            'notes': '\nMeet at Rec Center Shelter @ 9am. Pick\nroads and go out. Refreshments and\ngloves provided. Come back for lunch at Noon. Leave bags along roadsides.'
        }],
        'roadsideDropoffAllowed': true
    },
    'VERSHIRE': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'VERSHIRE',
        'pickupLocations': [{
            'address': '6894 VT-113, Vershire, VT 05079',
            'coordinates': {
                'latitude': 43.97047990000001,
                'longitude': -72.3232484
            },
            'name': 'Town Clerk\'s Office',
            'notes': 'Bags available at the Town Clerk\'s Office.\nLeave bags along roadsides.  '
        }],
        'roadsideDropoffAllowed': true
    },
    'VICTORY': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'VICTORY',
        'pickupLocations': [{
            'address': '',
            'name': '',
            'notes': 'Bags are available ahead of time by calling\nthe coordinator or Town Clerk. Breakfast and lunch always provided.'
        }],
        'roadsideDropoffAllowed': true
    },
    'WAITSFIELD': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'WAITSFIELD',
        'pickupLocations': [{
            'address': '4144 Main St, Waitsfield, VT 05673',
            'coordinates': {
                'latitude': 44.1930865,
                'longitude': -72.82199279999999
            },
            'name': 'Town Clerk\'s Office',
            'notes': 'Bags available at the Town Clerk\'s Office.\nLeave bags along roadsides by 10am on\nGreen Up Day.\n'
        }],
        'roadsideDropoffAllowed': true
    },
    'WALDEN': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'WALDEN',
        'pickupLocations': [{
            'address': '12 VT Route 215 Walden, VT 05873',
            'coordinates': {
                'latitude': 44.45222829999999,
                'longitude': -72.25708929999999
            },
            'name': 'Town Clerk\'s Office',
            'notes': 'Bags available at Town Clerk\'s Office.\nLeave bags along roadsides.'
        }],
        'roadsideDropoffAllowed': true
    },
    'WALLINGFORD': {
        'dropoffLocations': [{
            'address': '99 Waldo Lane, Wallingford, VT 05773',
            'coordinates': {
                'latitude': 43.4704907,
                'longitude': -72.9824021
            },
            'name': 'Wallingford Transfer Station'
        }],
        'name': 'WALLINGFORD',
        'pickupLocations': [{
            'address': '96 US-7, Wallingford, VT 05773-9547',
            'coordinates': {
                'latitude': 43.4730333,
                'longitude': -72.9766576
            },
            'name': 'Wallingford Rotary',
            'notes': 'pick up bags at the Wallingford Rotary from 9-11:30. Drop full bags off at Transfer  Station on Saturday until Noon. Transfer Station will accept bags if dropped off within one week of Green Up Day.'
        }],
        'roadsideDropoffAllowed': false
    },
    'WALTHAM': {
        'dropoffLocations': [{
            'address': '2053 Maple St, Vergennes, VT 05491',
            'coordinates': {
                'latitude': 44.130825,
                'longitude': -73.24468999999999
            },
            'name': 'Town Hall'
        }],
        'name': 'WALTHAM',
        'pickupLocations': [{
            'address': '2053 Maple St, Vergennes, VT 05491',
            'coordinates': {
                'latitude': 44.130825,
                'longitude': -73.24468999999999
            },
            'name': 'Town Hall',
            'notes': 'Bags available at the Town Hall. Please bring back to Town Hall.'
        }],
        'roadsideDropoffAllowed': true
    },
    'WARDSBORO': {
        'dropoffLocations': [{
            'address': '174 S. Wardsboro Rd., Newfane, VT 05345',
            'coordinates': {
                'latitude': 43.0391697,
                'longitude': -72.7895758
            },
            'name': 'Wardsboro Transfer Station'
        }],
        'name': 'WARDSBORO',
        'pickupLocations': [{
            'address': '71 Main St, Wardsboro, VT 05355',
            'coordinates': {
                'latitude': 43.041711,
                'longitude': -72.790364
            },
            'name': 'Town Office',
            'notes': 'Meet 8am at Town Office,\nhomemade donuts, coffee, cider,\nfruit for volunteers.'
        }],
        'roadsideDropoffAllowed': false
    },
    'WARNER__S_GRANT': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'Warner\'\'s Grant',
        'pickupLocations': [{
            'address': '',
            'name': '',
            'notes': 'Coordinating the towns of\nAverill, Avery\'s Gore, Lewis,\nFerdinand, Warren Gore,\nWarner\'s Grant. Bags available at the UTG Office. Bring bags to UTG Office.'
        }],
        'roadsideDropoffAllowed': true
    },
    'WARREN': {
        'dropoffLocations': [{
            'address': '6911 Main St., Waitsfield, VT 05673',
            'coordinates': {
                'latitude': 44.160995,
                'longitude': -72.832504
            },
            'name': 'Earthwise Transfer Station'
        }],
        'name': 'WARREN',
        'pickupLocations': [{
            'address': '42 Cemetary Rd, Warren, VT 05674',
            'coordinates': {
                'latitude': 44.113022,
                'longitude': -72.85530100000001
            },
            'name': 'Town Clerk\'s Office',
            'notes': 'Bags available at town clerk\'s office\nand East Warren Market. Bag drop\noff at Earthwise Transfer Station,\nor the East Warren Market 9-1 on Green Up Day, along  with a few other sites.'
        }],
        'roadsideDropoffAllowed': false
    },
    'WARREN_GORE': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'Warren Gore',
        'pickupLocations': [{
            'address': '',
            'name': '',
            'notes': 'Coordinating the towns of\nAverill, Avery\'s Gore, Lewis,\nFerdinand, Warren Gore,\nWarner\'s Grant. Bags available at the UTG Office. Bring bags to UTG Office.'
        }],
        'roadsideDropoffAllowed': true
    },
    'WASHINGTON': {
        'dropoffLocations': [{
            'address': '51 Firehouse Lane, Washington, VT 05675',
            'coordinates': {
                'latitude': 44.107406,
                'longitude': -72.43418799999999
            },
            'name': 'Washington Fire Station'
        }],
        'name': 'WASHINGTON',
        'pickupLocations': [{
            'address': '2895 VT-110, Washington, VT 05675',
            'coordinates': {
                'latitude': 44.10877139999999,
                'longitude': -72.43340049999999
            },
            'name': 'Town Clerk\'s Office',
            'notes': 'Bags available at Town Clerk\'s Office, Robert\'s Country Store, or the Library. Full\nbags can be brought to Fire Station 8:30\nto 12 on GU Day. No household trash\nplease!'
        }],
        'roadsideDropoffAllowed': false
    },
    'WATERBURY': {
        'dropoffLocations': [{
            'address': '1707 Guptil Rd., Waterbury, VT 05677',
            'coordinates': {
                'latitude': 44.37241,
                'longitude': -72.71908599999999
            },
            'name': 'Waterbury Town Garage'
        }],
        'name': 'WATERBURY',
        'pickupLocations': [{
            'address': '28 N Main St #1, Waterbury, VT 05676',
            'coordinates': {
                'latitude': 44.3397641,
                'longitude': -72.7585908
            },
            'name': 'Town Office',
            'notes': 'Bags available at Town Office, Library and Sunflower Market. Two drop-off locations: Town Garage on Guptil Rd. 9-3; Rodney\'s Rubbish at Crossroads Deli 8-12. Metal accepted at both. Rodney takes tires for a fee. Details at www.waterburyvt.com. Sign up online at Sign Up Genius: https://tinyurl.com/WaterburyGreenUp2017'
        }, {
            'address': '28 N Main St, Waterbury, VT 05676',
            'coordinates': {
                'latitude': 44.3397641,
                'longitude': -72.7585908
            },
            'name': 'Library',
            'notes': 'Bags available at Town Office, Library and Sunflower Market. Two drop-off locations: Town Garage on Guptil Rd. 9-3; Rodney\'s Rubbish at Crossroads Deli 8-12. Metal accepted at both. Rodney takes tires for a fee. Details at www.waterburyvt.com. Sign up online at Sign Up Genius: https://tinyurl.com/WaterburyGreenUp2017'
        }, {
            'address': '2934 Waterbury Stowe Rd, Waterbury Center, VT 05677',
            'coordinates': {
                'latitude': 44.3733108,
                'longitude': -72.7260151
            },
            'name': 'Sunflower Market',
            'notes': '2 drop offs\nBags available at Town Office, Library and Sunflower Market. Two drop-off locations: Town Garage on Guptil Rd. 9-3; Rodney\'s Rubbish at Crossroads Deli 8-12. Metal accepted at both. Rodney takes tires for a fee. Details at www.waterburyvt.com. Sign up online at Sign Up Genius: https://tinyurl.com/WaterburyGreenUp2017'
        }],
        'roadsideDropoffAllowed': false
    },
    'WATERFORD': {
        'dropoffLocations': [{
            'address': '532 Maple St, Waterford, VT  05848',
            'coordinates': {
                'latitude': 44.3543917,
                'longitude': -71.9077404
            },
            'name': 'Transfer Station'
        }],
        'name': 'WATERFORD',
        'pickupLocations': [{
            'address': '2661 Duck Pond Rd, Waterford, VT 05819',
            'coordinates': {
                'latitude': 44.379403,
                'longitude': -71.954514
            },
            'name': 'Fire Department',
            'notes': 'pick up bags at Fire Dept. starting at 8am, return bags to Waterford Dump. If there are items that are too large please connect with coordinators on site at Waterford Fire Dept.'
        }],
        'roadsideDropoffAllowed': true
    },
    'WATERVILLE': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'WATERVILLE',
        'pickupLocations': [{
            'address': '850 VT-109, Waterville, VT 05492',
            'coordinates': {
                'latitude': 44.6933728,
                'longitude': -72.7662165
            },
            'name': 'Town Clerk\'s Office',
            'notes': 'Bags available at the Town Clerk\'s Office.\nLeave bags along roadsides.  '
        }],
        'roadsideDropoffAllowed': true
    },
    'WEATHERSFIELD': {
        'dropoffLocations': [{
            'address': '2656 Weathersfield Center Rd, Weathersfield,VT05151',
            'coordinates': {
                'latitude': 43.378994,
                'longitude': -72.46691899999999
            },
            'name': 'Dan Foster House'
        }],
        'name': 'WEATHERSFIELD',
        'pickupLocations': [{
            'address': '2656 Weathersfield Center Rd, Weathersfield, VT 05151',
            'coordinates': {
                'latitude': 43.378994,
                'longitude': -72.46691899999999
            },
            'name': 'Dan Foster House',
            'notes': 'Neighbor Green Up Association meets\nat the Dan Foster House 9-12 on\nGreen Up Day. Leave bags along roadsides, or bring to the Dan Foster House or take to the dump.'
        }],
        'roadsideDropoffAllowed': true
    },
    'WELLS': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'WELLS',
        'pickupLocations': [{
            'address': '108 VT-30, Wells, VT 05774',
            'coordinates': {
                'latitude': 43.416466,
                'longitude': -73.212459
            },
            'name': 'Town Hall',
            'notes': 'Meet at the Town Hall at 9am on GU Day\nfor bags, coffee and donuts provided.\nAfter pick up, come back to the Town\nHall at Noon for hot dogs and drinks. Leave bags along roadsides.'
        }],
        'roadsideDropoffAllowed': true
    },
    'WESTFIELD': {
        'dropoffLocations': [{
            'address': '757 VT-100, Westfield, VT 05874',
            'coordinates': {
                'latitude': 44.892315,
                'longitude': -72.422104
            },
            'name': 'Westfield Recycling Center'
        }],
        'name': 'WESTFIELD',
        'pickupLocations': [{
            'address': '757 Vt-100, Westfield, VT 05874',
            'coordinates': {
                'latitude': 44.892315,
                'longitude': -72.422104
            },
            'name': 'Westfield Recycling Center',
            'notes': 'Stop by the Westfield Recycling Center, 757 VT Route 100, to pick up \nand drop off your Green Up bags. Hours:\nSaturdays 8 am to 12 pm.'
        }],
        'roadsideDropoffAllowed': false
    },
    'WESTFORD': {
        'dropoffLocations': [{
            'address': '1713 VT Route 128, Westford, VT 05494',
            'coordinates': {
                'latitude': 44.612086,
                'longitude': -73.011004
            },
            'name': 'Westford Town Offices'
        }],
        'name': 'WESTFORD',
        'pickupLocations': [{
            'address': '1713 VT-128, Westford, VT 05494',
            'coordinates': {
                'latitude': 44.612086,
                'longitude': -73.011004
            },
            'name': 'Town Clerk\'s Office',
            'notes': 'Bags available at Town Clerk\'s Office. \nBring bags to the town dumpster.'
        }],
        'roadsideDropoffAllowed': false
    },
    'WESTMINSTER': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'WESTMINSTER',
        'pickupLocations': [{
            'address': '3651 US-5, Westminster, VT 05158',
            'coordinates': {
                'latitude': 43.0689954,
                'longitude': -72.4579937
            },
            'name': 'Town Hall',
            'notes': 'Bags available at Westminster West Library and Westminster Town Hall. Leave large items on roadsides with Green Up Bag attached for Monday pick up.'
        }, {
            'address': '3409 Westminster West Road, Westminster, VT 05346',
            'coordinates': {
                'latitude': 43.0647992,
                'longitude': -72.5414109
            },
            'name': 'Westminster West Library',
            'notes': 'Bags available at Westminster West Library and Westminster Town Hall. Leave large items on roadsides with Green Up Bag attached for Monday pick up.'
        }],
        'roadsideDropoffAllowed': true
    },
    'WESTMORE': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'WESTMORE',
        'pickupLocations': [{
            'address': '',
            'name': '',
            'notes': 'Bags available at Community Center\n9-12 on GU Day. Leave bags along roadsides, a town truck collects the bags. Pizza lunch at noon.'
        }],
        'roadsideDropoffAllowed': true
    },
    'WESTON': {
        'dropoffLocations': [{
            'address': '429 Lawrence Hill Rd., Weston, VT 05161',
            'coordinates': {
                'latitude': 43.3168762,
                'longitude': -72.7896107
            },
            'name': 'Weston Recreation Area'
        }],
        'name': 'WESTON',
        'pickupLocations': [{
            'address': '12 Lawrence Hill Rd, Weston, VT 05161',
            'coordinates': {
                'latitude': 43.2912314,
                'longitude': -72.794054
            },
            'name': 'Town Clerk\'s Office',
            'notes': 'Bags available at the Town Clerk\'s Office.\nBring Green Up bags to the Town Truck at the Weston Recreation area.'
        }],
        'roadsideDropoffAllowed': false
    },
    'WEST_FAIRLEE': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': 'Town Recycling'
        }],
        'name': 'WEST FAIRLEE',
        'pickupLocations': [{
            'address': '870 VT-113, West Fairlee, VT 05083',
            'coordinates': {
                'latitude': 43.9097789,
                'longitude': -72.2627425
            },
            'name': 'Town Office',
            'notes': '\nPick up bags at Town Office, drop\nat Town Recycling and Trash Depot, West\nFairlee Road. Bldg, crews will also be picking up bags left on roadsides.'
        }],
        'roadsideDropoffAllowed': true
    },
    'WEST_HAVEN': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'WEST HAVEN',
        'pickupLocations': [{
            'address': '',
            'name': '',
            'notes': 'Call Linda for bags, then leave on the\nroadside for pick up or bring to the\ndump, free of charge.'
        }],
        'roadsideDropoffAllowed': true
    },
    'WEST_RUTLAND': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'WEST RUTLAND',
        'pickupLocations': [{
            'address': '35 Marble St, West Rutland, VT 05777',
            'coordinates': {
                'latitude': 43.59478,
                'longitude': -73.04821
            },
            'name': 'Town Hall',
            'notes': 'pick up bags at Town Hall at 9am. \nLeave bags along roadsides for\ntown pick-up. Refreshments for\nvolunteers at noon at Town Hall.'
        }],
        'roadsideDropoffAllowed': true
    },
    'WEST_WINDSOR': {
        'dropoffLocations': [{
            'address': '5024 VT Route 106, Perkinsville, VT 05151',
            'coordinates': {
                'latitude': 43.410191,
                'longitude': -72.5136179
            },
            'name': 'Weathersfield Transfer Station'
        }],
        'name': 'WEST WINDSOR',
        'pickupLocations': [{
            'address': '22 Brownsville-Hartland Rd, West Windsor, VT 05089',
            'coordinates': {
                'latitude': 43.4682511,
                'longitude': -72.4708647
            },
            'name': 'Town Office',
            'notes': 'Bags available at Town Office or at\nAlbert Bridge School on GU Day. Drop\nfull bags off at School from 8:30-3 or bring to Weathersfield Transfer Station at no charge.'
        }],
        'roadsideDropoffAllowed': false
    },
    'WEYBRIDGE': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'WEYBRIDGE',
        'pickupLocations': [{
            'address': '227 Pond Ln, Middlebury, VT 05753',
            'coordinates': {
                'latitude': 44.034588,
                'longitude': -73.17534
            },
            'name': 'Town Recycling Center',
            'notes': 'Green Up bags, the sign-up map and information are available at the Town Recycling Center prior to Green Up Day. Collected items can be left on roadsides to be picked up by the town road crew.'
        }],
        'roadsideDropoffAllowed': true
    },
    'WHEELOCK': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'WHEELOCK',
        'pickupLocations': [{
            'address': 'Municipal Building, 37 Dane Rd, Sheffield, VT 05866',
            'coordinates': {
                'latitude': 44.6000514,
                'longitude': -72.1165967
            },
            'name': 'Town Clerk\'s Office',
            'notes': 'Bags available at Town Clerk\'s Office, Sheffield Transfer Station, and any of the posted warning bulletin board locations the week prior to GU Day. Bags can be left along roadsides or brought to Transfer Station 8-5 on GU Day.'
        }],
        'roadsideDropoffAllowed': true
    },
    'WHITING': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'WHITING',
        'pickupLocations': [{
            'address': '29 S Main St, Whiting, VT 05778',
            'coordinates': {
                'latitude': 43.86198,
                'longitude': -73.20079799999999
            },
            'name': 'Town Clerk\'s Office',
            'notes': 'Bags available at Town Clerk\'s Office. Leave bags along roadsides.'
        }],
        'roadsideDropoffAllowed': true
    },
    'WHITINGHAM': {
        'dropoffLocations': [{
            'address': '4189 VT-100, Whitingham, VT 05361',
            'coordinates': {
                'latitude': 42.788624,
                'longitude': -72.838448
            },
            'name': 'Whitingham Transfer Station'
        }],
        'name': 'WHITINGHAM',
        'pickupLocations': [{
            'address': '2948 VT-100, Jacksonville, VT 05342',
            'coordinates': {
                'latitude': 42.798429,
                'longitude': -72.823039
            },
            'name': 'Towne Hall',
            'notes': 'Meet 9:30am Towne Hill, coffee and\ndonuts from Jacksonville Store.\nLunch by Whitingham Lions Club. Leave\nbags on roadsides and town crew will\npick up Monday. After that, bring bags to\nWhitingham Transfer Station.  '
        }],
        'roadsideDropoffAllowed': true
    },
    'WILLIAMSTOWN': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'WILLIAMSTOWN',
        'pickupLocations': [{
            'address': '2470 VT-14, Williamstown, VT 05679',
            'coordinates': {
                'latitude': 44.1206086,
                'longitude': -72.5415436
            },
            'name': 'Town Clerk\'s Office',
            'notes': 'Bags available at the Town Clerk\'s Office.\nLeave bags along obvious roadsides for\nthe town to pick up during the week \nfollowing Green Up Day.'
        }],
        'roadsideDropoffAllowed': true
    },
    'WILLISTON': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'WILLISTON',
        'pickupLocations': [{
            'address': 'Town Hall Annex Building\n7878 Williston Road\nWilliston, VT 05495',
            'coordinates': {
                'latitude': 44.43821,
                'longitude': -73.07296
            },
            'name': 'Planning Office',
            'notes': 'Bags will available the week before\nGUD for anyone wishing to get a \njump-start on clean up. A sign-up sheet\nand map is available in the Planning Office\nfor anyone wishing to reserve a spot\nof roadside to clean up. Leave bags\nalong roadsides.'
        }],
        'roadsideDropoffAllowed': true
    },
    'WILMINGTON': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'WILMINGTON',
        'pickupLocations': [{
            'address': '2 E Main St, Wilmington, VT 05363',
            'coordinates': {
                'latitude': 42.86836599999999,
                'longitude': -72.870766
            },
            'name': 'Town Office',
            'notes': 'Bag pick up and road selection prior to Green Up Day at Town Office or on the day at Buzzy Towne Park, 9-10:30. Free refreshments for volunteers 11:30-12:15 at Wilmington High School cafeteria. Secure full bags and Leave on roadsides at intersections or take to the truck at old Town Garage. Landfill will also accept Green Up Bags but ONLY during regular hours on the Sunday and Tuesday following Green Up Day.'
        }],
        'roadsideDropoffAllowed': true
    },
    'WINDHAM': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'WINDHAM',
        'pickupLocations': [{
            'address': '5976 Windham Hill Road, Windham, VT 05359',
            'coordinates': {
                'latitude': 43.166218,
                'longitude': -72.72552499999999
            },
            'name': 'Town Office',
            'notes': 'pick up bags at Town Office week prior GU Day or GU at 9am at Town Office. Leave full bags along roadsides for town crew to pick up. Worker appreciation lunch at 12 at MTG House.'
        }],
        'roadsideDropoffAllowed': true
    },
    'WINDSOR': {
        'dropoffLocations': [{
            'address': '147 Main St, Windsor, VT 05089',
            'coordinates': {
                'latitude': 43.4775646,
                'longitude': -72.3872073
            },
            'name': 'Municipal Building'
        }],
        'name': 'WINDSOR',
        'pickupLocations': [{
            'address': '29 Union St, Windsor, VT 05089',
            'coordinates': {
                'latitude': 43.4764878,
                'longitude': -72.3926173
            },
            'name': 'Fire Station',
            'notes': 'Meet at Fire Station at 8:30am for bags\nand routes. Drop off FULL bags at\nMunicipal Bldg by 1pm or leave along\nroadside. Bagels, juice, coffee before; Community BBQ 11:30-12:30.'
        }],
        'roadsideDropoffAllowed': true
    },
    'WINHALL': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'WINHALL',
        'pickupLocations': [{
            'address': '115 Vermont Route 30 Bondville, VT 05340',
            'coordinates': {
                'latitude': 43.1863619,
                'longitude': -72.9349644
            },
            'name': 'Town Offices',
            'notes': 'Cookout for all GU Day volunteers. Leave \nbags along roadsides.'
        }],
        'roadsideDropoffAllowed': true
    },
    'WINOOSKI': {
        'dropoffLocations': [{
            'address': '32 Malletts Bay Ave, Winooski, VT 05404',
            'coordinates': {
                'latitude': 44.498457,
                'longitude': -73.1910905
            },
            'name': 'O\'Brien Community Center'
        }],
        'name': 'WINOOSKI',
        'pickupLocations': [{
            'address': '32 Malletts Bay Ave, Winooski, VT 05404',
            'coordinates': {
                'latitude': 44.4923392,
                'longitude': -73.1910905
            },
            'name': 'O\'Brien Community Center',
            'notes': 'drop by the O\'Brien Community Center  (32 Malletts Bay Ave.) from 9 to 12 to pick up bags, gloves, safety info. City staff will help you find an area of need if you don\'t already have one picked out. There will be a Myers trash receptable in the O\'Brien Comm Center parking lot - feel free to drop your GU bags there. '
        }],
        'roadsideDropoffAllowed': true
    },
    'WOLCOTT': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'WOLCOTT',
        'pickupLocations': [{
            'address': '28 Railroad St, Wolcott, VT 05680',
            'coordinates': {
                'latitude': 44.5442081,
                'longitude': -72.45823349999999
            },
            'name': 'Town Clerk\'s Office',
            'notes': 'Bags are available at Town Clerk\'s Office,\nthe Library and Transfer Station. Bring \nbags to Transfer Station Sat. or Sun., or\nleave well-secured bags in a visible area\nalong the roadside.'
        }],
        'roadsideDropoffAllowed': true
    },
    'WOODBURY': {
        'dropoffLocations': [{
            'address': '63 Valley Lake Rd., Woodbury, VT 05681',
            'coordinates': {
                'latitude': 44.44003499999999,
                'longitude': -72.416224
            },
            'name': 'Woodbury Elementary'
        }],
        'name': 'WOODBURY',
        'pickupLocations': [{
            'address': '1672 Route 14 Woodbury, VT 05681',
            'coordinates': {
                'latitude': 44.4147335,
                'longitude': -72.4179186
            },
            'name': 'Town Clerk\'s Office',
            'notes': 'pick up bags at town clerk\'s office &\nWoodbury Village Store. Drop off\nat Woodbury Elem. 9-1 on Green Up Day.'
        }],
        'roadsideDropoffAllowed': false
    },
    'WOODFORD': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'WOODFORD',
        'pickupLocations': [{
            'address': '1391 VT-9, Woodford, VT 05201',
            'coordinates': {
                'latitude': 42.8965791,
                'longitude': -73.1308655
            },
            'name': 'Town Clerk\'s Office',
            'notes': 'Bags available at Town Clerk\'s Office. Leave bags along roadsides.'
        }],
        'roadsideDropoffAllowed': true
    },
    'WOODSTOCK': {
        'dropoffLocations': [{
            'address': '463 Route 4, Woodstock, VT 05091',
            'coordinates': {
                'latitude': 43.545761,
                'longitude': -72.576499
            },
            'name': 'West Woodstock Town Garage'
        }],
        'name': 'WOODSTOCK',
        'pickupLocations': [{
            'address': '31 The Green, Woodstock, VT 05091',
            'coordinates': {
                'latitude': 43.6231674,
                'longitude': -72.5217306
            },
            'name': 'Town Office',
            'notes': 'Bags available at Town Office. Bring bags\nto the Town Garage, West Woodstock, on\nRoute 4 on Green Up Day.'
        }],
        'roadsideDropoffAllowed': false
    },
    'WORCESTER': {
        'dropoffLocations': [{
            'address': 'Leave on roadsides at intersections.',
            'name': ''
        }],
        'name': 'WORCESTER',
        'pickupLocations': [{
            'address': '',
            'name': '',
            'notes': 'Get bags at dump week before and/or on Green Up Day. Pick an area you want to do or contact coordinator for areas that need attention. Leave bags on roadsides or bring to dump on Green Up Day.'
        }],
        'roadsideDropoffAllowed': true
    }
};


Object.keys(townData).forEach(key => updateTown(key, townData[key]));
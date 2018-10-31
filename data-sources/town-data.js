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
  "ADDISON": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "4970 VT 22A, Addison, VT 05491",
      "dropoffLocationCoordinates": {
        "latitude": 44.0886671,
        "longitude": -73.3028997
      },
      "dropoffLocationName": "Addison Baptist Church"
    }],
    "name": "ADDISON",
    "pickupLocations": [{
      "pickupLocationAddress": "",
      "pickupLocationName": "",
      "pickupNotes": "Call Starr to Pick up bags, call beforehand.\nDrop off at AHC behind the Church. There\nwill be a Town dump truck parked there\nall weekend from Friday PM to Monday\nearly AM."
    }],
    "roadsideDropoffAllowed": false
  },
  "ALBANY": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "569 Delano Rd., Albany, VT 05820",
      "dropoffLocationCoordinates": {
        "latitude": 44.7580711,
        "longitude": -72.3284556
      },
      "dropoffLocationName": "Albany Town Garage"
    }],
    "name": "ALBANY",
    "pickupLocations": [{
      "pickupLocationAddress": "827 Main St, Albany, VT 05820",
      "pickupLocationCoordinates": {
        "latitude": 44.73107539999999,
        "longitude": -72.3793231
      },
      "pickupLocationName": "Town Clerk's Office",
      "pickupNotes": "Bags available at the Town Clerk's Office.\nLeave bags at the Town Garage."
    }],
    "roadsideDropoffAllowed": false
  },
  "ALBURGH": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "1 N Main St, Alburg, VT 05440",
      "dropoffLocationCoordinates": {
        "latitude": 44.977025,
        "longitude": -73.300195
      },
      "dropoffLocationName": "Town Clerk's Office"
    }],
    "name": "ALBURGH",
    "pickupLocations": [{
      "pickupLocationAddress": "260 Dump Road, Alburgh, VT  05440",
      "pickupLocationCoordinates": {
        "latitude": 44.9608232,
        "longitude": -73.2742027
      },
      "pickupLocationName": "Transfer Station",
      "pickupNotes": "Bags can be picked up at Transfer Station or Town Clerk's Office a week prior to GUD. Bags can be left on roadsides or brought to Town Clerk's Office where you can receive coupons for discounts on your trash."
    }, {
      "pickupLocationAddress": "1 N Main St, Alburg, VT 05440",
      "pickupLocationCoordinates": {
        "latitude": 44.977025,
        "longitude": -73.300195
      },
      "pickupLocationName": "Town Clerk's Office",
      "pickupNotes": "Bags can be picked up at Transfer Station or Town Clerk's Office a week prior to GUD. Bags can be left on roadsides or brought to Town Clerk's Office where you can receive coupons for discounts on your trash."
    }],
    "roadsideDropoffAllowed": true
  },
  "ANDOVER": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "953 Andover Rd., Chester, VT 05143",
      "dropoffLocationCoordinates": {
        "latitude": 43.2714471,
        "longitude": -72.6734994
      },
      "dropoffLocationName": "Andover Town Garage"
    }],
    "name": "ANDOVER",
    "pickupLocations": [{
      "pickupLocationAddress": "953 Andover Rd, Andover, VT 05143",
      "pickupLocationCoordinates": {
        "latitude": 43.277695,
        "longitude": -72.699303
      },
      "pickupLocationName": "Town Office",
      "pickupNotes": "Bags can be picked up at the Andover Town Office prior to GU Day or at Town Hall on GU Day. Bags need to be dropped off at the Town Garage dumpster."
    }],
    "roadsideDropoffAllowed": false
  },
  "ARLINGTON": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "ARLINGTON",
    "pickupLocations": [{
      "pickupLocationAddress": "3828 VT Route 7A, Arlington, VT",
      "pickupLocationCoordinates": {
        "latitude": 43.073772,
        "longitude": -73.15401299999999
      },
      "pickupLocationName": "Town Clerk's Office",
      "pickupNotes": "Bags available at Town Clerk's Office. Leave bags along roadsides."
    }],
    "roadsideDropoffAllowed": true
  },
  "ATHENS": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "ATHENS",
    "pickupLocations": [{
      "pickupLocationAddress": "",
      "pickupLocationName": "",
      "pickupNotes": "Sign up for # of bags at Town Meeting \nand they will be delivered before GU Day.\nLeave full bags and large debris along\nroadsides for pick up."
    }],
    "roadsideDropoffAllowed": true
  },
  "AVERILL": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "Averill",
    "pickupLocations": [{
      "pickupLocationAddress": "",
      "pickupLocationName": "",
      "pickupNotes": "Coordinating the towns of\nAverill, Avery's Gore, Lewis,\nFerdinand, Warren Gore,\nWarner's Grant. Bags available at the UTG Office. Bring bags to UTG Office."
    }],
    "roadsideDropoffAllowed": true
  },
  "AVERY_S_GORE": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "Avery's Gore",
    "pickupLocations": [{
      "pickupLocationAddress": "",
      "pickupLocationName": "",
      "pickupNotes": "Coordinating the towns of\nAverill, Avery's Gore, Lewis,\nFerdinand, Warren Gore,\nWarner's Grant. Bags available at the UTG Office. Bring bags to UTG Office."
    }],
    "roadsideDropoffAllowed": true
  },
  "BAKERSFIELD": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "43 VT Route 108, Bakersfield, VT 05441",
      "dropoffLocationCoordinates": {
        "latitude": 44.7826691,
        "longitude": -72.8013684
      },
      "dropoffLocationName": "Bakersfield Town Park"
    }],
    "name": "BAKERSFIELD",
    "pickupLocations": [{
      "pickupLocationAddress": "40 E Bakersfield Rd, Bakersfield, VT 05441",
      "pickupLocationCoordinates": {
        "latitude": 44.7817759,
        "longitude": -72.80091829999999
      },
      "pickupLocationName": "Town Clerk's Office",
      "pickupNotes": "Bags available at town clerk's office. Bags can be left on State Highway 108, do not leave on other roadsides. Consolidate bags in the village at the town park."
    }],
    "roadsideDropoffAllowed": false
  },
  "BALTIMORE": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "1902 Baltimore Rd, Baltimore, VT 05143",
      "dropoffLocationCoordinates": {
        "latitude": 43.3616726,
        "longitude": -72.57138139999999
      },
      "dropoffLocationName": "Town Office"
    }],
    "name": "BALTIMORE",
    "pickupLocations": [{
      "pickupLocationAddress": "1902 Baltimore Rd, Baltimore, VT 05143",
      "pickupLocationCoordinates": {
        "latitude": 43.3616726,
        "longitude": -72.57138139999999
      },
      "pickupLocationName": "Town Office",
      "pickupNotes": "Bags available at Town Office. Please \nsign up letting us know how many\npeople and what section of town you\nare Greening Up. Bags can be left at\nTown Office or along roadsides. Thank\nyou for your support!"
    }],
    "roadsideDropoffAllowed": true
  },
  "BARNARD": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "157 Chateauguay Rd., Barnard, VT 05031",
      "dropoffLocationCoordinates": {
        "latitude": 43.755531,
        "longitude": -72.63589499999999
      },
      "dropoffLocationName": "Barnard Recycling Center"
    }],
    "name": "BARNARD",
    "pickupLocations": [{
      "pickupLocationAddress": "6231 Vermont 12, Barnard, VT 05031",
      "pickupLocationCoordinates": {
        "latitude": 43.7290293,
        "longitude": -72.6204712
      },
      "pickupLocationName": "Barnard General Store",
      "pickupNotes": "Bags at Barnard General Store after 8am.\nBring full bags to recycling center or\nthe dump trailer at the BGS."
    }],
    "roadsideDropoffAllowed": false
  },
  "BARNET": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "151 Bimson Dr., Barnet, VT 05821",
      "dropoffLocationCoordinates": {
        "latitude": 44.292766,
        "longitude": -72.05860299999999
      },
      "dropoffLocationName": "Barnet Fire Dept"
    }],
    "name": "BARNET",
    "pickupLocations": [{
      "pickupLocationAddress": "1743 US-5, Barnet, VT 05821",
      "pickupLocationCoordinates": {
        "latitude": 44.2971385,
        "longitude": -72.0482165
      },
      "pickupLocationName": "Town Clerk's Office",
      "pickupNotes": "pick up bags at Post\nOffice, town clerk, stores. Drop off\nat Fire House after 10am, with picnic at Noon, provided by donors."
    }, {
      "pickupLocationAddress": "30 Monument Cir, Barnet, VT 05821",
      "pickupLocationCoordinates": {
        "latitude": 44.2967447,
        "longitude": -72.0492395
      },
      "pickupLocationName": "Post Office",
      "pickupNotes": "pick up bags at Post\nOffice, town clerk, stores. Drop off\nat Fire House after 10am, with picnic at Noon, provided by donors."
    }],
    "roadsideDropoffAllowed": false
  },
  "BARRE_CITY": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "BARRE CITY",
    "pickupLocations": [{
      "pickupLocationAddress": "6 N Main St # 6, Barre, VT 05641",
      "pickupLocationCoordinates": {
        "latitude": 44.1967517,
        "longitude": -72.5017846
      },
      "pickupLocationName": "City Clerk Office",
      "pickupNotes": "Bags at City Clerk's office. Leave bags on roadsides, city workers pick\nup bags for 3-4 days after GU Day."
    }, {
      "pickupLocationAddress": "155 Ayers St, Barre, VT 05641",
      "pickupLocationCoordinates": {
        "latitude": 44.1890599,
        "longitude": -72.4939017
      },
      "pickupLocationName": "Spaulding High School",
      "pickupNotes": "Bags at Spaulding\nHS"
    }, {
      "pickupLocationAddress": "361 N Main St, Barre, VT 05641",
      "pickupLocationCoordinates": {
        "latitude": 44.20198449999999,
        "longitude": -72.50650209999999
      },
      "pickupLocationName": "Merchants Bank",
      "pickupNotes": "Bags at Merchants Bank"
    }],
    "roadsideDropoffAllowed": true
  },
  "BARRE_TOWN": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "BARRE TOWN",
    "pickupLocations": [{
      "pickupLocationAddress": "149 Websterville Road, \nWebsterville, VT 05678-0116",
      "pickupLocationCoordinates": {
        "latitude": 44.168423,
        "longitude": -72.4772879
      },
      "pickupLocationName": "Town Office",
      "pickupNotes": "Bags available at Town Office. Leave \nbags along roadsides. BBQ/picnic at\nnoon on GU Day for volunteers."
    }],
    "roadsideDropoffAllowed": true
  },
  "BARTON": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "210 May Farm Rd, Barton, VT 05822",
      "dropoffLocationCoordinates": {
        "latitude": 44.784336,
        "longitude": -72.20960199999999
      },
      "dropoffLocationName": "Town Garage"
    }],
    "name": "BARTON",
    "pickupLocations": [{
      "pickupLocationAddress": "34 Main St, Barton, VT 05822",
      "pickupLocationCoordinates": {
        "latitude": 44.7463567,
        "longitude": -72.1747231
      },
      "pickupLocationName": "Town Clerk's Office",
      "pickupNotes": "\nBags available at the Town Clerk's Office.\nLeave bags along roadsides or bring to\ndumpster at Town Garage on Route 5."
    }],
    "roadsideDropoffAllowed": true
  },
  "BELVIDERE": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "BELVIDERE",
    "pickupLocations": [{
      "pickupLocationAddress": "3996 VT-109, Belvidere Center, VT 05442",
      "pickupLocationCoordinates": {
        "latitude": 44.74979,
        "longitude": -72.692291
      },
      "pickupLocationName": "Town Clerk's Office",
      "pickupNotes": "Bags available at the Town Clerk's Office.\nLeave bags along roadsides.  "
    }],
    "roadsideDropoffAllowed": true
  },
  "BENNINGTON": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "BENNINGTON",
    "pickupLocations": [{
      "pickupLocationAddress": "527 N Bennington Rd, Bennington, VT 05201",
      "pickupLocationCoordinates": {
        "latitude": 42.9107759,
        "longitude": -73.2214296
      },
      "pickupLocationName": "Bennington Subaru",
      "pickupNotes": "Green Up bags available at Bennington Subaru. Refreshments provided for all volunteers! http://www.subaruofnewengland.com/green-up-vermont-2017.htm"
    }, {
      "pickupLocationAddress": "205 South St, Bennington, VT 05201",
      "pickupLocationCoordinates": {
        "latitude": 42.877351,
        "longitude": -73.1977174
      },
      "pickupLocationName": "Town Office",
      "pickupNotes": "Bags are available at Town Office. Please\ncontact the Bennington Town Office to let\nus know the location of where you will\nbe picking up, this will help us to facilitate\ncollection of bags. Leave on roadsides at intersections."
    }],
    "roadsideDropoffAllowed": true
  },
  "BENSON": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "BENSON",
    "pickupLocations": [{
      "pickupLocationAddress": "2760 Stage Rd, Benson, VT 05743",
      "pickupLocationCoordinates": {
        "latitude": 43.708937,
        "longitude": -73.3096588
      },
      "pickupLocationName": "Town Office",
      "pickupNotes": "Bags available at the two stores, town\noffice and transfer station. Leave bags\nalong roadside and the town crew will\npick them up."
    }],
    "roadsideDropoffAllowed": true
  },
  "BERKSHIRE": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "4454 Water Tower Rd, Enosburg Falls, VT 05450",
      "dropoffLocationCoordinates": {
        "latitude": 44.971746,
        "longitude": -72.774079
      },
      "dropoffLocationName": "Berkshire Town Garage"
    }],
    "name": "BERKSHIRE",
    "pickupLocations": [{
      "pickupLocationAddress": "4454 Water Tower Rd, Enosburg Falls, VT 05450",
      "pickupLocationCoordinates": {
        "latitude": 44.971746,
        "longitude": -72.774079
      },
      "pickupLocationName": "Town Clerk's Office",
      "pickupNotes": "Bags available at Town Clerk's Office. Bring bags to the Town Garage or leave along roadsides."
    }],
    "roadsideDropoffAllowed": true
  },
  "BERLIN": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "108 Shed Rd, Berlin, VT 05602",
      "dropoffLocationCoordinates": {
        "latitude": 44.2117405,
        "longitude": -72.5779039
      },
      "dropoffLocationName": "Town Office"
    }],
    "name": "BERLIN",
    "pickupLocations": [{
      "pickupLocationAddress": "108 Shed Rd, Berlin, VT 05602",
      "pickupLocationCoordinates": {
        "latitude": 44.2117405,
        "longitude": -72.5779039
      },
      "pickupLocationName": "Town Office",
      "pickupNotes": "pick up and drop off bags at Twin City Subaru.  Refreshments and prizes available for enthusiastic participants from 8-4.  Thanks for helping out Green Up Vermont!"
    }],
    "roadsideDropoffAllowed": true
  },
  "BETHEL": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "",
      "dropoffLocationName": ""
    }],
    "name": "BETHEL",
    "pickupLocations": [{
      "pickupLocationAddress": "134 S Main St, Bethel, VT 05032",
      "pickupLocationCoordinates": {
        "latitude": 43.826854,
        "longitude": -72.629673
      },
      "pickupLocationName": "Town Clerk's Office",
      "pickupNotes": "Bags available at the Town Clerk's Office.\n"
    }],
    "roadsideDropoffAllowed": false
  },
  "BLOOMFIELD": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "15 Grant Rd., Colebrook, NH 03576",
      "dropoffLocationCoordinates": {
        "latitude": 44.8623858,
        "longitude": -71.5418652
      },
      "dropoffLocationName": "Jeffers Sand and Gravel Pit"
    }],
    "name": "BLOOMFIELD",
    "pickupLocations": [{
      "pickupLocationAddress": "27 Schoolhouse Rd, Bloomfield, VT 05905",
      "pickupLocationCoordinates": {
        "latitude": 44.75453599999999,
        "longitude": -71.62863899999999
      },
      "pickupLocationName": "Town Clerk's Office",
      "pickupNotes": "Bags available at Town Clerk's office. \nBring bags to Jeffer's Gravel Pit, across from the State shed."
    }],
    "roadsideDropoffAllowed": false
  },
  "BOLTON": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "BOLTON",
    "pickupLocations": [{
      "pickupLocationAddress": "3045 Theodore Roosevelt Highway (US Route 2) Bolton, Vermont 05676",
      "pickupLocationCoordinates": {
        "latitude": 44.3731989,
        "longitude": -72.884014
      },
      "pickupLocationName": "Town Clerk's Office",
      "pickupNotes": "Bags available at Town Clerk's Office.\nLeave bags along roadsides."
    }],
    "roadsideDropoffAllowed": true
  },
  "BRADFORD": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "359 Fairground Rd, Bradford, VT 05033",
      "dropoffLocationCoordinates": {
        "latitude": 44.0055979,
        "longitude": -72.12135959999999
      },
      "dropoffLocationName": "Bradford Town Garage"
    }],
    "name": "BRADFORD",
    "pickupLocations": [{
      "pickupLocationAddress": "",
      "pickupLocationName": "Bradford Academy",
      "pickupNotes": "Bags available one week prior to \nGU Day at Bradford Academy. Bring bags to the container located at the Bradford Town Garage. Please place all Green Up bags in the container."
    }],
    "roadsideDropoffAllowed": false
  },
  "BRAINTREE": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections,",
      "dropoffLocationName": ""
    }],
    "name": "BRAINTREE",
    "pickupLocations": [{
      "pickupLocationAddress": "932 VT-12A, Braintree, VT 05060",
      "pickupLocationCoordinates": {
        "latitude": 43.9315423,
        "longitude": -72.689503
      },
      "pickupLocationName": "Town Clerk's Office",
      "pickupNotes": "Bags available at Town Clerk's Office,\nTown Hall, Braintree School, and \nSnowsville Store. Bring bags to the \ndumpster at the Town Garage."
    }],
    "roadsideDropoffAllowed": true
  },
  "BRANDON": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "BRANDON",
    "pickupLocations": [{
      "pickupLocationAddress": "25 Grove Street\nRoute 7\nBrandon, VT  05733",
      "pickupLocationCoordinates": {
        "latitude": 43.80199,
        "longitude": -73.09510449999999
      },
      "pickupLocationName": "Gazebo Inn",
      "pickupNotes": "pick up bags ath the Gazebo. Bring bags to transfer station or Leave on roadsides at intersections."
    }],
    "roadsideDropoffAllowed": true
  },
  "BRATTLEBORO": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "BRATTLEBORO",
    "pickupLocations": [{
      "pickupLocationAddress": "1234 Putney Rd, Brattleboro, VT 05301",
      "pickupLocationCoordinates": {
        "latitude": 42.8878381,
        "longitude": -72.5561132
      },
      "pickupLocationName": "Brattleboro Subaru",
      "pickupNotes": "Green Up bags available at Brattleboro \nSubaru. Coffee and donuts 8-12.\nhttp://www.subaruofnewengland.com/green-up-vermont-2017.htm"
    }, {
      "pickupLocationAddress": "180 Main St, Brattleboro, VT 05301",
      "pickupLocationCoordinates": {
        "latitude": 42.853539,
        "longitude": -72.55882629999999
      },
      "pickupLocationName": "Chamber of Commerce",
      "pickupNotes": "Prior to GU Day bags available at Chamber of Comm. "
    }, {
      "pickupLocationAddress": "2 Main St, Brattleboro, VT 05301",
      "pickupLocationCoordinates": {
        "latitude": 42.8503732,
        "longitude": -72.55828509999999
      },
      "pickupLocationName": "Brattleboro Co-op",
      "pickupNotes": " On GU Day at Brattleboro Co-op,"
    }, {
      "pickupLocationAddress": "134 Elliot St, Brattleboro, VT 05301",
      "pickupLocationCoordinates": {
        "latitude": 42.8511055,
        "longitude": -72.56126859999999
      },
      "pickupLocationName": "Restless Rooster",
      "pickupNotes": "Restless Rooster"
    }, {
      "pickupLocationAddress": "16 South St, Brattleboro, VT 05301",
      "pickupLocationCoordinates": {
        "latitude": 42.8533453,
        "longitude": -72.60045029999999
      },
      "pickupLocationName": "Fire Station",
      "pickupNotes": "Meet on the Green in front of \nFire Station 9am. Refreshments\n9am-12pm. Leave bags along roadsides and curbs. No tires or bulky waste. We discourage pick ups from rivers and streams."
    }],
    "roadsideDropoffAllowed": true
  },
  "BRIDGEWATER": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "65 Schoolhouse Rd, Bridgewater Corners, VT 05034",
      "dropoffLocationCoordinates": {
        "latitude": 43.5868107,
        "longitude": -72.65821679999999
      },
      "dropoffLocationName": ""
    }],
    "name": "BRIDGEWATER",
    "pickupLocations": [{
      "pickupLocationAddress": "7335 US-4, Bridgewater, VT 05034",
      "pickupLocationCoordinates": {
        "latitude": 43.5881972,
        "longitude": -72.6244028
      },
      "pickupLocationName": "Town Clerk's Office",
      "pickupNotes": "pick up bags at Town Clerk's Office prior\n to GU Day or at 8am the day of. Leave bags along roadsides or bring to Fast Trash 8-11."
    }],
    "roadsideDropoffAllowed": true
  },
  "BRIDPORT": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections",
      "dropoffLocationName": ""
    }],
    "name": "BRIDPORT",
    "pickupLocations": [{
      "pickupLocationAddress": "82 Crown Point Rd, Bridport, VT 05734",
      "pickupLocationCoordinates": {
        "latitude": 43.984423,
        "longitude": -73.31526699999999
      },
      "pickupLocationName": "Town Clerk's Office",
      "pickupNotes": "Bags available at Town Clerk's Office. Please bring full bags back to trucks\nparked at the Town Clerk's office.\n"
    }],
    "roadsideDropoffAllowed": true
  },
  "BRIGHTON": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "BRIGHTON",
    "pickupLocations": [{
      "pickupLocationAddress": "62 Cross St, Island Pond, VT 05846",
      "pickupLocationCoordinates": {
        "latitude": 44.81423119999999,
        "longitude": -71.8813258
      },
      "pickupLocationName": "Gervais Ace Hardware",
      "pickupNotes": "Bags available at Gervais Ace Hardware. \n"
    }, {
      "pickupLocationAddress": "28 Cross St, Island Pond, VT 05846",
      "pickupLocationCoordinates": {
        "latitude": 44.8147084,
        "longitude": -71.88132639999999
      },
      "pickupLocationName": "Hearth and Home Country Store",
      "pickupNotes": "Bags available at Hearth and Home Country Store. \nBring bags to the dumpster behind town hall, do not Leave on roadsides at intersections."
    }],
    "roadsideDropoffAllowed": true
  },
  "BRISTOL": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections",
      "dropoffLocationName": ""
    }],
    "name": "BRISTOL",
    "pickupLocations": [{
      "pickupLocationAddress": "1 South St, Bristol, VT 05443",
      "pickupLocationCoordinates": {
        "latitude": 44.13298409999999,
        "longitude": -73.07895169999999
      },
      "pickupLocationName": "Town Office",
      "pickupNotes": "pick up bags during the week before Green Up Day at Town\nOffice. Leave bags along roadsides or\nbring to the Transfer Station."
    }],
    "roadsideDropoffAllowed": true
  },
  "BROOKFIELD": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "40-74 VT Route 65, Brookfield, VT 05036",
      "dropoffLocationCoordinates": {
        "latitude": 44.0304891,
        "longitude": -72.5841694
      },
      "dropoffLocationName": "Brookfield Town Garage"
    }],
    "name": "BROOKFIELD",
    "pickupLocations": [{
      "pickupLocationAddress": "40 Ralph Rd, Brookfield, VT 05036",
      "pickupLocationCoordinates": {
        "latitude": 44.043159,
        "longitude": -72.602768
      },
      "pickupLocationName": "Town Clerk's Office",
      "pickupNotes": "Young families, please circle the first Saturday in May in green ink on your calendars and come out and Green Up! Bags available at the Town Clerk's Office or the school. Bring bags to the Town Garage."
    }],
    "roadsideDropoffAllowed": false
  },
  "BROOKLINE": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "BROOKLINE",
    "pickupLocations": [{
      "pickupLocationAddress": "736 Grassy Brook Rd, Brookline, VT 05345",
      "pickupLocationCoordinates": {
        "latitude": 43.0217223,
        "longitude": -72.6037808
      },
      "pickupLocationName": "Town Office",
      "pickupNotes": "Bags available at the Town Office 1 week \nprior to GU Day. Leave full bags along \nroadsides for pick up."
    }],
    "roadsideDropoffAllowed": true
  },
  "BROWNINGTON": {
    "dropoffLocations": [{
      "dropoffLocationAddress": " 622 Schoolhouse Rd, Brownington, VT 05860",
      "dropoffLocationCoordinates": {
        "latitude": 44.81885399999999,
        "longitude": -72.135358
      },
      "dropoffLocationName": "Town Clerk's Office"
    }],
    "name": "BROWNINGTON",
    "pickupLocations": [{
      "pickupLocationAddress": " 622 Schoolhouse Rd, Brownington, VT 05860",
      "pickupLocationCoordinates": {
        "latitude": 44.81885399999999,
        "longitude": -72.135358
      },
      "pickupLocationName": "Town Clerk's Office",
      "pickupNotes": "Bags available at Town Clerk's Office. \nDrop off bags at town office 8-4 on\nGU Day or leave along roadsides."
    }],
    "roadsideDropoffAllowed": true
  },
  "BUEL_S_GORE": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides along Route 17",
      "dropoffLocationName": ""
    }],
    "name": "BUEL'S GORE",
    "pickupLocations": [{
      "pickupLocationAddress": "",
      "pickupLocationName": "",
      "pickupNotes": "Contact Maura for bags. Leave full bags\nalong Route 17."
    }],
    "roadsideDropoffAllowed": true
  },
  "BURKE": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "BURKE",
    "pickupLocations": [{
      "pickupLocationAddress": "212 School Street, West Burke, VT 05871",
      "pickupLocationCoordinates": {
        "latitude": 44.6418629,
        "longitude": -71.8901953
      },
      "pickupLocationName": "Town Clerk's Office",
      "pickupNotes": "Bags available at Town Clerk's Office.\nLeave bags along roadsides.\n"
    }],
    "roadsideDropoffAllowed": true
  },
  "BURLINGTON": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "BURLINGTON",
    "pickupLocations": [{
      "pickupLocationAddress": "149 Church St, Burlington, VT 05401",
      "pickupLocationCoordinates": {
        "latitude": 44.4763481,
        "longitude": -73.2129002
      },
      "pickupLocationName": "CEDO - City Hall",
      "pickupNotes": "City Hall - Pick up week prior to Green Up day - regular business hours"
    }, {
      "pickupLocationAddress": "585 Pine Street Burlington, Vermont 05401",
      "pickupLocationCoordinates": {
        "latitude": 44.463748,
        "longitude": -73.215513
      },
      "pickupLocationName": "Burlington Electric",
      "pickupNotes": "Burlington Electric - Pick up week prior to Green Up day - regular business hours"
    }, {
      "pickupLocationAddress": "645 Pine St. Suite A Burlington, VT 05401",
      "pickupLocationCoordinates": {
        "latitude": 44.4616894,
        "longitude": -73.21554429999999
      },
      "pickupLocationName": "Departments of Public Works/Parks & Recreation",
      "pickupNotes": "DPW/Parks & Rec  - Pick up week prior to Green Up day - regular business hours"
    }, {
      "pickupLocationAddress": "316 Pine St #114, Burlington, VT 05401",
      "pickupLocationCoordinates": {
        "latitude": 44.4706803,
        "longitude": -73.214242
      },
      "pickupLocationName": "Citizen Cider",
      "pickupNotes": "Sustainability Academy at Lawrence Barnes School  - Pick up week prior to Green Up day - regular business hours"
    }, {
      "pickupLocationAddress": "351 Shelburne Rd, Burlington, VT 05401",
      "pickupLocationCoordinates": {
        "latitude": 44.4555549,
        "longitude": -73.2092043
      },
      "pickupLocationName": "Burlington Subuaru",
      "pickupNotes": "Green Up bags available at Burlington Subaru. Refreshments provided for all volunteers!"
    }, {
      "pickupLocationAddress": "130 Gosse Ct, Burlington, VT 05408",
      "pickupLocationCoordinates": {
        "latitude": 44.51345449999999,
        "longitude": -73.2466707
      },
      "pickupLocationName": "Miller Community Center",
      "pickupNotes": "Miller Community Center - Pick up week prior to Green Up day - regular business hours and Pickup up on Green Up Day - 8-12"
    }, {
      "pickupLocationAddress": "20 Allen St, Burlington, VT 05401",
      "pickupLocationCoordinates": {
        "latitude": 44.4839584,
        "longitude": -73.2150235
      },
      "pickupLocationName": "St. Joseph's School",
      "pickupNotes": "St. Joseph's School - Pick up week prior to Green Up day - regular business hours and Pickup up on Green Up Day - 8-12"
    }],
    "roadsideDropoffAllowed": true
  },
  "CABOT": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "2947 Main St., Cabot VT, 05647",
      "dropoffLocationCoordinates": {
        "latitude": 44.4012937,
        "longitude": -72.3134826
      },
      "dropoffLocationName": "Cabot Fire Station "
    }],
    "name": "CABOT",
    "pickupLocations": [{
      "pickupLocationAddress": "3084 Main St, Cabot, VT 05647",
      "pickupLocationCoordinates": {
        "latitude": 44.402111,
        "longitude": -72.310997
      },
      "pickupLocationName": "Town Office",
      "pickupNotes": "pick up bags at Town Office and Hardware Store a week before Green Up Day and at the Fire Station on Green Up Day. Bring bags to the Cabot Fire Station between 9 and 2. Special arrangements can be made with coordinators for roadside pick up of bags."
    }],
    "roadsideDropoffAllowed": false
  },
  "CALAIS": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "123-653 Moscow Woods Rd., E. Calais, VT 05650",
      "dropoffLocationCoordinates": {
        "latitude": 44.3684908,
        "longitude": -72.43823429999999
      },
      "dropoffLocationName": "Calais Transfer Station"
    }],
    "name": "CALAIS",
    "pickupLocations": [{
      "pickupLocationAddress": "3120 Pekin Brook Rd, East Calais, VT 05650",
      "pickupLocationCoordinates": {
        "latitude": 44.36866999999999,
        "longitude": -72.467992
      },
      "pickupLocationName": "Town Clerk's Office",
      "pickupNotes": "Bags available at town stores and Town\nClerk's Office. Bring bags to recycling\ndepot, Moscow Woods Rd., 9-12 on \nGU Day. Do not Leave on roadsides at intersections, they \nwill NOT be picked up."
    }],
    "roadsideDropoffAllowed": false
  },
  "CAMBRIDGE": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "CAMBRIDGE",
    "pickupLocations": [{
      "pickupLocationAddress": "85 Church St, Jeffersonville, VT 05464",
      "pickupLocationCoordinates": {
        "latitude": 44.64364339999999,
        "longitude": -72.831295
      },
      "pickupLocationName": "Town Clerk's Office",
      "pickupNotes": "pick up bags at Town Clerk's office prior to Green Up Day."
    }, {
      "pickupLocationAddress": "113 S Main St, Cambridge, VT 05444",
      "pickupLocationCoordinates": {
        "latitude": 44.6445745,
        "longitude": -72.8766895
      },
      "pickupLocationName": "Cambridge Village Market a.k.a. King's Market",
      "pickupNotes": "pick up bags at King's Market prior to Green Up Day "
    }, {
      "pickupLocationAddress": "168 S Vermont 108, Cambridge, VT 05464",
      "pickupLocationCoordinates": {
        "latitude": 44.64601500000001,
        "longitude": -72.828339
      },
      "pickupLocationName": "The Farm Store",
      "pickupNotes": "pick up bags at The Farm Store prior to Green Up Day"
    }, {
      "pickupLocationAddress": "4879 VT-15, Jeffersonville, VT 05464",
      "pickupLocationCoordinates": {
        "latitude": 44.64549400000001,
        "longitude": -72.83367
      },
      "pickupLocationName": "Aubochon's",
      "pickupNotes": "pick up bags at Aubochon's prior to Green Up Day "
    }, {
      "pickupLocationAddress": "168 S Vermont 108, Cambridge, VT 05444",
      "pickupLocationCoordinates": {
        "latitude": 44.64601500000001,
        "longitude": -72.828339
      },
      "pickupLocationName": "The Village Sampler",
      "pickupNotes": "pick up bags at The Village Sampler prior to Green Up Day "
    }, {
      "pickupLocationAddress": "186 School Rd, Jeffersonville, VT 05464",
      "pickupLocationCoordinates": {
        "latitude": 44.6444743,
        "longitude": -72.82677149999999
      },
      "pickupLocationName": "Cambridge Elementary School",
      "pickupNotes": "pick up bags on GU day at Rotary's Pie for Breakfast event at Cambridge Elementary at 9am. Leave full bags at closest intersection \ntown road to be picked up by road crew."
    }],
    "roadsideDropoffAllowed": true
  },
  "CANAAN": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "CANAAN",
    "pickupLocations": [{
      "pickupLocationAddress": "",
      "pickupLocationName": "",
      "pickupNotes": "Call or email Renee for Green Up bags. Leave full bags on the side of the road, or\ntalk to Renee about where to bring\nthem."
    }],
    "roadsideDropoffAllowed": true
  },
  "CASTLETON": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Staso Rd, Castleton, VT 05735",
      "dropoffLocationCoordinates": {
        "latitude": 43.5996911,
        "longitude": -73.1707572
      },
      "dropoffLocationName": "Transfer Station"
    }],
    "name": "CASTLETON",
    "pickupLocations": [{
      "pickupLocationAddress": "218 VT-4A, Castleton, VT 05735",
      "pickupLocationCoordinates": {
        "latitude": 43.6136093,
        "longitude": -73.1704057
      },
      "pickupLocationName": "Slate Valley Physical Therapy",
      "pickupNotes": "Bags can be picked up at Slate Valley PT \non Route 4 next to the Iron Lantern or call \nthe coordinator to arrange delivery. Bring\nbags to the transfer station or leave along\nthe roadsides in pile for pick up."
    }],
    "roadsideDropoffAllowed": true
  },
  "CAVENDISH": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "354 Route 131, Springfield, VT 05156",
      "dropoffLocationCoordinates": {
        "latitude": 43.3880608,
        "longitude": -72.59896429999999
      },
      "dropoffLocationName": "Cavendish Transfer Station"
    }],
    "name": "CAVENDISH",
    "pickupLocations": [{
      "pickupLocationAddress": "37 High St, Cavendish, VT 05142",
      "pickupLocationCoordinates": {
        "latitude": 43.3828573,
        "longitude": -72.607771
      },
      "pickupLocationName": "Town Clerk's Office",
      "pickupNotes": "Bags available at the Town Clerk's Office.\nBring bags to the Transfer Station, do not Leave on roadsides at intersections."
    }],
    "roadsideDropoffAllowed": false
  },
  "CHARLESTON": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "5063 VT Route 105, Charleston, VT 05872",
      "dropoffLocationCoordinates": {
        "latitude": 44.8505219,
        "longitude": -72.0254412
      },
      "dropoffLocationName": "Charleston Town Office"
    }],
    "name": "CHARLESTON",
    "pickupLocations": [{
      "pickupLocationAddress": "5063 VT-105, West Charleston, VT 05872",
      "pickupLocationCoordinates": {
        "latitude": 44.850746,
        "longitude": -72.025505
      },
      "pickupLocationName": "Town Clerk's Office",
      "pickupNotes": "pick up bags at Town Clerk's Office, Scampy's Deli, Post Offices, or NorthWoods Stewardship Center. Truck will be at the Town Office for drop off of bags Sat & Sun. No tires.\nDo not leave bags on roadsides."
    }],
    "roadsideDropoffAllowed": false
  },
  "CHARLOTTE": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "408 Hinesburg Rd., Charlotte, VT 05445",
      "dropoffLocationCoordinates": {
        "latitude": 44.31517119999999,
        "longitude": -73.22640659999999
      },
      "dropoffLocationName": "Charlotte Central School"
    }],
    "name": "CHARLOTTE",
    "pickupLocations": [{
      "pickupLocationAddress": "408 Hinesburg Rd., Charlotte, VT 05445",
      "pickupLocationCoordinates": {
        "latitude": 44.31517119999999,
        "longitude": -73.22640659999999
      },
      "pickupLocationName": "Charlotte Central School",
      "pickupNotes": "pick up bags at Charlotte Central School Quonset Hut Sat 9-3.  All bags should be brought back to the Quonset Hut. Do not leave bags on roadsides.  www.charlottevtgreenupday.com"
    }, {
      "pickupLocationAddress": "159 Ferry Rd, Charlotte, VT 05445",
      "pickupLocationCoordinates": {
        "latitude": 44.310165,
        "longitude": -73.249634
      },
      "pickupLocationName": "Town Hall",
      "pickupNotes": "pick up bags Sun 9-12 or prior to Green Up Day at Town Hall. All bags should be brought back to the Quonset Hut. Do not leave bags on roadsides.www.charlottevtgreenupday.com"
    }, {
      "pickupLocationAddress": "20 Jackson Hill Rd, Charlotte, VT 05445",
      "pickupLocationCoordinates": {
        "latitude": 44.3190439,
        "longitude": -73.1885413
      },
      "pickupLocationName": "Spears Corner Store",
      "pickupNotes": "pick up bags Sun 9-12 or prior to Green Up Day at Spears Corner Store. All bags should be brought back to the Quonset Hut. Do not leave bags on roadsides.www.charlottevtgreenupday.com"
    }, {
      "pickupLocationAddress": "290 Ferry Rd, Charlotte, VT 05445",
      "pickupLocationCoordinates": {
        "latitude": 44.310773,
        "longitude": -73.252776
      },
      "pickupLocationName": "Old Brick Store",
      "pickupNotes": "pick up bags Sun 9-12 or prior to Green Up Day at  Old Brick Store. All bags should be brought back to the Quonset Hut. Do not leave bags on roadsides.www.charlottevtgreenupday.com"
    }, {
      "pickupLocationAddress": "115 Ferry Rd, Charlotte, VT 05445",
      "pickupLocationCoordinates": {
        "latitude": 44.310692,
        "longitude": -73.249382
      },
      "pickupLocationName": "Charlotte Library",
      "pickupNotes": "pick up bags Sun 9-12 or prior to Green Up Day at  Charlotte Library. All bags should be brought back to the Quonset Hut. Do not leave bags on roadsides.www.charlottevtgreenupday.com"
    }],
    "roadsideDropoffAllowed": false
  },
  "CHELSEA": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "72 Washington Turnpike, Chelsea, VT  05038",
      "dropoffLocationCoordinates": {
        "latitude": 44.016907,
        "longitude": -72.4420901
      },
      "dropoffLocationName": "Transfer Station"
    }],
    "name": "CHELSEA",
    "pickupLocations": [{
      "pickupLocationAddress": "",
      "pickupLocationName": "",
      "pickupNotes": "pick up bags at area stores, Green Up\nyour road, Leave on roadsides at intersections or drop off bags at transfer station or participate in G U Day -  meet at 9:30 Basketball Court. Bring gloves and proper footwear."
    }],
    "roadsideDropoffAllowed": true
  },
  "CHESTER": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "44 Town Garage Rd., Chester, VT 05143",
      "dropoffLocationCoordinates": {
        "latitude": 43.2662607,
        "longitude": -72.5889925
      },
      "dropoffLocationName": "Chester Town Garage"
    }],
    "name": "CHESTER",
    "pickupLocations": [{
      "pickupLocationAddress": "556 Elm St, Chester, VT 05143",
      "pickupLocationCoordinates": {
        "latitude": 43.2685058,
        "longitude": -72.58910519999999
      },
      "pickupLocationName": "Town Hall",
      "pickupNotes": "Green Up for Chester is organized by the\nChester Conservation Committee. Bags\navailable one week prior to GUD at\nTown Hall, Chester Hardware or at\nChester Elementary. Thanks for helping\nGreen Up Chester! Contact Frank for more\ninfo."
    }],
    "roadsideDropoffAllowed": false
  },
  "CHITTENDEN": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "CHITTENDEN",
    "pickupLocations": [{
      "pickupLocationAddress": "347 Holden Rd, Chittenden, VT 05737",
      "pickupLocationCoordinates": {
        "latitude": 43.708015,
        "longitude": -72.948741
      },
      "pickupLocationName": "Church of the Wildwood ",
      "pickupNotes": "pick up bags at the Church of the \nWildwood from 8-11:30, enjoy free\ncoffee and donuts. Leave bags along \nroadsides for pick up."
    }],
    "roadsideDropoffAllowed": true
  },
  "CLARENDON": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "279 Middle Rd, North Clarendon, VT 05759",
      "dropoffLocationCoordinates": {
        "latitude": 43.5204625,
        "longitude": -72.9719633
      },
      "dropoffLocationName": "Town Hall"
    }],
    "name": "CLARENDON",
    "pickupLocations": [{
      "pickupLocationAddress": "279 Middle Rd, North Clarendon, VT 05759",
      "pickupLocationCoordinates": {
        "latitude": 43.5204625,
        "longitude": -72.9719633
      },
      "pickupLocationName": "Town Hall",
      "pickupNotes": "Bags available at Town Hall, Chippenhook\nBallfield and Clarendon Post Office. Leave\nfull bags along roadsides for pick up or bring to the dumpster behind Town Hall."
    }],
    "roadsideDropoffAllowed": true
  },
  "COLCHESTER": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "COLCHESTER",
    "pickupLocations": [{
      "pickupLocationAddress": "835 Blakely Rd, Colchester, VT 05446",
      "pickupLocationCoordinates": {
        "latitude": 44.5357999,
        "longitude": -73.2054383
      },
      "pickupLocationName": "Police Station",
      "pickupNotes": "Bag distribution at Police Station \n8-12pm. Rotary sponsors free Hot\nDog roast for all volunteers at noon. Bags can be left on the roadsides or brought to bag distribution site."
    }],
    "roadsideDropoffAllowed": true
  },
  "CONCORD": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "CONCORD",
    "pickupLocations": [{
      "pickupLocationAddress": "374 Main St, Concord, VT 05824",
      "pickupLocationCoordinates": {
        "latitude": 44.4286406,
        "longitude": -71.8880711
      },
      "pickupLocationName": "Town Clerk's Office",
      "pickupNotes": "Bags available at Town Clerk's Office.\nLeave bags along roadsides."
    }],
    "roadsideDropoffAllowed": true
  },
  "CORINTH": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "2628 Goose Green Rd., Corinth, VT 05076",
      "dropoffLocationCoordinates": {
        "latitude": 44.0133509,
        "longitude": -72.260798
      },
      "dropoffLocationName": "Casella Transfer Station"
    }],
    "name": "CORINTH",
    "pickupLocations": [{
      "pickupLocationAddress": " 1387 Cookeville Rd, Corinth, VT 05039",
      "pickupLocationCoordinates": {
        "latitude": 44.023802,
        "longitude": -72.2901333
      },
      "pickupLocationName": "Town Office",
      "pickupNotes": "Bags available at Town Offices, Blake\nMemorial Library, and on the weekend\nbefore GU Day we will distribute bags at\nthe Transfer Station. Remember to sign up\non the Town of Corinth sign-up map during\nTown Meeting! The map will stay up at the \nTown Offices from Town Meeting Day\nuntil Green Up Day.\n"
    }],
    "roadsideDropoffAllowed": false
  },
  "CORNWALL": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "112 School Rd, Cornwall VT 05753",
      "dropoffLocationCoordinates": {
        "latitude": 43.963902,
        "longitude": -73.2063979
      },
      "dropoffLocationName": "Bingham Memorial School"
    }],
    "name": "CORNWALL",
    "pickupLocations": [{
      "pickupLocationAddress": "112 School Rd, Cornwall, VT 05753",
      "pickupLocationCoordinates": {
        "latitude": 43.963902,
        "longitude": -73.2063979
      },
      "pickupLocationName": "Bingham Memorial School / Cornwall School",
      "pickupNotes": "Bring bags and other roadside trash to the Cornwall School, where the town trucks are parked from Friday PM to Sunday midday. Do not leave bags along roadsides. Thank you for Greening up Cornwall!"
    }],
    "roadsideDropoffAllowed": false
  },
  "COVENTRY": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "403 Landfill Lane, Coventry, VT 05825",
      "dropoffLocationCoordinates": {
        "latitude": 44.91093799999999,
        "longitude": -72.223486
      },
      "dropoffLocationName": "Coventry Landfill"
    }],
    "name": "COVENTRY",
    "pickupLocations": [{
      "pickupLocationAddress": "168 Main St, Coventry, VT 05825",
      "pickupLocationCoordinates": {
        "latitude": 44.866705,
        "longitude": -72.264473
      },
      "pickupLocationName": "Town Clerk's Office",
      "pickupNotes": "Bags available at the Town Clerk's Office.\nBring bags to the landfill."
    }],
    "roadsideDropoffAllowed": false
  },
  "CRAFTSBURY": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "46 Town Garage Rd., Craftsbury, VT 05826",
      "dropoffLocationCoordinates": {
        "latitude": 44.6371277,
        "longitude": -72.3713927
      },
      "dropoffLocationName": "Craftsbury Town Garage"
    }],
    "name": "CRAFTSBURY",
    "pickupLocations": [{
      "pickupLocationAddress": "85 S Craftsbury Rd, Craftsbury, VT 05826",
      "pickupLocationCoordinates": {
        "latitude": 44.635154,
        "longitude": -72.3719686
      },
      "pickupLocationName": "Town Clerk's Office",
      "pickupNotes": "Bags available at Town Clerk's Office. Bring bags to the Town Garage."
    }],
    "roadsideDropoffAllowed": false
  },
  "DANBY": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "DANBY",
    "pickupLocations": [{
      "pickupLocationAddress": "426 Danby Mountain Rd, Danby, VT 05739",
      "pickupLocationCoordinates": {
        "latitude": 43.344231,
        "longitude": -73.05117
      },
      "pickupLocationName": "Smokey House",
      "pickupNotes": "Bags available on Green Up Day at\nSmokey House or at the Barn on Main St.\nLeave bags along roadsides."
    }],
    "roadsideDropoffAllowed": true
  },
  "DANVILLE": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "DANVILLE",
    "pickupLocations": [{
      "pickupLocationAddress": "36 US-2, Danville, VT 05828",
      "pickupLocationCoordinates": {
        "latitude": 44.411739,
        "longitude": -72.140878
      },
      "pickupLocationName": "Town Clerk's Office",
      "pickupNotes": "Bags available at Town Clerk's Office.\nLeave bags along roadsides.\n"
    }],
    "roadsideDropoffAllowed": true
  },
  "DERBY": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "DERBY",
    "pickupLocations": [{
      "pickupLocationAddress": "124 Main St, Derby, VT  05829",
      "pickupLocationCoordinates": {
        "latitude": 44.9526842,
        "longitude": -72.1318484
      },
      "pickupLocationName": "Town Clerk's Office",
      "pickupNotes": "Bags available at Town Clerk's Office.\nLeave bags along roadsides."
    }],
    "roadsideDropoffAllowed": true
  },
  "DORSET": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "DORSET",
    "pickupLocations": [{
      "pickupLocationAddress": "112 Mad Tom Rd, East Dorset, VT 05253",
      "pickupLocationCoordinates": {
        "latitude": 43.2392416,
        "longitude": -73.0079192
      },
      "pickupLocationName": "Town Office",
      "pickupNotes": "Bags available at Town Clerk's Office. Leave bags along roadsides."
    }],
    "roadsideDropoffAllowed": true
  },
  "DOVER": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "11 Landfill Rd, West Dover, VT 05356",
      "dropoffLocationCoordinates": {
        "latitude": 42.9303062,
        "longitude": -72.8198858
      },
      "dropoffLocationName": "Transfer Station"
    }],
    "name": "DOVER",
    "pickupLocations": [{
      "pickupLocationAddress": "9 Schoolhouse Road East Dover, Vermont 05341",
      "pickupLocationCoordinates": {
        "latitude": 42.938863,
        "longitude": -72.80991
      },
      "pickupLocationName": "Dover School",
      "pickupNotes": "Meet at Dover School at 9 for bags and assignments. Lunch 11:30-12 at the Dover School. Leave bags on roadsides or take to the dump."
    }],
    "roadsideDropoffAllowed": true
  },
  "DUMMERSTON": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Dummerston, VT 05301",
      "dropoffLocationCoordinates": {
        "latitude": 42.9215017,
        "longitude": -72.5838146
      },
      "dropoffLocationName": "Dummerston Common"
    }],
    "name": "DUMMERSTON",
    "pickupLocations": [{
      "pickupLocationAddress": "Dummerston, VT 05301",
      "pickupLocationCoordinates": {
        "latitude": 42.9215017,
        "longitude": -72.5838146
      },
      "pickupLocationName": "Dummerston Center Church",
      "pickupNotes": "Meet 9am Dummerston Center\nChurch. Bring picnic lunch to eat\non the Common. Drop bags off at the Common."
    }],
    "roadsideDropoffAllowed": false
  },
  "DUXBURY": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "5421 VT Route 100, Duxbury, VT 05676",
      "dropoffLocationCoordinates": {
        "latitude": 44.3196029,
        "longitude": -72.7598694
      },
      "dropoffLocationName": "Duxbury Town Garage"
    }],
    "name": "DUXBURY",
    "pickupLocations": [{
      "pickupLocationAddress": "5421 VT-100, Duxbury, VT 05676",
      "pickupLocationCoordinates": {
        "latitude": 44.3195443,
        "longitude": -72.75976299999999
      },
      "pickupLocationName": "Town Clerk's Office",
      "pickupNotes": "Bags are available at Town Clerk's Office and a North Duxbury and a South Duxbury residence (to be announced on FPF and the Next Door site). Do not leave bags on roadsides, they will not be picked up. Bring bags to one of the following locations: Town Garage or pull-off in front of the railroad crossing gate, past the GMP dam on the left-side of River Rd. No drop off in S. Duxbury - bring to Town Garage."
    }],
    "roadsideDropoffAllowed": false
  },
  "EAST_HAVEN": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "634 Community Road\nEast Haven, VT 05837",
      "dropoffLocationCoordinates": {
        "latitude": 44.6400615,
        "longitude": -71.89147
      },
      "dropoffLocationName": "Community Building"
    }],
    "name": "EAST HAVEN",
    "pickupLocations": [{
      "pickupLocationAddress": "634 Community Road\nEast Haven, VT 05837",
      "pickupLocationCoordinates": {
        "latitude": 44.6400615,
        "longitude": -71.89147
      },
      "pickupLocationName": "Community Building",
      "pickupNotes": "Meet at the Comm. Bldg.  At 10am for bags\nand routes. Lunch will be provided for all  \nvolunteers. Leave bags on roadsides or bring bags to the Community\nBuilding, next to the recycling center\n in East Haven."
    }],
    "roadsideDropoffAllowed": true
  },
  "EAST_MONTPELIER": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "665 Vincent Flats Rd, E. Montpelier, VT 05651",
      "dropoffLocationCoordinates": {
        "latitude": 44.28661710000001,
        "longitude": -72.4953304
      },
      "dropoffLocationName": "East Montpelier Elementary"
    }],
    "name": "EAST MONTPELIER",
    "pickupLocations": [{
      "pickupLocationAddress": "40 Kelton Rd, East Montpelier, VT 05651",
      "pickupLocationCoordinates": {
        "latitude": 44.27286429999999,
        "longitude": -72.4855788
      },
      "pickupLocationName": "Town Office",
      "pickupNotes": "Bags available at Town Office and Dudley's Store, and East Montpelier Elementary. Drop off bags 9-3 at East Montpelier Elementary School. Free community lunch for all volunteers."
    }, {
      "pickupLocationAddress": "2915 US-2, East Montpelier, VT 05651",
      "pickupLocationCoordinates": {
        "latitude": 44.270687,
        "longitude": -72.487375
      },
      "pickupLocationName": "Dudley's Store",
      "pickupNotes": "Bags available at Town Office and Dudley's Store, and East Montpelier Elementary. Drop off bags 9-3 at East Montpelier Elementary School. Free community lunch for all volunteers."
    }, {
      "pickupLocationAddress": "665 Vincent Flats Rd, E. Montpelier, VT 05651",
      "pickupLocationCoordinates": {
        "latitude": 44.28661710000001,
        "longitude": -72.4953304
      },
      "pickupLocationName": "East Montpelier Elementary",
      "pickupNotes": "Bags available at Town Office and Dudley's Store, and East Montpelier Elementary. Drop off bags 9-3 at East Montpelier Elementary School. Free community lunch for all volunteers."
    }],
    "roadsideDropoffAllowed": false
  },
  "EDEN": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "EDEN",
    "pickupLocations": [{
      "pickupLocationAddress": "71 Old Schoolhouse Rd, Eden, VT 05653",
      "pickupLocationCoordinates": {
        "latitude": 44.7107993,
        "longitude": -72.5380709
      },
      "pickupLocationName": "Town Clerk's Office",
      "pickupNotes": "Bags available at the Town Clerk's Office.\nLeave bags along roadsides.  "
    }],
    "roadsideDropoffAllowed": true
  },
  "ELMORE": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "343 Beach Rd., Elmore, VT 05657",
      "dropoffLocationCoordinates": {
        "latitude": 44.5403375,
        "longitude": -72.5311737
      },
      "dropoffLocationName": "Elmore Town Garage"
    }],
    "name": "ELMORE",
    "pickupLocations": [{
      "pickupLocationAddress": "1208 Montpelier Morrisville Sthwy, Wolcott, VT 05680",
      "pickupLocationCoordinates": {
        "latitude": 44.54041230000001,
        "longitude": -72.5233362
      },
      "pickupLocationName": "Elmore Store",
      "pickupNotes": "Bags available at the Elmore Store. Bring\nfull bags to Town Garage, 8 to 4, on \nGreen Up Day."
    }],
    "roadsideDropoffAllowed": false
  },
  "ENOSBURG": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "ENOSBURG",
    "pickupLocations": [{
      "pickupLocationAddress": "239 Main St, Enosburg Falls, VT 05450",
      "pickupLocationCoordinates": {
        "latitude": 44.9061426,
        "longitude": -72.8059444
      },
      "pickupLocationName": "Town Clerk's Office",
      "pickupNotes": "Bags available at Town Clerk's Office.\nContact the town office to find out what\nto do with the bags after."
    }],
    "roadsideDropoffAllowed": true
  },
  "ESSEX": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "ESSEX",
    "pickupLocations": [{
      "pickupLocationAddress": "81 Main Street, Essex, VT",
      "pickupLocationCoordinates": {
        "latitude": 44.4938521,
        "longitude": -73.1049939
      },
      "pickupLocationName": "Town Clerk's Office",
      "pickupNotes": "Bags available at Town Clerk's Office.\nBring bags to the Town Common, the\nHighway Garage/Fire Station or the \nIndian Brook Reservoir."
    }, {
      "pickupLocationAddress": "2 Lincoln Street ? Essex Junction, Vermont 05452",
      "pickupLocationCoordinates": {
        "latitude": 44.4909246,
        "longitude": -73.1114632
      },
      "pickupLocationName": "Village Office",
      "pickupNotes": "Essex Junction\nPick up bags at Village Office. GU Day, pick\nup bags at 5 Corners 9-12. Leave\nbags along roadsides."
    }, {
      "pickupLocationAddress": "75 Maple Street\nEssex Junction, VT 05452",
      "pickupLocationCoordinates": {
        "latitude": 44.4864066,
        "longitude": -73.1022065
      },
      "pickupLocationName": "Parks & Rec",
      "pickupNotes": "Essex Junction\nPick up bags at Parks & Rec. office. GU Day, pick\nup bags at 5 Corners 9-12. Leave\nbags along roadsides."
    }, {
      "pickupLocationAddress": " 6 Lincoln Street, Essex Junction, Vermont 05452",
      "pickupLocationCoordinates": {
        "latitude": 44.4913652,
        "longitude": -73.11153999999999
      },
      "pickupLocationName": "Brownell Library",
      "pickupNotes": "Essex Junction\nPick up bags at Library. GU Day, pick\nup bags at 5 Corners 9-12. Leave\nbags along roadsides."
    }, {
      "pickupLocationAddress": "Intersection of Main, Lincoln, Pearl, Paark and Maple Streets, Essex Junction, VT 05452",
      "pickupLocationCoordinates": {
        "latitude": 44.4905402,
        "longitude": -73.1112742
      },
      "pickupLocationName": "5 Corners",
      "pickupNotes": "Essex Junction\nGU Day, pick\nup bags at 5 Corners 9-12. Leave\nbags along roadsides."
    }],
    "roadsideDropoffAllowed": true
  },
  "FAIRFAX": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "FAIRFAX",
    "pickupLocations": [{
      "pickupLocationAddress": "12 Buck Hollow Rd, Fairfax, VT 05454",
      "pickupLocationCoordinates": {
        "latitude": 44.7054985,
        "longitude": -73.0066198
      },
      "pickupLocationName": "Town Clerk's Office",
      "pickupNotes": "Bags available at Town Clerk's Office.\nContact the town office to find out what\nto do with the bags after."
    }],
    "roadsideDropoffAllowed": true
  },
  "FAIRFIELD": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "12 Gilbert Hill, Fairfield, VT 05445",
      "dropoffLocationCoordinates": {
        "latitude": 44.802999,
        "longitude": -72.93741899999999
      },
      "dropoffLocationName": "Fairfield Town Garage"
    }],
    "name": "FAIRFIELD",
    "pickupLocations": [{
      "pickupLocationAddress": "25 N Rd, Fairfield, VT 05455",
      "pickupLocationCoordinates": {
        "latitude": 44.8018669,
        "longitude": -72.9447133
      },
      "pickupLocationName": "Town Clerk's Office",
      "pickupNotes": "Bags available at Town Clerk's office.\nBring bags to the dumpster at the Town Garage."
    }],
    "roadsideDropoffAllowed": false
  },
  "FAIRLEE": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "55 Town Common Rd, Fairlee, VT 05045",
      "dropoffLocationCoordinates": {
        "latitude": 43.9081789,
        "longitude": -72.142603
      },
      "dropoffLocationName": "Fairlee Community Church"
    }],
    "name": "FAIRLEE",
    "pickupLocations": [{
      "pickupLocationAddress": "75 Town Common Rd, Fairlee, VT 05045",
      "pickupLocationCoordinates": {
        "latitude": 43.9083852,
        "longitude": -72.1423228
      },
      "pickupLocationName": "Town Clerk's Office",
      "pickupNotes": "Bags available week before Green Up at Town Clerk's Office. GU Day, volunteers meet at Fairlee Community Church at 10am. Bags can be dropped off at the Fairlee Comm. Church between 10 and 1 on GU Day. Refreshments provided."
    }],
    "roadsideDropoffAllowed": true
  },
  "FAIR_HAVEN": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Fair Haven, VT 05743",
      "dropoffLocationCoordinates": {
        "latitude": 43.593757,
        "longitude": -73.266501
      },
      "dropoffLocationName": "Village Green"
    }],
    "name": "FAIR HAVEN",
    "pickupLocations": [{
      "pickupLocationAddress": "Fair Haven, VT 05743",
      "pickupLocationCoordinates": {
        "latitude": 43.593757,
        "longitude": -73.266501
      },
      "pickupLocationName": "Village Green",
      "pickupNotes": "Bags are distributed on Green Up Day at the north end of of the Town Green from\n8-12. Bags can be left along the roadsides or returned to the Town Green."
    }],
    "roadsideDropoffAllowed": true
  },
  "FAYSTON": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "FAYSTON",
    "pickupLocations": [{
      "pickupLocationAddress": "",
      "pickupLocationName": "",
      "pickupNotes": "Green Up bags placed at street intersections a few days prior to\nGU Day. Leave full bags on roadsides, please do not take them to the transfer station. Last bag pick up is Monday morning by the road crew."
    }],
    "roadsideDropoffAllowed": true
  },
  "FERDINAND": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "Ferdinand",
    "pickupLocations": [{
      "pickupLocationAddress": "",
      "pickupLocationName": "",
      "pickupNotes": "Coordinating the towns of\nAverill, Avery's Gore, Lewis,\nFerdinand, Warren Gore,\nWarner's Grant. Bags available at the UTG Office. Bring bags to UTG Office."
    }],
    "roadsideDropoffAllowed": true
  },
  "FERRISBURGH": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Th 33, Ferrisburg, VT 05456",
      "dropoffLocationCoordinates": {
        "latitude": 44.2050042,
        "longitude": -73.2503356
      },
      "dropoffLocationName": "Ferrisburgh Town Garage"
    }],
    "name": "FERRISBURGH",
    "pickupLocations": [{
      "pickupLocationAddress": "3279 US-7, Ferrisburgh, VT 05456",
      "pickupLocationCoordinates": {
        "latitude": 44.20781299999999,
        "longitude": -73.245705
      },
      "pickupLocationName": "Town Clerk's Office",
      "pickupNotes": "Bags available at Town Clerk's Office\nprior to GU Day or at the Ferrisburgh Central School from 9-10am on Green Up Day. Drop off bags across from the Town Garage from 10am-4pm Green Up Day only. Drop off site will be monitored."
    }, {
      "pickupLocationAddress": "56 Little Chicago Rd, Ferrisburgh, VT 05456",
      "pickupLocationCoordinates": {
        "latitude": 44.206608,
        "longitude": -73.247734
      },
      "pickupLocationName": "Ferrisburgh Central School",
      "pickupNotes": "Bags available at Town Clerk's Office\nprior to GU Day or at the Ferrisburgh Central School from 9-10am on Green Up Day. Drop off bags across from the Town Garage from 10am-4pm Green Up Day only. Drop off site will be monitored."
    }],
    "roadsideDropoffAllowed": false
  },
  "FLETCHER": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "FLETCHER",
    "pickupLocations": [{
      "pickupLocationAddress": "33 Shaw Rd, Fletcher, VT 05444",
      "pickupLocationCoordinates": {
        "latitude": 44.6752232,
        "longitude": -72.9235411
      },
      "pickupLocationName": "Town Clerk's Office",
      "pickupNotes": "Bags available at Town Clerk's Office.\nContact the town office to find out what\nto do with the bags after.\n"
    }],
    "roadsideDropoffAllowed": true
  },
  "FRANKLIN": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "5154 Main St, Franklin, VT 05457",
      "dropoffLocationCoordinates": {
        "latitude": 44.98144,
        "longitude": -72.915128
      },
      "dropoffLocationName": "Fire Station"
    }],
    "name": "FRANKLIN",
    "pickupLocations": [{
      "pickupLocationAddress": "5167 Main St, Franklin, VT 05457",
      "pickupLocationCoordinates": {
        "latitude": 44.9814999,
        "longitude": -72.9158025
      },
      "pickupLocationName": "Town Clerk's Office",
      "pickupNotes": "pick up bags at Town Clerk's Office\nor at school. Bring bags to Franklin Fire Station or leave bags at\nmajor intersections with State Highways.\nRoadside litter only, please no household trash or tires!"
    }],
    "roadsideDropoffAllowed": true
  },
  "GEORGIA": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "158 Morse Dr, Fairfax, VT 05454",
      "dropoffLocationCoordinates": {
        "latitude": 44.6973936,
        "longitude": -73.1032975
      },
      "dropoffLocationName": "Northwest Vt. Solid Waste Management"
    }],
    "name": "GEORGIA",
    "pickupLocations": [{
      "pickupLocationAddress": "47 Town Common Rd N, Georgia, VT 05478",
      "pickupLocationCoordinates": {
        "latitude": 44.729191,
        "longitude": -73.1167467
      },
      "pickupLocationName": "Town Hall",
      "pickupNotes": "Bags available at Town Hall. "
    }, {
      "pickupLocationAddress": "1697 Ethan Allen Hwy, Fairfax, VT 05454",
      "pickupLocationCoordinates": {
        "latitude": 44.703182,
        "longitude": -73.10530899999999
      },
      "pickupLocationName": "Library",
      "pickupNotes": "Bags available at Library. "
    }, {
      "pickupLocationAddress": "962 Ethan Allen Hwy, Georgia, VT 05454",
      "pickupLocationCoordinates": {
        "latitude": 44.6927785,
        "longitude": -73.1078966
      },
      "pickupLocationName": "Georgia Market",
      "pickupNotes": "Bags available at Georgia Market. We encourage volunteers to bring bags to Northwest Solid Waste District at 158 Morse Dr., off Skunk Hill Rd. near Exit 18. The town will be able to pick up roadside  bags but please consider completing your volunteer effort if at all possible by bringing bags to NWSWD."
    }],
    "roadsideDropoffAllowed": true
  },
  "GLOVER": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "1600 Dry Pond Rd, Glover, VT 05839",
      "dropoffLocationCoordinates": {
        "latitude": 44.6651547,
        "longitude": -72.1939671
      },
      "dropoffLocationName": "Town Garage"
    }],
    "name": "GLOVER",
    "pickupLocations": [{
      "pickupLocationAddress": "51 Bean Hill Rd, Glover, VT 05839",
      "pickupLocationCoordinates": {
        "latitude": 44.70702,
        "longitude": -72.188042
      },
      "pickupLocationName": "Town Clerk's Office",
      "pickupNotes": "pick up bags at the Town Clerk, Currier's Market, Parker Pie or Recycling Center. Bring  bags to Town Garage or if leaving bags on roadsides contact Richard for pick up."
    }],
    "roadsideDropoffAllowed": true
  },
  "GOSHEN": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "GOSHEN",
    "pickupLocations": [{
      "pickupLocationAddress": "",
      "pickupLocationName": "",
      "pickupNotes": "Green Up Day BBQ for all volunteers\n12-2pm. Leave bags along roadsides."
    }],
    "roadsideDropoffAllowed": true
  },
  "GRAFTON": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "778 VT-121, Grafton, VT 05146",
      "dropoffLocationCoordinates": {
        "latitude": 43.17429000000001,
        "longitude": -72.594803
      },
      "dropoffLocationName": "Town Garage"
    }],
    "name": "GRAFTON",
    "pickupLocations": [{
      "pickupLocationAddress": "117 Main St, Grafton, VT 05146",
      "pickupLocationCoordinates": {
        "latitude": 43.17266739999999,
        "longitude": -72.6083779
      },
      "pickupLocationName": "Town Office",
      "pickupNotes": "Bags can be picked up at the Town Office and then brought to the Town Garage where we have dumpster and ice cream for volunteers."
    }],
    "roadsideDropoffAllowed": true
  },
  "GRANBY": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "9005 Granby Rd., Granby, VT 05840",
      "dropoffLocationCoordinates": {
        "latitude": 44.5699963,
        "longitude": -71.75835479999999
      },
      "dropoffLocationName": "Granby Town Office"
    }],
    "name": "GRANBY",
    "pickupLocations": [{
      "pickupLocationAddress": "",
      "pickupLocationName": "",
      "pickupNotes": "Meet at the Bunnell's at 9am. Hot Dogs,\nchips,and cookies will be at the town hall\nat Noon for any that help."
    }],
    "roadsideDropoffAllowed": false
  },
  "GRAND_ISLE": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "GRAND ISLE",
    "pickupLocations": [{
      "pickupLocationAddress": "9 Hyde Rd, Grand Isle, VT 05458",
      "pickupLocationCoordinates": {
        "latitude": 44.72213199999999,
        "longitude": -73.295247
      },
      "pickupLocationName": "Town Clerk's Office",
      "pickupNotes": "Bags are available at the Town Office prior to GUD. "
    }, {
      "pickupLocationAddress": "22 Hanson Lane, Grand Isle, VT 05458",
      "pickupLocationCoordinates": {
        "latitude": 44.682533,
        "longitude": -73.326019
      },
      "pickupLocationName": "Transfer Station",
      "pickupNotes": "Bags are available at the Transfer Station prior to GUD. "
    }, {
      "pickupLocationAddress": "1 Donaldson RoadGrand Isle, Vermont 05458",
      "pickupLocationCoordinates": {
        "latitude": 44.6922577,
        "longitude": -73.3002861
      },
      "pickupLocationName": "Donaldson Park",
      "pickupNotes": "On GUD go to Donaldson Park beginning at\n8am. Come back to the park beginning at\n11am for a BBQ sponsored by Rec. Committee Selectboard. Leave bags on roadsides or bring  town truck on site. Let's Go Green!"
    }],
    "roadsideDropoffAllowed": true
  },
  "GRANVILLE": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "82 Post Office Hill Road\nGranville, Vermont 05747",
      "dropoffLocationCoordinates": {
        "latitude": 43.9849061,
        "longitude": -72.8464085
      },
      "dropoffLocationName": "Moss Glen Grange Hall"
    }],
    "name": "GRANVILLE",
    "pickupLocations": [{
      "pickupLocationAddress": "82 Post Office Hill Road\nGranville, Vermont 05747",
      "pickupLocationCoordinates": {
        "latitude": 43.9849061,
        "longitude": -72.8464085
      },
      "pickupLocationName": "Moss Glen Grange Hall",
      "pickupNotes": "Anyone participating should check-in at the\nMoss Glen Grange Hall. Bags and items\ncollected should be brought to the same\nlocation for collection by our local solid\nwaste contractor to collect."
    }],
    "roadsideDropoffAllowed": true
  },
  "GREENSBORO": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "81 Lauredon Ave, Greensboro, VT 05841",
      "dropoffLocationCoordinates": {
        "latitude": 44.579344,
        "longitude": -72.2953272
      },
      "dropoffLocationName": "Recycling Center"
    }],
    "name": "GREENSBORO",
    "pickupLocations": [{
      "pickupLocationAddress": "81 Lauredon Ave, Greensboro, VT 05841",
      "pickupLocationCoordinates": {
        "latitude": 44.579344,
        "longitude": -72.2953272
      },
      "pickupLocationName": "Town Clerk's Office",
      "pickupNotes": "Bags available at the Town Clerk's Office.\nBring bags to the Recycling Center behind\nTown Hall."
    }],
    "roadsideDropoffAllowed": true
  },
  "GROTON": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "1476 Scott Highway, Groton, VT 05046",
      "dropoffLocationCoordinates": {
        "latitude": 44.2115517,
        "longitude": -72.1973407
      },
      "dropoffLocationName": "Groton Town Office"
    }],
    "name": "GROTON",
    "pickupLocations": [{
      "pickupLocationAddress": "1476 Scott Hwy, Groton, VT 05046",
      "pickupLocationCoordinates": {
        "latitude": 44.2115517,
        "longitude": -72.1973407
      },
      "pickupLocationName": "Town Hall",
      "pickupNotes": "Bags available a week ahead, and a week after in case of bad weather, available at the Town Hall and the Library. Bring full bags to the Town Hall parking lot for pick up."
    }, {
      "pickupLocationAddress": "1304 Scott Hwy, Groton, VT 05046",
      "pickupLocationCoordinates": {
        "latitude": 44.2104448,
        "longitude": -72.1942387
      },
      "pickupLocationName": "Library",
      "pickupNotes": "Bags available a week ahead, and a week after in case of bad weather, available at the Town Hall and the Library. Bring full bags to the Town Hall parking lot for pick up."
    }],
    "roadsideDropoffAllowed": false
  },
  "GUILDHALL": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "13 Courthouse Dr., Guildhall, VT 05905",
      "dropoffLocationCoordinates": {
        "latitude": 44.5650017,
        "longitude": -71.56205
      },
      "dropoffLocationName": "Guildhall Town Office"
    }],
    "name": "GUILDHALL",
    "pickupLocations": [{
      "pickupLocationAddress": "13 Courthouse Drive \nGuildhall, Vermont 05905",
      "pickupLocationCoordinates": {
        "latitude": 44.5650017,
        "longitude": -71.56205
      },
      "pickupLocationName": "Town Clerk's Office",
      "pickupNotes": "Bags available at Town Clerk's Office.\nBring bags back to Town Office."
    }],
    "roadsideDropoffAllowed": false
  },
  "GUILFORD": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "3940 Guilford Center Rd, Guilford, VT 05301",
      "dropoffLocationCoordinates": {
        "latitude": 42.79366599999999,
        "longitude": -72.624535
      },
      "dropoffLocationName": "Broad Brook Grange"
    }],
    "name": "GUILFORD",
    "pickupLocations": [{
      "pickupLocationAddress": "3940 Guilford Center Rd, Guilford, VT 05301",
      "pickupLocationCoordinates": {
        "latitude": 42.79366599999999,
        "longitude": -72.624535
      },
      "pickupLocationName": "Broad Brook Grange",
      "pickupNotes": "Broad Brook Grange 8:00-5:00, bags\navailable, sign in. Bring full bags to Grange \nuntil 5. No tires accepted.  Refreshments all day."
    }],
    "roadsideDropoffAllowed": true
  },
  "HALIFAX": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "246 Branch Rd, West Halifax, VT 05358",
      "dropoffLocationCoordinates": {
        "latitude": 42.784431,
        "longitude": -72.768503
      },
      "dropoffLocationName": "Halifax West School"
    }],
    "name": "HALIFAX",
    "pickupLocations": [{
      "pickupLocationAddress": "246 Branch Rd, West Halifax, VT 05358",
      "pickupLocationCoordinates": {
        "latitude": 42.784431,
        "longitude": -72.768503
      },
      "pickupLocationName": "Town Clerk's Office",
      "pickupNotes": "Bags available at Town Clerk's Office\nprior to GU Day, or 10-12 at the Halifax\nSchool on GU Day. Bring full bags back to\nthe rear parking lot of the school. Refreshments served."
    }],
    "roadsideDropoffAllowed": true
  },
  "HANCOCK": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "1091 Route 100, Hancock, VT 05748",
      "dropoffLocationCoordinates": {
        "latitude": 43.9247787,
        "longitude": -72.84061129999999
      },
      "dropoffLocationName": "Hancock Town Hall"
    }],
    "name": "HANCOCK",
    "pickupLocations": [{
      "pickupLocationAddress": "1091 VT-100, Hancock, VT 05748",
      "pickupLocationCoordinates": {
        "latitude": 43.9247787,
        "longitude": -72.84061129999999
      },
      "pickupLocationName": "Hancock Town Hall ",
      "pickupNotes": "Meet at Hancock Town Hall at 9 to\nget assignments. Bring bags back at \n12 to town hall. Bring gloves/rake.\nLunch served at 12."
    }],
    "roadsideDropoffAllowed": false
  },
  "HARDWICK": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "333 Wolcott St., Hardwick, VT 05843",
      "dropoffLocationCoordinates": {
        "latitude": 44.507867,
        "longitude": -72.371869
      },
      "dropoffLocationName": "Hardwick Fire Dept"
    }],
    "name": "HARDWICK",
    "pickupLocations": [{
      "pickupLocationAddress": "20 Church St, Hardwick, VT 05843",
      "pickupLocationCoordinates": {
        "latitude": 44.5055225,
        "longitude": -72.3647539
      },
      "pickupLocationName": "Town Office",
      "pickupNotes": "pick up bags at Town Office and Gagnon's Video before Green Up Day and at the drop off site on GU Day. Drop off trash at Town Fire Station 9-3."
    }, {
      "pickupLocationAddress": "28 Mill St, Hardwick, VT 05843",
      "pickupLocationCoordinates": {
        "latitude": 44.5042688,
        "longitude": -72.3657405
      },
      "pickupLocationName": "Gagnon's Video",
      "pickupNotes": "pick up bags at Town Office and Gagnon's Video before Green Up Day and at the drop off site on GU Day. Drop off trash at Town Fire Station 9-3."
    }],
    "roadsideDropoffAllowed": false
  },
  "HARTFORD": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "2590 N. Hartland Rd., White River Jct., VT 05001",
      "dropoffLocationCoordinates": {
        "latitude": 43.617477,
        "longitude": -72.353729
      },
      "dropoffLocationName": "Hartford Recycling Center"
    }],
    "name": "HARTFORD",
    "pickupLocations": [{
      "pickupLocationAddress": "171 Bridge Street\nWhite River Junction, VT 05001",
      "pickupLocationCoordinates": {
        "latitude": 43.6509268,
        "longitude": -72.3171613
      },
      "pickupLocationName": "Hartford Municipal Building",
      "pickupNotes": "Bags available at the Hartford Mun. \nBuilding M-F 8-5. On GU Day meet\nat 9am at Mun. Building for \nConservation Comm. Clean up project.\nBring bags to Municipal Bldg., Quechee\nGreen or Hartford Recycling Center."
    }],
    "roadsideDropoffAllowed": false
  },
  "HARTLAND": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "57 VT Route 12, Hartland, VT 05048",
      "dropoffLocationCoordinates": {
        "latitude": 43.5446859,
        "longitude": -72.4078021
      },
      "dropoffLocationName": "Hartland Fire Station"
    }],
    "name": "HARTLAND",
    "pickupLocations": [{
      "pickupLocationAddress": "57 VT Route 12, Hartland, VT 05048",
      "pickupLocationCoordinates": {
        "latitude": 43.5446859,
        "longitude": -72.4078021
      },
      "pickupLocationName": "Hartland Fire Station",
      "pickupNotes": "Bags may be picked up at Damon Hall\nprior to GU Day or at 8am at 3 Corners\nFire Station on GU Day. Free lunch at 11:30 at Damon Hall. Return full bags\nto Fire Station. Recycle containers\navailable. Conservation Comm. hosts a\nwriting contest."
    }],
    "roadsideDropoffAllowed": false
  },
  "HIGHGATE": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "2996 VT-78, Highgate Center, VT 05459",
      "dropoffLocationCoordinates": {
        "latitude": 44.9379157,
        "longitude": -73.04687609999999
      },
      "dropoffLocationName": "Town Clerk's Office"
    }],
    "name": "HIGHGATE",
    "pickupLocations": [{
      "pickupLocationAddress": "2996 VT-78, Highgate Center, VT 05459",
      "pickupLocationCoordinates": {
        "latitude": 44.9379157,
        "longitude": -73.04687609999999
      },
      "pickupLocationName": "Town Clerk's Office",
      "pickupNotes": "Bags available at Town Clerk's Office or \nfrom coordinator. Full bags can be left along  roadsides or brought back to the Town Office."
    }],
    "roadsideDropoffAllowed": true
  },
  "HINESBURG": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "907 Beecher Hill Rd, Hinesburg, VT 05461",
      "dropoffLocationCoordinates": {
        "latitude": 44.32071699999999,
        "longitude": -73.07511099999999
      },
      "dropoffLocationName": "Town Garage"
    }],
    "name": "HINESBURG",
    "pickupLocations": [{
      "pickupLocationAddress": "10632 VT Route 116\nHinesburg VT 05461",
      "pickupLocationCoordinates": {
        "latitude": 44.3292595,
        "longitude": -73.11071729999999
      },
      "pickupLocationName": "Town Hall",
      "pickupNotes": "pick up bags up to 10 days early at Town\nHall.  Mark\nmap where you plan to Green Up. Town\nHall is open on GUD 8-2 to sign up and\nget bags. "
    }, {
      "pickupLocationAddress": "69 Ballards Corner Rd, Hinesburg, VT 05461",
      "pickupLocationCoordinates": {
        "latitude": 44.3416198,
        "longitude": -73.1185895
      },
      "pickupLocationName": "Carpenter Carse Library",
      "pickupNotes": "pick up bags up to 10 days early at Carpenter Carse Library. Mark\nmap where you plan to Green Up. Leave along roadsides or bring\nto Town Garage next to CCSD Trans.\nStation on GUD 8-3:30. Community BBQ\nat Town Hall 12:00-1:00 on GUD."
    }],
    "roadsideDropoffAllowed": true
  },
  "HOLLAND": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "26 School Rd, Derby Line, VT 05830",
      "dropoffLocationCoordinates": {
        "latitude": 44.9730783,
        "longitude": -72.0133074
      },
      "dropoffLocationName": "Holland School"
    }],
    "name": "HOLLAND",
    "pickupLocations": [{
      "pickupLocationAddress": "120 School Road Holland, VT 05830",
      "pickupLocationCoordinates": {
        "latitude": 44.9744277,
        "longitude": -72.0136059
      },
      "pickupLocationName": "Town Clerk's Office",
      "pickupNotes": "pick up bags at Town Clerk's Office.\nBring bags to the Holland School.\n"
    }],
    "roadsideDropoffAllowed": true
  },
  "HUBBARDTON": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "HUBBARDTON",
    "pickupLocations": [{
      "pickupLocationAddress": "1831 Monument Hill Rd, Castleton, VT 05735",
      "pickupLocationCoordinates": {
        "latitude": 43.7175765,
        "longitude": -73.15878200000002
      },
      "pickupLocationName": "Town Clerk's Office",
      "pickupNotes": "pick up bags at Town Clerk's Office,\nTown Garage. Drop off at Town Hall on Monument Hill or Leave on roadsides at intersections.\nAll bags will be picked up Monday AM by the Hubbardton Highway Dept."
    }],
    "roadsideDropoffAllowed": true
  },
  "HUNTINGTON": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "4930 Main Rd., Huntington, VT 05462",
      "dropoffLocationCoordinates": {
        "latitude": 44.295249,
        "longitude": -72.966302
      },
      "dropoffLocationName": "Huntington Town Garage"
    }],
    "name": "HUNTINGTON",
    "pickupLocations": [{
      "pickupLocationAddress": "4930 Main Rd, Huntington, VT 05462",
      "pickupLocationCoordinates": {
        "latitude": 44.295249,
        "longitude": -72.966302
      },
      "pickupLocationName": "Town Clerk's Office",
      "pickupNotes": "Get bags early and sign up for specific\nroads at the Town Clerk's Office. Bring\nbags to the Town Garage on GUD \n8:30-1:30pm. Boy Scouts available to make assignments, pass out bags and help unload. Refreshments provided, courtesy of Huntington Selectboard. Coffee  compliments of Beaudry's Store."
    }],
    "roadsideDropoffAllowed": false
  },
  "HYDE_PARK": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "HYDE PARK",
    "pickupLocations": [{
      "pickupLocationAddress": "344 VT-15, Hyde Park, VT 05655",
      "pickupLocationCoordinates": {
        "latitude": 44.598595,
        "longitude": -72.622581
      },
      "pickupLocationName": "Town Office",
      "pickupNotes": "Bags available the week prior at Town\nOffice and also in the outside hallway on Green Up Day. Leave bags\nalong town road for pick up."
    }],
    "roadsideDropoffAllowed": true
  },
  "IRA": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "IRA",
    "pickupLocations": [{
      "pickupLocationAddress": "51 W Rd, West Rutland, VT 05777",
      "pickupLocationCoordinates": {
        "latitude": 43.5347292,
        "longitude": -73.0656588
      },
      "pickupLocationName": "Town Clerk's Office",
      "pickupNotes": "Bags available at the Town Clerk's Office.\nLeave bags along roadsides.  "
    }],
    "roadsideDropoffAllowed": true
  },
  "IRASBURG": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "IRASBURG",
    "pickupLocations": [{
      "pickupLocationAddress": "161 VT-58, Irasburg, VT 05845",
      "pickupLocationCoordinates": {
        "latitude": 44.803698,
        "longitude": -72.276303
      },
      "pickupLocationName": "Town Clerk's Office",
      "pickupNotes": "Bags can be picked up at the Town Clerk's Office prior to Green Up Day and bags can be left along roadsides for pick up or piled\nnext to the Town Garage."
    }],
    "roadsideDropoffAllowed": true
  },
  "ISLE_LA_MOTTE": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "ISLE LA MOTTE",
    "pickupLocations": [{
      "pickupLocationAddress": "42 School St, Isle La Motte, VT 05463",
      "pickupLocationCoordinates": {
        "latitude": 44.88242,
        "longitude": -73.345398
      },
      "pickupLocationName": "Isle La Motte School",
      "pickupNotes": "Meet at Isle La Motte School at 8:30am for road assignments, bags, gloves, safety vests, water and pick up sticks. Bags and other trash can be left on roadsides. Lunch served at 11:30am at the Isle La Motte Church, 67 Church Street."
    }],
    "roadsideDropoffAllowed": true
  },
  "JAMAICA": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "141 Castle Hill Rd, Jamaica, VT 05343",
      "dropoffLocationCoordinates": {
        "latitude": 43.095016,
        "longitude": -72.785439
      },
      "dropoffLocationName": "Transfer Station"
    }],
    "name": "JAMAICA",
    "pickupLocations": [{
      "pickupLocationAddress": "17 Pikes Falls Rd, Jamaica, VT 05343",
      "pickupLocationCoordinates": {
        "latitude": 43.0984051,
        "longitude": -72.7812325
      },
      "pickupLocationName": "Town Office",
      "pickupNotes": "Bags available at the Town Office and Transfer Station before\nand after GU Day. Bring bags to the Transfer Station from 8 to 4 on Green Up Day."
    }],
    "roadsideDropoffAllowed": true
  },
  "JAY": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "1036 VT-242, Jay, VT 05859",
      "dropoffLocationCoordinates": {
        "latitude": 44.9472848,
        "longitude": -72.4411758
      },
      "dropoffLocationName": "Town Hall"
    }],
    "name": "JAY",
    "pickupLocations": [{
      "pickupLocationAddress": "1036 VT-242, Jay, VT 05859",
      "pickupLocationCoordinates": {
        "latitude": 44.9472848,
        "longitude": -72.4411758
      },
      "pickupLocationName": "Town Hall",
      "pickupNotes": "pick up bags at 8am at Jay Town Hall. Please separate trash from recyclables from redeemables. Enjoy muffins, juice, coffee and  conversation before you head out. To volunteer or \"claim your area\" call Sally.  Leave bags on roadsides or bring to \nJay Town Hall."
    }],
    "roadsideDropoffAllowed": true
  },
  "JERICHO": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "510 Brown's Trace Rd., Jericho, VT 05465",
      "dropoffLocationCoordinates": {
        "latitude": 44.4544823,
        "longitude": -72.97048529999999
      },
      "dropoffLocationName": "Jericho Highway Dept"
    }],
    "name": "JERICHO",
    "pickupLocations": [{
      "pickupLocationAddress": "67 VT-15, Jericho, VT 05465",
      "pickupLocationCoordinates": {
        "latitude": 44.506133,
        "longitude": -72.9953567
      },
      "pickupLocationName": "Town Hall",
      "pickupNotes": "pick up bags and sign up for a road at \nTown Hall. "
    }, {
      "pickupLocationAddress": "25 Jericho Center Cir, Jericho, VT 05465",
      "pickupLocationCoordinates": {
        "latitude": 44.4699714,
        "longitude": -72.9732587
      },
      "pickupLocationName": "Jericho Country Store",
      "pickupNotes": "pick up bags and sign up for a road at Jericho Country Store. Drop in for GU Breakfast 8:30-10:30 on GU Day at Comm. Center. Bring full bags to Town Garage from 10-2 on GU Day."
    }],
    "roadsideDropoffAllowed": false
  },
  "JOHNSON": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "53 Lower Main St E, Johhson, VT 05656",
      "dropoffLocationCoordinates": {
        "latitude": 44.635295,
        "longitude": -72.677939
      },
      "dropoffLocationName": "Johnson Town Green"
    }],
    "name": "JOHNSON",
    "pickupLocations": [{
      "pickupLocationAddress": "293 Lower Main St W, Johnson, VT 05656",
      "pickupLocationCoordinates": {
        "latitude": 44.63618,
        "longitude": -72.684743
      },
      "pickupLocationName": "Town Office",
      "pickupNotes": "Green Up bags available at Town Office leading up to GU Day. Bags are available at the Town Green from 8-2 on GU Day. Bring bags back to the Town Green by 1pm."
    }, {
      "pickupLocationAddress": "53 Lower Main St E, Johhson, VT 05656",
      "pickupLocationCoordinates": {
        "latitude": 44.635295,
        "longitude": -72.677939
      },
      "pickupLocationName": "Johnson Town Green",
      "pickupNotes": "Green Up bags available at Town Office leading up to GU Day. Bags are available at the Town Green from 8-2 on GU Day. Bring bags back to the Town Green by 1pm."
    }],
    "roadsideDropoffAllowed": false
  },
  "KILLINGTON": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "2981 River Road, Killington, VT 05751",
      "dropoffLocationCoordinates": {
        "latitude": 43.67223,
        "longitude": -72.775558
      },
      "dropoffLocationName": "Transfer Station"
    }],
    "name": "KILLINGTON",
    "pickupLocations": [{
      "pickupLocationAddress": "2706 River Rd, Killington, VT 05751",
      "pickupLocationCoordinates": {
        "latitude": 43.675102,
        "longitude": -72.779701
      },
      "pickupLocationName": "Town Clerk's Office",
      "pickupNotes": "Bags available at the Town Clerk's Office.\nBring bags to the River Rd. Transfer Stat.\nBBQ for volunteers at the Killngton Rd. Firehouse."
    }],
    "roadsideDropoffAllowed": true
  },
  "KIRBY": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leaves on roadsides.",
      "dropoffLocationName": ""
    }],
    "name": "KIRBY",
    "pickupLocations": [{
      "pickupLocationAddress": "346 Town Hall Road\nKirby, VT 05851",
      "pickupLocationCoordinates": {
        "latitude": 44.5222438,
        "longitude": -71.9380833
      },
      "pickupLocationName": "Town Office",
      "pickupNotes": "Green Up bags can be picked up at the Town Office the week prior to Green Up Day during regular office hours. Filled bags can be dropped off prior to 1pm at the Town Transfer Station or left along roadsides."
    }],
    "roadsideDropoffAllowed": true
  },
  "LANDGROVE": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "88 Landgrove Road, Landgrove, VT  05148",
      "dropoffLocationCoordinates": {
        "latitude": 43.2662959,
        "longitude": -72.85734599999999
      },
      "dropoffLocationName": "Town Hall"
    }],
    "name": "LANDGROVE",
    "pickupLocations": [{
      "pickupLocationAddress": "88 Landgrove Road, Landgrove, VT 05148",
      "pickupLocationCoordinates": {
        "latitude": 43.2662959,
        "longitude": -72.85734599999999
      },
      "pickupLocationName": "Town Hall",
      "pickupNotes": "Gather at Town Hall at 9am on the First Saturday in May to get road assignments, bags and donuts. Collected trash can be brought to Town Hall or left on roadsides."
    }],
    "roadsideDropoffAllowed": true
  },
  "LEICESTER": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "LEICESTER",
    "pickupLocations": [{
      "pickupLocationAddress": "",
      "pickupLocationName": "",
      "pickupNotes": "Cookout and Raffle Prizes. \nEncouraging pellet stove owners to reuse their pellet bags for GU Day. Leave bags\non roadsides or bring to Town Garage on\nFern Lake Rd."
    }],
    "roadsideDropoffAllowed": true
  },
  "LEWIS": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "LEWIS",
    "pickupLocations": [{
      "pickupLocationAddress": "",
      "pickupLocationName": "",
      "pickupNotes": "Coordinating the towns of\nAverill, Avery's Gore, Lewis,\nFerdinand, Warren Gore,\nWarner's Grant. Bags available at the UTG Office. Bring bags to UTG Office."
    }],
    "roadsideDropoffAllowed": true
  },
  "LINCOLN": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "34 Gove Hill Rd, Lincoln, VT 05443",
      "dropoffLocationCoordinates": {
        "latitude": 44.1052136,
        "longitude": -72.9970561
      },
      "dropoffLocationName": "Lincoln Fire Dept"
    }],
    "name": "LINCOLN",
    "pickupLocations": [{
      "pickupLocationAddress": "34 Gove Hill Rd, Lincoln, VT 05443",
      "pickupLocationCoordinates": {
        "latitude": 44.1052136,
        "longitude": -72.9970561
      },
      "pickupLocationName": "Lincoln Fire Dept",
      "pickupNotes": "8am - 11am pick up bags, get road assignment; 11am - 1pm drop off bags, enjoy picnic lunch, try your luck at popular raffle table and a Kids Only raffle. 12:30 Raffle Winners picked. MUST BE PRESENT TO WIN. LOCATION: Lincoln Fire Dept."
    }],
    "roadsideDropoffAllowed": false
  },
  "LONDONDERRY": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "60 Main St., South Londondrry, VT 05155",
      "dropoffLocationCoordinates": {
        "latitude": 43.1920058,
        "longitude": -72.8143673
      },
      "dropoffLocationName": "South Londonderry Fire Station"
    }],
    "name": "LONDONDERRY",
    "pickupLocations": [{
      "pickupLocationAddress": "100 Old School Rd, South Londonderry, VT 05155",
      "pickupLocationCoordinates": {
        "latitude": 43.190544,
        "longitude": -72.81057
      },
      "pickupLocationName": "Town Office",
      "pickupNotes": "pick up bags at People's Bank, Clark's IGA, Town Office, Transfer Station a week in advance.  Drop off on day of event to town trucks at Mill Parking Area, South Londonderry Fire Station, or the Transfer Station."
    }],
    "roadsideDropoffAllowed": false
  },
  "LOWELL": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "LOWELL",
    "pickupLocations": [{
      "pickupLocationAddress": "2170 VT Rte 100 Lowell, VT05847",
      "pickupLocationCoordinates": {
        "latitude": 44.806247,
        "longitude": -72.448179
      },
      "pickupLocationName": "Town Clerk's Office",
      "pickupNotes": "Bags are available at the Town Clerk's\nOffice and the School. Bring bags to\ndumpster at Town Clerk's Office Wed or Leave on roadsides at intersections. \nbefore through the following Wednesday\nafter GU Day."
    }],
    "roadsideDropoffAllowed": true
  },
  "LUDLOW": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "RR 100, Ludlow, VT 05149",
      "dropoffLocationCoordinates": {
        "latitude": 43.3958564,
        "longitude": -72.70052559999999
      },
      "dropoffLocationName": "Transfer Station"
    }],
    "name": "LUDLOW",
    "pickupLocations": [{
      "pickupLocationAddress": "37 Main St, Ludlow, Vermont 05149",
      "pickupLocationCoordinates": {
        "latitude": 43.3970512,
        "longitude": -72.6872705
      },
      "pickupLocationName": "Community Center",
      "pickupNotes": "Volunteers meet at 9:30 at Ludlow Comm.\nCenter in the morning for coffee and\ndonuts. Afternoon BBQ for all volunteers.\nLet coordinator know what roadsides you\nwill be leaving bags on or bring to the\nTransfer Station."
    }],
    "roadsideDropoffAllowed": true
  },
  "LUNENBURG": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "47 Transfer Station, Lunenburg, VT 05906",
      "dropoffLocationCoordinates": {
        "latitude": 44.461368,
        "longitude": -71.6632209
      },
      "dropoffLocationName": "Transfer Station"
    }],
    "name": "LUNENBURG",
    "pickupLocations": [{
      "pickupLocationAddress": "9 W Main St, Lunenburg, VT 05906",
      "pickupLocationCoordinates": {
        "latitude": 44.462888,
        "longitude": -71.68267
      },
      "pickupLocationName": "Town Office",
      "pickupNotes": "pick up bags at the Town Office. Bring bags to Transfer Station or Leave on roadsides at intersections."
    }],
    "roadsideDropoffAllowed": true
  },
  "LYNDON": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "1192 Vt 122, Lyndon, VT 05851",
      "dropoffLocationCoordinates": {
        "latitude": 44.5532055,
        "longitude": -72.02880259999999
      },
      "dropoffLocationName": "Lyndon Town Office"
    }],
    "name": "LYNDON",
    "pickupLocations": [{
      "pickupLocationAddress": "1192 Vt 122, Lyndon, VT 05851",
      "pickupLocationCoordinates": {
        "latitude": 44.5532055,
        "longitude": -72.02880259999999
      },
      "pickupLocationName": "Lyndon Town Office",
      "pickupNotes": "Get bags early and sign up for routes at\nthe Municipal Offices prior to Green Up \nDay. Drop off bags at the large dumpster\nbehind the Municipal Offices on Saturday,\nMay 6th from 9-1pm. The Boy Scouts\nwill be on hand with refreshments and to\nhelp unload. Please do not leave bags on\nroadsides as there is no roadside pick up."
    }],
    "roadsideDropoffAllowed": false
  },
  "MAIDSTONE": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "MAIDSTONE",
    "pickupLocations": [{
      "pickupLocationAddress": "508 VT-102, Maidstone, VT 05905",
      "pickupLocationCoordinates": {
        "latitude": 44.5775298,
        "longitude": -71.5546478
      },
      "pickupLocationName": "Town Clerk's Office",
      "pickupNotes": "Bags available at Town Clerk's Office.\nLeave bags along Route 102 or roadside\nalong Lake Maidstone."
    }],
    "roadsideDropoffAllowed": true
  },
  "MANCHESTER": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "MANCHESTER",
    "pickupLocations": [{
      "pickupLocationAddress": "137 North St, Bennington, VT 05201",
      "pickupLocationCoordinates": {
        "latitude": 42.8795969,
        "longitude": -73.196877
      },
      "pickupLocationName": "VFW",
      "pickupNotes": "Meet at VFW GU Day morning for\nbags and assignments. Leave bags on\nroadsides."
    }],
    "roadsideDropoffAllowed": true
  },
  "MARLBORO": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "MARLBORO",
    "pickupLocations": [{
      "pickupLocationAddress": "510 South Road, Marlboro, VT 05344",
      "pickupLocationCoordinates": {
        "latitude": 42.85986339999999,
        "longitude": -72.7258997
      },
      "pickupLocationName": "Town Office",
      "pickupNotes": "Bags available at Town Office and \nElementary School. Town map in\nglass case outside Town Office, \nhighlight where you will GU.\nLeave bags along roadsides."
    }],
    "roadsideDropoffAllowed": true
  },
  "MARSHFIELD": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "122 School St. #1, Marshfield, VT 05658",
      "dropoffLocationCoordinates": {
        "latitude": 44.349356,
        "longitude": -72.355082
      },
      "dropoffLocationName": "Marshfield Town Garage"
    }],
    "name": "MARSHFIELD",
    "pickupLocations": [{
      "pickupLocationAddress": "122 School St # 1, Marshfield, VT 05658",
      "pickupLocationCoordinates": {
        "latitude": 44.349356,
        "longitude": -72.355082
      },
      "pickupLocationName": "Town Office",
      "pickupNotes": "Bags available at Town Office.\nBring bags to Town Garage on School \nStreet from 8am until Noon."
    }],
    "roadsideDropoffAllowed": false
  },
  "MENDON": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections",
      "dropoffLocationName": ""
    }],
    "name": "MENDON",
    "pickupLocations": [{
      "pickupLocationAddress": "2282 US-4, Mendon, VT 05701",
      "pickupLocationCoordinates": {
        "latitude": 43.6474382,
        "longitude": -72.9283871
      },
      "pickupLocationName": "Town Office",
      "pickupNotes": "Bags available at the Town Office. Bags can be left on the roadsides of any town highway. We welcome early participation the week before, as well as an ongoing effort throughout the year. If you see a problem area in Mendon that you want to clean up, contact the town office for assistance."
    }],
    "roadsideDropoffAllowed": true
  },
  "MIDDLEBURY": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "1020 South Route 7, Middlebury, VT 05753",
      "dropoffLocationCoordinates": {
        "latitude": 44.0099621,
        "longitude": -73.1699551
      },
      "dropoffLocationName": "Middlebury Public Works Building"
    }, {
      "dropoffLocationAddress": "298 Buttolph Dr, Middlebury, VT 05753",
      "dropoffLocationCoordinates": {
        "latitude": 44.0129355,
        "longitude": -73.1611338
      },
      "dropoffLocationName": "Middlebury Municipal Pool"
    }, {
      "dropoffLocationAddress": "50 Franklin Street Middlebury College Middlebury, VT 05753",
      "dropoffLocationCoordinates": {
        "latitude": 44.00825950000001,
        "longitude": -73.1773152
      },
      "dropoffLocationName": "Park across from Twilight Hall"
    }],
    "name": "MIDDLEBURY",
    "pickupLocations": [{
      "pickupLocationAddress": "77 Main St, Middlebury, VT 05753",
      "pickupLocationCoordinates": {
        "latitude": 44.01236309999999,
        "longitude": -73.1691677
      },
      "pickupLocationName": "Town Clerk's Office",
      "pickupNotes": "Bags available the Town Clerk's office. Filled bags can be dropped\noff 10-3 at town trucks located at 1) Parking\nLot by the town pool; 2) \"New\" park across\nfrom Twilight; 3) Town Public Works bldg\non Route 7."
    }],
    "roadsideDropoffAllowed": false
  },
  "MIDDLESEX": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Shady Rill Rd., Middlesex, VT 05602",
      "dropoffLocationCoordinates": {
        "latitude": 44.3428577,
        "longitude": -72.58830069999999
      },
      "dropoffLocationName": "Middlesex Town Garage"
    }],
    "name": "MIDDLESEX",
    "pickupLocations": [{
      "pickupLocationAddress": "5 Church St, Middlesex, VT 05602",
      "pickupLocationCoordinates": {
        "latitude": 44.292568,
        "longitude": -72.679512
      },
      "pickupLocationName": "Town Office",
      "pickupNotes": "Bags can be picked up at the Town Office \nand Rumney School. Do not leave bags on\nroadsides, please bring to the Town Garage\non Shady Rill Road between 9:00 and 3:00."
    }],
    "roadsideDropoffAllowed": false
  },
  "MIDDLETOWN_SPRINGS": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "8 Firehouse Lane, Middletown Springs, VT 05757",
      "dropoffLocationName": "Transfer Station"
    }],
    "name": "MIDDLETOWN SPRINGS",
    "pickupLocations": [{
      "pickupLocationAddress": "10 Park Ave, Middletown Springs, VT 05757",
      "pickupLocationCoordinates": {
        "latitude": 43.4861934,
        "longitude": -73.11801799999999
      },
      "pickupLocationName": "Town Clerk's Office",
      "pickupNotes": "pick up bags at the Town Green 8-12 \non GU Day or call the coordinator for bags to be delivered to your house. Drop off bags at Transfer Station. Refreshments provided."
    }],
    "roadsideDropoffAllowed": true
  },
  "MILTON": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections or take to \nTown Garage \n43 Bombardier Rd, Milton, VT 05468",
      "dropoffLocationName": "Town Garage"
    }],
    "name": "MILTON",
    "pickupLocations": [{
      "pickupLocationAddress": "43 Bombardier Rd.\nMilton, VT 05468",
      "pickupLocationCoordinates": {
        "latitude": 44.619045,
        "longitude": -73.1239631
      },
      "pickupLocationName": "Town Office",
      "pickupNotes": "Bags available prior to GU Day at \ntown office, limit 5 bags,. Bring bags to Town Garage or leave bags along roadsides."
    }, {
      "pickupLocationAddress": "43 Bombardier Rd.\nMilton, VT 05468",
      "pickupLocationCoordinates": {
        "latitude": 44.619045,
        "longitude": -73.1239631
      },
      "pickupLocationName": "Rec Park",
      "pickupNotes": "GU Day,\n8-12 sign up and bag distribution at Milton Rec Park on Middle Road. Cookout from Noon to 1pm. Bring bags to Town Garage or leave bags along roadsides."
    }],
    "roadsideDropoffAllowed": true
  },
  "MONKTON": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "4047 States Prison Rd, Monkton, VT 05469",
      "dropoffLocationCoordinates": {
        "latitude": 44.253113,
        "longitude": -73.119225
      },
      "dropoffLocationName": "Monkton Highway Dept"
    }],
    "name": "MONKTON",
    "pickupLocations": [{
      "pickupLocationAddress": "280 Monkton Ridge, North Ferrisburgh, VT 05473",
      "pickupLocationCoordinates": {
        "latitude": 44.253892,
        "longitude": -73.1241531
      },
      "pickupLocationName": "Town Hall",
      "pickupNotes": "Monkton Maples distribute bags at the Town Hall on GU Day. Take trash to Town\nGarage."
    }],
    "roadsideDropoffAllowed": false
  },
  "MONTGOMERY": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "MONTGOMERY",
    "pickupLocations": [{
      "pickupLocationAddress": "98 S Main St, Montgomery Center, VT 05471",
      "pickupLocationCoordinates": {
        "latitude": 44.8753195,
        "longitude": -72.6076585
      },
      "pickupLocationName": "Town Clerk's Office",
      "pickupNotes": "Bags available at Town Clerk's Office.\nLeave bags along roadsides.\n"
    }],
    "roadsideDropoffAllowed": true
  },
  "MONTPELIER": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "MONTPELIER",
    "pickupLocations": [{
      "pickupLocationAddress": "",
      "pickupLocationName": "",
      "pickupNotes": "Bags are picked up at our registration table at the Farmer's Market and full bags can be left curbside for the Dept. of Public Works to pick up."
    }],
    "roadsideDropoffAllowed": true
  },
  "MORETOWN": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "MORETOWN",
    "pickupLocations": [{
      "pickupLocationAddress": "",
      "pickupLocationName": "Town Clerk's Office",
      "pickupNotes": "Bags available at Town Clerk's Office.\nLeave along roadsides for pick up."
    }],
    "roadsideDropoffAllowed": true
  },
  "MORGAN": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "2042-, 2186 VT-111, Morgan, VT 05853",
      "dropoffLocationCoordinates": {
        "latitude": 44.8601904,
        "longitude": -71.93914579999999
      },
      "dropoffLocationName": "Transfer Station"
    }],
    "name": "MORGAN",
    "pickupLocations": [{
      "pickupLocationAddress": "8411 Vt Rt 111, Morgan, VT 05853",
      "pickupLocationCoordinates": {
        "latitude": 44.9131016,
        "longitude": -72.0145495
      },
      "pickupLocationName": "Morgan Country Store",
      "pickupNotes": "Bags available at the Morgan Country Store. Bring bags to the dump or contact Tammy if you can?t get there."
    }],
    "roadsideDropoffAllowed": true
  },
  "MORRISTOWN": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "MORRISTOWN",
    "pickupLocations": [{
      "pickupLocationAddress": "43 Portland St, Morrisville, VT 05661",
      "pickupLocationCoordinates": {
        "latitude": 44.5624068,
        "longitude": -72.5987823
      },
      "pickupLocationName": "Town Clerk's Office",
      "pickupNotes": "Bags available at the Town Clerk's Office.\nLeave full bags along roadsides for\npick up by the Morristown Hwy Dept."
    }],
    "roadsideDropoffAllowed": true
  },
  "MOUNT_HOLLY": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "MOUNT HOLLY",
    "pickupLocations": [{
      "pickupLocationAddress": "26 Maple Hill Rd, Mount Holly, VT 05758",
      "pickupLocationCoordinates": {
        "latitude": 43.4108701,
        "longitude": -72.81944899999999
      },
      "pickupLocationName": "Mount Holly Library",
      "pickupNotes": "Bags and road assignments are given out at the Mount Holly Library. Lunch for all volunteers at Belmont General Store. The Librarian visits the Elementary School with a basket of summer fun toys which children can sign up to win when they come to get their bags on Saturday morning. Leaves bags on roadsides, town crews will pick up Monday."
    }],
    "roadsideDropoffAllowed": true
  },
  "MOUNT_TABOR": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "MOUNT TABOR",
    "pickupLocations": [{
      "pickupLocationAddress": "522 Mt Tabor Rd, Mt Tabor, VT 05739",
      "pickupLocationCoordinates": {
        "latitude": 43.3502509,
        "longitude": -72.98326519999999
      },
      "pickupLocationName": "Town Clerk's Office",
      "pickupNotes": "Bags available at the Town Clerk's Office.\nBring bags to Mt. Tabor Transfer Station\nTues. 3-5pm and Sat. 9-2pm."
    }],
    "roadsideDropoffAllowed": false
  },
  "NEWARK": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "NEWARK",
    "pickupLocations": [{
      "pickupLocationAddress": "",
      "pickupLocationName": "",
      "pickupNotes": "Contact town coordinator for bags and information. Bags can be left on roadsides."
    }],
    "roadsideDropoffAllowed": true
  },
  "NEWBURY": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Main St (at Pulaski St), Newbury, VT 05051",
      "dropoffLocationCoordinates": {
        "latitude": 44.0781576,
        "longitude": -72.0585068
      },
      "dropoffLocationName": "Newbury Common"
    }],
    "name": "NEWBURY",
    "pickupLocations": [{
      "pickupLocationAddress": "4991 US-5, Newbury, VT 05051",
      "pickupLocationCoordinates": {
        "latitude": 44.0790666,
        "longitude": -72.05764769999999
      },
      "pickupLocationName": "Newbury Village Store",
      "pickupNotes": "Bags available from coordinators and also\navailable at the Newbury Village Store.\nBring bags to Newbury Common on Green\nUp Day. If there are items that are too large to handle please report them to the coordinator."
    }],
    "roadsideDropoffAllowed": false
  },
  "NEWFANE": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "NEWFANE",
    "pickupLocations": [{
      "pickupLocationAddress": "555 VT-30, Newfane, VT 05345",
      "pickupLocationCoordinates": {
        "latitude": 42.9838837,
        "longitude": -72.6562181
      },
      "pickupLocationName": "Town Office",
      "pickupNotes": "Bags are available at the Town Office and the Newfane Market. Full bags should be left visible on the side of the road for pick up early Monday morning by the road crew."
    }],
    "roadsideDropoffAllowed": true
  },
  "NEWPORT_CITY": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "155 Gardner Park Rd, Newport, VT 05855",
      "dropoffLocationCoordinates": {
        "latitude": 44.93890750000001,
        "longitude": -72.2025829
      },
      "dropoffLocationName": "Gardner Memorial Park"
    }],
    "name": "NEWPORT CITY",
    "pickupLocations": [{
      "pickupLocationAddress": "155 Gardner Park Rd, Newport, VT 05855",
      "pickupLocationCoordinates": {
        "latitude": 44.93890750000001,
        "longitude": -72.2025829
      },
      "pickupLocationName": "Gardner Memorial Park",
      "pickupNotes": "pick up bags and routes at 10am at\nthe Garnder Memorial Park skate shack.\nLight refreshments provided. Bring bags\nto Skate Shack in Gardner Park in\ndowntown Newport."
    }],
    "roadsideDropoffAllowed": true
  },
  "NEW_HAVEN": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "NEW HAVEN",
    "pickupLocations": [{
      "pickupLocationAddress": "",
      "pickupLocationName": "",
      "pickupNotes": "Please come to the Town Green between 9 and 11 on GU Day to register for a road and pick up your bags, gloves, safety tips and updates, and free bottled water, sunscreen and bug spray. Please leave full bags along roadsides for the town crew to pick up on Monday."
    }],
    "roadsideDropoffAllowed": true
  },
  "NORTHFIELD": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "128 Wall St, Northfield, VT 05663",
      "dropoffLocationCoordinates": {
        "latitude": 44.148795,
        "longitude": -72.65877700000001
      },
      "dropoffLocationName": "Firehouse"
    }],
    "name": "NORTHFIELD",
    "pickupLocations": [{
      "pickupLocationAddress": "128 Wall St, Northfield, VT 05663",
      "pickupLocationCoordinates": {
        "latitude": 44.148795,
        "longitude": -72.65877700000001
      },
      "pickupLocationName": "Firehouse",
      "pickupNotes": "Bags available starting at 9am on GU Day\nbehind firehouse. Return bags to firehouse by 12, light refreshments."
    }],
    "roadsideDropoffAllowed": true
  },
  "NORTH_HERO": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "769 South End Rd., N. Hero, VT 05474",
      "dropoffLocationCoordinates": {
        "latitude": 44.781242,
        "longitude": -73.309235
      },
      "dropoffLocationName": "Camp Ingalls"
    }],
    "name": "NORTH HERO",
    "pickupLocations": [{
      "pickupLocationAddress": "6441 US Route 2, North Hero, VT 05474",
      "pickupLocationCoordinates": {
        "latitude": 44.8506814,
        "longitude": -73.2633819
      },
      "pickupLocationName": "Town Office",
      "pickupNotes": "pick up Green Up bags at the Town Office. Town truck will be parked at Camp Ingalls on Green Up Day. North Hero Parks & Rec Committee will host a  complimentary lunch at Noon for volunteers at Camp Ingalls. Join us to celebrate in this annual Vermont tradition!"
    }],
    "roadsideDropoffAllowed": false
  },
  "NORTON": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "249 VT Route 114 South, Norton, VT 05907",
      "dropoffLocationCoordinates": {
        "latitude": 45.005775,
        "longitude": -71.79789
      },
      "dropoffLocationName": "Norton Recycling Center"
    }],
    "name": "NORTON",
    "pickupLocations": [{
      "pickupLocationAddress": "12 VT-114, Norton, VT 05907",
      "pickupLocationCoordinates": {
        "latitude": 45.008935,
        "longitude": -71.795112
      },
      "pickupLocationName": "Town Office",
      "pickupNotes": "Bags available at Town Office. Bring bags to the Recycling Center, 249 VT Route 114 South. Please do not Leave on roadsides at intersections."
    }],
    "roadsideDropoffAllowed": false
  },
  "NORWICH": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "63 US-5 Norwich,VT05055",
      "dropoffLocationCoordinates": {
        "latitude": 43.7053422,
        "longitude": -72.3087572
      },
      "dropoffLocationName": "Car Store"
    }],
    "name": "NORWICH",
    "pickupLocations": [{
      "pickupLocationAddress": "300 S Main St, Norwich, VT 05055",
      "pickupLocationCoordinates": {
        "latitude": 43.7139021,
        "longitude": -72.30792149999999
      },
      "pickupLocationName": "Town Clerk's Office",
      "pickupNotes": "pick up bags at Town Clerk's Office or the transfer station. Bags will be picked up by Norwich Public Works along the roadsides. A roll-off is provided by Casella Waste at the Car Store in Norwich. Refereshments and t-shirts also available at the Car Store on Green Up Day."
    }],
    "roadsideDropoffAllowed": true
  },
  "ORANGE": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "144 Richardson Rd, Orange, VT 05641",
      "dropoffLocationCoordinates": {
        "latitude": 44.13881629999999,
        "longitude": -72.40663599999999
      },
      "dropoffLocationName": "Town Garage"
    }],
    "name": "ORANGE",
    "pickupLocations": [{
      "pickupLocationAddress": "392 US-302, Orange, VT 05641",
      "pickupLocationCoordinates": {
        "latitude": 44.148013,
        "longitude": -72.40122389999999
      },
      "pickupLocationName": "Town Clerk's Office",
      "pickupNotes": "Bags can be picked up at Town Clerk's Office. BBQ for volunteers at 12:30. \nPlease leave bags along roadsides or bring them to the Town Garage from 8-12."
    }],
    "roadsideDropoffAllowed": true
  },
  "ORWELL": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "606 Main St., Orwell, VT 05760",
      "dropoffLocationCoordinates": {
        "latitude": 43.803636,
        "longitude": -73.291198
      },
      "dropoffLocationName": "Orwell Town Garage"
    }],
    "name": "ORWELL",
    "pickupLocations": [{
      "pickupLocationAddress": "436 Main St, Orwell, VT 05760",
      "pickupLocationCoordinates": {
        "latitude": 43.803726,
        "longitude": -73.3013689
      },
      "pickupLocationName": "Town Clerk's Office",
      "pickupNotes": "pick up bags at Town Clerk's office  Drop off\nat Town Garage on Green Up Day, 8-3pm."
    }, {
      "pickupLocationAddress": "499 Main St, Orwell, VT 05760",
      "pickupLocationCoordinates": {
        "latitude": 43.803524,
        "longitude": -73.298363
      },
      "pickupLocationName": "Buxton's",
      "pickupNotes": "pick up bags at Buxton's.  Drop off\nat Town Garage on Green Up Day, 8-3pm."
    }, {
      "pickupLocationAddress": "330 VT-22A, Orwell, VT 05760",
      "pickupLocationCoordinates": {
        "latitude": 43.803875,
        "longitude": -73.305397
      },
      "pickupLocationName": "Orwell Gas N Go",
      "pickupNotes": "pick up bags at Orwell Gas N Go. Drop off\nat Town Garage on Green Up Day, 8-3pm."
    }],
    "roadsideDropoffAllowed": false
  },
  "PANTON": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "2163 Panton Rd, Panton, VT 05491",
      "dropoffLocationCoordinates": {
        "latitude": 44.154015,
        "longitude": -73.300133
      },
      "dropoffLocationName": "Town Garage"
    }],
    "name": "PANTON",
    "pickupLocations": [{
      "pickupLocationAddress": "3176 Jersey Street\nPanton, VT 05491",
      "pickupLocationCoordinates": {
        "latitude": 44.147621,
        "longitude": -73.34156
      },
      "pickupLocationName": "Town Office",
      "pickupNotes": "Bags available at the Town Office.  "
    }, {
      "pickupLocationAddress": "2163 Panton Rd, Panton, VT 05491",
      "pickupLocationCoordinates": {
        "latitude": 44.154015,
        "longitude": -73.300133
      },
      "pickupLocationName": "Town Garage",
      "pickupNotes": "Bags available at the Town Garage. Roadside pick up or bring to Town Garage. "
    }],
    "roadsideDropoffAllowed": true
  },
  "PAWLET": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "PAWLET",
    "pickupLocations": [{
      "pickupLocationAddress": "122 School St, Pawlet, VT 05761",
      "pickupLocationCoordinates": {
        "latitude": 43.3456,
        "longitude": -73.178932
      },
      "pickupLocationName": "Town Clerk's Office",
      "pickupNotes": "Bags are distributed through Mettawee \nSchool, Town Clerk's Office, with extra\nbags left on Town Clerk porch on GUD.\nLeave bags at intersections or bring to\nTown Shed. Bags collected on Monday by Town Highway Dept. Visit pawletfire.org for more info. "
    }],
    "roadsideDropoffAllowed": true
  },
  "PEACHAM": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "340 Bayley-Hazen Rd., Peacham, VT 05862",
      "dropoffLocationCoordinates": {
        "latitude": 44.3257535,
        "longitude": -72.1671083
      },
      "dropoffLocationName": "Peacham Elementary"
    }],
    "name": "PEACHAM",
    "pickupLocations": [{
      "pickupLocationAddress": "340 Bayley-Hazen Road\nPeacham, Vermont 05862",
      "pickupLocationCoordinates": {
        "latitude": 44.3257535,
        "longitude": -72.1671083
      },
      "pickupLocationName": "Elementary School",
      "pickupNotes": "Coffee, donuts, GU bags available 7:30\nto 12 on GU Day at Elem. School. Picnic\nat noon at Elem. School. Return filled bags to dump trucks at school on Sat. or\nto transfer station afterwards."
    }],
    "roadsideDropoffAllowed": false
  },
  "PERU": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "402 Main St., Peru, VT 05152",
      "dropoffLocationCoordinates": {
        "latitude": 43.229553,
        "longitude": -72.900955
      },
      "dropoffLocationName": "Town Center Parking Lot"
    }],
    "name": "PERU",
    "pickupLocations": [{
      "pickupLocationAddress": "402 Main St., Peru, VT 05152",
      "pickupLocationCoordinates": {
        "latitude": 43.229553,
        "longitude": -72.900955
      },
      "pickupLocationName": "Town Center",
      "pickupNotes": "Refreshments for volunteers, pick up bags at Town Center (Tues & Thur 8:30-4). Drop off in Town Center parking lot. Call for assignments."
    }],
    "roadsideDropoffAllowed": false
  },
  "PITTSFIELD": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "40 Village Green, Pittsfield, VT 05762",
      "dropoffLocationCoordinates": {
        "latitude": 43.7706423,
        "longitude": -72.812383
      },
      "dropoffLocationName": "Pittsfield Town Office"
    }],
    "name": "PITTSFIELD",
    "pickupLocations": [{
      "pickupLocationAddress": "40 Village Green, Pittsfield, VT 05762",
      "pickupLocationCoordinates": {
        "latitude": 43.7706423,
        "longitude": -72.812383
      },
      "pickupLocationName": "Town Clerk's Office",
      "pickupNotes": "pick up bags starting at 8am at Town\nClerk's Office. Drop off there when \nyou are done. Refreshments provided."
    }],
    "roadsideDropoffAllowed": false
  },
  "PITTSFORD": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "426 Plains Rd., Pittsford, VT 05763",
      "dropoffLocationCoordinates": {
        "latitude": 43.715443,
        "longitude": -73.028183
      },
      "dropoffLocationName": "Pittsford Town Office"
    }],
    "name": "PITTSFORD",
    "pickupLocations": [{
      "pickupLocationAddress": "426 Plains Rd, Pittsford, VT 05763",
      "pickupLocationCoordinates": {
        "latitude": 43.715443,
        "longitude": -73.028183
      },
      "pickupLocationName": "Town Clerk's Office",
      "pickupNotes": "Bags available at the Town Clerk's Office. \nPlease bring full bags back to the Town \nOffices."
    }],
    "roadsideDropoffAllowed": false
  },
  "PLAINFIELD": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "99 Cameron Rd., Plainfield, VT 05667",
      "dropoffLocationCoordinates": {
        "latitude": 44.26609759999999,
        "longitude": -72.4096562
      },
      "dropoffLocationName": "Plainfield Town Garage"
    }],
    "name": "PLAINFIELD",
    "pickupLocations": [{
      "pickupLocationAddress": "",
      "pickupLocationName": "",
      "pickupNotes": "pick up bags at the Rec Field from 9-12. Deliver full bags, debris, tires, etc, to Town Garage until 4pm. Let coordinators know if anything needs to be picked up."
    }],
    "roadsideDropoffAllowed": false
  },
  "PLYMOUTH": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "1515 Lynds Hill Rd., Plymouth, VT 05056",
      "dropoffLocationCoordinates": {
        "latitude": 43.520805,
        "longitude": -72.710846
      },
      "dropoffLocationName": "Plymouth Transfer Station"
    }],
    "name": "PLYMOUTH",
    "pickupLocations": [{
      "pickupLocationAddress": "68 Town Office Rd, Plymouth, VT 05056",
      "pickupLocationCoordinates": {
        "latitude": 43.5341949,
        "longitude": -72.74292
      },
      "pickupLocationName": "Plymouth Municipal Building",
      "pickupNotes": "Meet 8am at Plymouth Municipal Bldg, sign\nin, pick up bags and a route, a free t-shirt\nor hat. Pick up trucks are also needed to\nhaul trash back to Trans. Station. Meet back at Mun. Bldg. at noon, potluck, bring\na dish to share."
    }],
    "roadsideDropoffAllowed": false
  },
  "POMFRET": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "100 LaBounty Rd., N. Pomfret, VT 05053",
      "dropoffLocationCoordinates": {
        "latitude": 43.6979284,
        "longitude": -72.52079789999999
      },
      "dropoffLocationName": "Pomfret Town Garage"
    }],
    "name": "POMFRET",
    "pickupLocations": [{
      "pickupLocationAddress": "100 La Bounty Rd, North Pomfret, VT 05053",
      "pickupLocationCoordinates": {
        "latitude": 43.6979284,
        "longitude": -72.52079789999999
      },
      "pickupLocationName": "Town Garage",
      "pickupNotes": "Bags pickup and drop off at Town Garage on LaBounty Rd. from 8 to 1pm. No roadside pick up! Bring all materials to the Town Garage by Sunday afternoon. Household trash and tires will NOT be accepted."
    }],
    "roadsideDropoffAllowed": false
  },
  "POULTNEY": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "611 Hillside Rd, Poultney, VT 05764",
      "dropoffLocationCoordinates": {
        "latitude": 43.536274,
        "longitude": -73.20518500000001
      },
      "dropoffLocationName": "Transfer Station"
    }],
    "name": "POULTNEY",
    "pickupLocations": [{
      "pickupLocationAddress": "9 Main St, Poultney, VT 05764",
      "pickupLocationCoordinates": {
        "latitude": 43.5165324,
        "longitude": -73.2330867
      },
      "pickupLocationName": "Town Clerk's Office",
      "pickupNotes": "Bags available at the Town Clerk's Office.\nBring bags to the Transfer Station."
    }],
    "roadsideDropoffAllowed": true
  },
  "POWNAL": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "POWNAL",
    "pickupLocations": [{
      "pickupLocationAddress": "467 Center St, Pownal, VT 05261",
      "pickupLocationCoordinates": {
        "latitude": 42.795143,
        "longitude": -73.22367899999999
      },
      "pickupLocationName": "Town Clerk's Office",
      "pickupNotes": "pick up bags at Town Clerk's office or\nTransfer Station. Drop off at Transfer\nStation 8-4 on GU Day."
    }, {
      "pickupLocationAddress": "RD1, Pownal, VT  05261",
      "pickupLocationName": "Transfer Station",
      "pickupNotes": "pick up bags at Town Clerk's office or\nTransfer Station. Drop off at Transfer\nStation 8-4 on GU Day."
    }],
    "roadsideDropoffAllowed": true
  },
  "PROCTOR": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "PROCTOR",
    "pickupLocations": [{
      "pickupLocationAddress": "45 Main St, Proctor, VT 05765",
      "pickupLocationCoordinates": {
        "latitude": 43.6620169,
        "longitude": -73.0360772
      },
      "pickupLocationName": "Town Office",
      "pickupNotes": "Bags available prior to GUD at Town Office. On Green Up Day at Town Green 8 to 3pm. Town road crew picks up bags\nleft on roadsides."
    }],
    "roadsideDropoffAllowed": true
  },
  "PUTNEY": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "127 Main St, Putney, VT 05346",
      "dropoffLocationCoordinates": {
        "latitude": 42.9746259,
        "longitude": -72.52210029999999
      },
      "dropoffLocationName": "Town Hall"
    }],
    "name": "PUTNEY",
    "pickupLocations": [{
      "pickupLocationAddress": "127 Main St, Putney, VT 05346",
      "pickupLocationCoordinates": {
        "latitude": 42.9746259,
        "longitude": -72.52210029999999
      },
      "pickupLocationName": "Town Hall",
      "pickupNotes": "A Putney Town Truck will be parked\nat usual spot next to Town Hall through Monday am. 8am bags available all day. Take only  what you need, full bags in back of truck."
    }],
    "roadsideDropoffAllowed": true
  },
  "RANDOLPH": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "RANDOLPH",
    "pickupLocations": [{
      "pickupLocationAddress": "7 Summer St, Randolph, VT 05060",
      "pickupLocationCoordinates": {
        "latitude": 43.9236764,
        "longitude": -72.6666286
      },
      "pickupLocationName": "Town Hall",
      "pickupNotes": "Bags at Town Hall, local stores prior to GU Day. On GU Day at Town Hall 9-12. Tie up bags and Leave on roadsides at intersections for Monday pick up by road crew. Please use GU bags for roadside trash only."
    }],
    "roadsideDropoffAllowed": true
  },
  "READING": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "5024 VT Route 106, Perkinsville, VT 05151",
      "dropoffLocationCoordinates": {
        "latitude": 43.410191,
        "longitude": -72.5136179
      },
      "dropoffLocationName": "Weathersfield Transfer Station"
    }],
    "name": "READING",
    "pickupLocations": [{
      "pickupLocationAddress": "799 Route 106, Reading, VT 05062",
      "pickupLocationCoordinates": {
        "latitude": 43.4556288,
        "longitude": -72.5374319
      },
      "pickupLocationName": "Town Hall",
      "pickupNotes": "Bags can be picked up the week prior to Green Up Day at the Greenhouse, Town Hall and the General Store. Free coffee and donuts are offered at the Town Hall on Green Up Day where bags and assignments are given. Bring bags to the Weathersfield Transfer Station for free or leave at Town Hall parking lot prior to Noon for pick up. "
    }],
    "roadsideDropoffAllowed": false
  },
  "READSBORO": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "READSBORO",
    "pickupLocations": [{
      "pickupLocationAddress": "Main Street, Readsboro, VT",
      "pickupLocationCoordinates": {
        "latitude": 42.7736363,
        "longitude": -72.9509989
      },
      "pickupLocationName": "Gazebo ",
      "pickupNotes": "Bags at Gazebo 9-1 on GU Day, \nrefreshments provided by American\nLegion. Let Jody know where you are \ncleaning up and she will make sure bags\nget picked up. If done on a different day\nbring bags to the Bandstand."
    }],
    "roadsideDropoffAllowed": true
  },
  "RICHFORD": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "RICHFORD",
    "pickupLocations": [{
      "pickupLocationAddress": "94 Main St, Richford, VT 05476",
      "pickupLocationCoordinates": {
        "latitude": 44.99483,
        "longitude": -72.673603
      },
      "pickupLocationName": "Town Clerk's Office",
      "pickupNotes": "Bags can be picked up at the Town Clerk's Oiffce until Friday at 12, after that call Deborah. When bags are full, they can be left on roadsides or taken to the dumpster at the Town Garage."
    }],
    "roadsideDropoffAllowed": true
  },
  "RICHMOND": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "RICHMOND",
    "pickupLocations": [{
      "pickupLocationAddress": "203 Bridge St, Richmond, VT 05477",
      "pickupLocationCoordinates": {
        "latitude": 44.4026218,
        "longitude": -72.9952696
      },
      "pickupLocationName": "Town Office",
      "pickupNotes": "pick up bags at town office before\nGreen Up Day. Leave bags on roadside or\nbring to Town Garage."
    }],
    "roadsideDropoffAllowed": true
  },
  "RIPTON": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "RIPTON",
    "pickupLocations": [{
      "pickupLocationAddress": "1311 VT-125, Ripton, VT 05766",
      "pickupLocationCoordinates": {
        "latitude": 43.9751445,
        "longitude": -73.03649589999999
      },
      "pickupLocationName": "Town Office",
      "pickupNotes": "pick up bags at Town Office, Ripton Country Store, or the town shed on GU Day. Drop off bags through the following Saturday at town shed. Food at Town Shed on GU Day 11-12."
    }, {
      "pickupLocationAddress": "1192 VT-125, Ripton, VT 05766",
      "pickupLocationCoordinates": {
        "latitude": 43.9741952,
        "longitude": -73.0385919
      },
      "pickupLocationName": "Ripton Country Store",
      "pickupNotes": "pick up bags at Town Office, Ripton Country Store, or the town shed on GU Day. Drop off bags through the following Saturday at town shed. Food at Town Shed on GU Day 11-12."
    }, {
      "pickupLocationAddress": "",
      "pickupLocationName": "Town Shed",
      "pickupNotes": "pick up bags at Town Office, Ripton Country Store, or the town shed on GU Day. Drop off bags through the following Saturday at town shed. Food at Town Shed on GU Day 11-12."
    }],
    "roadsideDropoffAllowed": true
  },
  "ROCHESTER": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "222 S. Main St., Rochester, VT 05767",
      "dropoffLocationCoordinates": {
        "latitude": 43.872193,
        "longitude": -72.809173
      },
      "dropoffLocationName": "Rochester Elementary"
    }],
    "name": "ROCHESTER",
    "pickupLocations": [{
      "pickupLocationAddress": "67 School St, Rochester, VT 05767",
      "pickupLocationCoordinates": {
        "latitude": 43.87588400000001,
        "longitude": -72.807113
      },
      "pickupLocationName": "Town Clerk's Office",
      "pickupNotes": "Bags available at the Town Clerk's Office. \nBring bags to the school yard, there will\nbe a truck there."
    }],
    "roadsideDropoffAllowed": false
  },
  "ROCKINGHAM": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "19 Blake St, Bellows Falls, VT 05101",
      "dropoffLocationCoordinates": {
        "latitude": 43.129891,
        "longitude": -72.453546
      },
      "dropoffLocationName": "Town Garage"
    }],
    "name": "ROCKINGHAM",
    "pickupLocations": [{
      "pickupLocationAddress": "7 Square, Bellows Falls VT 05101",
      "pickupLocationCoordinates": {
        "latitude": 43.1340054,
        "longitude": -72.4448156
      },
      "pickupLocationName": "Bellows Falls Town Hall",
      "pickupNotes": "Bags available at Bellows Falls Town Hall. Bags can be dropped off at the Recycle Center or Fire Station in Saxtons River, and Town Garages in Bellows Falls and Rockingham."
    }],
    "roadsideDropoffAllowed": true
  },
  "ROXBURY": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "ROXBURY",
    "pickupLocations": [{
      "pickupLocationAddress": "1664 Roxbury Rd, Roxbury, VT 05669",
      "pickupLocationCoordinates": {
        "latitude": 44.09099579999999,
        "longitude": -72.7343283
      },
      "pickupLocationName": "Town Office",
      "pickupNotes": "pick up bags at Claire's house or\nTown Office, leave by roadside. \nActivities at Comm. Center all day,\nfree picnic at Firehouse at noon."
    }],
    "roadsideDropoffAllowed": true
  },
  "ROYALTON": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "57 Park St., S. Royalton, VT 05068",
      "dropoffLocationCoordinates": {
        "latitude": 43.8191791,
        "longitude": -72.5210189
      },
      "dropoffLocationName": "South Royalton Green"
    }],
    "name": "ROYALTON",
    "pickupLocations": [{
      "pickupLocationAddress": "2460 VT-14, South Royalton, VT 05068",
      "pickupLocationCoordinates": {
        "latitude": 43.8243062,
        "longitude": -72.5208444
      },
      "pickupLocationName": "Town Clerk's Office",
      "pickupNotes": "Bags available at the Town Clerk's Office.\nBring bags to the large trucks parked\non the town green."
    }],
    "roadsideDropoffAllowed": false
  },
  "RUPERT": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "2673 VT Route 153 West Rupert,VT 05768",
      "dropoffLocationCoordinates": {
        "latitude": 43.22521870000001,
        "longitude": -73.2620707
      },
      "dropoffLocationName": "Fire Station"
    }],
    "name": "RUPERT",
    "pickupLocations": [{
      "pickupLocationAddress": "2673 VT Route 153 West Rupert,VT 05768",
      "pickupLocationCoordinates": {
        "latitude": 43.22521870000001,
        "longitude": -73.2620707
      },
      "pickupLocationName": "Fire Station",
      "pickupNotes": "Bags available prior to GUD by contacting\ncoordinator. On Green Up Day bags\navailable at Fire Station. Bring bags to\ndumptruck at Fire Station or leave on\nroadsides. Also Metal weekend for our\ntown so bring metal to dumptruck. Mark\nhazardous waste and let coordinator\nknow location."
    }],
    "roadsideDropoffAllowed": true
  },
  "RUTLAND": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "14 Gleason Rd, Rutland, VT 05701",
      "dropoffLocationCoordinates": {
        "latitude": 43.620892,
        "longitude": -72.95135499999999
      },
      "dropoffLocationName": "Transfer Station"
    }],
    "name": "RUTLAND",
    "pickupLocations": [{
      "pickupLocationAddress": "181 Business Route 4\nCenter Rutland, VT. 05736-0102",
      "pickupLocationCoordinates": {
        "latitude": 43.6042087,
        "longitude": -73.0076632
      },
      "pickupLocationName": "Town Office",
      "pickupNotes": "Bags at the Town Office or at the Transfer Station on the Wed. before GU Day or on GU Day. Bring bags by 12pm to Transfer Station on GU Day. If left on roadsides, call and leave a message where bags are located."
    }],
    "roadsideDropoffAllowed": true
  },
  "RUTLAND_CITY": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "128 US-7, Rutland, VT 05701",
      "dropoffLocationCoordinates": {
        "latitude": 43.6069664,
        "longitude": -72.97213099999999
      },
      "dropoffLocationName": "Kinney Subaru"
    }],
    "name": "RUTLAND CITY",
    "pickupLocations": [{
      "pickupLocationAddress": "128 US-7, Rutland, VT 05701",
      "pickupLocationCoordinates": {
        "latitude": 43.6069664,
        "longitude": -72.97213099999999
      },
      "pickupLocationName": "Kinney Subaru",
      "pickupNotes": "Green Up bags available at Kinney Subaru.\nRefreshments provided for all volunteers!\nhttp://www.subaruofnewengland.com/green-up-vermont-2017.htm"
    }, {
      "pickupLocationAddress": "1 Strongs Avenue, Rutland, VT 05701",
      "pickupLocationCoordinates": {
        "latitude": 43.605184,
        "longitude": -72.977876
      },
      "pickupLocationName": "Rutland City Office",
      "pickupNotes": "Bags will be available at the City Office one week prior to Green Up Day and on Green Up Day morning. Drop bags off\nat Kinney Subaru."
    }],
    "roadsideDropoffAllowed": true
  },
  "RYEGATE": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "32 Witherspoon Rd., Ryegate, VT 05042",
      "dropoffLocationCoordinates": {
        "latitude": 44.2086056,
        "longitude": -72.10432039999999
      },
      "dropoffLocationName": "Ryegate Town Garage"
    }],
    "name": "RYEGATE",
    "pickupLocations": [{
      "pickupLocationAddress": "18 S Bayley Hazen Rd, Ryegate, VT 05042",
      "pickupLocationCoordinates": {
        "latitude": 44.2083419,
        "longitude": -72.1037362
      },
      "pickupLocationName": "Town Clerk's Office",
      "pickupNotes": "pick up bags at Town Clerk's Office or at coordinator's house. Drop off at Town Garage."
    }],
    "roadsideDropoffAllowed": false
  },
  "SALISBURY": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "SALISBURY",
    "pickupLocations": [{
      "pickupLocationAddress": "1457 Lake Dunmore Rd, Salisbury, VT 05769",
      "pickupLocationCoordinates": {
        "latitude": 43.8639284,
        "longitude": -73.06616819999999
      },
      "pickupLocationName": "Kampersville Store",
      "pickupNotes": "Bags and routes distributed early to early bird email list. The remainder of routes and bags are distributed on GU Day at Kampersville Store, Route 53, between 8-10. Bags can be left on roadsides and will be picked up the following Wednesday and Saturday, allowing residents a week to complete their assigned route."
    }],
    "roadsideDropoffAllowed": true
  },
  "SANDGATE": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "SANDGATE",
    "pickupLocations": [{
      "pickupLocationAddress": "3266 Sandgate Road\nSandgate, VT 05250",
      "pickupLocationCoordinates": {
        "latitude": 43.1481243,
        "longitude": -73.1982515
      },
      "pickupLocationName": "Town Clerk's Office",
      "pickupNotes": "Bags available at Town Meeting in March and at Town Clerk's Office, during the week prior to Green Up Day. Leave bags on roadsides."
    }],
    "roadsideDropoffAllowed": true
  },
  "SEARSBURG": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "SEARSBURG",
    "pickupLocations": [{
      "pickupLocationAddress": "18 Town Garage Rd, Searsburg, VT 05363",
      "pickupLocationCoordinates": {
        "latitude": 42.8959553,
        "longitude": -72.9777986
      },
      "pickupLocationName": "Town Clerk's Office",
      "pickupNotes": "Bags available at Town Clerk's Office. Leave bags along roadsides."
    }],
    "roadsideDropoffAllowed": true
  },
  "SHAFTSBURY": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "61 Buck Hill Rd, Shaftsbury, VT 05262",
      "dropoffLocationCoordinates": {
        "latitude": 42.9465829,
        "longitude": -73.209824
      },
      "dropoffLocationName": "Town Offices"
    }],
    "name": "SHAFTSBURY",
    "pickupLocations": [{
      "pickupLocationAddress": "61 Buck Hill Rd, Shaftsbury, VT 05262",
      "pickupLocationCoordinates": {
        "latitude": 42.9465829,
        "longitude": -73.209824
      },
      "pickupLocationName": "Town Offices",
      "pickupNotes": "Bags available at Town Offices, Cole Hall,\n61 Buck Road. Bring bags back to Town\nOffices (dumpster on GU Day), the Landfill,\nor leave bags along roadsides."
    }],
    "roadsideDropoffAllowed": true
  },
  "SHARON": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "VT-14, Sharon, VT 05065",
      "dropoffLocationCoordinates": {
        "latitude": 43.7530419,
        "longitude": -72.4492193
      },
      "dropoffLocationName": "Town Garage"
    }],
    "name": "SHARON",
    "pickupLocations": [{
      "pickupLocationAddress": "69 VT-132, Sharon, VT 05065",
      "pickupLocationCoordinates": {
        "latitude": 43.7853039,
        "longitude": -72.453744
      },
      "pickupLocationName": "Town Office",
      "pickupNotes": "Bags available at Town Office. Drop off\nat Town Garage 8-4 on GU Day. Refreshments provided, plants and bake sale at Town Garage. Community potluck and party at Seven Stars Center in the evening."
    }],
    "roadsideDropoffAllowed": true
  },
  "SHEFFIELD": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "",
      "dropoffLocationName": ""
    }],
    "name": "SHEFFIELD",
    "pickupLocations": [{
      "pickupLocationAddress": "Municipal Building, 37 Dane Rd, Sheffield, VT 05866",
      "pickupLocationCoordinates": {
        "latitude": 44.6000514,
        "longitude": -72.1165967
      },
      "pickupLocationName": "Town Clerk's Office",
      "pickupNotes": "Bags available at Town Clerk's Office, Sheffield Transfer Station, and any of the posted warning bulletin board locations the week prior to GU Day. Bags can be left along roadsides or brought to Transfer Station 8-5 on GU Day."
    }],
    "roadsideDropoffAllowed": true
  },
  "SHELBURNE": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "154 Turtle Lane, Shelburne, VT 05482",
      "dropoffLocationCoordinates": {
        "latitude": 44.38468899999999,
        "longitude": -73.23599200000001
      },
      "dropoffLocationName": "Town Dump Truck"
    }],
    "name": "SHELBURNE",
    "pickupLocations": [{
      "pickupLocationAddress": "5420 Shelburne Rd, Shelburne, VT 05482",
      "pickupLocationCoordinates": {
        "latitude": 44.3785788,
        "longitude": -73.22902959999999
      },
      "pickupLocationName": "Town Clerk's Office",
      "pickupNotes": "Bags available at Town Clerk's Office."
    }, {
      "pickupLocationAddress": "20 Shelburne Shopping Park, Shelburne, VT 05482",
      "pickupLocationCoordinates": {
        "latitude": 44.37874739999999,
        "longitude": -73.2252479
      },
      "pickupLocationName": "Shelburne Supermarket",
      "pickupNotes": "Bags available at Shelburne Supermarket. Filled bags should be left in the town dump truck at Turtle Lane 7-3\non Green Up Day, please do not leave \nbags on roadsides."
    }],
    "roadsideDropoffAllowed": false
  },
  "SHELDON": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "649 Bridge St, Sheldon, VT 05483",
      "dropoffLocationCoordinates": {
        "latitude": 44.8820943,
        "longitude": -72.9377616
      },
      "dropoffLocationName": "Town Garage"
    }],
    "name": "SHELDON",
    "pickupLocations": [{
      "pickupLocationAddress": "",
      "pickupLocationName": "",
      "pickupNotes": "Contact the town office to find out what\nto do with the bags after.\nBring bags to the Town Garage."
    }],
    "roadsideDropoffAllowed": true
  },
  "SHOREHAM": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "SHOREHAM",
    "pickupLocations": [{
      "pickupLocationAddress": "",
      "pickupLocationName": "",
      "pickupNotes": "Green Up bags, gloves and the sign-up map\nand info are available at the Town RecyclingCenter prior to and on Green Up Day. Collected items can be left on roadsides to\nbe picked up by the town road crew. \nRefreshments and energy committee info\navailable at the church in the morning."
    }],
    "roadsideDropoffAllowed": true
  },
  "SHREWSBURY": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "130 Mountain School Rd., Shrewbury, VT 05738",
      "dropoffLocationCoordinates": {
        "latitude": 43.525455,
        "longitude": -72.832939
      },
      "dropoffLocationName": "Northam Trasfer Station"
    }],
    "name": "SHREWSBURY",
    "pickupLocations": [{
      "pickupLocationAddress": "9823 Cold River Rd, Shrewsbury, VT 05738",
      "pickupLocationCoordinates": {
        "latitude": 43.529507,
        "longitude": -72.8283299
      },
      "pickupLocationName": "Town Hall",
      "pickupNotes": "pick up bags, select route, breakfast at Town Hall 8-10. Garbage sorting (bottle, cans, plastic) from 10-1 at Transfer Station. Bring bags to Transfer Station."
    }],
    "roadsideDropoffAllowed": false
  },
  "SOUTH_BURLINGTON": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "575 Dorset St., S. Burlington, VT 05403",
      "dropoffLocationCoordinates": {
        "latitude": 44.45433999999999,
        "longitude": -73.1796
      },
      "dropoffLocationName": "South Burlington City Hall"
    }],
    "name": "SOUTH BURLINGTON",
    "pickupLocations": [{
      "pickupLocationAddress": "575 Dorset St., S. Burlington, VT 05403",
      "pickupLocationCoordinates": {
        "latitude": 44.45433999999999,
        "longitude": -73.1796
      },
      "pickupLocationName": "South Burlington City Hall",
      "pickupNotes": "pick up bags at City Hall, 575 Dorset St., Wed to Saturday. Drop off ALL trash at City Hall, on Saturday 8-2, where there are exhibits, contests, free food and a great community feel!"
    }],
    "roadsideDropoffAllowed": false
  },
  "SOUTH_HERO": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "SOUTH HERO",
    "pickupLocations": [{
      "pickupLocationAddress": "2nd Floor, 308 US-2, South Hero, VT 05486",
      "pickupLocationCoordinates": {
        "latitude": 44.645905,
        "longitude": -73.303513
      },
      "pickupLocationName": "South Hero Land Trust",
      "pickupNotes": "Bags available at South Hero Land Trust office. Sign up for your street or one of our group volunteer activities. Bags, recycling and debris can be left on roadsides. Annual thank you BBQ in afternoon at Folsom Education & Comm. Center. "
    }],
    "roadsideDropoffAllowed": true
  },
  "SPRINGFIELD": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "SPRINGFIELD",
    "pickupLocations": [{
      "pickupLocationAddress": "56 Main St #2, Springfield, VT 05156",
      "pickupLocationCoordinates": {
        "latitude": 43.2978812,
        "longitude": -72.481641
      },
      "pickupLocationName": "Chamber of Commerce",
      "pickupNotes": "Bags available at the Chamber of Commerce, 56 Main St.\nLeave bags along roadside."
    }],
    "roadsideDropoffAllowed": true
  },
  "STAMFORD": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "986 Main Rd, Stamford, VT 05352",
      "dropoffLocationCoordinates": {
        "latitude": 42.7548249,
        "longitude": -73.06741099999999
      },
      "dropoffLocationName": "Stamford Recycling Center"
    }],
    "name": "STAMFORD",
    "pickupLocations": [{
      "pickupLocationAddress": "986 Main Rd, Stamford, VT 05352",
      "pickupLocationCoordinates": {
        "latitude": 42.7548249,
        "longitude": -73.06741099999999
      },
      "pickupLocationName": "Town Clerk's Office",
      "pickupNotes": "Bags available at Town Clerk's Office. Bring bags to the sign-in location or to the Recycling Center."
    }],
    "roadsideDropoffAllowed": false
  },
  "STANNARD": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "615 Stannard Mountain Road Stannard, VT 05842",
      "dropoffLocationCoordinates": {
        "latitude": 44.542811,
        "longitude": -72.213075
      },
      "dropoffLocationName": "Town Office"
    }],
    "name": "STANNARD",
    "pickupLocations": [{
      "pickupLocationAddress": "615 Stannard Mountain Road Stannard, VT 05842",
      "pickupLocationCoordinates": {
        "latitude": 44.542811,
        "longitude": -72.213075
      },
      "pickupLocationName": "Town Office",
      "pickupNotes": "pick up bags at the Town Office. \nDrop off there as well on GU Day,\n9:30 to Noon. Lunch served at Noon."
    }],
    "roadsideDropoffAllowed": true
  },
  "STARKSBORO": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "3904 VT-116, Starksboro, VT 05487",
      "dropoffLocationCoordinates": {
        "latitude": 44.2409595,
        "longitude": -73.0575535
      },
      "dropoffLocationName": "Town Garage"
    }],
    "name": "STARKSBORO",
    "pickupLocations": [{
      "pickupLocationAddress": "2849 VT-116, Starksboro, VT 05487",
      "pickupLocationCoordinates": {
        "latitude": 44.225506,
        "longitude": -73.05729699999999
      },
      "pickupLocationName": "Town Office",
      "pickupNotes": "Green Up bags and gloves will be available 1 week prior to Green Up Day.  All bags must be dropped off at the Town Garage on Green Up Day from 8am to 3pm. Trash collected on State Highways will be collected by state trucks."
    }, {
      "pickupLocationAddress": "3904 VT-116, Starksboro, VT 05487",
      "pickupLocationCoordinates": {
        "latitude": 44.2409595,
        "longitude": -73.0575535
      },
      "pickupLocationName": "Town Garage",
      "pickupNotes": "Green Up bags and gloves will be available 1 week prior to Green Up Day.  All bags must be dropped off at the Town Garage on Green Up Day from 8am to 3pm. Trash collected on State Highways will be collected by state trucks."
    }, {
      "pickupLocationAddress": "1858 VT-17, Bristol, VT 05443",
      "pickupLocationCoordinates": {
        "latitude": 44.12881489999999,
        "longitude": -73.1080678
      },
      "pickupLocationName": "Jerusalem Corners",
      "pickupNotes": "Green Up bags and gloves will be available 1 week prior to Green Up Day. All bags must be dropped off at the Town Garage on Green Up Day from 8am to 3pm. Trash collected on State Highways will be collected by state trucks."
    }],
    "roadsideDropoffAllowed": true
  },
  "STOCKBRIDGE": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "2933 VT-107, Stockbridge, VT 05772",
      "dropoffLocationCoordinates": {
        "latitude": 43.7650764,
        "longitude": -72.7126241
      },
      "dropoffLocationName": "Stockbridge Central School"
    }],
    "name": "STOCKBRIDGE",
    "pickupLocations": [{
      "pickupLocationAddress": "2933 VT-107, Stockbridge, VT 05772",
      "pickupLocationCoordinates": {
        "latitude": 43.7650764,
        "longitude": -72.7126241
      },
      "pickupLocationName": "Stockbridge Central School",
      "pickupNotes": "Green Up Day runs 8-12, meet at Stockbridge Central School for bag pick up and road coordination.Arrangements are made at time of bag dispensing on whether the bags will be roadside pick up or bought to the school."
    }],
    "roadsideDropoffAllowed": true
  },
  "STOWE": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "140 Cottage Club Rd., Stowe, VT 05672",
      "dropoffLocationCoordinates": {
        "latitude": 44.4771459,
        "longitude": -72.715366
      },
      "dropoffLocationName": "Sunset Grille"
    }],
    "name": "STOWE",
    "pickupLocations": [{
      "pickupLocationAddress": "140 Cottage Club Rd, Stowe, VT 05672",
      "pickupLocationCoordinates": {
        "latitude": 44.4771459,
        "longitude": -72.715366
      },
      "pickupLocationName": "Sunset Grille",
      "pickupNotes": "Meet at Sunset Grille starting at 8am\non GU Day for bags and refreshments.\nBags must be brought back to the Grille\nby 1pm. You must notify either the\nCons. Comm. Or the Hwy Dept about \nlarger items."
    }],
    "roadsideDropoffAllowed": false
  },
  "STRAFFORD": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "233 Route 132, South Strafford, VT 05070",
      "dropoffLocationCoordinates": {
        "latitude": 43.8350531,
        "longitude": -72.3638217
      },
      "dropoffLocationName": "South Strafford Park and Ride"
    }],
    "name": "STRAFFORD",
    "pickupLocations": [{
      "pickupLocationAddress": "227 Justin Morrill Memorial Hwy, Strafford, VT 05072",
      "pickupLocationCoordinates": {
        "latitude": 43.8645877,
        "longitude": -72.377106
      },
      "pickupLocationName": "Town Clerk's Office",
      "pickupNotes": "Bags available at Town Clerk's Office or\nat Coburns General Store. Bring bags to\nthe South Strafford Park N Ride 9-12\non GU Day. Popsicle coupon for each child who brings in a bag."
    }],
    "roadsideDropoffAllowed": false
  },
  "STRATTON": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "STRATTON",
    "pickupLocations": [{
      "pickupLocationAddress": "9 W Jamaica Rd, Stratton, VT 05360",
      "pickupLocationCoordinates": {
        "latitude": 43.04319,
        "longitude": -72.908974
      },
      "pickupLocationName": "Town Hall",
      "pickupNotes": "7:30 to 10:30am Town Hall open. Pick up\nbags, road routes, refreshments: coffee,\njuice and donuts. Leave bags along \nroadside but let the Town Hall know if\nthere are larger or hazardous items."
    }],
    "roadsideDropoffAllowed": true
  },
  "ST__ALBANS_CITY": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "ST. ALBANS CITY",
    "pickupLocations": [{
      "pickupLocationAddress": "100 North Main Street\nSt. Albans, VT 05478",
      "pickupLocationCoordinates": {
        "latitude": 44.813335,
        "longitude": -73.0835895
      },
      "pickupLocationName": "City Clerk\"s Office",
      "pickupNotes": "Bags available at City Clerk's Office"
    }, {
      "pickupLocationAddress": "133 N Main St #7, St Albans City, VT 05478",
      "pickupLocationCoordinates": {
        "latitude": 44.81504330000001,
        "longitude": -73.0818276
      },
      "pickupLocationName": "14th Star Brewery",
      "pickupNotes": "Bags available at City Clerk's Office, and\non GUD at 14th Star Brewery."
    }, {
      "pickupLocationAddress": "101 Lake St, St Albans City, VT 05478",
      "pickupLocationCoordinates": {
        "latitude": 44.812059,
        "longitude": -73.0872171
      },
      "pickupLocationName": "Food City",
      "pickupNotes": "Bags available at  Food City\nParking Lot."
    }, {
      "pickupLocationAddress": "36 N Main St, St Albans City, VT 05478",
      "pickupLocationCoordinates": {
        "latitude": 44.8116566,
        "longitude": -73.08346
      },
      "pickupLocationName": "Taylor Park",
      "pickupNotes": "Bags available at Taylor Park.  Leave bags at intersections for pick up.\nSchool and Houghton Park. Sign up for a volunteer BBQ at 14th\nStar Brewery. Free ice cream for volunteers at Taylor Park (or across the street in St. Paul's Church  in case of rain) at noon."
    }],
    "roadsideDropoffAllowed": true
  },
  "ST__ALBANS_TOWN": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "ST. ALBANS TOWN",
    "pickupLocations": [{
      "pickupLocationAddress": "579 Lake Road\nSt. Albans, VT 05478",
      "pickupLocationCoordinates": {
        "latitude": 44.8086322,
        "longitude": -73.1392304
      },
      "pickupLocationName": "Town Clerk's Office",
      "pickupNotes": "Bags available at Town Clerk's Office,\nprior to GU Day, Mon-Fri 8-4. Leave bags along roadsides."
    }],
    "roadsideDropoffAllowed": true
  },
  "ST__GEORGE": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "ST. GEORGE",
    "pickupLocations": [{
      "pickupLocationAddress": "21 Barber Rd, St George, VT 05495",
      "pickupLocationCoordinates": {
        "latitude": 44.3786589,
        "longitude": -73.12670539999999
      },
      "pickupLocationName": "Town Hall",
      "pickupNotes": "All volunteers should either come to Town Hall around 8:30am on Green Up Day to pick up bags, say where they are going to work and have refreshments! If you want bags before Green Up Day, stop by Town Hall to get bags and sign in where you will be picking up. All bags\nwill be picked up by 11:30am on Green Up\nDay. "
    }],
    "roadsideDropoffAllowed": true
  },
  "ST__JOHNSBURY": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "9273, 664 Memorial Dr, St Johnsbury, VT 05819",
      "dropoffLocationCoordinates": {
        "latitude": 44.4420107,
        "longitude": -72.01402159999999
      },
      "dropoffLocationName": "Saint J Subaru"
    }],
    "name": "ST. JOHNSBURY",
    "pickupLocations": [{
      "pickupLocationAddress": "9273, 664 Memorial Dr, St Johnsbury, VT 05819",
      "pickupLocationCoordinates": {
        "latitude": 44.4420107,
        "longitude": -72.01402159999999
      },
      "pickupLocationName": "Saint J Subaru",
      "pickupNotes": "Green Up bags available at Saint J Subaru. Bring bags back to Saint J Subaru or leave on roadsides. Refreshments provided for all volunteers!"
    }],
    "roadsideDropoffAllowed": true
  },
  "SUDBURY": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "12 Williams Lane, Sudbury, VT 05733",
      "dropoffLocationCoordinates": {
        "latitude": 43.8214253,
        "longitude": -73.17345809999999
      },
      "dropoffLocationName": "Sudbury Recycling Center"
    }],
    "name": "SUDBURY",
    "pickupLocations": [{
      "pickupLocationAddress": "36 Blacksmith Ln, Sudbury, VT 05733",
      "pickupLocationCoordinates": {
        "latitude": 43.799732,
        "longitude": -73.2050019
      },
      "pickupLocationName": "Town Office",
      "pickupNotes": "Bags available at the Town Office. Bring\nfull bags to the Recycling Center on or\nbefore Green Up Day, where volunteers\nwill sort them."
    }],
    "roadsideDropoffAllowed": false
  },
  "SUNDERLAND": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "3039 Sunderland Hl Rd, Sunderland, VT 05250",
      "dropoffLocationCoordinates": {
        "latitude": 43.10836399999999,
        "longitude": -73.119415
      },
      "dropoffLocationName": "Town Garage"
    }],
    "name": "SUNDERLAND",
    "pickupLocations": [{
      "pickupLocationAddress": "104 Mountain View Rd, Sunderland, VT 05250",
      "pickupLocationCoordinates": {
        "latitude": 43.104681,
        "longitude": -73.11905900000001
      },
      "pickupLocationName": "Town Clerk's Office",
      "pickupNotes": "Bags available at Town Clerk's Office.\nBring bags to the Town Garage after."
    }],
    "roadsideDropoffAllowed": true
  },
  "SUTTON": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "691 Burke Rd, Sutton, VT 05867",
      "dropoffLocationCoordinates": {
        "latitude": 44.6315488,
        "longitude": -72.01243219999999
      },
      "dropoffLocationName": "Fire Station"
    }],
    "name": "SUTTON",
    "pickupLocations": [{
      "pickupLocationAddress": "691 Burke Rd, Sutton, VT 05867",
      "pickupLocationCoordinates": {
        "latitude": 44.6315488,
        "longitude": -72.01243219999999
      },
      "pickupLocationName": "Fire Station",
      "pickupNotes": "Meet at Fire Station at 8:30 am for coffee,\nbags and assignments. Leave bags\nroadside or bring to Fire Station. Hot Dog\nBBQ at Noon at Fire Station for volunteers."
    }],
    "roadsideDropoffAllowed": true
  },
  "SWANTON": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "SWANTON",
    "pickupLocations": [{
      "pickupLocationAddress": "1 Academy St, Swanton, VT 05488",
      "pickupLocationCoordinates": {
        "latitude": 44.917113,
        "longitude": -73.1243708
      },
      "pickupLocationName": "Town Office",
      "pickupNotes": "Bags available at Town Office the week prior to Green Up Day. "
    }, {
      "pickupLocationAddress": "120 1st St, Swanton, VT 05488",
      "pickupLocationCoordinates": {
        "latitude": 44.920675,
        "longitude": -73.1129859
      },
      "pickupLocationName": "Village Office",
      "pickupNotes": "Bags available at Village Office and area stores the week prior to Green Up Day. Bring bags to Swanton Municipal parking lot. Dump truck available. Please sign in your location when you pick up bags. Gloves and t-shirt available upon request."
    }],
    "roadsideDropoffAllowed": true
  },
  "THETFORD": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "3901 VT Route 113, Thetford, VT 05075",
      "dropoffLocationCoordinates": {
        "latitude": 43.8313419,
        "longitude": -72.2475901
      },
      "dropoffLocationName": "Thetford Town Garage"
    }],
    "name": "THETFORD",
    "pickupLocations": [{
      "pickupLocationAddress": "3910 VT-113, Thetford Center, VT 05075",
      "pickupLocationCoordinates": {
        "latitude": 43.8315157,
        "longitude": -72.24674879999999
      },
      "pickupLocationName": "Town Clerk's Office",
      "pickupNotes": "Bags available at the Town Clerk's Office.\nBring all roadside trash to the Town Shed between 9 and 4 on Green Up Day."
    }],
    "roadsideDropoffAllowed": false
  },
  "TINMOUTH": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "537 Route 140, Tinmouth, VT 05773",
      "dropoffLocationCoordinates": {
        "latitude": 43.4485575,
        "longitude": -73.04800929999999
      },
      "dropoffLocationName": "Tinmouth Transfer Station"
    }],
    "name": "TINMOUTH",
    "pickupLocations": [{
      "pickupLocationAddress": "9 Mountain View Rd, Tinmouth, VT 05773",
      "pickupLocationCoordinates": {
        "latitude": 43.44817,
        "longitude": -73.050224
      },
      "pickupLocationName": "Town Clerk's Office",
      "pickupNotes": "Meet at 9:00 am on GU Day at the Transfer\nStation to get road assignments and\nbags. We reconvene at Transfer Station\nat 11:00 am to dump bags in dumpster\nand to enjoy free ice cream. The Elem. \nSchool kids Green Up on a separate day,\ncontact the school for date and time. You\ncan also get bags from the Town Clerk\nthe week prior during office hours."
    }],
    "roadsideDropoffAllowed": false
  },
  "TOPSHAM": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "2628 Goose Green Rd., Topsham, VT 05076",
      "dropoffLocationName": "Casella Transfer Station"
    }],
    "name": "TOPSHAM",
    "pickupLocations": [{
      "pickupLocationAddress": "",
      "pickupLocationName": "",
      "pickupNotes": "Volunteer sign up sheet available at Town \nMeeting or email me to sign up. Bags \navailable prior to GU Day. All GU bags must\nbe taken to Transfer Station on GU Day\nonly, 7:30 to 12:30."
    }],
    "roadsideDropoffAllowed": false
  },
  "TOWNSHEND": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "93-1 Common Rd., Tonwshend, VT 05353",
      "dropoffLocationCoordinates": {
        "latitude": 43.0469236,
        "longitude": -72.668295
      },
      "dropoffLocationName": "Townshend Common"
    }],
    "name": "TOWNSHEND",
    "pickupLocations": [{
      "pickupLocationAddress": "2006 VT-30, Townshend, VT 05353",
      "pickupLocationCoordinates": {
        "latitude": 43.045905,
        "longitude": -72.666915
      },
      "pickupLocationName": "Town Office",
      "pickupNotes": "Bags available at Town Office and \nElementary School week before and\n11am to 1pm on Green Up Day. Bring bags back to the town truck on the green or to the dump. Entertainment from 1-3pm the Townshend Common!"
    }],
    "roadsideDropoffAllowed": false
  },
  "TROY": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "TROY",
    "pickupLocations": [{
      "pickupLocationAddress": "142 Main St, North Troy, VT 05859",
      "pickupLocationCoordinates": {
        "latitude": 44.9954884,
        "longitude": -72.40510309999999
      },
      "pickupLocationName": "Town Clerk's Office",
      "pickupNotes": "pick up bags at Town Clerk's Office. \nDrop off bags at the town garage or \nleave along roadside for pick up."
    }],
    "roadsideDropoffAllowed": true
  },
  "TUNBRIDGE": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "TUNBRIDGE",
    "pickupLocations": [{
      "pickupLocationAddress": "271 VT-110, Tunbridge, VT 05077",
      "pickupLocationCoordinates": {
        "latitude": 43.8878394,
        "longitude": -72.49365159999999
      },
      "pickupLocationName": "Town Clerk's Office",
      "pickupNotes": "Bags available at the Town Clerk's Office.\nLeave bags on roadsides."
    }],
    "roadsideDropoffAllowed": true
  },
  "UNDERHILL": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "75 New Rd., Underhill, VT 05489",
      "dropoffLocationCoordinates": {
        "latitude": 44.5195249,
        "longitude": -72.8858923
      },
      "dropoffLocationName": "Underhill Town Garage"
    }],
    "name": "UNDERHILL",
    "pickupLocations": [{
      "pickupLocationAddress": "12 Pleasant Valley Road, Underhill, VT  05489",
      "pickupLocationCoordinates": {
        "latitude": 44.5075431,
        "longitude": -72.8986979
      },
      "pickupLocationName": "Town Hall",
      "pickupNotes": "Bags available at Town Hall and local \nstores. Bring full bags to Town Garage at 75 New Road or the Fire Dept on Route 15\non Green Up Day, 9-12. No hazardous materials, no appliances, and please\ndon't leave bags on roadsides."
    }],
    "roadsideDropoffAllowed": false
  },
  "VERGENNES": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "VERGENNES",
    "pickupLocations": [{
      "pickupLocationAddress": "120 Main St, Vergennes, VT 05491",
      "pickupLocationCoordinates": {
        "latitude": 44.1686777,
        "longitude": -73.2509867
      },
      "pickupLocationName": "City Hall",
      "pickupNotes": "Bags available a few days befor GU Day\nat City Hall.  Volunteers are asked to leave\nbags near intersections of city streets."
    }, {
      "pickupLocationAddress": "179 Main St, Vergennes, VT 05491",
      "pickupLocationCoordinates": {
        "latitude": 44.167824,
        "longitude": -73.25148
      },
      "pickupLocationName": "City Park",
      "pickupNotes": "Bags available on GU Day from 7-12 at\nCity Park.  Volunteers are asked to leave\nbags near intersections of city streets."
    }],
    "roadsideDropoffAllowed": true
  },
  "VERNON": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "VERNON",
    "pickupLocations": [{
      "pickupLocationAddress": "",
      "pickupLocationName": "",
      "pickupNotes": "\nMeet at Rec Center Shelter @ 9am. Pick\nroads and go out. Refreshments and\ngloves provided. Come back for lunch at Noon. Leave bags along roadsides."
    }],
    "roadsideDropoffAllowed": true
  },
  "VERSHIRE": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "VERSHIRE",
    "pickupLocations": [{
      "pickupLocationAddress": "6894 VT-113, Vershire, VT 05079",
      "pickupLocationCoordinates": {
        "latitude": 43.97047990000001,
        "longitude": -72.3232484
      },
      "pickupLocationName": "Town Clerk's Office",
      "pickupNotes": "Bags available at the Town Clerk's Office.\nLeave bags along roadsides.  "
    }],
    "roadsideDropoffAllowed": true
  },
  "VICTORY": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "VICTORY",
    "pickupLocations": [{
      "pickupLocationAddress": "",
      "pickupLocationName": "",
      "pickupNotes": "Bags are available ahead of time by calling\nthe coordinator or Town Clerk. Breakfast and lunch always provided."
    }],
    "roadsideDropoffAllowed": true
  },
  "WAITSFIELD": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "WAITSFIELD",
    "pickupLocations": [{
      "pickupLocationAddress": "4144 Main St, Waitsfield, VT 05673",
      "pickupLocationCoordinates": {
        "latitude": 44.1930865,
        "longitude": -72.82199279999999
      },
      "pickupLocationName": "Town Clerk's Office",
      "pickupNotes": "Bags available at the Town Clerk's Office.\nLeave bags along roadsides by 10am on\nGreen Up Day.\n"
    }],
    "roadsideDropoffAllowed": true
  },
  "WALDEN": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "WALDEN",
    "pickupLocations": [{
      "pickupLocationAddress": "12 VT Route 215 Walden, VT 05873",
      "pickupLocationCoordinates": {
        "latitude": 44.45222829999999,
        "longitude": -72.25708929999999
      },
      "pickupLocationName": "Town Clerk's Office",
      "pickupNotes": "Bags available at Town Clerk's Office.\nLeave bags along roadsides."
    }],
    "roadsideDropoffAllowed": true
  },
  "WALLINGFORD": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "99 Waldo Lane, Wallingford, VT 05773",
      "dropoffLocationCoordinates": {
        "latitude": 43.4704907,
        "longitude": -72.9824021
      },
      "dropoffLocationName": "Wallingford Transfer Station"
    }],
    "name": "WALLINGFORD",
    "pickupLocations": [{
      "pickupLocationAddress": "96 US-7, Wallingford, VT 05773-9547",
      "pickupLocationCoordinates": {
        "latitude": 43.4730333,
        "longitude": -72.9766576
      },
      "pickupLocationName": "Wallingford Rotary",
      "pickupNotes": "pick up bags at the Wallingford Rotary from 9-11:30. Drop full bags off at Transfer  Station on Saturday until Noon. Transfer Station will accept bags if dropped off within one week of Green Up Day."
    }],
    "roadsideDropoffAllowed": false
  },
  "WALTHAM": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "2053 Maple St, Vergennes, VT 05491",
      "dropoffLocationCoordinates": {
        "latitude": 44.130825,
        "longitude": -73.24468999999999
      },
      "dropoffLocationName": "Town Hall"
    }],
    "name": "WALTHAM",
    "pickupLocations": [{
      "pickupLocationAddress": "2053 Maple St, Vergennes, VT 05491",
      "pickupLocationCoordinates": {
        "latitude": 44.130825,
        "longitude": -73.24468999999999
      },
      "pickupLocationName": "Town Hall",
      "pickupNotes": "Bags available at the Town Hall. Please bring back to Town Hall."
    }],
    "roadsideDropoffAllowed": true
  },
  "WARDSBORO": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "174 S. Wardsboro Rd., Newfane, VT 05345",
      "dropoffLocationCoordinates": {
        "latitude": 43.0391697,
        "longitude": -72.7895758
      },
      "dropoffLocationName": "Wardsboro Transfer Station"
    }],
    "name": "WARDSBORO",
    "pickupLocations": [{
      "pickupLocationAddress": "71 Main St, Wardsboro, VT 05355",
      "pickupLocationCoordinates": {
        "latitude": 43.041711,
        "longitude": -72.790364
      },
      "pickupLocationName": "Town Office",
      "pickupNotes": "Meet 8am at Town Office,\nhomemade donuts, coffee, cider,\nfruit for volunteers."
    }],
    "roadsideDropoffAllowed": false
  },
  "WARNER__S_GRANT": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "Warner''s Grant",
    "pickupLocations": [{
      "pickupLocationAddress": "",
      "pickupLocationName": "",
      "pickupNotes": "Coordinating the towns of\nAverill, Avery's Gore, Lewis,\nFerdinand, Warren Gore,\nWarner's Grant. Bags available at the UTG Office. Bring bags to UTG Office."
    }],
    "roadsideDropoffAllowed": true
  },
  "WARREN": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "6911 Main St., Waitsfield, VT 05673",
      "dropoffLocationCoordinates": {
        "latitude": 44.160995,
        "longitude": -72.832504
      },
      "dropoffLocationName": "Earthwise Transfer Station"
    }],
    "name": "WARREN",
    "pickupLocations": [{
      "pickupLocationAddress": "42 Cemetary Rd, Warren, VT 05674",
      "pickupLocationCoordinates": {
        "latitude": 44.113022,
        "longitude": -72.85530100000001
      },
      "pickupLocationName": "Town Clerk's Office",
      "pickupNotes": "Bags available at town clerk's office\nand East Warren Market. Bag drop\noff at Earthwise Transfer Station,\nor the East Warren Market 9-1 on Green Up Day, along  with a few other sites."
    }],
    "roadsideDropoffAllowed": false
  },
  "WARREN_GORE": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "Warren Gore",
    "pickupLocations": [{
      "pickupLocationAddress": "",
      "pickupLocationName": "",
      "pickupNotes": "Coordinating the towns of\nAverill, Avery's Gore, Lewis,\nFerdinand, Warren Gore,\nWarner's Grant. Bags available at the UTG Office. Bring bags to UTG Office."
    }],
    "roadsideDropoffAllowed": true
  },
  "WASHINGTON": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "51 Firehouse Lane, Washington, VT 05675",
      "dropoffLocationCoordinates": {
        "latitude": 44.107406,
        "longitude": -72.43418799999999
      },
      "dropoffLocationName": "Washington Fire Station"
    }],
    "name": "WASHINGTON",
    "pickupLocations": [{
      "pickupLocationAddress": "2895 VT-110, Washington, VT 05675",
      "pickupLocationCoordinates": {
        "latitude": 44.10877139999999,
        "longitude": -72.43340049999999
      },
      "pickupLocationName": "Town Clerk's Office",
      "pickupNotes": "Bags available at Town Clerk's Office, Robert's Country Store, or the Library. Full\nbags can be brought to Fire Station 8:30\nto 12 on GU Day. No household trash\nplease!"
    }],
    "roadsideDropoffAllowed": false
  },
  "WATERBURY": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "1707 Guptil Rd., Waterbury, VT 05677",
      "dropoffLocationCoordinates": {
        "latitude": 44.37241,
        "longitude": -72.71908599999999
      },
      "dropoffLocationName": "Waterbury Town Garage"
    }],
    "name": "WATERBURY",
    "pickupLocations": [{
      "pickupLocationAddress": "28 N Main St #1, Waterbury, VT 05676",
      "pickupLocationCoordinates": {
        "latitude": 44.3397641,
        "longitude": -72.7585908
      },
      "pickupLocationName": "Town Office",
      "pickupNotes": "Bags available at Town Office, Library and Sunflower Market. Two drop-off locations: Town Garage on Guptil Rd. 9-3; Rodney's Rubbish at Crossroads Deli 8-12. Metal accepted at both. Rodney takes tires for a fee. Details at www.waterburyvt.com. Sign up online at Sign Up Genius: https://tinyurl.com/WaterburyGreenUp2017"
    }, {
      "pickupLocationAddress": "28 N Main St, Waterbury, VT 05676",
      "pickupLocationCoordinates": {
        "latitude": 44.3397641,
        "longitude": -72.7585908
      },
      "pickupLocationName": "Library",
      "pickupNotes": "Bags available at Town Office, Library and Sunflower Market. Two drop-off locations: Town Garage on Guptil Rd. 9-3; Rodney's Rubbish at Crossroads Deli 8-12. Metal accepted at both. Rodney takes tires for a fee. Details at www.waterburyvt.com. Sign up online at Sign Up Genius: https://tinyurl.com/WaterburyGreenUp2017"
    }, {
      "pickupLocationAddress": "2934 Waterbury Stowe Rd, Waterbury Center, VT 05677",
      "pickupLocationCoordinates": {
        "latitude": 44.3733108,
        "longitude": -72.7260151
      },
      "pickupLocationName": "Sunflower Market",
      "pickupNotes": "2 drop offs\nBags available at Town Office, Library and Sunflower Market. Two drop-off locations: Town Garage on Guptil Rd. 9-3; Rodney's Rubbish at Crossroads Deli 8-12. Metal accepted at both. Rodney takes tires for a fee. Details at www.waterburyvt.com. Sign up online at Sign Up Genius: https://tinyurl.com/WaterburyGreenUp2017"
    }],
    "roadsideDropoffAllowed": false
  },
  "WATERFORD": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "532 Maple St, Waterford, VT  05848",
      "dropoffLocationCoordinates": {
        "latitude": 44.3543917,
        "longitude": -71.9077404
      },
      "dropoffLocationName": "Transfer Station"
    }],
    "name": "WATERFORD",
    "pickupLocations": [{
      "pickupLocationAddress": "2661 Duck Pond Rd, Waterford, VT 05819",
      "pickupLocationCoordinates": {
        "latitude": 44.379403,
        "longitude": -71.954514
      },
      "pickupLocationName": "Fire Department",
      "pickupNotes": "pick up bags at Fire Dept. starting at 8am, return bags to Waterford Dump. If there are items that are too large please connect with coordinators on site at Waterford Fire Dept."
    }],
    "roadsideDropoffAllowed": true
  },
  "WATERVILLE": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "WATERVILLE",
    "pickupLocations": [{
      "pickupLocationAddress": "850 VT-109, Waterville, VT 05492",
      "pickupLocationCoordinates": {
        "latitude": 44.6933728,
        "longitude": -72.7662165
      },
      "pickupLocationName": "Town Clerk's Office",
      "pickupNotes": "Bags available at the Town Clerk's Office.\nLeave bags along roadsides.  "
    }],
    "roadsideDropoffAllowed": true
  },
  "WEATHERSFIELD": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "2656 Weathersfield Center Rd, Weathersfield,VT05151",
      "dropoffLocationCoordinates": {
        "latitude": 43.378994,
        "longitude": -72.46691899999999
      },
      "dropoffLocationName": "Dan Foster House"
    }],
    "name": "WEATHERSFIELD",
    "pickupLocations": [{
      "pickupLocationAddress": "2656 Weathersfield Center Rd, Weathersfield, VT 05151",
      "pickupLocationCoordinates": {
        "latitude": 43.378994,
        "longitude": -72.46691899999999
      },
      "pickupLocationName": "Dan Foster House",
      "pickupNotes": "Neighbor Green Up Association meets\nat the Dan Foster House 9-12 on\nGreen Up Day. Leave bags along roadsides, or bring to the Dan Foster House or take to the dump."
    }],
    "roadsideDropoffAllowed": true
  },
  "WELLS": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "WELLS",
    "pickupLocations": [{
      "pickupLocationAddress": "108 VT-30, Wells, VT 05774",
      "pickupLocationCoordinates": {
        "latitude": 43.416466,
        "longitude": -73.212459
      },
      "pickupLocationName": "Town Hall",
      "pickupNotes": "Meet at the Town Hall at 9am on GU Day\nfor bags, coffee and donuts provided.\nAfter pick up, come back to the Town\nHall at Noon for hot dogs and drinks. Leave bags along roadsides."
    }],
    "roadsideDropoffAllowed": true
  },
  "WESTFIELD": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "757 VT-100, Westfield, VT 05874",
      "dropoffLocationCoordinates": {
        "latitude": 44.892315,
        "longitude": -72.422104
      },
      "dropoffLocationName": "Westfield Recycling Center"
    }],
    "name": "WESTFIELD",
    "pickupLocations": [{
      "pickupLocationAddress": "757 Vt-100, Westfield, VT 05874",
      "pickupLocationCoordinates": {
        "latitude": 44.892315,
        "longitude": -72.422104
      },
      "pickupLocationName": "Westfield Recycling Center",
      "pickupNotes": "Stop by the Westfield Recycling Center, 757 VT Route 100, to pick up \nand drop off your Green Up bags. Hours:\nSaturdays 8 am to 12 pm."
    }],
    "roadsideDropoffAllowed": false
  },
  "WESTFORD": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "1713 VT Route 128, Westford, VT 05494",
      "dropoffLocationCoordinates": {
        "latitude": 44.612086,
        "longitude": -73.011004
      },
      "dropoffLocationName": "Westford Town Offices"
    }],
    "name": "WESTFORD",
    "pickupLocations": [{
      "pickupLocationAddress": "1713 VT-128, Westford, VT 05494",
      "pickupLocationCoordinates": {
        "latitude": 44.612086,
        "longitude": -73.011004
      },
      "pickupLocationName": "Town Clerk's Office",
      "pickupNotes": "Bags available at Town Clerk's Office. \nBring bags to the town dumpster."
    }],
    "roadsideDropoffAllowed": false
  },
  "WESTMINSTER": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "WESTMINSTER",
    "pickupLocations": [{
      "pickupLocationAddress": "3651 US-5, Westminster, VT 05158",
      "pickupLocationCoordinates": {
        "latitude": 43.0689954,
        "longitude": -72.4579937
      },
      "pickupLocationName": "Town Hall",
      "pickupNotes": "Bags available at Westminster West Library and Westminster Town Hall. Leave large items on roadsides with Green Up Bag attached for Monday pick up."
    }, {
      "pickupLocationAddress": "3409 Westminster West Road, Westminster, VT 05346",
      "pickupLocationCoordinates": {
        "latitude": 43.0647992,
        "longitude": -72.5414109
      },
      "pickupLocationName": "Westminster West Library",
      "pickupNotes": "Bags available at Westminster West Library and Westminster Town Hall. Leave large items on roadsides with Green Up Bag attached for Monday pick up."
    }],
    "roadsideDropoffAllowed": true
  },
  "WESTMORE": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "WESTMORE",
    "pickupLocations": [{
      "pickupLocationAddress": "",
      "pickupLocationName": "",
      "pickupNotes": "Bags available at Community Center\n9-12 on GU Day. Leave bags along roadsides, a town truck collects the bags. Pizza lunch at noon."
    }],
    "roadsideDropoffAllowed": true
  },
  "WESTON": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "429 Lawrence Hill Rd., Weston, VT 05161",
      "dropoffLocationCoordinates": {
        "latitude": 43.3168762,
        "longitude": -72.7896107
      },
      "dropoffLocationName": "Weston Recreation Area"
    }],
    "name": "WESTON",
    "pickupLocations": [{
      "pickupLocationAddress": "12 Lawrence Hill Rd, Weston, VT 05161",
      "pickupLocationCoordinates": {
        "latitude": 43.2912314,
        "longitude": -72.794054
      },
      "pickupLocationName": "Town Clerk's Office",
      "pickupNotes": "Bags available at the Town Clerk's Office.\nBring Green Up bags to the Town Truck at the Weston Recreation area."
    }],
    "roadsideDropoffAllowed": false
  },
  "WEST_FAIRLEE": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": "Town Recycling"
    }],
    "name": "WEST FAIRLEE",
    "pickupLocations": [{
      "pickupLocationAddress": "870 VT-113, West Fairlee, VT 05083",
      "pickupLocationCoordinates": {
        "latitude": 43.9097789,
        "longitude": -72.2627425
      },
      "pickupLocationName": "Town Office",
      "pickupNotes": "\nPick up bags at Town Office, drop\nat Town Recycling and Trash Depot, West\nFairlee Road. Bldg, crews will also be picking up bags left on roadsides."
    }],
    "roadsideDropoffAllowed": true
  },
  "WEST_HAVEN": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "WEST HAVEN",
    "pickupLocations": [{
      "pickupLocationAddress": "",
      "pickupLocationName": "",
      "pickupNotes": "Call Linda for bags, then leave on the\nroadside for pick up or bring to the\ndump, free of charge."
    }],
    "roadsideDropoffAllowed": true
  },
  "WEST_RUTLAND": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "WEST RUTLAND",
    "pickupLocations": [{
      "pickupLocationAddress": "35 Marble St, West Rutland, VT 05777",
      "pickupLocationCoordinates": {
        "latitude": 43.59478,
        "longitude": -73.04821
      },
      "pickupLocationName": "Town Hall",
      "pickupNotes": "pick up bags at Town Hall at 9am. \nLeave bags along roadsides for\ntown pick-up. Refreshments for\nvolunteers at noon at Town Hall."
    }],
    "roadsideDropoffAllowed": true
  },
  "WEST_WINDSOR": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "5024 VT Route 106, Perkinsville, VT 05151",
      "dropoffLocationCoordinates": {
        "latitude": 43.410191,
        "longitude": -72.5136179
      },
      "dropoffLocationName": "Weathersfield Transfer Station"
    }],
    "name": "WEST WINDSOR",
    "pickupLocations": [{
      "pickupLocationAddress": "22 Brownsville-Hartland Rd, West Windsor, VT 05089",
      "pickupLocationCoordinates": {
        "latitude": 43.4682511,
        "longitude": -72.4708647
      },
      "pickupLocationName": "Town Office",
      "pickupNotes": "Bags available at Town Office or at\nAlbert Bridge School on GU Day. Drop\nfull bags off at School from 8:30-3 or bring to Weathersfield Transfer Station at no charge."
    }],
    "roadsideDropoffAllowed": false
  },
  "WEYBRIDGE": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "WEYBRIDGE",
    "pickupLocations": [{
      "pickupLocationAddress": "227 Pond Ln, Middlebury, VT 05753",
      "pickupLocationCoordinates": {
        "latitude": 44.034588,
        "longitude": -73.17534
      },
      "pickupLocationName": "Town Recycling Center",
      "pickupNotes": "Green Up bags, the sign-up map and information are available at the Town Recycling Center prior to Green Up Day. Collected items can be left on roadsides to be picked up by the town road crew."
    }],
    "roadsideDropoffAllowed": true
  },
  "WHEELOCK": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "WHEELOCK",
    "pickupLocations": [{
      "pickupLocationAddress": "Municipal Building, 37 Dane Rd, Sheffield, VT 05866",
      "pickupLocationCoordinates": {
        "latitude": 44.6000514,
        "longitude": -72.1165967
      },
      "pickupLocationName": "Town Clerk's Office",
      "pickupNotes": "Bags available at Town Clerk's Office, Sheffield Transfer Station, and any of the posted warning bulletin board locations the week prior to GU Day. Bags can be left along roadsides or brought to Transfer Station 8-5 on GU Day."
    }],
    "roadsideDropoffAllowed": true
  },
  "WHITING": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "WHITING",
    "pickupLocations": [{
      "pickupLocationAddress": "29 S Main St, Whiting, VT 05778",
      "pickupLocationCoordinates": {
        "latitude": 43.86198,
        "longitude": -73.20079799999999
      },
      "pickupLocationName": "Town Clerk's Office",
      "pickupNotes": "Bags available at Town Clerk's Office. Leave bags along roadsides."
    }],
    "roadsideDropoffAllowed": true
  },
  "WHITINGHAM": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "4189 VT-100, Whitingham, VT 05361",
      "dropoffLocationCoordinates": {
        "latitude": 42.788624,
        "longitude": -72.838448
      },
      "dropoffLocationName": "Whitingham Transfer Station"
    }],
    "name": "WHITINGHAM",
    "pickupLocations": [{
      "pickupLocationAddress": "2948 VT-100, Jacksonville, VT 05342",
      "pickupLocationCoordinates": {
        "latitude": 42.798429,
        "longitude": -72.823039
      },
      "pickupLocationName": "Towne Hall",
      "pickupNotes": "Meet 9:30am Towne Hill, coffee and\ndonuts from Jacksonville Store.\nLunch by Whitingham Lions Club. Leave\nbags on roadsides and town crew will\npick up Monday. After that, bring bags to\nWhitingham Transfer Station.  "
    }],
    "roadsideDropoffAllowed": true
  },
  "WILLIAMSTOWN": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "WILLIAMSTOWN",
    "pickupLocations": [{
      "pickupLocationAddress": "2470 VT-14, Williamstown, VT 05679",
      "pickupLocationCoordinates": {
        "latitude": 44.1206086,
        "longitude": -72.5415436
      },
      "pickupLocationName": "Town Clerk's Office",
      "pickupNotes": "Bags available at the Town Clerk's Office.\nLeave bags along obvious roadsides for\nthe town to pick up during the week \nfollowing Green Up Day."
    }],
    "roadsideDropoffAllowed": true
  },
  "WILLISTON": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "WILLISTON",
    "pickupLocations": [{
      "pickupLocationAddress": "Town Hall Annex Building\n7878 Williston Road\nWilliston, VT 05495",
      "pickupLocationCoordinates": {
        "latitude": 44.43821,
        "longitude": -73.07296
      },
      "pickupLocationName": "Planning Office",
      "pickupNotes": "Bags will available the week before\nGUD for anyone wishing to get a \njump-start on clean up. A sign-up sheet\nand map is available in the Planning Office\nfor anyone wishing to reserve a spot\nof roadside to clean up. Leave bags\nalong roadsides."
    }],
    "roadsideDropoffAllowed": true
  },
  "WILMINGTON": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "WILMINGTON",
    "pickupLocations": [{
      "pickupLocationAddress": "2 E Main St, Wilmington, VT 05363",
      "pickupLocationCoordinates": {
        "latitude": 42.86836599999999,
        "longitude": -72.870766
      },
      "pickupLocationName": "Town Office",
      "pickupNotes": "Bag pick up and road selection prior to Green Up Day at Town Office or on the day at Buzzy Towne Park, 9-10:30. Free refreshments for volunteers 11:30-12:15 at Wilmington High School cafeteria. Secure full bags and Leave on roadsides at intersections or take to the truck at old Town Garage. Landfill will also accept Green Up Bags but ONLY during regular hours on the Sunday and Tuesday following Green Up Day."
    }],
    "roadsideDropoffAllowed": true
  },
  "WINDHAM": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "WINDHAM",
    "pickupLocations": [{
      "pickupLocationAddress": "5976 Windham Hill Road, Windham, VT 05359",
      "pickupLocationCoordinates": {
        "latitude": 43.166218,
        "longitude": -72.72552499999999
      },
      "pickupLocationName": "Town Office",
      "pickupNotes": "pick up bags at Town Office week prior GU Day or GU at 9am at Town Office. Leave full bags along roadsides for town crew to pick up. Worker appreciation lunch at 12 at MTG House."
    }],
    "roadsideDropoffAllowed": true
  },
  "WINDSOR": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "147 Main St, Windsor, VT 05089",
      "dropoffLocationCoordinates": {
        "latitude": 43.4775646,
        "longitude": -72.3872073
      },
      "dropoffLocationName": "Municipal Building"
    }],
    "name": "WINDSOR",
    "pickupLocations": [{
      "pickupLocationAddress": "29 Union St, Windsor, VT 05089",
      "pickupLocationCoordinates": {
        "latitude": 43.4764878,
        "longitude": -72.3926173
      },
      "pickupLocationName": "Fire Station",
      "pickupNotes": "Meet at Fire Station at 8:30am for bags\nand routes. Drop off FULL bags at\nMunicipal Bldg by 1pm or leave along\nroadside. Bagels, juice, coffee before; Community BBQ 11:30-12:30."
    }],
    "roadsideDropoffAllowed": true
  },
  "WINHALL": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "WINHALL",
    "pickupLocations": [{
      "pickupLocationAddress": "115 Vermont Route 30 Bondville, VT 05340",
      "pickupLocationCoordinates": {
        "latitude": 43.1863619,
        "longitude": -72.9349644
      },
      "pickupLocationName": "Town Offices",
      "pickupNotes": "Cookout for all GU Day volunteers. Leave \nbags along roadsides."
    }],
    "roadsideDropoffAllowed": true
  },
  "WINOOSKI": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "32 Malletts Bay Ave, Winooski, VT 05404",
      "dropoffLocationCoordinates": {
        "latitude": 44.498457,
        "longitude": -73.1910905
      },
      "dropoffLocationName": "O'Brien Community Center"
    }],
    "name": "WINOOSKI",
    "pickupLocations": [{
      "pickupLocationAddress": "32 Malletts Bay Ave, Winooski, VT 05404",
      "pickupLocationCoordinates": {
        "latitude": 44.4923392,
        "longitude": -73.1910905
      },
      "pickupLocationName": "O'Brien Community Center",
      "pickupNotes": "drop by the O'Brien Community Center  (32 Malletts Bay Ave.) from 9 to 12 to pick up bags, gloves, safety info. City staff will help you find an area of need if you don't already have one picked out. There will be a Myers trash receptable in the O'Brien Comm Center parking lot - feel free to drop your GU bags there. "
    }],
    "roadsideDropoffAllowed": true
  },
  "WOLCOTT": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "WOLCOTT",
    "pickupLocations": [{
      "pickupLocationAddress": "28 Railroad St, Wolcott, VT 05680",
      "pickupLocationCoordinates": {
        "latitude": 44.5442081,
        "longitude": -72.45823349999999
      },
      "pickupLocationName": "Town Clerk's Office",
      "pickupNotes": "Bags are available at Town Clerk's Office,\nthe Library and Transfer Station. Bring \nbags to Transfer Station Sat. or Sun., or\nleave well-secured bags in a visible area\nalong the roadside."
    }],
    "roadsideDropoffAllowed": true
  },
  "WOODBURY": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "63 Valley Lake Rd., Woodbury, VT 05681",
      "dropoffLocationCoordinates": {
        "latitude": 44.44003499999999,
        "longitude": -72.416224
      },
      "dropoffLocationName": "Woodbury Elementary"
    }],
    "name": "WOODBURY",
    "pickupLocations": [{
      "pickupLocationAddress": "1672 Route 14 Woodbury, VT 05681",
      "pickupLocationCoordinates": {
        "latitude": 44.4147335,
        "longitude": -72.4179186
      },
      "pickupLocationName": "Town Clerk's Office",
      "pickupNotes": "pick up bags at town clerk's office &\nWoodbury Village Store. Drop off\nat Woodbury Elem. 9-1 on Green Up Day."
    }],
    "roadsideDropoffAllowed": false
  },
  "WOODFORD": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "WOODFORD",
    "pickupLocations": [{
      "pickupLocationAddress": "1391 VT-9, Woodford, VT 05201",
      "pickupLocationCoordinates": {
        "latitude": 42.8965791,
        "longitude": -73.1308655
      },
      "pickupLocationName": "Town Clerk's Office",
      "pickupNotes": "Bags available at Town Clerk's Office. Leave bags along roadsides."
    }],
    "roadsideDropoffAllowed": true
  },
  "WOODSTOCK": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "463 Route 4, Woodstock, VT 05091",
      "dropoffLocationCoordinates": {
        "latitude": 43.545761,
        "longitude": -72.576499
      },
      "dropoffLocationName": "West Woodstock Town Garage"
    }],
    "name": "WOODSTOCK",
    "pickupLocations": [{
      "pickupLocationAddress": "31 The Green, Woodstock, VT 05091",
      "pickupLocationCoordinates": {
        "latitude": 43.6231674,
        "longitude": -72.5217306
      },
      "pickupLocationName": "Town Office",
      "pickupNotes": "Bags available at Town Office. Bring bags\nto the Town Garage, West Woodstock, on\nRoute 4 on Green Up Day."
    }],
    "roadsideDropoffAllowed": false
  },
  "WORCESTER": {
    "dropoffLocations": [{
      "dropoffLocationAddress": "Leave on roadsides at intersections.",
      "dropoffLocationName": ""
    }],
    "name": "WORCESTER",
    "pickupLocations": [{
      "pickupLocationAddress": "",
      "pickupLocationName": "",
      "pickupNotes": "Get bags at dump week before and/or on Green Up Day. Pick an area you want to do or contact coordinator for areas that need attention. Leave bags on roadsides or bring to dump on Green Up Day."
    }],
    "roadsideDropoffAllowed": true
  }
};


Object.keys(townData).forEach(key => updateTown(key, townData[key]));




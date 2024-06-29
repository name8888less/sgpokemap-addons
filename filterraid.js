var overlayGrey;

L.GridLayer.OverlayGrey = L.GridLayer.extend({
    createTile: function(e) {
        var i = document.createElement("div");
        return i.style.background = "#000000", i;
    }
});

var isOverlay = !1;
function toggleOverlay() {
    isOverlay ? (overlayGrey && map.removeLayer(overlayGrey), isOverlay = !1, $("#map").removeClass("grey")) : (isOverlay = !0,
        (overlayGrey = new L.GridLayer.OverlayGrey()).setOpacity(.6), map.addLayer(overlayGrey),
        $("#map").addClass("grey"));
}

if (typeof isFirstTime === 'undefined') {
    var isFirstTime = 1;
}

var filterMonIds = [];
var filterForms = [];
var isFilterForm = false;
var timeLessFilter = Number.MAX_VALUE;
var timeMoreFilter = 0;
var isNonBoosted = false;
var regex12pm = /04\:0[0-9]\:00 GMT$/g;
var regex1pm = /05\:0[0-9]\:00 GMT$/g;
var regex5pm = /09\:0[0-9]\:00 GMT$/g;
var regex6pm = /10\:0[0-9]\:00 GMT$/g;
var isFilterMRT = false;
var isFilterMall = false;

var trainStations =
    {"type":"FeatureCollection", "features":[
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.85561173062341,1.2932599009494303,0]},"properties":{"STN_NAME":"ESPLANADE MRT STATION","STN_NO":"CC3"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.84583316073947,1.299044203384764,0]},"properties":{"STN_NAME":"DHOBY GHAUT MRT STATION","STN_NO":"NS24"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.84532983561435,1.299694024466602,0]},"properties":{"STN_NAME":"DHOBY GHAUT MRT STATION","STN_NO":"NE6/CC1"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.88866829966116,1.3083751546214843,0]},"properties":{"STN_NAME":"DAKOTA MRT STATION","STN_NO":"CC8"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.86283780108856,1.3073717303890129,0]},"properties":{"STN_NAME":"LAVENDER MRT STATION","STN_NO":"EW11"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.89042878872351,1.386747512734503,0]},"properties":{"STN_NAME":"RENJONG LRT STATION","STN_NO":"SW8"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.77864915459597,1.3113946904069196,0]},"properties":{"STN_NAME":"DOVER MRT STATION","STN_NO":"EW22"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.89234753391662,1.3712811751529235,0]},"properties":{"STN_NAME":"HOUGANG MRT STATION","STN_NO":"NE14"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.75803362285004,1.3786249497953047,0]},"properties":{"STN_NAME":"PHOENIX LRT STATION","STN_NO":"BP5"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.88290604375955,1.3164324723857468,0]},"properties":{"STN_NAME":"ALJUNIED MRT STATION","STN_NO":"EW9"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.90591743982401,1.3993617069380266,0]},"properties":{"STN_NAME":"COVE LRT STATION","STN_NO":"PE1"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.94925763848818,1.3729518745158256,0]},"properties":{"STN_NAME":"PASIR RIS MRT STATION","STN_NO":"EW1"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.80097700914163,1.4405870900082864,0]},"properties":{"STN_NAME":"ADMIRALTY MRT STATION","STN_NO":"NS10"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.91294752745763,1.321038068038333,0]},"properties":{"STN_NAME":"KEMBANGAN MRT STATION","STN_NO":"EW6"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.90653551174194,1.4169108528743322,0]},"properties":{"STN_NAME":"PUNGGOL POINT LRT STATION","STN_NO":"PW3"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.77419400299034,1.4325651685513614,0]},"properties":{"STN_NAME":"MARSILING MRT STATION","STN_NO":"NS8"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.90055527796933,1.3944787834858985,0]},"properties":{"STN_NAME":"COMPASSVALE LRT STATION","STN_NO":"SE1"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.83303805986155,1.4175768090823948,0]},"properties":{"STN_NAME":"KHATIB MRT STATION","STN_NO":"NS14"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.88015787537199,1.3920928726172905,0]},"properties":{"STN_NAME":"LAYAR LRT STATION","STN_NO":"SW6"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.93842947027022,1.3455175068462661,0]},"properties":{"STN_NAME":"TAMPINES WEST MRT STATION","STN_NO":"DT31"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.94515900808285,1.3532891912813054,0]},"properties":{"STN_NAME":"TAMPINES MRT STATION","STN_NO":"EW2/DT32"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.95480497267494,1.3562130027776897,0]},"properties":{"STN_NAME":"TAMPINES EAST MRT STATION","STN_NO":"DT33"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.88816447597824,1.3354531040617397,0]},"properties":{"STN_NAME":"TAI SENG MRT STATION","STN_NO":"CC11"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.8985102871743,1.4083532970180046,0]},"properties":{"STN_NAME":"SUMANG LRT STATION","STN_NO":"PW6"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.8260230265597,1.3200659549231024,0]},"properties":{"STN_NAME":"STEVENS MRT STATION","STN_NO":"DT10"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.87534796324131,1.3028541001828093,0]},"properties":{"STN_NAME":"STADIUM MRT STATION","STN_NO":"CC6"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.7973204601208,1.330784858269842,0]},"properties":{"STN_NAME":"SIXTH AVENUE MRT STATION","STN_NO":"DT7"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.74529180004276,1.3802982863129025,0]},"properties":{"STN_NAME":"SOUTH VIEW LRT STATION","STN_NO":"BP2"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.89723440867354,1.405209646785964,0]},"properties":{"STN_NAME":"SOO TECK LRT STATION","STN_NO":"PW7"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.83907542830809,1.3002576150886087,0]},"properties":{"STN_NAME":"SOMERSET MRT STATION","STN_NO":"NS23"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.95337711850789,1.3431974386437018,0]},"properties":{"STN_NAME":"SIMEI MRT STATION","STN_NO":"EW3"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.87246307197942,1.3505310712733343,0]},"properties":{"STN_NAME":"SERANGOON MRT STATION","STN_NO":"NE12/CC13"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.89541608066651,1.391527681494754,0]},"properties":{"STN_NAME":"SENGKANG MRT STATION","STN_NO":"NE16"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.84679989936919,1.3404441148884783,0]},"properties":{"STN_NAME":"BRADDELL MRT STATION","STN_NO":"NS18"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.84381813023617,1.3204300813936305,0]},"properties":{"STN_NAME":"NOVENA MRT STATION","STN_NO":"NS20"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.85427015829777,1.31244822841403,0]},"properties":{"STN_NAME":"FARRER PARK MRT STATION","STN_NO":"NE8"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.93017252059782,1.3240113193986303,0]},"properties":{"STN_NAME":"BEDOK MRT STATION","STN_NO":"EW5"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.81679002803307,1.2896195393319367,0]},"properties":{"STN_NAME":"REDHILL MRT STATION","STN_NO":"EW18"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.9883705805094,1.357307931356581,0]},"properties":{"STN_NAME":"CHANGI AIRPORT MRT STATION","STN_NO":"CG2"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.9125635352806,1.3939263508217181,0]},"properties":{"STN_NAME":"CORAL EDGE LRT STATION","STN_NO":"PE3"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.7652330288461,1.3150782275151478,0]},"properties":{"STN_NAME":"CLEMENTI MRT STATION","STN_NO":"EW23"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.74954065562673,1.3489966462240186,0]},"properties":{"STN_NAME":"BUKIT BATOK MRT STATION","STN_NO":"NS2"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.91263185203269,1.4023508796837036,0]},"properties":{"STN_NAME":"OASIS LRT STATION","STN_NO":"PE6"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.90029894818585,1.4117555857480226,0]},"properties":{"STN_NAME":"NIBONG LRT STATION","STN_NO":"PW5"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.90899093869159,1.3968523393495336,0]},"properties":{"STN_NAME":"MERIDIAN LRT STATION","STN_NO":"PE2"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.751910108784,1.3586719215924337,0]},"properties":{"STN_NAME":"BUKIT GOMBAK MRT STATION","STN_NO":"NS3"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.90336181865298,1.3197792315237014,0]},"properties":{"STN_NAME":"EUNOS MRT STATION","STN_NO":"EW7"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.73281439458322,1.3421449755958934,0]},"properties":{"STN_NAME":"CHINESE GARDEN MRT STATION","STN_NO":"EW25"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.91639497898551,1.3996385100843867,0]},"properties":{"STN_NAME":"KADALOOR LRT STATION","STN_NO":"PE5"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.89390790849662,1.3962489158283489,0]},"properties":{"STN_NAME":"CHENG LIM LRT STATION","STN_NO":"SW1"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.90483111294122,1.4096137640054964,0]},"properties":{"STN_NAME":"SAM KEE LRT STATION","STN_NO":"PW1"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.76218063472083,1.4252396282240634,0]},"properties":{"STN_NAME":"KRANJI MRT STATION","STN_NO":"NS7"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.84961635261263,1.3699486593657542,0]},"properties":{"STN_NAME":"ANG MO KIO MRT STATION","STN_NO":"NS16"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.91622379029712,1.3946364782993537,0]},"properties":{"STN_NAME":"RIVIERA LRT STATION","STN_NO":"PE4"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.77266121865271,1.380015493755169,0]},"properties":{"STN_NAME":"BANGKIT LRT STATION","STN_NO":"BP9"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.79134196548938,1.2762296708847938,0]},"properties":{"STN_NAME":"PASIR PANJANG MRT STATION","STN_NO":"CC26"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.79623333609311,1.3119456172770718,0]},"properties":{"STN_NAME":"HOLLAND VILLAGE MRT STATION","STN_NO":"CC21"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.80292770505278,1.2723234942723949,0]},"properties":{"STN_NAME":"LABRADOR PARK MRT STATION","STN_NO":"CC27"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.78739399247789,1.2996564796266796,0]},"properties":{"STN_NAME":"ONE-NORTH MRT STATION","STN_NO":"CC23"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.78449793871918,1.2934009384330016,0]},"properties":{"STN_NAME":"KENT RIDGE MRT STATION","STN_NO":"CC24"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.7818213289144,1.282502902015137,0]},"properties":{"STN_NAME":"HAW PAR VILLA MRT STATION","STN_NO":"CC25"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.85514510996322,1.2759503528157061,0]},"properties":{"STN_NAME":"MARINA BAY MRT STATION","STN_NO":"NS27/TE20/CE2"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.78387153256662,1.3356381114288016,0]},"properties":{"STN_NAME":"KING ALBERT PARK MRT STATION","STN_NO":"DT6"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.84861049977016,1.3071673594980835,0]},"properties":{"STN_NAME":"LITTLE INDIA MRT STATION","STN_NO":"NE7/DT12"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.85243888615399,1.3039275604923835,0]},"properties":{"STN_NAME":"ROCHOR MRT STATION","STN_NO":"DT13"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.76236875421982,1.3826992422861184,0]},"properties":{"STN_NAME":"SENJA LRT STATION","STN_NO":"BP13"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.8825470148321,1.3061937868831142,0]},"properties":{"STN_NAME":"MOUNTBATTEN MRT STATION","STN_NO":"CC7"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.74436906787247,1.385172051668049,0]},"properties":{"STN_NAME":"CHOA CHU KANG MRT STATION","STN_NO":"NS4"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.86168108598153,1.319447090270205,0]},"properties":{"STN_NAME":"BOON KENG MRT STATION","STN_NO":"NE9"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.87972518721065,1.3428468443862047,0]},"properties":{"STN_NAME":"BARTLEY MRT STATION","STN_NO":"CC12"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.76965965406185,1.3877564083512886,0]},"properties":{"STN_NAME":"SEGAR LRT STATION","STN_NO":"BP11"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.76742925214808,1.3623400892682034,0]},"properties":{"STN_NAME":"HILLVIEW MRT STATION","STN_NO":"DT3"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.77581897726583,1.3412035624480045,0]},"properties":{"STN_NAME":"BEAUTY WORLD MRT STATION","STN_NO":"DT5"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.76157274134091,1.3791601969823695,0]},"properties":{"STN_NAME":"BUKIT PANJANG MRT STATION","STN_NO":"DT1"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.7646971910385,1.3693615842520943,0]},"properties":{"STN_NAME":"CASHEW MRT STATION","STN_NO":"DT2"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.67838692917199,1.3277168591173076,0]},"properties":{"STN_NAME":"JOO KOON MRT STATION","STN_NO":"EW29"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.74740209348056,1.3975496330935027,0]},"properties":{"STN_NAME":"YEW TEE MRT STATION","STN_NO":"NS5"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.83497216228058,1.429581751461734,0]},"properties":{"STN_NAME":"YISHUN MRT STATION","STN_NO":"NS13"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.8448008229673,1.3817576068571917,0]},"properties":{"STN_NAME":"YIO CHU KANG MRT STATION","STN_NO":"NS15"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.87080919016014,1.3392070875067632,0]},"properties":{"STN_NAME":"WOODLEIGH MRT STATION","STN_NO":"NE11"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.78616372611927,1.4368311613524305,0]},"properties":{"STN_NAME":"WOODLANDS MRT STATION","STN_NO":"NS9/TE2"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.96147329751314,1.3417404790613534,0]},"properties":{"STN_NAME":"UPPER CHANGI MRT STATION","STN_NO":"DT34"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.84831284910886,1.2822805847293668,0]},"properties":{"STN_NAME":"TELOK AYER MRT STATION","STN_NO":"DT18"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.88593735823048,1.3893387806248023,0]},"properties":{"STN_NAME":"TONGKANG LRT STATION","STN_NO":"SW7"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.8992488669183,1.329955264869907,0]},"properties":{"STN_NAME":"UBI MRT STATION","STN_NO":"DT27"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.8474212170976,1.3326773927956015,0]},"properties":{"STN_NAME":"TOA PAYOH MRT STATION","STN_NO":"NS19"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.82703434033637,1.2862197406629308,0]},"properties":{"STN_NAME":"TIONG BAHRU MRT STATION","STN_NO":"EW17"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.87565537215052,1.3974369934620543,0]},"properties":{"STN_NAME":"THANGGAM LRT STATION","STN_NO":"SW4"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.86099644353527,1.2932501664155338,0]},"properties":{"STN_NAME":"PROMENADE MRT STATION","STN_NO":"CC4/DT15"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.85065551166069,1.2968267736068328,0]},"properties":{"STN_NAME":"BRAS BASAH MRT STATION","STN_NO":"CC2"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.86363313811044,1.2998028299333464,0]},"properties":{"STN_NAME":"NICOLL HIGHWAY MRT STATION","STN_NO":"CC5"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.86906995781871,1.3313873887636662,0]},"properties":{"STN_NAME":"POTONG PASIR MRT STATION","STN_NO":"NE10"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.72096532016222,1.3442631497501256,0]},"properties":{"STN_NAME":"LAKESIDE MRT STATION","STN_NO":"EW26"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.90208724224593,1.4158186973347169,0]},"properties":{"STN_NAME":"SAMUDERA LRT STATION","STN_NO":"PW4"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.89749260349976,1.3839214793059065,0]},"properties":{"STN_NAME":"RANGGUNG LRT STATION","STN_NO":"SE5"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.82019386140993,1.4490696337624938,0]},"properties":{"STN_NAME":"SEMBAWANG MRT STATION","STN_NO":"NS11"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.90239279920216,1.4051667769393872,0]},"properties":{"STN_NAME":"PUNGGOL LRT STATION","STN_NO":"PTC"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.9022575505506,1.384030767352556,0]},"properties":{"STN_NAME":"KANGKAR LRT STATION","STN_NO":"SE4"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.89304886910608,1.318113387569979,0]},"properties":{"STN_NAME":"PAYA LEBAR MRT STATION","STN_NO":"EW8/CC9"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.69731852705604,1.3375865013018209,0]},"properties":{"STN_NAME":"PIONEER MRT STATION","STN_NO":"EW28"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.8558393480102,1.3006268207577478,0]},"properties":{"STN_NAME":"BUGIS MRT STATION","STN_NO":"EW12/DT14"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.83798766461918,1.312322284496346,0]},"properties":{"STN_NAME":"NEWTON MRT STATION","STN_NO":"NS21/DT11"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.78994227956314,1.3072583228050314,0]},"properties":{"STN_NAME":"BUONA VISTA MRT STATION","STN_NO":"EW21/CC22"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.84347988591063,1.2843575513396164,0]},"properties":{"STN_NAME":"CHINATOWN MRT STATION","STN_NO":"NE4"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.84447090551475,1.2846459609903658,0]},"properties":{"STN_NAME":"CHINATOWN MRT STATION","STN_NO":"DT19"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.85145931527605,1.2840672709168361,0]},"properties":{"STN_NAME":"RAFFLES PLACE MRT STATION","STN_NO":"EW14/NS26"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.64906349780131,1.3210532517669453,0]},"properties":{"STN_NAME":"TUAS CRESCENT MRT STATION","STN_NO":"EW31"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.63681865801449,1.3403799475083573,0]},"properties":{"STN_NAME":"TUAS LINK MRT STATION","STN_NO":"EW33"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.63962756181238,1.3299818235881533,0]},"properties":{"STN_NAME":"TUAS WEST ROAD MRT STATION","STN_NO":"EW32"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.81615888843221,1.322401507237944,0]},"properties":{"STN_NAME":"BOTANIC GARDENS MRT STATION","STN_NO":"CC19/DT9"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.8526085041432,1.2929332374692004,0]},"properties":{"STN_NAME":"CITY HALL MRT STATION","STN_NO":"EW13/NS25"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.83914018144303,1.281412282654493,0]},"properties":{"STN_NAME":"OUTRAM PARK MRT STATION","STN_NO":"EW16/TE17"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.83948660551037,1.2798362265777636,0]},"properties":{"STN_NAME":"OUTRAM PARK MRT STATION","STN_NO":"NE3"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.84814352687101,1.3508383853898307,0]},"properties":{"STN_NAME":"BISHAN MRT STATION","STN_NO":"NS17/CC15"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.96154622937273,1.334549361030716,0]},"properties":{"STN_NAME":"EXPO MRT STATION","STN_NO":"CG1/DT35"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.87627965663359,1.3919441926130998,0]},"properties":{"STN_NAME":"FERNVALE LRT STATION","STN_NO":"SW5"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.90237397827528,1.4051325907556078,0]},"properties":{"STN_NAME":"PUNGGOL MRT STATION","STN_NO":"NE17"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.89309246897308,1.3827715834893815,0]},"properties":{"STN_NAME":"BUANGKOK MRT STATION","STN_NO":"NE15"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.90552634650717,1.3881050158134636,0]},"properties":{"STN_NAME":"BAKAU LRT STATION","STN_NO":"SE3"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.88938286091724,1.3971619024754292,0]},"properties":{"STN_NAME":"FARMWAY LRT STATION","STN_NO":"SW2"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.79829071923551,1.3024476467430925,0]},"properties":{"STN_NAME":"COMMONWEALTH MRT STATION","STN_NO":"EW20"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.88137428349071,1.39819757839629,0]},"properties":{"STN_NAME":"KUPANG LRT STATION","STN_NO":"SW3"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.90850357798917,1.4053160222898022,0]},"properties":{"STN_NAME":"DAMAI LRT STATION","STN_NO":"PE7"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.80604523687657,1.2946113316842758,0]},"properties":{"STN_NAME":"QUEENSTOWN MRT STATION","STN_NO":"EW19"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.87131526347633,1.311396642037097,0]},"properties":{"STN_NAME":"KALLANG MRT STATION","STN_NO":"EW10"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.90589048249586,1.3915644451333637,0]},"properties":{"STN_NAME":"RUMBIA LRT STATION","STN_NO":"SE2"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.7666673121211,1.3777546493939663,0]},"properties":{"STN_NAME":"PETIR LRT STATION","STN_NO":"BP7"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.70605907221368,1.338604023465076,0]},"properties":{"STN_NAME":"BOON LAY MRT STATION","STN_NO":"EW27"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.74905150334794,1.3786121666958262,0]},"properties":{"STN_NAME":"KEAT HONG LRT STATION","STN_NO":"BP3"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.76450057701854,1.386696674492622,0]},"properties":{"STN_NAME":"JELAPANG LRT STATION","STN_NO":"BP12"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.74454911669473,1.3848220120716181,0]},"properties":{"STN_NAME":"CHOA CHU KANG LRT STATION","STN_NO":"BP1"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.89543625945798,1.3915744419839071,0]},"properties":{"STN_NAME":"SENGKANG LRT STATION","STN_NO":"STC"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.82145073544119,1.26545734889355,0]},"properties":{"STN_NAME":"HARBOURFRONT MRT STATION","STN_NO":"NE1/CC29"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.77127974972748,1.3761265375660006,0]},"properties":{"STN_NAME":"PENDING LRT STATION","STN_NO":"BP8"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.84660479428645,1.288542216796838,0]},"properties":{"STN_NAME":"CLARKE QUAY MRT STATION","STN_NO":"NE5"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.76302226977599,1.3779164476394574,0]},"properties":{"STN_NAME":"BUKIT PANJANG LRT STATION","STN_NO":"BP6"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.77083795572673,1.3845326784839422,0]},"properties":{"STN_NAME":"FAJAR LRT STATION","STN_NO":"BP10"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.88509111605632,1.3601798705902899,0]},"properties":{"STN_NAME":"KOVAN MRT STATION","STN_NO":"NE13"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.86414412693081,1.3516197560286856,0]},"properties":{"STN_NAME":"LORONG CHUAN MRT STATION","STN_NO":"CC14"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.8394128450996,1.348776656736364,0]},"properties":{"STN_NAME":"MARYMOUNT MRT STATION","STN_NO":"CC16"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.83954121444613,1.3376585477902705,0]},"properties":{"STN_NAME":"CALDECOTT MRT STATION","STN_NO":"CC17/TE9"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.85285112582106,1.2794414875995088,0]},"properties":{"STN_NAME":"DOWNTOWN MRT STATION","STN_NO":"DT17"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.8719114641555,1.3215128864646883,0]},"properties":{"STN_NAME":"GEYLANG BAHRU MRT STATION","STN_NO":"DT24"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.86289119803135,1.3136449959266017,0]},"properties":{"STN_NAME":"BENDEMEER MRT STATION","STN_NO":"DT23"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.85024488974244,1.2987271895563173,0]},"properties":{"STN_NAME":"BENCOOLEN MRT STATION","STN_NO":"DT21"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.84432545085102,1.292471594435263,0]},"properties":{"STN_NAME":"FORT CANNING MRT STATION","STN_NO":"DT20"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.90845515798405,1.334962978846182,0]},"properties":{"STN_NAME":"KAKI BUKIT MRT STATION","STN_NO":"DT28"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.85543504052086,1.3053804827193765,0]},"properties":{"STN_NAME":"JALAN BESAR MRT STATION","STN_NO":"DT22"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.8832530602275,1.3268656822602558,0]},"properties":{"STN_NAME":"MATTAR MRT STATION","STN_NO":"DT25"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.85907645399939,1.281871911967996,0]},"properties":{"STN_NAME":"BAYFRONT MRT STATION","STN_NO":"DT16/CE1"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.80748912479956,1.3174545710295467,0]},"properties":{"STN_NAME":"FARRER ROAD MRT STATION","STN_NO":"CC20"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.74226323339667,1.3332090241725911,0]},"properties":{"STN_NAME":"JURONG EAST MRT STATION","STN_NO":"EW24/NS1"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.91787672326646,1.3347556341800584,0]},"properties":{"STN_NAME":"BEDOK NORTH MRT STATION","STN_NO":"DT29"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.93228754735745,1.3365987361021556,0]},"properties":{"STN_NAME":"BEDOK RESERVOIR MRT STATION","STN_NO":"DT30"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.83221933077252,1.3039377458076034,0]},"properties":{"STN_NAME":"ORCHARD MRT STATION","STN_NO":"NS22/TE14"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.83634746191672,1.384931206774953,0]},"properties":{"STN_NAME":"LENTOR MRT STATION","STN_NO":"TE5"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.83293672072759,1.3632672642374026,0]},"properties":{"STN_NAME":"BRIGHT HILL MRT STATION","STN_NO":"TE7"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.81792447452729,1.3981083797467917,0]},"properties":{"STN_NAME":"SPRINGLEAF MRT STATION","STN_NO":"TE4"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.86291089314074,1.2713773809335958,0]},"properties":{"STN_NAME":"MARINA SOUTH PIER MRT STATION","STN_NO":"NS28"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.88937168307221,1.3260906197339795,0]},"properties":{"STN_NAME":"MACPHERSON MRT STATION","STN_NO":"CC10/DT26"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.82971485192977,1.4431183773154044,0]},"properties":{"STN_NAME":"CANBERRA MRT STATION","STN_NO":"NS12"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.79389595243991,1.4270954766495594,0]},"properties":{"STN_NAME":"WOODLANDS SOUTH MRT STATION","STN_NO":"TE3"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.78567472141204,1.448350098392784,0]},"properties":{"STN_NAME":"WOODLANDS NORTH MRT STATION","STN_NO":"TE1"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.66059386900518,1.3195643150447596,0]},"properties":{"STN_NAME":"GUL CIRCLE MRT STATION","STN_NO":"EW30"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.80973975637572,1.2705817862905866,0]},"properties":{"STN_NAME":"TELOK BLANGAH MRT STATION","STN_NO":"CC28"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.75369963146771,1.3766592935410333,0]},"properties":{"STN_NAME":"TECK WHYE LRT STATION","STN_NO":"BP4"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.90662621156888,1.4128738703520465,0]},"properties":{"STN_NAME":"TECK LEE LRT STATION","STN_NO":"PW2"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.84585358345394,1.276515031949292,0]},"properties":{"STN_NAME":"TANJONG PAGAR MRT STATION","STN_NO":"EW15"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.94654794350295,1.3272540815765557,0]},"properties":{"STN_NAME":"TANAH MERAH MRT STATION","STN_NO":"EW4"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.8073308653134,1.3258706039812675,0]},"properties":{"STN_NAME":"TAN KAH KEE MRT STATION","STN_NO":"DT8"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.83292375588513,1.3544050504962823,0]},"properties":{"STN_NAME":"UPPER THOMSON MRT STATION","STN_NO":"TE8"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.83679077026878,1.372103173214586,0]},"properties":{"STN_NAME":"MAYFLOWER MRT STATION","STN_NO":"TE6"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.83514512581047,1.3288221699613154,0]},"properties":{"STN_NAME":"MOUNT PLEASANT STATION","STN_NO":"TE10"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.82564595280004,1.3190566669229433,0]},"properties":{"STN_NAME":"STEVENS STATION","STN_NO":"TE11"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.81964293451063,1.3059990826226315,0]},"properties":{"STN_NAME":"NAPIER STATION","STN_NO":"TE12"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.8241468057633, 1.3033955370657384,0]},"properties":{"STN_NAME":"Orchard Boulevard MRT Station","STN_NO":"TE13"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.83124995280009,1.3034840590458456,0]},"properties":{"STN_NAME":"Orchard MRT Station","STN_NO":"TE14"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.8332676883545,1.2950044072300018,0]},"properties":{"STN_NAME":"Great World MRT Station","STN_NO":"TE15"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.8332310008689,1.2902826131866092,0]},"properties":{"STN_NAME":"Havelock MRT Station","STN_NO":"TE16"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.84416199882094,1.2810108837260448,0]},"properties":{"STN_NAME":"Maxwell MRT Station","STN_NO":"TE18"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.85072431231575,1.2779951317698028,0]},"properties":{"STN_NAME":"Shenton Way MRT Station","STN_NO":"TE19"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.85449212581052,1.2754249702838976,0]},"properties":{"STN_NAME":"Marina Bay MRT Station","STN_NO":"TE20"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.86292469213163,1.2743718128650756,0]},"properties":{"STN_NAME":"Marina South MRT Station","STN_NO":"TE21"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.86792285280015,1.2799968838540665,0]},"properties":{"STN_NAME":"Gardens By The Bay MRT Station","STN_NO":"TE22"}}
    ]};

var malls =
    {"type":"FeatureCollection", "features":[
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.84347073660999,1.27458821795427,0]},"properties":{"NAME":"100 AM"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.905098915055,1.30508681845447,0]},"properties":{"NAME":"112 KATONG"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.837684350436,1.3013851021471399,0]},"properties":{"NAME":"313@SOMERSET"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.764960537008,1.3120249182444,0]},"properties":{"NAME":"321 CLEMENTI"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.850955458676,1.33404171129957,0]},"properties":{"NAME":"600 @ TOA PAYOH"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.795289911954,1.4371305244487,0]},"properties":{"NAME":"888 PLAZA"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.848467911464,1.36922321403002,0]},"properties":{"NAME":"AMK HUB"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.80179101959499,1.43988095490574,0]},"properties":{"NAME":"ADMIRALTY PLACE"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.801375038176,1.2738426388845099,0]},"properties":{"NAME":"ALEXANDRA RETAIL CENTRE"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.805607779399,1.28893477974498,0]},"properties":{"NAME":"ANCHORPOINT"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.864101647509,1.3097424203235601,0]},"properties":{"NAME":"APERIA"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.843709493566,1.32612416875662,0]},"properties":{"NAME":"BALESTIER HILL SHOPPING CENTRE"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.776539385678,1.3424126418864297,0]},"properties":{"NAME":"BEAUTY WORLD CENTRE"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.776304121109,1.34178799847022,0]},"properties":{"NAME":"BEAUTY WORLD PLAZA"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.92940545649,1.3246689739690902,0]},"properties":{"NAME":"BEDOK MALL"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.932384005117,1.32480102552269,0]},"properties":{"NAME":"BEDOK POINT"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.744879157153,1.33183269839976,0]},"properties":{"NAME":"BIG BOX"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.855655544739,1.29819500487879,0]},"properties":{"NAME":"BUGIS CUBE"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.85619157165199,1.3001178934309399,0]},"properties":{"NAME":"BUGIS JUNCTION"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.855204142122,1.30075921013125,0]},"properties":{"NAME":"BUGIS+"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.76431706853501,1.3799165066522399,0]},"properties":{"NAME":"BUKIT PANJANG PLAZA"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.851293463737,1.2930633587734799,0]},"properties":{"NAME":"CAPITOL PIAZZA"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.836444792111,1.30149743442988,0]},"properties":{"NAME":"CATHAY CINELEISURE ORCHARD"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.78600997367799,1.43608867729913,0]},"properties":{"NAME":"CAUSEWAY POINT"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.94378481243099,1.3523611314355002,0]},"properties":{"NAME":"CENTURY SQUARE"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.852544637414,1.28412271103558,0]},"properties":{"NAME":"CHANGE ALLEY"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.989276642386,1.3563414213584501,0]},"properties":{"NAME":"CHANGI AIRPORT"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.96291761553101,1.3340363790270802,0]},"properties":{"NAME":"CHANGI CITY POINT"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.844942912343,1.28526073702918,0]},"properties":{"NAME":"CHINATOWN POINT"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.85678076298599,1.3114774495223402,0]},"properties":{"NAME":"CITY SQUARE MALL"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.85466296886801,1.2923786067095901,0]},"properties":{"NAME":"CITYLINK MALL"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.76459643930401,1.3155535427795,0]},"properties":{"NAME":"CLEMENTI MALL"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.89498002538299,1.3920941559405202,0]},"properties":{"NAME":"COMPASS ONE"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.81097183537399,1.29270252655149,0]},"properties":{"NAME":"DAWSON PLACE"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.81014259576901,1.2808649386093,0]},"properties":{"NAME":"DEPOT HEIGHTS SHOPPING CENTRE"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.929604640137,1.3260531991057098,0]},"properties":{"NAME":"DJITSUN MALL"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.95477359288999,1.3777758420954298,0]},"properties":{"NAME":"DOWNTOWN EAST"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.857996795149,1.29921662121833,0]},"properties":{"NAME":"DUO"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.849383935394,1.3316765687873,0]},"properties":{"NAME":"ERA APAC CENTRE"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.95307233895399,1.3425864408894,0]},"properties":{"NAME":"EASTPOINT MALL"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.942364336974,1.3778287661646598,0]},"properties":{"NAME":"ELIAS MALL"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.855665761542,1.28950956232932,0]},"properties":{"NAME":"ESPLANADE MALL"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.67841055156299,1.3256176410229599,0]},"properties":{"NAME":"FAIRPRICE HUB"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.771029603101,1.3840058246629598,0]},"properties":{"NAME":"FAJAR SHOPPING CENTRE"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.833939963454,1.30731112598869,0]},"properties":{"NAME":"FAR EAST PLAZA"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.881167324822,1.3963155184234,0]},"properties":{"NAME":"FERNVALE POINT"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.82867554961001,1.3061252256071698,0]},"properties":{"NAME":"FORUM THE SHOPPING MALL"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.854495182879,1.30145299324793,0]},"properties":{"NAME":"FU LU SHOU COMPLEX"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.850146834511,1.29133889451297,0]},"properties":{"NAME":"FUNAN"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.850083606052,1.29130707593559,0]},"properties":{"NAME":"FUNAN DIGITALIFE MALL"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.69829841817699,1.34874423181248,0]},"properties":{"NAME":"GEK POH SHOPPING CENTRE"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.865284424819,1.30285776289789,0]},"properties":{"NAME":"GOLDEN MILE COMPLEX"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.831928020443,1.29315492907011,0]},"properties":{"NAME":"GREAT WORLD CITY"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.766235457752,1.38541768689997,0]},"properties":{"NAME":"GREENRIDGE SHOPPING CENTRE"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.869423629864,1.38760330190636,0]},"properties":{"NAME":"GREENWICH V"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.847077797948,1.33218812037255,0]},"properties":{"NAME":"HDB HUB"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.82021904559299,1.2637968288533101,0]},"properties":{"NAME":"HARBOURFRONT CENTRE"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.885167372726,1.35954177325562,0]},"properties":{"NAME":"HEARTLAND MALL"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.76423610633002,1.3635509577068001,0]},"properties":{"NAME":"HILLV2"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.762842789877,1.3784310082758702,0]},"properties":{"NAME":"HILLION MALL"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.795350439947,1.31025541912227,0]},"properties":{"NAME":"HOLLAND ROAD SHOPPING CENTRE"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.87945025083,1.3756672834841202,0]},"properties":{"NAME":"HOUGANG 1"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.893723857613,1.37243678271745,0]},"properties":{"NAME":"HOUGANG MALL"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.74687713286801,1.33491758755438,0]},"properties":{"NAME":"IMM"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.831888294023,1.3040425340698,0]},"properties":{"NAME":"ION ORCHARD"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.84589784359301,1.27601222585223,0]},"properties":{"NAME":"INTERNATIONAL PLAZA"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.740191321438,1.33323785085839,0]},"properties":{"NAME":"JCUBE"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.743433746954,1.33305451930724,0]},"properties":{"NAME":"JEM"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.989670344538,1.36033174518933,0]},"properties":{"NAME":"JEWEL CHANGI AIRPORT"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.760041583169,1.38060512473526,0]},"properties":{"NAME":"JUNCTION 10"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.848477625201,1.3502394308637,0]},"properties":{"NAME":"JUNCTION 8"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.841600823354,1.43303198215121,0]},"properties":{"NAME":"JUNCTION NINE"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.706685012926,1.3394520043632099,0]},"properties":{"NAME":"JURONG POINT"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.894480526031,1.31469213499496,0]},"properties":{"NAME":"KINEX"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.87275070166099,1.30384327182322,0]},"properties":{"NAME":"KALLANG WAVE MALL"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.901040040135,1.3038204018374,0]},"properties":{"NAME":"KATONG SHOPPING CENTRE"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.87644917595199,1.30233745290723,0]},"properties":{"NAME":"LEISURE PARK KALLANG"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.84466893511299,1.29149019892639,0]},"properties":{"NAME":"LIANG COURT"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.83072791506201,1.30510759038419,0]},"properties":{"NAME":"LIAT TOWERS"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.743190998187,1.39224240572061,0]},"properties":{"NAME":"LIMBANG SHOPPING CENTRE"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.74523886823799,1.3850699232561898,0]},"properties":{"NAME":"LOT ONE"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.96459849952299,1.3664536401035,0]},"properties":{"NAME":"LOYANG POINT"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.834005158524,1.30446378974741,0]},"properties":{"NAME":"LUCKY PLAZA"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.83658396580601,1.3020047173196498,0]},"properties":{"NAME":"MANDARIN GALLERY"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.85445700019599,1.27912488289485,0]},"properties":{"NAME":"MARINA BAY FINANCIAL CENTRE TOWER 3"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.85347014858,1.2804679433167399,0]},"properties":{"NAME":"MARINA BAY LINK MALL"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.85945063691901,1.2839941013920602,0]},"properties":{"NAME":"MARINA BAY SANDS"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.85340187261801,1.2770416897788301,0]},"properties":{"NAME":"MARINA ONE"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.85762353235901,1.29103980256765,0]},"properties":{"NAME":"MARINA SQUARE"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.85990023349899,1.2920460530205,0]},"properties":{"NAME":"MILLENIA WALK"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.871861615443,1.3506755212032,0]},"properties":{"NAME":"NEX"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.83467612472299,1.30242417189412,0]},"properties":{"NAME":"NGEE ANN CITY"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.83614202883601,1.42799995995186,0]},"properties":{"NAME":"NORTHPOINT CITY"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.90213684712,1.41684981094702,0]},"properties":{"NAME":"NORTHSHORE PLAZA"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.844177088816,1.31934328126484,0]},"properties":{"NAME":"NOVENA SQUARE"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.913270565628,1.40263460056255,0]},"properties":{"NAME":"OASIS TERRACES"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.85098234671801,1.2843399432025,0]},"properties":{"NAME":"ONE RAFFLES PLACE"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.839692368177,1.3007235035670601,0]},"properties":{"NAME":"ORCHARD CENTRAL"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.839442780042,1.30044325279546,0]},"properties":{"NAME":"ORCHARD GATEWAY"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.838660627347,1.30178378195548,0]},"properties":{"NAME":"ORCHARD MIDPOINT"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.84115177072701,1.30126533034761,0]},"properties":{"NAME":"ORCHARD PLAZA"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.83788829913,1.3014849976274598,0]},"properties":{"NAME":"ORCHARD SHOPPING CENTRE"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.82921774932501,1.30684615299345,0]},"properties":{"NAME":"ORCHARD TOWERS"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.940848647333,1.35310120216274,0]},"properties":{"NAME":"OUR TAMPINES HUB"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.892832205276,1.3174823105835802,0]},"properties":{"NAME":"PLQ MALL"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.829588045188,1.30665484543192,0]},"properties":{"NAME":"PALAIS RENAISSANCE"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.83524030845501,1.3037232173927,0]},"properties":{"NAME":"PARAGON SHOPPING CENTRE"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.90528181444999,1.30108003311458,0]},"properties":{"NAME":"PARKWAY PARADE"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.93620756732099,1.37976754317117,0]},"properties":{"NAME":"PASIR RIS WEST PLAZA"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.892550598424,1.31867575623017,0]},"properties":{"NAME":"PAYA LEBAR SQUARE"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.850804507292,1.29232248414938,0]},"properties":{"NAME":"PENINSULA PLAZA"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.843929820315,1.28575774235159,0]},"properties":{"NAME":"PEOPLE'S PARK CENTRE"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.84258481078301,1.2841286263641698,0]},"properties":{"NAME":"PEOPLE'S PARK COMPLEX"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.69702008158701,1.34159108725754,0]},"properties":{"NAME":"PIONEER MALL"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.845067272666,1.3008207176923898,0]},"properties":{"NAME":"PLAZA SINGAPURA"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.84928559930799,1.30007556914647,0]},"properties":{"NAME":"POMO"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.91297643758301,1.3941840943827302,0]},"properties":{"NAME":"PUNGGOL PLAZA"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.80339114045499,1.28761792558743,0]},"properties":{"NAME":"QUEENSWAY SHOPPING CENTRE"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.853119904656,1.2938935786331398,0]},"properties":{"NAME":"RAFFLES CITY SHOPPING CENTRE"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.904473070943,1.3922173266777,0]},"properties":{"NAME":"RIVERVALE MALL"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.901849634797,1.38537151608701,0]},"properties":{"NAME":"RIVERVALE PLAZA"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.78852394760901,1.3053179268958202,0]},"properties":{"NAME":"ROCHESTER MALL"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.83308338185999,1.3057629243588502,0]},"properties":{"NAME":"SCOTTS SQUARE"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.87606765513,1.3913930612689498,0]},"properties":{"NAME":"SELETAR MALL"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.824832416105,1.4418532534675101,0]},"properties":{"NAME":"SEMBAWANG SHOPPING CENTRE"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.855146819671,1.31078075190146,0]},"properties":{"NAME":"SERANGOON PLAZA"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.852875622062,1.3030229851526298,0]},"properties":{"NAME":"SIM LIM SQUARE"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.85463996092899,1.3038113301821002,0]},"properties":{"NAME":"SIM LIM TOWER"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.84413837480899,1.2981321476693501,0]},"properties":{"NAME":"SINGAPORE SHOPPING CENTRE"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.856000621324,1.2947409482015502,0]},"properties":{"NAME":"SOUTH BEACH"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.844331494859,1.32061258625869,0]},"properties":{"NAME":"SQUARE 2"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.850821336975,1.29409146652973,0]},"properties":{"NAME":"STAMFORD HOUSE"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.81946210281201,1.44822653818276,0]},"properties":{"NAME":"SUN PLAZA"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.73901548629298,1.37789727654677,0]},"properties":{"NAME":"SUNSHINE PLACE"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.858585026016,1.2954667558967499,0]},"properties":{"NAME":"SUNTEC CITY"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.72046202427799,1.3348448747126,0]},"properties":{"NAME":"TAMAN JURONG SHOPPING CENTRE"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.945141172369,1.35432321225806,0]},"properties":{"NAME":"TAMPINES 1"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.94469623008301,1.3525802519703898,0]},"properties":{"NAME":"TAMPINES MALL"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.83323668385201,1.30483283007133,0]},"properties":{"NAME":"TANG PLAZA"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.823883490852,1.30485342129478,0]},"properties":{"NAME":"TANGLIN MALL"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.832971130126,1.30495005564844,0]},"properties":{"NAME":"TANGS"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.846180785876,1.2766095282693,0]},"properties":{"NAME":"TANJONG PAGAR CENTRE"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.85060998548599,1.3061777304808002,0]},"properties":{"NAME":"TEKKA CENTRE"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.847832003713,1.29920226381605,0]},"properties":{"NAME":"THE CATHAY"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.839758893141,1.30197804548976,0]},"properties":{"NAME":"THE CENTREPOINT"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.764570204717,1.31549675427513,0]},"properties":{"NAME":"THE CLEMENTI MALL"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.86246592865999,1.30085584996949,0]},"properties":{"NAME":"THE CONCOURSE"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.843203365359,1.28473141234248,0]},"properties":{"NAME":"THE MAJESTIC"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.83584422762699,1.3039493635530102,0]},"properties":{"NAME":"THE PARAGON"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.87606765513,1.3913930612689498,0]},"properties":{"NAME":"THE SELETAR MALL"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.85898223619101,1.28423491318867,0]},"properties":{"NAME":"THE SHOPPES AT MARINA BAY SANDS"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.856276242094,1.29498804392057,0]},"properties":{"NAME":"THE SOUTH BEACH"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.78842027411501,1.30697044038324,0]},"properties":{"NAME":"THE STAR VISTA"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.871670008464,1.33873066415568,0]},"properties":{"NAME":"THE WOODLEIGH MALL"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.83032810292801,1.35432524209243,0]},"properties":{"NAME":"THOMSON PLAZA"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.827158267789,1.28647119992725,0]},"properties":{"NAME":"TIONG BAHRU PLAZA"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.878828409594,1.3534808832612601,0]},"properties":{"NAME":"UPPER SERANGOON SHOPPING CENTRE"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.84403356919901,1.31978949204526,0]},"properties":{"NAME":"VELOCITY"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.793852610387,1.43075765633744,0]},"properties":{"NAME":"VISTA POINT"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.821808620881,1.26439468067259,0]},"properties":{"NAME":"VIVOCITY"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.902238067127,1.40642616289953,0]},"properties":{"NAME":"WATERWAY POINT"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.76609288210699,1.30374258287197,0]},"properties":{"NAME":"WEST COAST PLAZA"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.74902197661801,1.3501891656050602,0]},"properties":{"NAME":"WEST MALL"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.74287010551201,1.33428313049539,0]},"properties":{"NAME":"WESTGATE"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.83071423110901,1.30453635973283,0]},"properties":{"NAME":"WHEELOCK PLACE"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.949749226457,1.37239898072244,0]},"properties":{"NAME":"WHITE SANDS"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.83318959278499,1.3036989067941298,0]},"properties":{"NAME":"WISMA ATRIA"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.89674796590799,1.31646238412035,0]},"properties":{"NAME":"WISMA GEYLANG SERAI"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.841236456898,1.4179992628404001,0]},"properties":{"NAME":"WISTERIA MALL"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.79816228553301,1.4456478700315902,0]},"properties":{"NAME":"WOODLANDS MART"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.79082582427401,1.4428457006918303,0]},"properties":{"NAME":"WOODLANDS NORTH PLAZA"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.746662121143,1.39705741516143,0]},"properties":{"NAME":"YEW TEE POINT"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.747084778932,1.3980473615301698,0]},"properties":{"NAME":"YEW TEE SQUARE"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.843483900908,1.28480771842172,0]},"properties":{"NAME":"YUE HWA BUILDING"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.846554377679,1.3269450445695201,0]},"properties":{"NAME":"ZHONGSHAN MALL"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.8623317,1.3023159,0]},"properties":{"NAME":"CITY GATE"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.8465580,1.2888386,0]},"properties":{"NAME":"THE CENTRAL"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.8364202,1.4299181,0]},"properties":{"NAME":"GOLDEN VILLAGE - YISHUN TEN"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.7961072,1.3105635,0]},"properties":{"NAME":"RAFFLES HOLLAND V"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.7435037,1.3330614,0]},"properties":{"NAME":"JEM"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.8552908,1.3101122,0]},"properties":{"NAME":"MUSTAFA CENTRE"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.8315073,1.3058098,0]},"properties":{"NAME":"SHAW HOUSE"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.8436114,1.3171945,0]},"properties":{"NAME":"UNITED SQUARE"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[103.8651595,1.3651149,0]},"properties":{"NAME":"MYVILLAGE @ SERANGOON"}},
    ]};



function getDistanceFromLatLonInKm(l, t, a, n) {
    var d = deg2rad(a - l);
    var c = deg2rad(n - t);
    var g =   Math.sin(d/2) * Math.sin(d/2) +
        Math.cos(deg2rad(l)) * Math.cos(deg2rad(a)) *
        Math.sin(c/2) * Math.sin(c/2)
    return 6371 * (2 * Math.atan2(Math.sqrt(g), Math.sqrt(1 - g)))
}

function deg2rad(l) {
    return l * (Math.PI / 180)
}

if (isFirstTime) {
    $('.filter_checkbox').first().before('<input id="mon_filter" class="inserted_filter" type="search" placeholder="Filter"/><div class="inserted_filter" id="time_filter">><input id="more_filter" type="search" placeholder="End (Min)"/> <<input id="less_filter" type="search" placeholder="Hatch (Min)"/></div>');
    $('.filter_checkbox').first().after('<div class="filter_checkbox"> <input id="checkbox_raid_non_boosted" type="checkbox" value="boosted"><label for="checkbox_raid_non_boosted"><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgdmlld0JveD0iMCAwIDUxMiA1MTIiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHBhdGggZD0iTTAsNTEyaDEzOS42VjM3Mi40SDBWNTEyeiBNNDYuNSw0MTguOWg0Ni41djQ2LjVINDYuNVY0MTguOXogTTAsMTM5LjZoMTM5LjZWMEgwVjEzOS42eiBNMCwzMjUuOGgxMzkuNlYxODYuMkgwVjMyNS44eg0KCSBNNDYuNSwyMzIuN2g0Ni41djQ2LjVINDYuNVYyMzIuN3ogTTIwOS41LDBjMTYyLjksOTMuMSwyNDQuNCwyMjEuMSw1OC4yLDMzNy41TDE4Ni4yLDI1NnYyNTZoMjU2bC04MS41LTgxLjUNCglDNjA1LjEsMTg2LjIsMzcyLjQsMCwyMDkuNSwweiIvPg0KPC9zdmc+DQo=" style="width:20px; height: 20px"> Non Weather boosted only</label> </div>');
    $('.filter_checkbox').first().after('<div class="filter_checkbox"> <input id="checkbox_mall_only" type="checkbox" value="boosted"><label for="checkbox_mall_only"><img src="data:image/svg+xml;base64, PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IS0tIFVwbG9hZGVkIHRvOiBTVkcgUmVwbywgd3d3LnN2Z3JlcG8uY29tLCBHZW5lcmF0b3I6IFNWRyBSZXBvIE1peGVyIFRvb2xzIC0tPg0KPHN2ZyB3aWR0aD0iODAwcHgiIGhlaWdodD0iODAwcHgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMiAxQzEuNDQ3NzIgMSAxIDEuNDQ3NzIgMSAyQzEgMi41NTIyOCAxLjQ0NzcyIDMgMiAzSDMuMjE5MjJMNi43ODM0NSAxNy4yNTY5QzUuNzMyNzYgMTcuNzIzNiA1IDE4Ljc3NjIgNSAyMEM1IDIxLjY1NjkgNi4zNDMxNSAyMyA4IDIzQzkuNjU2ODUgMjMgMTEgMjEuNjU2OSAxMSAyMEMxMSAxOS42NDk0IDEwLjkzOTggMTkuMzEyOCAxMC44MjkzIDE5SDE1LjE3MDdDMTUuMDYwMiAxOS4zMTI4IDE1IDE5LjY0OTQgMTUgMjBDMTUgMjEuNjU2OSAxNi4zNDMxIDIzIDE4IDIzQzE5LjY1NjkgMjMgMjEgMjEuNjU2OSAyMSAyMEMyMSAxOC4zNDMxIDE5LjY1NjkgMTcgMTggMTdIOC43ODA3OEw4LjI4MDc4IDE1SDE4QzIwLjA2NDIgMTUgMjEuMzAxOSAxMy42OTU5IDIxLjk4ODcgMTIuMjU1OUMyMi42NTk5IDEwLjg0ODcgMjIuODkzNSA5LjE2NjkyIDIyLjk3NSA3Ljk0MzY4QzIzLjA4ODQgNi4yNDAxNCAyMS42ODAzIDUgMjAuMTIxMSA1SDUuNzgwNzhMNS4xNTk1MSAyLjUxNDkzQzQuOTM2OTIgMS42MjQ1OSA0LjEzNjk2IDEgMy4yMTkyMiAxSDJaTTE4IDEzSDcuNzgwNzhMNi4yODA3OCA3SDIwLjEyMTFDMjAuNjc0MiA3IDIxLjAwNjMgNy40MDY3NSAyMC45Nzk0IDcuODEwNzhDMjAuOTAzNCA4Ljk1MjIgMjAuNjkwNiAxMC4zMzE4IDIwLjE4MzYgMTEuMzk0OUMxOS42OTIyIDEyLjQyNTEgMTkuMDIwMSAxMyAxOCAxM1pNMTggMjAuOTkzOEMxNy40NTExIDIwLjk5MzggMTcuMDA2MiAyMC41NDg5IDE3LjAwNjIgMjBDMTcuMDA2MiAxOS40NTExIDE3LjQ1MTEgMTkuMDA2MiAxOCAxOS4wMDYyQzE4LjU0ODkgMTkuMDA2MiAxOC45OTM4IDE5LjQ1MTEgMTguOTkzOCAyMEMxOC45OTM4IDIwLjU0ODkgMTguNTQ4OSAyMC45OTM4IDE4IDIwLjk5MzhaTTcuMDA2MTcgMjBDNy4wMDYxNyAyMC41NDg5IDcuNDUxMTIgMjAuOTkzOCA4IDIwLjk5MzhDOC41NDg4OCAyMC45OTM4IDguOTkzODMgMjAuNTQ4OSA4Ljk5MzgzIDIwQzguOTkzODMgMTkuNDUxMSA4LjU0ODg4IDE5LjAwNjIgOCAxOS4wMDYyQzcuNDUxMTIgMTkuMDA2MiA3LjAwNjE3IDE5LjQ1MTEgNy4wMDYxNyAyMFoiIGZpbGw9IiMwRjBGMEYiLz4NCjwvc3ZnPg==" style="width:20px; height: 20px"> Malls </label> <input id="mall_distance" type="search" placeholder="Mall Radius" value="150"/>m</div>');
    $('.filter_checkbox').first().after('<div class="filter_checkbox"> <input id="checkbox_mrt_only" type="checkbox" value="boosted"><label for="checkbox_mrt_only"><img src="data:image/svg+xml;base64, PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBTdmcgVmVjdG9yIEljb25zIDogaHR0cDovL3d3dy5vbmxpbmV3ZWJmb250cy5jb20vaWNvbiAtLT4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4KPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMTAwMCAxMDAwIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAxMDAwIDEwMDAiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8bWV0YWRhdGE+IFN2ZyBWZWN0b3IgSWNvbnMgOiBodHRwOi8vd3d3Lm9ubGluZXdlYmZvbnRzLmNvbS9pY29uIDwvbWV0YWRhdGE+CjxnPjxwYXRoIGQ9Ik03MTUuOSw1MS41aC01OC4xdi04LjNjMC0xNi42LTE2LjYtMzMuMi0zMy4yLTMzLjJIMzY3LjFjLTE2LjYsMC0zMy4yLDE2LjYtMzMuMiwzMy4ydjguM2gtNDkuOGMtOTEuNCwwLTE2Ni4xLDc0LjctMTY2LjEsMTY2LjF2MzczLjdjMCw5MS40LDc0LjcsMTY2LjEsMTY2LjEsMTY2LjFoNDMxLjljOTEuNCwwLDE2Ni4xLTc0LjcsMTY2LjEtMTY2LjFWMjE3LjZDODgyLDEyNi4zLDgwNy4zLDUxLjUsNzE1LjksNTEuNXogTTMxNy4zLDY3NC40Yy00MS41LDAtODMuMS0zMy4yLTgzLjEtNzQuN2MwLTQxLjUsMzMuMi03NC43LDgzLjEtNzQuN2M0OS44LDAsODMuMSwzMy4yLDgzLjEsNzQuN0MzOTIsNjQxLjIsMzU4LjgsNjc0LjQsMzE3LjMsNjc0LjR6IE02OTEsNjc0LjRjLTQxLjUsMC04My4xLTMzLjItODMuMS03NC43YzAtNDEuNSwzMy4yLTc0LjcsODMuMS03NC43YzQ5LjgsMCw4My4xLDMzLjIsODMuMSw3NC43Qzc3NC4xLDY0MS4yLDczMi41LDY3NC40LDY5MSw2NzQuNHogTTc5MC43LDQwMC4zdjguM0gyMDkuM1YyMjUuOWMwLTU4LjEsNDkuOC0xMDgsMTE2LjMtMTA4aDM0MC41YzY2LjQsMCwxMTYuMyw0OS44LDExNi4zLDEwOHYxNzQuNEg3OTAuN3oiLz48cGF0aCBkPSJNMjAxLDk5MGMtOC4zLDAtOC4zLDAtMTYuNi04LjNjLTguMy04LjMtOC4zLTI0LjksMC0zMy4ybDE0OS41LTE0MS4yYzguMy04LjMsMjQuOS04LjMsMzMuMiwwYzguMyw4LjMsOC4zLDI0LjksMCwzMy4yTDIxNy42LDk4MS43QzIwOS4zLDk5MCwyMDkuMyw5OTAsMjAxLDk5MHoiLz48cGF0aCBkPSJNODA3LjMsOTkwYy04LjMsMC04LjMsMC0xNi42LTguM0w2NDkuNSw4NDAuNWMtOC4zLTguMy04LjMtMjQuOSwwLTMzLjJjOC4zLTguMywyNC45LTguMywzMy4yLDBsMTQxLjIsMTQxLjJjOC4zLDguMyw4LjMsMjQuOSwwLDMzLjJDODE1LjYsOTkwLDgwNy4zLDk5MCw4MDcuMyw5OTB6Ii8+PC9nPgo8L3N2Zz4=" style="width:20px; height: 20px"> MRT </label> <input id="mrt_distance" type="search" placeholder="MRT Radius" value="100"/>m</div>');
    $('.filter_checkbox').first().before('<div class="filter_checkbox deoxys"> <input id="form_normal"  name="form" type="checkbox" value="33" ><label for="form_normal">Normal</label>  <input id="form_attack"  name="form" type="checkbox" value="34" ><label for="form_attack">Attack</label> <input id="form_defence"  name="form" type="checkbox" value="35" ><label for="form_defence">Defence</label> <input id="form_speed"  name="form" type="checkbox" value="36" ><label for="form_speed">Speed</label> </div> <style>.filter_checkbox.deoxys{display:none}</style>');
    $('.filter_checkbox').first().before('<div class="filter_checkbox rockruff"> <input id="form_normal"  name="form" type="checkbox" value="2831" ><label for="form_normal">Normal</label>  <input id="form_dusk"  name="form" type="checkbox" value="2737" ><label for="form_dusk">Dusk</label> </div> <style>.filter_checkbox.rockruff{display:none}</style>');
    $("body").append('<style>.inserted_filter{margin:0 0 12px 4px; display: block;} #time_filter input {width: 80px} #mrt_distance, #mall_distance {width: 80px}</style>');
    $("body").append('<style>#custom_panel{position:absolute;top:80px;left:10px;z-index:800}.custom_i{border-radius:40px;background-color:white;width:40px;height:40px;display:flex;align-items:center;justify-content:center;box-shadow:-1px 1px #999;margin-bottom:10px}#mon_filter{margin-left:10px}.pokemon_icon_img.iv_perfect{-webkit-filter:drop-shadow(3px 3px 3px red);filter:drop-shadow(3px 3px 5px red);transform:scale(1.3,1.3);transform-origin:0 0}.pokemon_icon_img.iv90{-webkit-filter:drop-shadow(3px 3px 3px blue);filter:drop-shadow(3px 3px 3px blue);transform:scale(1.3,1.3);transform-origin:0 0}.pokemon_icon_img.iv80{-webkit-filter:drop-shadow(3px 3px 3px purple);filter:drop-shadow(3px 3px 3px purple)}#map.grey .pokemon_icon_img.iv_perfect{-webkit-filter:drop-shadow(3px 3px 3px #ff1493);filter:drop-shadow(3px 3px 5px #ff1493)}#map.grey .pokemon_icon_img.iv90{-webkit-filter:drop-shadow(3px 3px 3px #00bfff);filter:drop-shadow(3px 3px 3px #00bfff)}#map.grey .pokemon_icon_img.iv80{-webkit-filter:drop-shadow(3px 3px 3px #F4D03F);filter:drop-shadow(3px 3px 3px #F4D03F)}</style> <div id="custom_panel"> <div id="filter_icon" class="custom_i"> <svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="#999" d="M14,12V19.88C14.04,20.18 13.94,20.5 13.71,20.71C13.32,21.1 12.69,21.1 12.3,20.71L10.29,18.7C10.06,18.47 9.96,18.16 10,17.87V12H9.97L4.21,4.62C3.87,4.19 3.95,3.56 4.38,3.22C4.57,3.08 4.78,3 5,3V3H19V3C19.22,3 19.43,3.08 19.62,3.22C20.05,3.56 20.13,4.19 19.79,4.62L14.03,12H14Z" /></svg> </div> <div id="darken_icon" class="custom_i"> <svg style="width:24px;height:24px" viewBox="0 0 24 24"> <path fill="#999" d="M12,16L19.36,10.27L21,9L12,2L3,9L4.63,10.27M12,18.54L4.62,12.81L3,14.07L12,21.07L21,14.07L19.37,12.8L12,18.54Z" /></svg> </div> </div>');
    $("body").append('<style>input[type="search"]::-webkit-search-cancel-button{-webkit-appearance:none;height:14px;width:14px;display:block;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAn0lEQVR42u3UMQrDMBBEUZ9WfQqDmm22EaTyjRMHAlM5K+Y7lb0wnUZPIKHlnutOa+25Z4D++MRBX98MD1V/trSppLKHqj9TTBWKcoUqffbUcbBBEhTjBOV4ja4l4OIAZThEOV6jHO8ARXD+gPPvKMABinGOrnu6gTNUawrcQKNCAQ7QeTxORzle3+sDfjJpPCqhJh7GixZq4rHcc9l5A9qZ+WeBhgEuAAAAAElFTkSuQmCC);background-repeat:no-repeat;background-size:14px}</style>');
    $("#close_donation_button").click(), $(".toast-close-button").click(), $("#overlay").hide(),
        $("#topbar").hide(), $(".please").hide(), $("#map").css({
        width: "100vw",
        height: "100vh",
        top: 0,
        bottom: 0
    });
    $(window).resize(function() {
        $("#map").css({
            width: "100vw",
            height: "100vh"
        });
    });
    $("#filter_settings").css("top", "10px");
    $("#locate").css("top", "10px");
    $("#filter_icon").on("click", function() {
        $("#filter_link").click();
    });
    $("#darken_icon").on("click", function() {
        toggleOverlay();
    });
    // elite raid
    $('#checkbox_raid_9').parent('.filter_checkbox').after('<div class="filter_checkbox" id="el_raid_filter"> <input id="checkbox_raid_12pm" type="checkbox" checked><label for="checkbox_raid_12pm"> 12pm</label> <input id="checkbox_raid_1pm" type="checkbox" checked><label for="checkbox_raid_1pm"> 1pm</label> <input id="checkbox_raid_5pm" type="checkbox" checked><label for="checkbox_raid_5pm"> 5pm</label> <input id="checkbox_raid_6pm" type="checkbox" checked><label for="checkbox_raid_6pm"> 6pm</label> </div>');
    if ($("#checkbox_raid_9").prop("checked")) {
        $("#el_raid_filter").show();
    }
    else {
        $("#el_raid_filter").hide();
    }
    // end el_raid
    isFirstTime = false;
}
$("#less_filter").on("input", function() {
    var e = $(this).val();
    if (e.length >= 1) {
        if (Number.isNaN(e)) {
            timeLessFilter = Number.MAX_VALUE;
        }
        else {
            timeLessFilter = e * 60;
        }
    }
    else {
        timeLessFilter = Number.MAX_VALUE;
    }
});
$("#more_filter").on("input", function() {
    var e = $(this).val();
    if (e.length >= 1) {
        if (Number.isNaN(e)) {
            timeMoreFilter = 0;
        }
        else {
            // to seconds
            timeMoreFilter = e * 60;
        }
    }
    else {
        timeMoreFilter = 0;
    }
});

$("#mon_filter").on("input", function() {
    var e = $(this).val();
    if (e.length >= 1) {
        var filterMonIdsTmp = [];
        var filterMons = $.grep(pokeArray, function(n) {
            var reg = new RegExp(e,"i");
            return n.n.match(reg);
        });
        $.each(filterMons, function( index, mon ) {
            filterMonIdsTmp.push(parseInt(mon.i));
        });
        filterMonIds = filterMonIdsTmp;
    }
    else {
        filterMonIds= [];
    }
    if (e.toLowerCase() == "deoxys") {
        $(".filter_checkbox.deoxys").show();
        $(".filter_checkbox.rockruff").hide();
        isFilterForm = true;
    }
    else if (e.toLowerCase() == "rockruff") {
        $(".filter_checkbox.rockruff").show();
        $(".filter_checkbox.deoxys").hide();
        isFilterForm = true;
    }
    else {
        $(".filter_checkbox.deoxys").hide();
        $(".filter_checkbox.rockruff").hide();
        isFilterForm = false;
    }
});

$("#checkbox_raid_non_boosted").on("change", function(){
    isNonBoosted  = $(this).prop("checked") ? true : false;
    if (isNonBoosted && $("#checkbox_raid_boosted").prop("checked")) {
        $("#checkbox_raid_boosted").click();
    }
});
$("#checkbox_raid_boosted").on("change", function(){
    if ($(this).prop("checked") && $("#checkbox_raid_non_boosted").prop("checked")) {
        $("#checkbox_raid_non_boosted").click();
    }
});
// elite raid
$("#checkbox_raid_9").on("change", function(){
    if ($(this).prop("checked")) {
        $("#el_raid_filter").show();
    }
    else {
        $("#el_raid_filter").hide();
    }
});

// deoxys
$('.filter_checkbox.deoxys input').change(function() {
    var modVal = parseInt($(this).val());
    if ($(this).is(':checked')) {
        // add form
        filterForms.push(modVal);
    }
    else {
        // remove form
        var index = filterForms.indexOf(modVal);
        if (index !== -1) {
            filterForms.splice(index, 1);
        }
    }
});

// rockruff
$('.filter_checkbox.rockruff input').change(function() {
    var modVal = parseInt($(this).val());
    if ($(this).is(':checked')) {
        // add form
        filterForms.push(modVal);
    }
    else {
        // remove form
        var index = filterForms.indexOf(modVal);
        if (index !== -1) {
            filterForms.splice(index, 1);
        }
    }
    console.log(filterForms);
});

// mrt
$("#checkbox_mrt_only").on("change", function(){
    isFilterMRT  = $(this).prop("checked") ? true : false;
});
// mall
$("#checkbox_mall_only").on("change", function(){
    isFilterMall  = $(this).prop("checked") ? true : false;
});

function refreshPokemons() {
    if (!shouldUpdate) {
        return; //don't update when map is moving
    }

    var toBeRemovedIndexes = [];

    //filter el raid initialise
    var isElRaid = false, is12pm = false, is1pm = false, is5pm = false, is6pm = false;
    if ($("#checkbox_raid_9").prop("checked")) {
        isElRaid = true;
        if ($("#checkbox_raid_12pm").prop("checked")) {
            is12pm = true;
        }
        if ($("#checkbox_raid_1pm").prop("checked")) {
            is1pm = true;
        }
        if ($("#checkbox_raid_5pm").prop("checked")) {
            is5pm = true;
        }
        if ($("#checkbox_raid_6pm").prop("checked")) {
            is6pm = true;
        }
    }

    var currentUnixTime = Math.floor(Date.now() / 1000) - timeOffset;

    for (var i = 0; i < pokemons.length; ++i) {

        var currentPokemon = pokemons[i];
        var marker = markers[i];
        var shouldRemove = false;

        if (currentPokemon.raidEnd - timeMoreFilter < currentUnixTime - 10 ||
            (currentPokemon.raidStart - currentUnixTime > timeLessFilter && currentPokemon.id == 0)||
            (!isPokemonChecked(currentPokemon.level) && !shouldTurnFilterOff())) {
            shouldRemove = true;
        }

        //if egg and is starting or we don't like egg
        if (currentPokemon.id == 0) {
            if ((currentPokemon.raidStart < currentUnixTime - 10 || !isPokemonChecked('egg'))) {
                shouldRemove = true;
            }
        }
        else {
            if (!isPokemonChecked('boss')) {
                shouldRemove = true;
            }
        }

        //remove team
        //0: no team
        //1: mystic
        //2: valor
        //3: instinct

        if (!isPokemonChecked('mystic') && currentPokemon.team == 1) {
            shouldRemove = true;
        }

        if (!isPokemonChecked('valor') && currentPokemon.team == 2) {
            shouldRemove = true;
        }

        if (!isPokemonChecked('instinct') && currentPokemon.team == 3) {
            shouldRemove = true;
        }

        if (isPokemonChecked('exraid') && !currentPokemon.ex_raid_eligible && !currentPokemon.sponsor) {
            shouldRemove = true;
        }

        if (isPokemonChecked('boosted') && !isRaidBoosted(currentPokemon)) {
            shouldRemove = true;
        }
        if (isNonBoosted && (isRaidBoosted(currentPokemon) ||   currentPokemon.cell_id === null)){
            shouldRemove = true;
        }

        //el raid filter
        if (isElRaid && currentPokemon.level==9) {
            var exRaidStartDate = new Date(currentPokemon.raidStart * 1000);
            var exRaidUTCString = exRaidStartDate.toUTCString();
            if (is12pm && exRaidUTCString.match(regex12pm)) {
                // don't do anything.
            }
            else if (is1pm && exRaidUTCString.match(regex1pm)) {
                // don't do anything.
            }
            else if (is5pm && exRaidUTCString.match(regex5pm)) {
                // don't do anything.
            }
            else if (is6pm && exRaidUTCString.match(regex6pm)) {
                // don't do anything.
            }
            else {
                shouldRemove = true;
            }
        }

        if (isFilterMRT) {
            var radius = $("#mrt_distance").val();
            var radiusKm = 0.1;
            if ($.isNumeric(radius)) {
                radiusKm = radius/1000;
            }
            var isFoundNearMrt = false;
            for (var e = 0; e < trainStations.features.length; e++) {
                var stn = trainStations.features[e];
                var dist = getDistanceFromLatLonInKm(currentPokemon.center.lat, currentPokemon.center.lng, stn.geometry.coordinates[1], stn.geometry.coordinates[0]);
                if (dist < radiusKm) {
                    // don't do anything
                    isFoundNearMrt = true;
                    break;
                }
            }
            if (!isFoundNearMrt)
            {
                shouldRemove = true;
            }

        }
        if (isFilterMall) {
            var radius = $("#mall_distance").val();
            var radiusKm = 0.15;
            if ($.isNumeric(radius)) {
                radiusKm = radius/1000;
            }
            
            var isFoundNearMall = false;

            for (var e = 0; e < malls.features.length; e++) {
                var stn = malls.features[e];
                var dist = getDistanceFromLatLonInKm(currentPokemon.center.lat, currentPokemon.center.lng, stn.geometry.coordinates[1], stn.geometry.coordinates[0]);
                if (dist < radiusKm) {
                    // don't do anything
                    isFoundNearMall = true;
                    break;
                }
            }
            if (!isFoundNearMall)
            {
                shouldRemove = true;
            }

        }

        if (filterMonIds.length > 0) {
            if (!filterMonIds.includes(currentPokemon.id )) {
                shouldRemove = true;
            }
        }

        // normal = 33
        // attack = 34
        // defence = 35
        // speed = 36
        //
        // RockRuff - Normal = 2831
        // // RockRuff - Dusk = 2737
        if (isFilterForm) {
            if (currentPokemon.id != 0 ) {
                if (!filterForms.includes(parseInt(currentPokemon.form))) {
                    shouldRemove = true;
                }
            }
        }

        if (shouldRemove) {
            removeMarker(marker);
        }
        else {
                            addMarker(marker);
        }
    }

    for (var i = toBeRemovedIndexes.length - 1; i >= 0; --i) {
        var marker = markers[toBeRemovedIndexes[i]];
        if (marker._map) {
            marker.removeFrom(map);
        }
    }
}

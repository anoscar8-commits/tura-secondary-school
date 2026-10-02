import {
  GraduationEventInfo,
  EventHighlight,
  ScheduleItem,
  PhotoItem,
  MessagePillar
} from '../types';

// Import local generated images with Tanzanian secondary school attire (sketi za samawati na kijani, mashati meupe, suruali za kijani - hakuna majoho)
import bannerImg from '../assets/images/tura_grad_banner_1790920104480.jpg';
import studentsImg from '../assets/images/tura_grad_students_1790920118668.jpg';
import ukumbiMezaKuuImg from '../assets/images/tura_ukumbi_mezakuu_1790922163659.jpg';
import ukumbiMezaKuuWideImg from '../assets/images/tura_mezakuu_wide_1790922180690.jpg';
import campusImg from '../assets/images/tura_campus_life_1790920151258.jpg';

export const defaultEventInfo: GraduationEventInfo = {
  schoolName: 'TURA SECONDARY GRADUATION',
  location: 'Tura, Wilaya ya Uyui',
  district: 'Wilaya ya Uyui',
  region: 'Mkoa wa Tabora',
  country: 'Tanzania',
  eventName: 'MAHAFALI YA KIDATO CHA NNE – 2026',
  eventDateString: '2 Oktoba 2026',
  eventIsoDate: '2026-10-02',
  heroGreeting: 'KARIBU TURA SECONDARY GRADUATION',
  heroHeadline: 'MAHAFALI YA KIDATO CHA NNE – 2026',
  heroSubheadline: 'Wilaya ya Uyui, Mkoa wa Tabora – Tanzania',
  heroMessage: 'Karibu kusherehekea nasi siku muhimu ya kuhitimu kwa wanafunzi wa Kidato cha Nne wa Tura Secondary School.',
  aboutText: 'Mahafali ya Kidato cha Nne ya Tura Secondary School ni tukio maalum la kusherehekea safari ya kielimu ya wanafunzi wanaohitimisha elimu yao ya sekondari. Tukio hili linawakutanisha wanafunzi, walimu, wazazi, walezi, viongozi na wageni mbalimbali katika kusherehekea hatua hii muhimu.',
  contactAddress: 'Tura Secondary School, S.L.P. [Weka S.L.P. Hapa], Uyui – Tabora, Tanzania',
  contactNote: 'Tovuti hii imeundwa maalum kwa ajili ya kutangaza na kuonyesha matukio ya Mahafali ya Kidato cha Nne 2026.',
};

export const defaultHighlights: EventHighlight[] = [
  {
    id: '1',
    icon: 'grad',
    label: 'Wahitimu',
    value: 'Kidato cha Nne – 2026',
    subtext: 'Wanafunzi wanaohitimu mafunzo ya Sekondari'
  },
  {
    id: '2',
    icon: 'school',
    label: 'Shule',
    value: 'Tura Secondary School',
    subtext: 'Kituo cha elimu na malezi bora'
  },
  {
    id: '3',
    icon: 'calendar',
    label: 'Tarehe',
    value: '2 Oktoba 2026',
    subtext: 'Siku ya sherehe kuu ya mahafali'
  },
  {
    id: '4',
    icon: 'map',
    label: 'Mahali',
    value: 'Uyui, Tabora',
    subtext: 'Wilaya ya Uyui, Mkoa wa Tabora – Tanzania'
  },
  {
    id: '5',
    icon: 'trophy',
    label: 'Tukio',
    value: 'Mahafali ya Kidato cha Nne',
    subtext: 'Kusherehekea hatua muhimu ya kitaaluma'
  }
];

export const defaultSchedule: ScheduleItem[] = [
  {
    id: '1',
    time: '08:00',
    title: 'Kuwasili kwa Wageni na Wazazi',
    description: '[Hariri ratiba hapa: Mapokezi ya wazazi, walezi na wananchi katika viwanja vya shule]',
    speakerOrNote: 'Kamati ya Mapokezi',
    isPlaceholder: true
  },
  {
    id: '2',
    time: '09:00',
    title: 'Kuanza kwa Shughuli za Mahafali',
    description: '[Hariri ratiba hapa: Wimbo wa Taifa, wimbo wa shule na sala ya ufunguzi]',
    speakerOrNote: 'Msimamizi wa Shughuli (MC)',
    isPlaceholder: true
  },
  {
    id: '10:00',
    time: '10:00',
    title: 'Hotuba Mbalimbali',
    description: '[Hariri ratiba hapa: Risala ya wahitimu, hotuba ya Mkuu wa Shule na Mgeni Rasmi]',
    speakerOrNote: 'Viongozi & Mgeni Rasmi',
    isPlaceholder: true
  },
  {
    id: '4',
    time: '12:00',
    title: 'Kukabidhi Vyeti na Zawadi',
    description: '[Hariri ratiba hapa: Kutunuku vyeti vya kuhitimu kidato cha nne na zawadi za wanafunzi]',
    speakerOrNote: 'Mgeni Rasmi & Walimu',
    isPlaceholder: true
  },
  {
    id: '5',
    time: '13:00',
    title: 'Picha za Pamoja na Hitimisho',
    description: '[Hariri ratiba hapa: Upigaji wa picha za kumbukumbu za wahitimu, walimu na wazazi, kisha chakula cha mchana]',
    speakerOrNote: 'Mpiga Picha Rasmi & Kamati',
    isPlaceholder: true
  }
];

export const defaultMessagePillars: MessagePillar[] = [
  {
    title: 'Bidii Katika Kila Hatua',
    desc: 'Bidii ni daraja kati ya ndoto na mafanikio. Endeleeni kufanya kazi kwa bidii kwenye kila nafasi na mtihani mtakaokutana nao mbeleni.',
    iconName: 'Flame'
  },
  {
    title: 'Nidhamu ya Maisha',
    desc: 'Nidhamu ndiyo msingi mkuu wa heshima na hekima. Misingi mizuri mliyojifunza Tura Secondary School iwe ngao na mwongozo wenu.',
    iconName: 'ShieldCheck'
  },
  {
    title: 'Elimu Isiyo na Kikomo',
    desc: 'Kuhitimu Kidato cha Nne ni mwanzo wa safari ndefu ya kuelimika. Tafuteni maarifa mapya kila siku ili kujiendeleza kimaisha.',
    iconName: 'BookOpen'
  },
  {
    title: 'Kujiamini na Ujasiri',
    desc: 'Jiaminini katika uwezo wenu. Mnao uwezo mkubwa wa kufanya mambo makubwa na kuwa mfano bora katika jamii na taifa lenu.',
    iconName: 'Sparkles'
  },
  {
    title: 'Kujenga Tanzania Yetu',
    desc: 'Ninyi ni nguzo na tegemeo la maendeleo ya Taifa letu la Tanzania. Tumieni elimu yenu kuwa wazalendo wenye mchango chanya.',
    iconName: 'HeartHandshake'
  },
  {
    title: 'Kutimiza Ndoto Zenu',
    desc: 'Kamwe msikate tamaa. Piganieni ndoto zenu kwa uaminifu, unyenyekevu na matumaini makubwa kuelekea maisha yajayo.',
    iconName: 'Award'
  }
];

export const defaultPhotos: PhotoItem[] = [
  {
    id: 'p1',
    url: bannerImg,
    title: 'Furaha ya Siku ya Mahafali',
    caption: 'Wahitimu wa Kidato cha Nne wakishangilia kwa furaha siku yao maalum ya mahafali Tura Secondary School.',
    category: 'Wahitimu',
    date: '2 Oktoba 2026',
    isPlaceholder: true
  },
  {
    id: 'p2',
    url: studentsImg,
    title: 'Picha ya Pamoja ya Wahitimu',
    caption: 'Wahitimu wakiwa na tabasamu la ushindi baada ya kukamilisha miaka minne ya masomo ya Sekondari.',
    category: 'Picha ya pamoja ya wahitimu',
    date: '2 Oktoba 2026',
    isPlaceholder: true
  },
  {
    id: 'p3',
    url: ukumbiMezaKuuImg,
    title: 'Meza Kuu Mbele ya Ukumbi wa Mahafali',
    caption: 'Meza Kuu ikiwa mbele ya ukumbi na bango la Tura Secondary Graduation; viongozi na Mgeni Rasmi wakiwa meza kuu mbele, huku wahitimu wakiwa wameketi katika sare za kijani zinazolingana bila majoho.',
    category: 'Uwanja wa mahafali',
    date: '2 Oktoba 2026',
    isPlaceholder: true
  },
  {
    id: 'p4',
    url: campusImg,
    title: 'Mazingira ya Tura Secondary School',
    caption: 'Majengo masafi ya madarasa na mazingira tulivu ya shule Wilaya ya Uyui, Mkoa wa Tabora.',
    category: 'Shule',
    date: '2 Oktoba 2026',
    isPlaceholder: true
  },
  {
    id: 'p5',
    url: studentsImg,
    title: 'Wahitimu Katika Sare Rasmi za Shule',
    caption: 'Wahitimu wa Kidato cha Nne katika sare za shule za heshima: sketi za kijani na samawati, suruali za kijani na mashati meupe bila majoho.',
    category: 'Wanafunzi',
    date: '2 Oktoba 2026',
    isPlaceholder: true
  },
  {
    id: 'p6',
    url: ukumbiMezaKuuWideImg,
    title: 'Jukwaa Kuu na Meza Kuu ya Sherehe',
    caption: 'Muonekano wa Meza Kuu mbele ya jukwaa la Tura Secondary Graduation na wahitimu wakiwa wameketi ukumbini katika sare zao za kijani zinazolingana na mashati meupe.',
    category: 'Shughuli za mahafali',
    date: '2 Oktoba 2026',
    isPlaceholder: true
  },
  {
    id: 'p7',
    url: bannerImg,
    title: 'Picha za Viongozi na Walimu',
    caption: 'Walimu na viongozi wa shule wakifurahia mafanikio ya vijana wao wanaoelekea hatua nyingine ya maisha.',
    category: 'Picha za viongozi na walimu',
    date: '2 Oktoba 2026',
    isPlaceholder: true
  },
  {
    id: 'p8',
    url: ukumbiMezaKuuImg,
    title: 'Wageni Waalikwa na Viongozi Meza Kuu',
    caption: 'Meza Kuu mbele ya ukumbi ikiwa na Mgeni Rasmi, wazazi na wageni waalikwa wa Tura Secondary Graduation.',
    category: 'Wageni',
    date: '2 Oktoba 2026',
    isPlaceholder: true
  },
  {
    id: 'p9',
    url: studentsImg,
    title: 'Shangwe na Sherehe za Wahitimu',
    caption: 'Nyimbo, nderemo na vifijo vya wahitimu wa Kidato cha Nne wakisherehekea safari ya mafanikio.',
    category: 'Sherehe',
    date: '2 Oktoba 2026',
    isPlaceholder: true
  },
  {
    id: 'p10',
    url: campusImg,
    title: 'Walimu Walezi wa Shule',
    caption: 'Walimu waliojitolea kwa moyo wote kufundisha na kulea wanafunzi kitaaluma na kinidhamu.',
    category: 'Walimu',
    date: '2 Oktoba 2026',
    isPlaceholder: true
  }
];

export const defaultSchoolLifePhotos: PhotoItem[] = [
  {
    id: 'sl1',
    url: campusImg,
    title: 'Masomo na Mazingira ya Kujisomea',
    caption: 'Madarasa tulivu yanayomwezesha mwanafunzi kutilia mkazo maarifa na sayansi.',
    category: 'Masomo',
    date: 'Mwaka 2026',
    isPlaceholder: true
  },
  {
    id: 'sl2',
    url: studentsImg,
    title: 'Umoja na Ushirikiano wa Wanafunzi',
    caption: 'Wanafunzi wakishirikiana katika vikundi vya masomo na mijadala ya kitaaluma.',
    category: 'Wanafunzi',
    date: 'Mwaka 2026',
    isPlaceholder: true
  },
  {
    id: 'sl3',
    url: bannerImg,
    title: 'Michezo na Shughuli za Ziada',
    caption: 'Ujenzi wa afya ya mwili na akili kupitia michezo na vipaji mbalimbali shuleni.',
    category: 'Michezo',
    date: 'Mwaka 2026',
    isPlaceholder: true
  },
  {
    id: 'sl4',
    url: ukumbiMezaKuuImg,
    title: 'Ukumbi na Meza Kuu ya Tura Secondary Graduation',
    caption: 'Ukumbi mkuu wa shule ukiwa na meza kuu mbele kwa ajili ya mahafali, mikutano na shughuli za kitaaluma.',
    category: 'Shughuli za shule',
    date: 'Mwaka 2026',
    isPlaceholder: true
  }
];

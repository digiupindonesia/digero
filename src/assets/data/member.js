// member.js

const members = [
  {
    id: "550e8400-e29b-41d4-a716-446655440001",
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    phone: 6281234567890,
    accountLinked: ["alice_johnson", "aj_tiktok88"],
    fee: 50000,
    suspended: false
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440002",
    name: "Bob Williams",
    email: "bob.williams@example.com",
    phone: 6282234567890,
    accountLinked: ["bobwilliams23", "bobby_tk", "bobw88"],
    fee: 45000,
    suspended: false
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440003",
    name: "Charlie Brown",
    email: "charlie.brown@example.com",
    phone: 6283234567890,
    accountLinked: ["charliebrown88", "cbrown_tiktok"],
    fee: 60000,
    suspended: false
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440004",
    name: "Diana Prince",
    email: "diana.prince@example.com",
    phone: 6284234567890,
    accountLinked: ["dianaprince_", "wonderdiana_tk"],
    fee: 55000,
    suspended: false
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440005",
    name: "Ethan Hunt",
    email: "ethan.hunt@example.com",
    phone: 6285234567890,
    accountLinked: ["ethanhunt007", "ehunt_official", "missionhunt"],
    fee: 47000,
    suspended: false
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440006",
    name: "Fiona Gallagher",
    email: "fiona.gallagher@example.com",
    phone: 6286234567890,
    accountLinked: ["fionag_99", "fionag_tiktok"],
    fee: 49000,
    suspended: false
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440007",
    name: "George Miller",
    email: "george.miller@example.com",
    phone: 6287234567890,
    accountLinked: ["george_milr", "gmiller88", "george_tk"],
    fee: 51000,
    suspended: false
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440008",
    name: "Hannah Lee",
    email: "hannah.lee@example.com",
    phone: 6288234567890,
    accountLinked: ["hannahlee_tk", "hlee_22"],
    fee: 53000,
    suspended: false
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440009",
    name: "Ian Scott",
    email: "ian.scott@example.com",
    phone: 6289234567890,
    accountLinked: ["ianscott_real", "iscott_tiktok", "ian88"],
    fee: 58000,
    suspended: false
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440010",
    name: "Jane Foster",
    email: "jane.foster@example.com",
    phone: 6281034567890,
    accountLinked: ["janefoster_off", "jfoster88"],
    fee: 46000,
    suspended: false
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440011",
    name: "Kevin Hart",
    email: "kevin.hart@example.com",
    phone: 6281134567890,
    accountLinked: ["kevinhartx", "khart_real", "kh88_tk"],
    fee: 54000,
    suspended: false
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440012",
    name: "Laura Palmer",
    email: "laura.palmer@example.com",
    phone: 6281234567800,
    accountLinked: ["laurap_almr", "laurap_tiktok"],
    fee: 50000,
    suspended: false
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440013",
    name: "Mike Ross",
    email: "mike.ross@example.com",
    phone: 6281334567890,
    accountLinked: ["mikeross24", "mross_tk"],
    fee: 48000,
    suspended: false
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440014",
    name: "Nina Dobrev",
    email: "nina.dobrev@example.com",
    phone: 6281434567890,
    accountLinked: ["ninadobrev99", "ndobrev_official", "nina_d88"],
    fee: 56000,
    suspended: false
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440015",
    name: "Oscar Isaac",
    email: "oscar.isaac@example.com",
    phone: 6281534567890,
    accountLinked: ["oscar_isaac", "oisaac_tiktok"],
    fee: 59000,
    suspended: true
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440016",
    name: "Paula Abdul",
    email: "paula.abdul@example.com",
    phone: 6281634567890,
    accountLinked: ["paulaabdul_tk", "pabdul99"],
    fee: 53000,
    suspended: false
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440017",
    name: "Quincy Jones",
    email: "quincy.jones@example.com",
    phone: 6281734567890,
    accountLinked: ["quincy_jns", "qjones_real", "qj_88"],
    fee: 51000,
    suspended: true
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440018",
    name: "Rachel Green",
    email: "rachel.green@example.com",
    phone: 6281834567890,
    accountLinked: ["rachel_green88", "rgreen_tk"],
    fee: 57000,
    suspended: false
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440019",
    name: "Steve Rogers",
    email: "steve.rogers@example.com",
    phone: 6281934567890,
    accountLinked: ["steverogers191", "srogers_cap"],
    fee: 60000,
    suspended: false
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440020",
    name: "Tina Fey",
    email: "tina.fey@example.com",
    phone: 6282034567890,
    accountLinked: ["tinafeytk", "tina_f88"],
    fee: 49000,
    suspended: false
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440021",
    name: "Ursula K. Le Guin",
    email: "ursula.leguin@example.com",
    phone: 6282134567890,
    accountLinked: ["ursula_leguin", "ukleguin_tk", "ursula_k88"],
    fee: 52000,
    suspended: false
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440022",
    name: "Victor Hugo",
    email: "victor.hugo@example.com",
    phone: 6282234567890,
    accountLinked: ["victor_hugo", "vhugo_real"],
    fee: 48000,
    suspended: false
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440023",
    name: "Wendy Darling",
    email: "wendy.darling@example.com",
    phone: 6282334567890,
    accountLinked: ["wendy_darling", "wdarling88", "wendy_tk"],
    fee: 56000,
    suspended: true
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440024",
    name: "Xander Harris",
    email: "xander.harris@example.com",
    phone: 6282434567890,
    accountLinked: ["xander_harris", "xharris_tk"],
    fee: 59000,
    suspended: false
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440025",
    name: "Yvonne Strahovski",
    email: "yvonne.strahovski@example.com",
    phone: 6282534567890,
    accountLinked: ["yvonne_strah", "ystrahovski_tk", "yv88_tk"],
    fee: 55000,
    suspended: false
  },
];

module.exports = members;

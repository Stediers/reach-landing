export enum State {
  LOADING = "loading",
  ERROR = "error",
  SUCCESS = "success",
  WAIT = "wait",
  IDLE = "idle",
}

export enum OfflineServiceType {
  INTERCITY = "intercity",
  INTERSTATE = "interstate",
  INTERNATIONAL = "international",
}

export enum AppointmentSortType {
  LATEST,
  OLDEST,
}

export enum PaymentMode {
  CASH = "cash",
  UPI = "upi",
  CARD = "card",
}

export enum DraftStatus {
  COMPLETED = "Completed",
  IN_PROGRESS = "InProgress",
}

export enum MembershipType {
  FREE = "free",
  PREMIUM = "premium",
}

export enum OnlinePlatform {
  ZOOM = "zoom",
  GOOGLE_MEET = "google_meet",
  MICROSOFT_TEAMS = "microsoft_teams",
  SKYPE = "skype",
  CALL = "call",
  OTHER = "other",
}

export enum Gender {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other",
}

export enum IndianLanguages {
  ENGLISH = "english",
  ASSAMESE = "assamese",
  BENGALI = "bengali",
  BODO = "bodo",
  DOGRI = "dogri",
  GUJARATI = "gujarati",
  HINDI = "hindi",
  KANNADA = "kannada",
  KASHMIRI = "kashmiri",
  KONKANI = "konkani",
  MAITHILI = "maithili",
  MALAYALAM = "malayalam",
  MANIPURI = "manipuri",
  MARATHI = "marathi",
  NEPALI = "nepali",
  ODIA = "odia",
  PUNJABI = "punjabi",
  SANSKRIT = "sanskrit",
  SANTALI = "santali",
  SINDHI = "sindhi",
  TAMIL = "tamil",
  TELUGU = "telugu",
  URDU = "urdu",
}

export enum BlogCategory {
  TIPS = "tips",
  STORY = "story",
  INFORMATION = "knowledge",
}

export enum RatingType {
  QUALITY = "quality",
  PRICE = "price",
  TIMELINESS = "timeliness",
  COMMUNICATION = "communication",
}

export enum CommunicationType {
  CHAT = "Chat",
  CALL = "Call",
}

export enum CountryCode {
  US = "+1",
  IN = "+91",
  GB = "+44",
  JP = "+81",
  RU = "+7",
  AU = "+61",
  CA = "+1",
}

export enum CallbackStatus {
  PENDING = "PENDING",
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
}

export enum ServiceCategory {
  FITNESS = "fitness",
  BEAUTY = "beauty",
  VIDEOGRAPHY = "videography",
  PHOTOGRAPHY = "photography",
  MODELING = "modeling",
  ACTING = "acting",
  DANCING = "dancing",
  COOKING = "cooking",
  MUSIC = "music",
  WRITING = "writing",
  EVENT_PLANNING = "event_planning",
  GRAPHIC_DESIGN = "graphic_design",
  TUTORING = "tutoring",
  LANGUAGE_TRANSLATION = "language_translation",
  CAR_RENTAL = "car_rental",
  HOME_MAINTENANCE = "home_maintenance",
  PET_CARE = "pet_care",
  SOFTWARE_DEVELOPMENT = "software_development",
  LEGAL_SERVICES = "legal_services",
  HEALTHCARE = "healthcare",
  ONLINE_MARKETING = "online_marketing",
}

export enum PreferredGender {
  MALE = "male",
  FEMALE = "female",
  UNISEX = "unisex",
}

export enum RequestMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export enum PricingType {
  HOUR = "hour",
  SESSION = "session",
}

export enum ServiceType {
  ONLINE = "online",
  OFFLINE = "offline",
  HOME = "home",
}

export enum SortType {
  LOW_TO_HIGH = "low_to_high",
  HIGH_TO_LOW = "high_to_low",
}

export enum AddressName {
  HOME = "home",
  OFFICE = "office",
  OTHER = "other",
}

export enum S3BucketName {
  USER = "user4762",
  SERVICE = "service4762",
  APPOINTMENT = "appointment4762",
}

export enum BookingStatus {
  REQUESTED = "Requested", //gig worker yet to accept
  PAYMENT_PENDING = "Payment Pending", //gig worker accepted, customer yet to pay
  CONFIRMED = "Confirmed", //gig worker and customer agreed on price and requirements
  RATED = "Rated", //customer rated
  CANCELLED = "Cancelled", //customer cancelled
  DECLINED = "Declined", //gig worker declined
  EXPIRED = "Expired", //gig worker did not accept within 24 hours
}

export enum PageState {
  LOADING = "loading",
  ERROR = "error",
  SUCCESS = "success",
}

export enum GigDomains {
  WebDevelopment = "Web Development",
  MobileDevelopment = "Mobile Development",
  SoftwareDevelopment = "Software Development",
  DataScience = "Data Science",
  MachineLearning = "Machine Learning",
  ArtificialIntelligence = "Artificial Intelligence",
  ContentWriting = "Content Writing",
  EditingProofreading = "Editing & Proofreading",
  Translation = "Translation",
  GraphicDesign = "Graphic Design",
  VideoEditing = "Video Editing",
  Animation = "Animation",
  DigitalMarketing = "Digital Marketing",
  SocialMediaMarketing = "Social Media Marketing",
  SearchEngineOptimization = "Search Engine Optimization (SEO)",
  PayPerClickAdvertising = "Pay-Per-Click (PPC) Advertising",
  VirtualAssistant = "Virtual Assistant",
  Transcription = "Transcription",
  CustomerService = "Customer Service",
  LegalServices = "Legal Services",
  AccountingFinance = "Accounting & Finance",
  BusinessConsulting = "Business Consulting",
  EducationTraining = "Education & Training",
  EventPlanning = "Event Planning",
  Photography = "Photography",
  MusicAudio = "Music & Audio",
  FitnessHealth = "Fitness & Health",
  BeautyFashion = "Beauty & Fashion",
  HomeGarden = "Home & Garden",
  TravelTourism = "Travel & Tourism",
}

export enum DisputeStatus {
  PENDING = "pending",
  RESOLVED = "resolved",
  EXPIRED = "expired",
}

export enum PayoutStatus {
  QUEUED = "queued",
  PENDING = "pending",
  REJECTED = "rejected",
  PROCESSING = "processing",
  PROCESSED = "processed",
  CANCELLED = "cancelled",
  REVERSED = "reversed",
  FAILED = "failed",
}

export enum PaymentStatus {
  PENDING = "pending",
  PAID = "paid",
  FAILED = "failed",
  EXPIRED = "expired",
}

export enum AppointmentStatus {
  PAYMENT_PENDING = "payment_pending",
  SCHEDULED = "scheduled",
  COMPLETED = "completed",
  REFUNDED = "refunded",
  CANCELLED = "cancelled",
  DISPUTED = "disputed",
  EXPIRED = "expired",
}

export enum AddressType {
  HOME = "home",
  OFFICE = "office",
  APARTMENT = "apartment",
  TEMP = "temp",
}

export enum IndianStates {
  ANDAMAN_AND_NICOBAR_ISLANDS = "Andaman and Nicobar Islands",
  ANDHRA_PRADESH = "Andhra Pradesh",
  ARUNACHAL_PRADESH = "Arunachal Pradesh",
  ASSAM = "Assam",
  BIHAR = "Bihar",
  CHANDIGARH = "Chandigarh",
  CHHATTISGARH = "Chhattisgarh",
  DADRA_AND_NAGAR_HAVELI_AND_DAMAN_AND_DIU = "Dadra and Nagar Haveli and Daman and Diu",
  DELHI = "Delhi",
  GOA = "Goa",
  GUJARAT = "Gujarat",
  HARYANA = "Haryana",
  HIMACHAL_PRADESH = "Himachal Pradesh",
  JAMMU_AND_KASHMIR = "Jammu and Kashmir",
  JHARKHAND = "Jharkhand",
  KARNATAKA = "Karnataka",
  KERALA = "Kerala",
  LAKSHADWEEP = "Lakshadweep",
  MADHYA_PRADESH = "Madhya Pradesh",
  MAHARASHTRA = "Maharashtra",
  MANIPUR = "Manipur",
  MEGHALAYA = "Meghalaya",
  MIZORAM = "Mizoram",
  NAGALAND = "Nagaland",
  ODISHA = "Odisha",
  PUDUCHERRY = "Puducherry",
  PUNJAB = "Punjab",
  RAJASTHAN = "Rajasthan",
  SIKKIM = "Sikkim",
  TAMIL_NADU = "Tamil Nadu",
  TELANGANA = "Telangana",
  TRIPURA = "Tripura",
  UTTAR_PRADESH = "Uttar Pradesh",
  UTTARAKHAND = "Uttarakhand",
  WEST_BENGAL = "West Bengal",
}

export enum Currency {
  USD = "USD",
  EUR = "EUR",
  GBP = "GBP",
  JPY = "JPY",
  RUB = "RUB",
  AUD = "AUD",
  CAD = "CAD",
  CHF = "CHF",
  INR = "INR",
}

export enum TrackingSource {
  SEARCH = "search",
  WHATSAPP = "whatsapp",
  REFERRAL = "referral",
  INSTAGRAM = "instagram",
  FACEBOOK = "facebook",
  GOOGLE = "google",
}

export enum Designation {
  Lawyer = "Lawyer",
  Astrologer = "Astrologer",
  Doctor = "Doctor",
  Physiotherapist = "Physiotherapist",
  Dentist = "Dentist",
  Architect = "Architect",
  InteriorDesigner = "Interior Designer",
  FashionDesigner = "Fashion Designer",
  Stylist = "Stylist",
  HairStylist = "Hair Stylist",
  Teacher = "Teacher",
  MakeupArtist = "Makeup Artist",
  EventPlanner = "Event Planner",
  Photographer = "Photographer",
  GraphicDesigner = "Graphic Designer",
  Developer = "Developer",
  ContentCreator = "Content Creator",
  Chef = "Chef",
  FitnessTrainer = "Fitness Trainer",
  Influencer = "Influencer",
  Model = "Model",
  Musician = "Musician",
  Writer = "Writer",
  Artist = "Artist",
  Consultant = "Consultant",
  Tutor = "Tutor",
  Coach = "Coach",
}

export enum CustomerRoutes {
  //landing
  LEARN = "/learn",
  EXPLORE = "/explore",
  COMPLIANCE = "/compliance",
  COMPLIANCE_CHAT_GUIDELINES = "/compliance/chat-guidelines",
  COMPLIANCE_DATA_RETENTION_POLICY = "/compliance/data-retention-policy",
  COMPLIANCE_PRIVACY_POLICY = "/compliance/privacy-policy",
  COMPLIANCE_TERMS_OF_SERVICE = "/compliance/terms-of-service",
  COMPLIANCE_REFUND_POLICY = "/compliance/refund-policy",
  COMPLIANCE_TERMS_AND_CONDITIONS_FOR_APPOINTMENTS = "/compliance/terms-and-conditions-for-appointments",
  VERIFICATION = "/verification",
  SEARCH_PARTNER = "/explore/partner",
  //console
  APPOINTMENTS = "/console/appointments",
  REQUESTS = "/console/appointments/requests",
  MANAGE_APPOINTMENT = "/console/appointments/[appointmentId]",
  VIEW_APP = "/console/appointments/[appointmentId]",
  PROFILE = "/console/profile",
  EDIT_ADDRESS = "/console/profile/address",
  EDIT_PROFILE = "/console/profile/edit",
  RATING = "/console/profile/rating",
  VERIFY = "/console/profile/verify",
  CALLBACKS = "/console/callbacks",
  APPOINTMENT_REQUESTS = "/console/appointments/requests",
  //pages
  PARTNER = "/[partnerHandle]",
  SERVICE = "/[partnerHandle]/service/[serviceId]",
  //vendors
  VENDORS = "/vendors/[city]",
  VENDORS_BY_DESIGNATION = "/vendors/[city]/[designation]",
}

export enum AppointmentRequestStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
  EXPIRED = "EXPIRED",
}

export enum RatingType {
  QUALITY = "quality",
  PRICE = "price",
  TIMELINESS = "timeliness",
  COMMUNICATION = "communication",
}

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

export enum AppointmentStatus {
  COMPLETED = "completed",
  RATED = "rated",
  SCHEDULED = "scheduled",
  CANCELLED = "cancelled",
  BOOKED = "booked",
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

export enum PricingType {
  HOUR = "hour",
  SESSION = "session",
}

export enum PreferredGender {
  MALE = "male",
  FEMALE = "female",
  UNISEX = "unisex",
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

export enum MembershipType {
  FREE = "free",
  PREMIUM = "premium",
}

export enum ServiceType {
  ONLINE = "online",
  OFFLINE = "offline",
  HOME = "home",
}

export enum AddressName {
  HOME = "home",
  OFFICE = "office",
  OTHER = "other",
}

export enum AddressType {
  HOME = "home",
  OFFICE = "office",
  APARTMENT = "apartment",
}

export enum S3BucketName {
  USER = "user4762",
  SERVICE = "service4762",
  APPOINTMENT = "appointment4762",
}

export enum OnlinePlatform {
  ZOOM = "zoom",
  GOOGLE_MEET = "google_meet",
  MICROSOFT_TEAMS = "microsoft_teams",
  SKYPE = "skype",
  CALL = "call",
  OTHER = "other",
}

export enum RequestMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
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
  INFORMATION = "information",
}

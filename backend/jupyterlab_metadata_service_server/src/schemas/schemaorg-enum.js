const { GraphQLEnumType } = require('graphql');

 
const GenderTypeEnum = new GraphQLEnumType({
  name: 'GenderTypeEnum',
  values: {
    Male: {
      value: 1,
    },
    Female: {
      value: 2,
    },
    
  },
});
 
const MapCategoryTypeEnum = new GraphQLEnumType({
  name: 'MapCategoryTypeEnum',
  values: {
    ParkingMap: {
      value: 1,
    },
    SeatingMap: {
      value: 2,
    },
    VenueMap: {
      value: 3,
    },
    TransitMap: {
      value: 4,
    },
    
  },
});
 
const ContactPointOptionEnum = new GraphQLEnumType({
  name: 'ContactPointOptionEnum',
  values: {
    HearingImpairedSupported: {
      value: 1,
    },
    TollFree: {
      value: 2,
    },
    
  },
});
 
const DigitalDocumentPermissionTypeEnum = new GraphQLEnumType({
  name: 'DigitalDocumentPermissionTypeEnum',
  values: {
    ReadPermission: {
      value: 1,
    },
    WritePermission: {
      value: 2,
    },
    CommentPermission: {
      value: 3,
    },
    
  },
});
 
const PaymentStatusTypeEnum = new GraphQLEnumType({
  name: 'PaymentStatusTypeEnum',
  values: {
    PaymentComplete: {
      value: 1,
    },
    PaymentPastDue: {
      value: 2,
    },
    PaymentAutomaticallyApplied: {
      value: 3,
    },
    PaymentDue: {
      value: 4,
    },
    PaymentDeclined: {
      value: 5,
    },
    
  },
});
 
const MusicAlbumReleaseTypeEnum = new GraphQLEnumType({
  name: 'MusicAlbumReleaseTypeEnum',
  values: {
    AlbumRelease: {
      value: 1,
    },
    EPRelease: {
      value: 2,
    },
    BroadcastRelease: {
      value: 3,
    },
    SingleRelease: {
      value: 4,
    },
    
  },
});
 
const GameServerStatusEnum = new GraphQLEnumType({
  name: 'GameServerStatusEnum',
  values: {
    OfflinePermanently: {
      value: 1,
    },
    OfflineTemporarily: {
      value: 2,
    },
    Online: {
      value: 3,
    },
    OnlineFull: {
      value: 4,
    },
    
  },
});
 
const OfferItemConditionEnum = new GraphQLEnumType({
  name: 'OfferItemConditionEnum',
  values: {
    DamagedCondition: {
      value: 1,
    },
    RefurbishedCondition: {
      value: 2,
    },
    UsedCondition: {
      value: 3,
    },
    NewCondition: {
      value: 4,
    },
    
  },
});
 
const RestrictedDietEnum = new GraphQLEnumType({
  name: 'RestrictedDietEnum',
  values: {
    VeganDiet: {
      value: 1,
    },
    KosherDiet: {
      value: 2,
    },
    DiabeticDiet: {
      value: 3,
    },
    HinduDiet: {
      value: 4,
    },
    GlutenFreeDiet: {
      value: 5,
    },
    HalalDiet: {
      value: 6,
    },
    LowLactoseDiet: {
      value: 7,
    },
    VegetarianDiet: {
      value: 8,
    },
    LowCalorieDiet: {
      value: 9,
    },
    LowFatDiet: {
      value: 10,
    },
    LowSaltDiet: {
      value: 11,
    },
    
  },
});
 
const QualitativeValueEnum = new GraphQLEnumType({
  name: 'QualitativeValueEnum',
  values: {
    
  },
});
 
const PaymentMethodEnum = new GraphQLEnumType({
  name: 'PaymentMethodEnum',
  values: {
    
  },
});
 
const OrderStatusEnum = new GraphQLEnumType({
  name: 'OrderStatusEnum',
  values: {
    OrderReturned: {
      value: 1,
    },
    OrderProcessing: {
      value: 2,
    },
    OrderPickupAvailable: {
      value: 3,
    },
    OrderProblem: {
      value: 4,
    },
    OrderDelivered: {
      value: 5,
    },
    OrderInTransit: {
      value: 6,
    },
    OrderCancelled: {
      value: 7,
    },
    OrderPaymentDue: {
      value: 8,
    },
    
  },
});
 
const BookFormatTypeEnum = new GraphQLEnumType({
  name: 'BookFormatTypeEnum',
  values: {
    EBook: {
      value: 1,
    },
    AudiobookFormat: {
      value: 2,
    },
    Hardcover: {
      value: 3,
    },
    Paperback: {
      value: 4,
    },
    
  },
});
 
const ItemListOrderTypeEnum = new GraphQLEnumType({
  name: 'ItemListOrderTypeEnum',
  values: {
    ItemListOrderDescending: {
      value: 1,
    },
    ItemListUnordered: {
      value: 2,
    },
    ItemListOrderAscending: {
      value: 3,
    },
    
  },
});
 
const WarrantyScopeEnum = new GraphQLEnumType({
  name: 'WarrantyScopeEnum',
  values: {
    
  },
});
 
const DeliveryMethodEnum = new GraphQLEnumType({
  name: 'DeliveryMethodEnum',
  values: {
    OnSitePickup: {
      value: 1,
    },
    
  },
});
 
const ActionStatusTypeEnum = new GraphQLEnumType({
  name: 'ActionStatusTypeEnum',
  values: {
    PotentialActionStatus: {
      value: 1,
    },
    FailedActionStatus: {
      value: 2,
    },
    CompletedActionStatus: {
      value: 3,
    },
    ActiveActionStatus: {
      value: 4,
    },
    
  },
});
 
const MusicAlbumProductionTypeEnum = new GraphQLEnumType({
  name: 'MusicAlbumProductionTypeEnum',
  values: {
    SoundtrackAlbum: {
      value: 1,
    },
    RemixAlbum: {
      value: 2,
    },
    DJMixAlbum: {
      value: 3,
    },
    LiveAlbum: {
      value: 4,
    },
    DemoAlbum: {
      value: 5,
    },
    SpokenWordAlbum: {
      value: 6,
    },
    CompilationAlbum: {
      value: 7,
    },
    StudioAlbum: {
      value: 8,
    },
    MixtapeAlbum: {
      value: 9,
    },
    
  },
});
 
const SpecialtyEnum = new GraphQLEnumType({
  name: 'SpecialtyEnum',
  values: {
    
  },
});
 
const ItemAvailabilityEnum = new GraphQLEnumType({
  name: 'ItemAvailabilityEnum',
  values: {
    SoldOut: {
      value: 1,
    },
    PreOrder: {
      value: 2,
    },
    OutOfStock: {
      value: 3,
    },
    PreSale: {
      value: 4,
    },
    InStock: {
      value: 5,
    },
    LimitedAvailability: {
      value: 6,
    },
    Discontinued: {
      value: 7,
    },
    OnlineOnly: {
      value: 8,
    },
    InStoreOnly: {
      value: 9,
    },
    
  },
});
 
const BusinessFunctionEnum = new GraphQLEnumType({
  name: 'BusinessFunctionEnum',
  values: {
    
  },
});
 
const RsvpResponseTypeEnum = new GraphQLEnumType({
  name: 'RsvpResponseTypeEnum',
  values: {
    RsvpResponseYes: {
      value: 1,
    },
    RsvpResponseMaybe: {
      value: 2,
    },
    RsvpResponseNo: {
      value: 3,
    },
    
  },
});
 
const BusinessEntityTypeEnum = new GraphQLEnumType({
  name: 'BusinessEntityTypeEnum',
  values: {
    
  },
});
 
const ReservationStatusTypeEnum = new GraphQLEnumType({
  name: 'ReservationStatusTypeEnum',
  values: {
    ReservationConfirmed: {
      value: 1,
    },
    ReservationPending: {
      value: 2,
    },
    ReservationCancelled: {
      value: 3,
    },
    ReservationHold: {
      value: 4,
    },
    
  },
});
 
const BoardingPolicyTypeEnum = new GraphQLEnumType({
  name: 'BoardingPolicyTypeEnum',
  values: {
    ZoneBoardingPolicy: {
      value: 1,
    },
    GroupBoardingPolicy: {
      value: 2,
    },
    
  },
});
 
const MusicReleaseFormatTypeEnum = new GraphQLEnumType({
  name: 'MusicReleaseFormatTypeEnum',
  values: {
    DigitalAudioTapeFormat: {
      value: 1,
    },
    CDFormat: {
      value: 2,
    },
    VinylFormat: {
      value: 3,
    },
    CassetteFormat: {
      value: 4,
    },
    LaserDiscFormat: {
      value: 5,
    },
    DigitalFormat: {
      value: 6,
    },
    DVDFormat: {
      value: 7,
    },
    
  },
});
 
const DayOfWeekEnum = new GraphQLEnumType({
  name: 'DayOfWeekEnum',
  values: {
    Wednesday: {
      value: 1,
    },
    Sunday: {
      value: 2,
    },
    PublicHolidays: {
      value: 3,
    },
    Monday: {
      value: 4,
    },
    Friday: {
      value: 5,
    },
    Tuesday: {
      value: 6,
    },
    Saturday: {
      value: 7,
    },
    Thursday: {
      value: 8,
    },
    
  },
});
 
const EventStatusTypeEnum = new GraphQLEnumType({
  name: 'EventStatusTypeEnum',
  values: {
    EventPostponed: {
      value: 1,
    },
    EventRescheduled: {
      value: 2,
    },
    EventScheduled: {
      value: 3,
    },
    EventCancelled: {
      value: 4,
    },
    
  },
});
 
const GamePlayModeEnum = new GraphQLEnumType({
  name: 'GamePlayModeEnum',
  values: {
    MultiPlayer: {
      value: 1,
    },
    CoOp: {
      value: 2,
    },
    SinglePlayer: {
      value: 3,
    },
    
  },
});
 
module.exports = { 
  GenderTypeEnum, 
  MapCategoryTypeEnum, 
  ContactPointOptionEnum, 
  DigitalDocumentPermissionTypeEnum, 
  PaymentStatusTypeEnum, 
  MusicAlbumReleaseTypeEnum, 
  GameServerStatusEnum, 
  OfferItemConditionEnum, 
  RestrictedDietEnum, 
  QualitativeValueEnum, 
  PaymentMethodEnum, 
  OrderStatusEnum, 
  BookFormatTypeEnum, 
  ItemListOrderTypeEnum, 
  WarrantyScopeEnum, 
  DeliveryMethodEnum, 
  ActionStatusTypeEnum, 
  MusicAlbumProductionTypeEnum, 
  SpecialtyEnum, 
  ItemAvailabilityEnum, 
  BusinessFunctionEnum, 
  RsvpResponseTypeEnum, 
  BusinessEntityTypeEnum, 
  ReservationStatusTypeEnum, 
  BoardingPolicyTypeEnum, 
  MusicReleaseFormatTypeEnum, 
  DayOfWeekEnum, 
  EventStatusTypeEnum, 
  GamePlayModeEnum, 

};
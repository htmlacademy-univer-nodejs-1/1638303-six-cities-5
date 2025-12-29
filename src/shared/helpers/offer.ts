import {
  Offer,
  User,
  isCityName,
  isAmenity,
  PropertyType,
  isPropertyType,
  isUserType,
  UserType,
  CityName,
  Amenity,
  Location,
} from '../types/index.js';

const CITY_LOCATIONS: Record<CityName, Location> = {
  [CityName.PARIS]: {
    latitude: 48.85661,
    longitude: 2.351499,
  },
  [CityName.COLOGNE]: {
    latitude: 50.938361,
    longitude: 6.959974,
  },
  [CityName.BRUSSELS]: {
    latitude: 50.846557,
    longitude: 4.351697,
  },
  [CityName.AMSTERDAM]: {
    latitude: 52.37454,
    longitude: 4.897976,
  },
  [CityName.HAMBURG]: {
    latitude: 53.550341,
    longitude: 10.000654,
  },
  [CityName.DUSSELDORF]: {
    latitude: 51.225402,
    longitude: 6.776314,
  },
};

export function createOffer(offerData: string): Offer {
  const [
    title,
    description,
    publishDate,
    city,
    previewImage,
    images,
    isPremium,
    isFavorite,
    rating,
    housingType,
    rooms,
    guests,
    price,
    amenities,
    name,
    email,
    avatarUrl,
    password,
    typeRaw,
    commentsCount,
    latitude,
    longitude,
  ] = offerData.replace('\n', '').split('\t');
  const user: User = {
    name,
    email,
    avatarUrl,
    password,
    type: isUserType(typeRaw) ?? UserType.REGULAR,
  };

  const parsedCommentsCount = Number.parseInt(commentsCount, 10);
  const parsedRating = parseFloat(rating);

  return {
    title,
    description,
    publishDate: new Date(publishDate),
    city: isCityName(city) ?? CityName.AMSTERDAM,
    previewImage: previewImage,
    images: images.split(',').map((img) => img.trim()) as [
      string,
      string,
      string,
      string,
      string,
      string,
    ],
    isPremium: isPremium.toLowerCase() === 'true',
    isFavorite: isFavorite.toLowerCase() === 'true',
    rating: Math.max(1, Math.min(5, parsedRating)),
    type: isPropertyType(housingType) ?? PropertyType.APARTMENT,
    rooms: parseInt(rooms, 10),
    guests: parseInt(guests, 10),
    price: parseInt(price, 10),
    amenities: amenities
      .split(';')
      .map((c) => isAmenity(c.trim()) ?? Amenity.FRIDGE),
    user,
    commentsCount: isNaN(parsedCommentsCount) ? 0 : parsedCommentsCount,
    location: {
      latitude: Number.parseFloat(latitude),
      longitude: Number.parseFloat(longitude),
    },
  };
}

export function serializeOfferForFrontend(offer: any): any {
  const userObject = typeof offer.user === 'object' ? offer.user : null;
  const cityName = offer.city as CityName;
  const cityLocation =
    CITY_LOCATIONS[cityName] || CITY_LOCATIONS[CityName.PARIS];

  return {
    id: offer._id?.toString() || offer.id?.toString(),
    title: offer.title,
    description: offer.description,
    publishDate: offer.publishDate,
    city: {
      name: cityName,
      location: cityLocation,
    },
    previewImage: `img/${offer.previewImage}`,
    images: offer.images.map((img: string) => `img/${img}`),
    isPremium: offer.isPremium,
    isFavorite: offer.isFavorite,
    rating: offer.rating,
    type: offer.type,
    bedrooms: offer.rooms,
    maxAdults: offer.guests,
    price: offer.price,
    goods: offer.amenities,
    host: userObject
      ? {
        name: userObject.name,
        email: userObject.email,
        avatarUrl: userObject.avatarUrl
          ? `img/${userObject.avatarUrl}`
          : userObject.avatarUrl,
        isPro: userObject.type === 'pro',
      }
      : undefined,
    commentsCount: offer.commentsCount,
    location: offer.location,
  };
}

export function serializeCommentForFrontend(comment: any): any {
  const authorObject =
    typeof comment.author === 'object' ? comment.author : null;

  return {
    id: comment._id?.toString() || comment.id?.toString(),
    comment: comment.text,
    date: comment.publishDate || comment.createdAt,
    rating: comment.rating,
    user: authorObject
      ? {
        name: authorObject.name,
        email: authorObject.email,
        avatarUrl: authorObject.avatarUrl
          ? `img/${authorObject.avatarUrl}`
          : authorObject.avatarUrl,
        isPro: authorObject.type === 'pro',
      }
      : undefined,
  };
}

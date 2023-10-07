interface GeoHashPrecision {
    precision: number,
    label: string
}
export class GeoHash {
  private static readonly BASE32_CHARS: string =
    "0123456789bcdefghjkmnpqrstuvwxyz";
  private static readonly MAX_LATITUDE: number = 90;
  private static readonly MIN_LATITUDE: number = -90;
  private static readonly MAX_LONGITUDE: number = 180;
  private static readonly MIN_LONGITUDE: number = -180;

  static readonly DISTANCE: GeoHashPrecision[] = [
    {
        precision: 1,
        label: "5000 Km"
    },
    {
        precision: 2,
        label: "1250 Km"
    },
    {
        precision: 3,
        label: "156 Km"
    },
    {
        precision: 4,
        label: "39 Km"
    },
    {
        precision: 5,
        label: "5 Km"
    },
    {
        precision: 6,
        label: "1 Km"
    },
    {
        precision: 7,
        label: "150 m"
    }
  ]

  static encode(
    latitude: number,
    longitude: number,
    precision: number
  ): string {
    let geohash = "";
    let isEven = true;
    let bit = 0;
    let ch = 0;

    const latRange: [number, number] = [
      GeoHash.MIN_LATITUDE,
      GeoHash.MAX_LATITUDE,
    ];
    const lonRange: [number, number] = [
      GeoHash.MIN_LONGITUDE,
      GeoHash.MAX_LONGITUDE,
    ];

    while (geohash.length < precision) {
      if (isEven) {
        const mid = (lonRange[0] + lonRange[1]) / 2;
        if (longitude > mid) {
          ch |= 1 << (4 - bit);
          lonRange[0] = mid;
        } else {
          lonRange[1] = mid;
        }
      } else {
        const mid = (latRange[0] + latRange[1]) / 2;
        if (latitude > mid) {
          ch |= 1 << (4 - bit);
          latRange[0] = mid;
        } else {
          latRange[1] = mid;
        }
      }

      isEven = !isEven;
      if (bit < 4) {
        bit++;
      } else {
        geohash += GeoHash.BASE32_CHARS[ch];
        bit = 0;
        ch = 0;
      }
    }

    return geohash;
  }
}

interface Artists {
  artist: {
    followers: number;
    genres: string[];
    image: string;
    name: string;
    url: string;
  }[];
}

interface Tracks {
  artist: {
    track: {
      image: string;
      url: string;
      name: string;
    }[];
  }[];
}

export default interface MusicData {
  artists: Artists[];
  tracks: Tracks[];
}

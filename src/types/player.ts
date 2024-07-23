export type playbackType = {
  actions: {
    disallows: {
      resuming: boolean;
      toggling_repeat_context: boolean;
      toggling_repeat_track: boolean;
      toggling_shuffle: boolean;
      pausing: boolean;
    };
  };
  context: {
    external_urls: {
      spotify: string;
    };
    href: string;
    type: string;
    uri: string;
  };
  currently_playing_type: string;
  device: {
    id: string;
    is_active: boolean;
    is_private_session: boolean;
    is_restricted: boolean;
    name: string;
    type: string;
    volume_percent: number;
    supports_volume: boolean;
  };
  is_playing: boolean;
  item: {
    album: {
      id: string;
      href: string;
      album_type: string;
      artists: [
        {
          href: string;
          id: string;
          name: string;
          type: string;
          uri: string;
        }
      ];
      images: [
        {
          height: number;
          url: string;
          width: number;
        }
      ];
      name: string;
      release_date: string;
      release_date_precision: string;
      total_tracks: number;
      type: string;
      uri: string;
    };
    artists: [
      {
        href: string;
        id: string;
        name: string;
        type: string;
        uri: string;
      }
    ];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    href: string;
    id: string;
    is_local: boolean;
    name: string;
    popularity: number;
    preview_url: string;
    track_number: number;
    type: string;
    uri: string;
  };
  progress_ms: number;
  repeat_state: "off" | "context" | "track" | undefined;
  shuffle_state: boolean;
  smart_shuffle: boolean;
  timestamp: number;
};
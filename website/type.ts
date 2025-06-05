export type Artist = {
  Id: number;
  ArtistName: string;
  Date: string;
  ImageSource: string;
  Description: string;
  Price: Number | null;
}
export type Artical = {
  Artist_name: string;
  InfoURL: string;
  VideoURL: string;
}
export type Order = {
  UserId: string;
  ArtistId: number;
  TickNum: number;
}
export interface Meetup {
  id: string;
  ownerId: string;
  title: string;
  category: string;
  description: string;
  date: string;
  location: string;
  imgUrl: string;
  attendees: [] | { name: string; id: string }[];
  comments:
    | []
    | { id: string; userId: string; comment: string; name: string }[];
}

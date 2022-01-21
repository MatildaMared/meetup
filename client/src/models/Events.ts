export interface Events {
  name: string;
  description: string;
}

export interface Meetups {
  id: number;
  ownerId: number;
  title: string;
  category: string;
  description: string;
  date: Date;
  location: string;
  imgUrl: string;
  attendees:  {name: string, id: number}[];
  comments: { name: string, comment: string}[]
 
}

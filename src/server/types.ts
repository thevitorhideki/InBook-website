export interface BookProps {
  id: string;
  title: string;
  slug: string;
  authors: {
    authorId: string;
    name: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

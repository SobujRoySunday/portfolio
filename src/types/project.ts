/** Field shape of a project, shared by the Mongoose model and the UI. */
export interface Project {
  name: string;
  description: string;
  image: string;
  url: string;
  isStarred: boolean;
}

export interface Project {
  _id: string;
  title: string;
  description: string;
  technologies?: string[];
  projectType?: string;
  imagePath?: string;
  imageUrl?: string;
  projectUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  order?: number;
  createdAt?: string;
  updatedAt?: string;
}

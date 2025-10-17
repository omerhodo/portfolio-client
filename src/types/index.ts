export interface Project {
  _id: string;
  title: string;
  slug: string;
  description: string;
  technologies?: string[];
  projectType?: string;
  imageUrl?: string;
  imagePublicId?: string;
  projectUrl?: string;
  githubUrl?: string;
  privacyPolicy?: string;
  featured?: boolean;
  order?: number;
  createdAt?: string;
  updatedAt?: string;
}

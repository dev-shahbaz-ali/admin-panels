export interface Stats {
    totalProjects: number;
    totalBlogs: number;
    totalSkills: number;
    totalMessages: number;
}

export interface Project {
    id: string;
    title: string;
    description: string;
    image: string;
    technologies: string[];
    liveUrl: string;
    githubUrl: string;
    createdAt: string;
}

export interface Blog {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    image: string;
    tags: string[];
    published: boolean;
    createdAt: string;
}

export interface Skill {
    id: string;
    name: string;
    category: string;
    level: number; // 0-100
    icon?: string;
}

export interface Message {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    read: boolean;
    createdAt: string;
}

export interface ActivityData {
    name: string;
    views: number;
    visitors: number;
}
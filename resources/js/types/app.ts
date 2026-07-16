import type { User } from './auth';

export interface PageProps {
    auth: {
        user: User;
    };
    name: string;
    [key: string]: unknown;
}

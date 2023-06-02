export class Post {
    id!: string;
    title!: string;
    content!: string;
    likes: string[] = [];
    createdAt!: number;
    updatedAt!: number;
    owner!: firebase.default.User;
}
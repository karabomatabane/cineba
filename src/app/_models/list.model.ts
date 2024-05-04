export interface Comment {
    user: {_id: string, username: string};
    message: string;
    date: Date;
}

export interface ViewList {
    _id: string;
    name: string;
    imgUrl: string;
    description: string;
    active: boolean;
    private: boolean;
    films: string[];
    likes: number;
    comments: Comment[];
    owner: {_id: string, username: string};
    members: string[];
}

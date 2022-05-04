import { Answer } from "./answer";
import { Tag } from "./tag";
import { User } from "./user";

export class Question {
    questionId!: number;
    questionDateCreated!: Date;
    posVotes!: number;
    negVotes!: number;
    user!: User;
    currentUserVote!: boolean;
    answers!: Answer[];

    constructor(
        public title: string,
        public questionText: string,
        public tags: Tag[]
      ) {}
}

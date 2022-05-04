import { Question } from "./question";
import { User } from "./user";

export class Answer {
    answerId!: number;
    answerTextCreated!: Date;
    user!: User;
    posVotes!: number;
    negVotes!: number;
    currentUserVote!: boolean;

    constructor(
        public answerText: string,
        public question: Question,
    ) {}
}

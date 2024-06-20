import { v4 as uuidv4 } from 'uuid';

export interface Question {
    id: string;
    type: string;
    text: string;
    options?: string[];
    required?: boolean;
    hint?: string;
    defaultAnswer?: string;
}

export interface Form {
    id: string;
    title: string;
    description?: string;
    questions: Question[];
    responses: FormResponse[];
}

export interface FormResponse {
    id: string;
    answers: { [key: string]: string | string[] };
}

export const createQuestion = (type: string, text: string, options: string[] = []): Question => ({
    id: uuidv4(),
    type,
    text,
    options
});

import { Request, Response } from 'express';
import { readDatabase, writeDatabase } from '../db/dbconfig';

export const pingController = (req: Request, res: Response) => {
    res.json(true);
}

export const submitController = (req: Request, res: Response) => {
    const { Name, Email, Phone, GithubLink, StopwatchTime } = req.body;

    if (!Name || !Email || !Phone || !GithubLink || !StopwatchTime) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const submissions = readDatabase();
    submissions.push({ Name, Email, Phone, GithubLink, StopwatchTime });
    writeDatabase(submissions);

    res.status(201).json({ message: 'Submission saved successfully' });
}

export const readController = (req: Request, res: Response) => {
    const { index } = req.query;

    const submissions = readDatabase();
    const submissionIndex = parseInt(index as string, 10);

    if (typeof index === 'undefined') {
        return res.status(200).json(submissions);
    }

    if (isNaN(submissionIndex) || submissionIndex < 0 || submissionIndex >= submissions.length) {
        return res.status(404).json({ error: 'Submission not found' });
    }

    res.json(submissions[submissionIndex]);
}
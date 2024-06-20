import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Form, FormResponse, createQuestion } from '../models/form';

const router = Router();
let forms: Form[] = [];

// Create a new form
router.post('/', (req, res) => {
    try {
        const { title, description, questions } = req.body;

        // Basic validation
        if (!title || !questions || !Array.isArray(questions)) {
            return res.status(400).json({ message: 'Invalid form data' });
        }

        const newForm: Form = {
            id: uuidv4(),
            title,
            description,
            questions,
            responses: []
        };
        forms.push(newForm);
        console.log('Forms after creation:', forms); // Log for debugging
        res.status(201).json(newForm);
    } catch (error) {
        console.error('Error creating form:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Get all forms
router.get('/', (req, res) => {
    res.json(forms);
});

// Get a single form by ID
router.get('/:id', (req, res) => {
    const formId = req.params.id;
    const form = forms.find(f => f.id === formId);
    if (form) {
        res.json(form);
    } else {
        res.status(404).json({ message: 'Form not found' });
    }
    console.log('Form details:', form); // Log for debugging
});

// Submit a form response
router.post('/:id/submit', (req, res) => {
    try {
        const formId = req.params.id;
        const form = forms.find(f => f.id === formId);
        if (!form) {
            console.error('Form not found:', formId);
            return res.status(404).json({ message: 'Form not found' });
        }

        const { answers } = req.body;
        console.log('Received answers:', answers);
        if (!answers || typeof answers !== 'object') {
            console.error('Invalid form response data:', req.body);
            return res.status(400).json({ message: 'Invalid form response data' });
        }

        const newResponse: FormResponse = {
            id: uuidv4(),
            answers
        };
        form.responses.push(newResponse);
        console.log('Forms after response:', forms); // Log for debugging
        res.status(201).json(newResponse);
    } catch (error) {
        console.error('Error submitting form response:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Get all responses for a form
router.get('/:id/responses', (req, res) => {
    const formId = req.params.id;
    const form = forms.find(f => f.id === formId);
    if (form && form.responses) {
        res.json(form.responses);
    } else {
        res.status(404).json({ message: 'Form or responses not found' });
    }
    console.log('Form responses:', form ? form.responses : 'Not found'); // Log for debugging
});

export default router;

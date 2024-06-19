import { Router } from 'express';

const router = Router();
let forms: any[] = [];

// Create a new form
router.post('/', (req, res) => {
  const form = req.body;
  forms.push(form);
  res.status(201).send(form);
});

// Get all forms
router.get('/', (req, res) => {
  res.send(forms);
});

// Get a single form by ID
router.get('/:id', (req, res) => {
  const form = forms.find(f => f.id === req.params.id);
  if (form) {
    res.send(form);
  } else {
    res.status(404).send({ message: 'Form not found' });
  }
});

// Submit a form
router.post('/:id/submit', (req, res) => {
  const form = forms.find(f => f.id === req.params.id);
  if (form) {
    form.responses = form.responses || [];
    form.responses.push(req.body);
    res.status(201).send(req.body);
  } else {
    res.status(404).send({ message: 'Form not found' });
  }
});

export default router;

const express = require('express');
const router = express.Router();
const Item = require('./model.js');

// POST /api/items - create a new item
router.post('/', async (req, res) => {
    const { name, description } = req.body;

    if (!name || !description) {
        return res.status(400).json({ message: 'Please enter all fields: name and description are required.' });
    }

    try {
        const newItem = new Item({ name, description });
        const savedItem = await newItem.save();
        res.status(201).json({ message: 'Item created successfully!', item: savedItem });
    } catch (error) {
        console.error('Error creating item:', error.message);
        if (error.name === 'ValidationError') {
            const errors = Object.keys(error.errors).map(key => error.errors[key].message);
            return res.status(400).json({ message: 'Validation failed', errors });
        }
        res.status(500).json({ message: 'Server error: Could not save item.' });
    }
});
// GET /api/items - get all items
router.get('/', async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).json({ items });
    } catch (error) {
        console.error('Error fetching items:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// GET /api/items/:id - get a single item by ID
router.get('/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json({ item });
    } catch (error) {
        console.error('Error fetching single item:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// PUT /api/items/:id - update an item
router.put('/:id', async (req, res) => {
    try {
        const { name, description } = req.body;
        const updatedItem = await Item.findByIdAndUpdate(
            req.params.id,
            { name, description },
            { new: true, runValidators: true } 
        );
        if (!updatedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json({ message: 'Item updated successfully', item: updatedItem });
    } catch (error) {
        console.error('Error updating item:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// DELETE /api/items/:id - delete an item
router.delete('/:id', async (req, res) => {
    try {
        const deletedItem = await Item.findByIdAndDelete(req.params.id);
        if (!deletedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json({ message: 'Item deleted successfully', item: deletedItem });
    } catch (error) {
        console.error('Error deleting item:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;

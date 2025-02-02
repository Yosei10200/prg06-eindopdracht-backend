import Prefectures from "../models/Prefectures.js";
import express from "express";

const router = express.Router();


router.get('/', async (req,res)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');

   try{
       const prefectures = await Prefectures.find({});
       const collection ={
           "items": prefectures,
           _links: {
               self: {
                   href: `${process.env.BASE_URL}/prefectures`
               }
           }
       }
       res.json(collection);
   }catch(error){
       res.json({error: error.message});
   }
});

router.post('/', async (req, res)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    const {name, description, region, author, image} = req.body;

    if (!name || !description || !region || !author) {
        return res.status(400).json({ error: "Een of meerdere velden zijn leeg" });
    }

    try{
        await Prefectures.create({
            name: name,
            description: description,
            region: region,
            author: author,
            image: image
        });

        res.status(201).json({
            success: true,
        });

    }catch(error){
        res.status(500).json({ error: error.message });
    }
});
router.options('/', (req, res) => {
    // res.setHeader('Allow', 'GET, POST, OPTIONS');
    // res.setHeader('Access-Control-Allow-Origin', '*');
    // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    // res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
    // res.status(204).send();
});


router.get('/:id', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    try {
        const { id } = req.params;
        const prefecture = await Prefectures.findById(id);

        if (!prefecture) {
            return res.status(404).json({ error: "Geen prefecture" });
        }

        res.json(prefecture);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});




router.delete('/:id', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const { id } = req.params;

    try {
        const deleteP = await Prefectures.findByIdAndDelete(id);

        if (!deleteP) {
            return res.status(404).json({ error: "Geen prefecture" });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    try {
        const { id } = req.params;
        const { name, description, region, author, image } = req.body;

        if (!name || !description || !region || !author) {
            return res.status(400).json({ error: "Een of meerdere velden zijn leeg" });
        }

        const updateP = await Prefectures.findByIdAndUpdate(id, {
            name: name,
            description: description,
            region: region,
            author: author,
            image: image
        });

        if (!updateP) {
            return res.status(404).json({ error: "Geen prefecture" });
        }

        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.options('/:id', (req, res) => {
    // res.setHeader('Allow', 'GET, PUT, DELETE, OPTIONS');
    // res.setHeader('Access-Control-Allow-Origin', '*');
    // res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
    // res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
    // res.status(204).send();
});

export default router;
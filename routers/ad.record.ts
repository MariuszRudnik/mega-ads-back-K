import {Router} from "express";
import {AddRecords} from "../records/add.records";

export const adRouter = Router()
    .get('/search/:name?', async (req, res) =>{
        const ads = await AddRecords.findAll(req.params.name ?? '')
        res.json({
            ok: true,
        })
    })
    .get('/:id', async (req ,res)=>{
        const ad = await AddRecords.getOne(req.params.id);
        res.json(ad)
    })
    .post('/', async (req, res)=>{
    const ad = new AddRecords(req.body);
    await ad.insert();
    res.json(ad);
});
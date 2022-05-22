import {AddRecords} from "../records/add.records";
import exp from "constants";

test('Find Adrecord returns data from data database from one entyy', async ()=>{
    const ad = await AddRecords.getOne('ssddd');

    console.log(ad)
    expect(ad).toBeDefined();
    expect(ad.id).toBe('ssddd');
    expect(ad.name).toBe('Testowa')
})

test('AdRecord returns null dorm database for unextsting enty.', async () =>{
    const ad = await AddRecords.getOne('---');
    expect(ad).toBeNull();
})
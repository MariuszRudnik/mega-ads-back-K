import {AddRecords} from "../records/add.records";
import exp from "constants";
import {AddEntity} from "../types";

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
});


test('AdRecord.findAll returns aray of found entries.', async () =>{
    const ads = await AddRecords.findAll('');
    expect(ads).not.toEqual([])
    expect(ads[0].id).toBeDefined();

})
test('AdRecord.findAll returns empty araywhen seaching for something for something that does not exist.', async () =>{
    const ads = await AddRecords.findAll('--------------------');
    expect(ads).toEqual([])
})

test('AdRecord.findAll returns smaller amount of data.', async () => {

    const ads = await AddRecords.findAll('');

    expect((ads[0] as AddEntity).price).toBeUndefined();
    expect((ads[0] as AddEntity).description).toBeUndefined();

});
test('AdRecord.insert returns new UUID .', async () => {

    const ad = new AddRecords({
        name: 'Test Name',
        description: 'blah',
        url: 'https://wp.pl',
        price: 0,
        lat: 9,
        lon: 9,
    });
    await ad.insert();
    expect(ad.id).toBeDefined();
    expect(typeof ad.id).toBe('string');
});
test('AdRecord.insert returns new UUID .', async () => {

    const ad = new AddRecords({
        name: 'Test Name',
        description: 'blah',
        url: 'https://wp.pl',
        price: 0,
        lat: 9,
        lon: 9,
    });
    await ad.insert();
    const foundAd = await AddRecords.getOne(ad.id);

    expect(foundAd).toBeDefined();
    expect(foundAd).not.toBeNull();
    expect(foundAd.id).toBe(ad.id);

});
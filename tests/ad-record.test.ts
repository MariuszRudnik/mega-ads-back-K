import {AddRecords} from "../records/add.records";

test('Cant buil AdRecord', ()=>{
   const ad = new AddRecords({
      name: 'Test Name',
      description: 'sss',
      url: 'https://wp.pl',
      price: 0,
      lat: 9,
      lon: 0,


   })
   expect(ad.name).toBe('Test Name');
   expect(ad.description).toBe('sss');
});

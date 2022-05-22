import {AddRecords} from "../records/add.records";

const defaultObj = {
   name: 'Test Name',
   description: 'blah',
   url: 'https://wp.pl',
   price: 0,
   lat: 9,
   lon: 9,
}

test('Cant buil AdRecord', ()=>{
   const ad = new AddRecords(defaultObj)
   expect(ad.name).toBe('Test Name');
   expect(ad.description).toBe('blah');
});
test('Validates invalid price', ()=>{
   expect(()=> new AddRecords({
      ...defaultObj,
      price: -3
   })).toThrow('Cena nie moze być mniejsza niż 0 lul większa niż 9 999 999.')
});

//@ TODO: Check all the validation

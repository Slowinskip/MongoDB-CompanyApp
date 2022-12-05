const Employees = require('../employees.model.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employees', () => {
    before(async () => {
      try {
        await mongoose.connect('mongodb://localhost:27017/companyDBtest', {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
      } catch (err) {
        console.error(err);
      }
    });

    describe('Reading data', () => {
        before(async () => {
            const testEmpOne = new Employees({
              firstName: 'John',
              lastName: 'Doe',
              department: 'HR',
            });
            await testEmpOne.save();
      
            const testEmpTwo = new Employees({
              firstName: 'Amanda',
              lastName: 'Doe',
              department: 'IT',
            });
            await testEmpTwo.save();
          });

        it('should return all data with "find" method', async () => {
        const employees = await Employees.find();
        const expectedLength = 2;
        expect(employees.length).to.be.equal(expectedLength);
        });

        it('should return a proper document by "firstName" with "findOne" method', async () => {
          const employee = await Employees.findOne({ firstName: 'John' });
          const expectedName = 'John';
          expect(employee.firstName).to.be.equal(expectedName);
        });

        after(async () => {
          await Employees.deleteMany();
        });
      });

      describe('Creating data', () => {

        it('should insert new document with "insertOne" method', async () => {
        
            const employee = new Employees({ firstName: 'Ed', lastName: 'Bo', department: 'IT' });
            await employee.save();
            expect(employee.isNew).to.be.false;
            });  
            after(async () => {
                await Employees.deleteMany();
            });
      });

      describe('Updating data', () => {

        beforeEach(async () => {
            const testempOne = new Employees({
                firstName: 'John',
                lastName: 'Doe',
                department: 'HR',
              });
            await testempOne.save();
          
            const testempTwo = new Employees({
                firstName: 'Amanda',
                lastName: 'Doe',
                department: 'IT',
              });
            await testempTwo.save();
          });
        
          it('should properly update one document with "updateOne" method', async () => {
            await Employees.updateOne({ firstName: 'John' }, { $set: { firstName: '=John=' }});
            const updatedEmployess = await Employees.findOne({ firstName: '=John=' });
            expect(updatedEmployess).to.not.be.null;
          });  
          it('should properly update one document with "save" method', async () => {
            const employee = await Employees.findOne({ firstName: 'Amanda' });
            employee.firstName = '=Amanda=';
            await employee.save();
      
            const updatedEmployee = await Employees.findOne({ firstName: '=Amanda=' });
            expect(updatedEmployee).to.not.be.null;          
        });  
          it('should properly update multiple documents with "updateMany" method', async () => {
            await Employees.updateMany({}, { $set: { firstName: 'Updated!' }});
            const employee = await Employees.find({ firstName: 'Updated!' });
            expect(employee.length).to.be.equal(2);
          });
    
          afterEach(async () => {
            await Employees.deleteMany();
          });
      
      });

      describe('Removing data', () => {

        beforeEach(async () => {
            const testempOne = new Employees({
                firstName: 'John',
                lastName: 'Doe',
                department: 'HR',
              });
            await testempOne.save();
          
            const testempTwo = new Employees({
                firstName: 'Amanda',
                lastName: 'Doe',
                department: 'IT',
              });
            await testempTwo.save();
          });
    
        it('should properly remove one document with "deleteOne" method', async () => {
            await Employees.deleteOne({ firstName: 'John' });
            const removeEmployes = await Employees.findOne({ firstName: 'John' });
            expect(removeEmployes).to.be.null;
          });
    
        it('should properly remove one document with "remove" method', async () => {
        const employee = await Employees.findOne({ firstName: 'Amanda' });
        await employee.remove();
        const removedEmploye = await Employees.findOne({ firstName: 'Amanda' });
        expect(removedEmploye).to.be.null;
        });
      
        it('should properly remove multiple documents with "deleteMany" method', async () => {
            await Employees.deleteMany();
            const employee = await Employees.find();
            expect(employee.length).to.be.equal(0);
    
        });
    
        afterEach(async () => {
            await Employees.deleteMany();
          });
      });
    
    
    

    
    

});
  
const Employees = require('../employees.model.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employees', () => {
    it('should throw an error if no "firstName", "lastName", "department" arg', () => {
        const dep = new Employees({}); 
        dep.validate((err) => {
          expect(err.errors).to.exist;
        });
        after(() => {
          mongoose.models = {};
        });
      }); 
    it('should throw an error if arguments is not a string', () => {

    const cases = [{}, []];
        for(let employee of cases) {
            const dep = new Employees({
                firstName: employee,
                lastName: employee,
                department: employee,
             });
        
            dep.validate(err => {
            expect(err.errors).to.exist;
            });
            after(() => {
                mongoose.models = {};
            });
        }  
    });
    it('should not throw an error if all is okay', () => {

        const dep = new Employees({
            firstName: 'John',
            lastName: 'Doe',
            department: 'Human Resources',
            });
    
        dep.validate(err => {
        expect(err).to.not.exist;
        });
    });  
    it('should throw an error if miss one argument', () => {

        const cases = [
            {
                firstName: 'John',
                department: 'Human Resources',
            },
            {
                lastName: 'Doe',
                department: 'Human Resources',
            },
            {
                firstName: 'John',
                lastName: 'Doe',
            }
        ];
        for(let employee of cases) {
            const dep = new Employees({
                firstName: employee,
                lastName: employee,
                department: employee,
             });
        
            dep.validate(err => {
            expect(err.errors).to.exist;
            });
            after(() => {
                mongoose.models = {};
            });
        }  
    });  


    


});

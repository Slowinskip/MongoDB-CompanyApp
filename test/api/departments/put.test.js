const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server.js');
const Department = require('../../../models/department.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('PUT /api/departments', () => {

    before(async () => {
        const testDepOne = new Department({ _id: '5d9f1140f10a81216cfd4408', name: 'Department #1' });
        await testDepOne.save();
      });

  it('/:id should update chosen document and return success', async () => {
        const res = await request(server).put('/api/departments/5d9f1140f10a81216cfd4408').send({ name: 'Update!'});
        const newDepartment = await Department.findOne({ name: 'Update!'});
        expect(res.status).to.be.equal(200);
        expect(res.body.message).to.be.equal('OK');
        expect(newDepartment).to.not.be.null;
    
    });

    after(async () => {
    await Department.deleteMany();
    });
});
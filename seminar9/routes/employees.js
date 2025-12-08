const express = require("express");
const { Op } = require("sequelize");
const Employee = require("../models/employee");

const router = require("express").Router();

router
  .route("/employees")
  .get(async (req, res) => {

     const { simplified, sortBy }= req.query;

    try {
      const minSalary = req.query.minSalary ? Number(req.query.minSalary) : undefined;
      const name = req.query.name;

      const whereConditions = {};


      if (minSalary !== undefined) {
        whereConditions.salary = { [Op.gte]: minSalary };
      }

      if (name) {
        whereConditions.firstName = { [Op.like]: `%${name}%` };
      }

     const employees = await Employee.findAll({
  attributes: simplified ? { exclude: ['id'] } : undefined,
  where: Object.keys(whereConditions).length > 0 ? whereConditions : undefined,
  order: sortBy ? [[sortBy, 'ASC']] : undefined
});
      
        
      return res.status(200).json(employees);
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  })
  .post(async (req, res) => {
    try {
      const newEmployee = await Employee.create(req.body);
      return res.status(201).json(newEmployee);
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  });

router
  .route("/employees/:id")
  .get(async (req, res) => {
    try {
      const minSalaryParam = req.query.minSalary;
      const name = req.query.name;

      let where = undefined;

      if (minSalaryParam !== undefined) {
        const minSalary = Number(minSalaryParam);
        if (!Number.isNaN(minSalary)) {
          where = { salary: { [Op.gte]: minSalary } };
        }
      } else if (name) {
        where = {
          [Op.or]: [
            { firstName: { [Op.like]: `%${name}%` } },
            { lastName: { [Op.like]: `%${name}%` } }
          ]
        };
      }

      const employees = await Employee.findAll({
        attributes: ["firstName", "lastName", "email", "birthYear", "salary"],
        where
      });

      return res.status(200).json(employees);
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  })
  .put(async (req, res) => {
    try {
      const employee = await Employee.findByPk(req.params.id);

      if (!employee) {
        return res
          .status(404)
          .json({ error: `Employee with id ${req.params.id} not found` });
      }

      const updatedEmployee = await employee.update(req.body);
      return res.status(200).json(updatedEmployee);
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  })
  .delete(async (req, res) => {
    try {
      const employee = await Employee.findByPk(req.params.id);

      if (!employee) {
        return res
          .status(404)
          .json({ error: `Employee with id ${req.params.id} not found` });
      }

      await employee.destroy();

      return res.status(200).json({
        message: `Employee with id ${req.params.id} was deleted successfully`,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  });
module.exports = router;
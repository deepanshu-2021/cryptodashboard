const axios = require("axios");
const Data = require("../model/dataModel");
// sedding data in the database
async function saveData(req, res) {
  try {
    //fteching the data from api
    const response = await axios.get("https://api.wazirx.com/api/v2/tickers");
    //collecting the data form external api response
    const keys = Object.keys(response.data);
    let dataArr = [];
    for (let i = 0; i < 10; i++) {
      console.log(response.data[keys[i]]);
      let { name, buy, last, volume, base_unit, sell } = response.data[keys[i]];
      dataArr.push({ name, buy, last, volume, base_unit, sell });
    }
    // saving the data in the database
    const data = await Data.insertMany(dataArr);
    // sending the data form the data base as response
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
//get data from dataBase
async function getData(req, res) {
  try {
    // geting all the data from data base
    const data = await Data.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
module.exports = { saveData, getData };

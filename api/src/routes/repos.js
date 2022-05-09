import { Router, Request, Response } from 'express';
import localData from '../../data/repos.json';
import axios from 'axios';
export const repos = Router();

repos.get('/', async (_, res) => {
  res.header('Cache-Control', 'no-store');

  res.status(200);

  const remoteData = await axios.get(
    'https://api.github.com/users/silverorange/repos'
  );
  const amalgamateData = remoteData.data.concat(localData);

  //filter data for repos with a fork key which has a value of false
  const filteredData = amalgamateData.filter((repo) => repo.fork === false);
  res.json(filteredData);
});

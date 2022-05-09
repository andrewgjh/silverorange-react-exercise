import { Router, Request, Response } from 'express';
import localData from '../../data/repos.json';
import axios from 'axios';
export const repos = Router();

repos.get('/', async (_, res) => {
  res.header('Cache-Control', 'no-store');

  res.status(200);

  // TODO: See README.md Task (A). Return repo data here. You’ve got this!

  const remoteData = await axios.get(
    'https://api.github.com/users/silverorange/repos'
  );
  const amalgamateData = remoteData.data.concat(localData);
  const filteredData = amalgamateData.filter((repo) => repo.fork === false);
  res.json(filteredData);
});

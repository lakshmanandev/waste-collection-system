import app from './app';
import { config } from './config/env';

const port = config.port;

app.listen(port, () => {
  console.log(`Waste Collection API listening on port ${port}`);
});

import cluster from "cluster";
import os from "os";
import dotenv from "dotenv";
import { app } from ".";

dotenv.config();
const PORT = process.env.PORT || 3000;

if (cluster.isPrimary) {
  cluster.schedulingPolicy = cluster.SCHED_RR;

  console.log("System has cpus: ", os.cpus().length);
  console.log("Parallelism: ", os.availableParallelism());
  console.log("Primary pid:", process.pid);

  for (let i = 0; i < os.availableParallelism(); i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker) => {
    console.log(
      "Worker with pid ",
      worker.process.pid + " died, Restarting it now",
    );
    cluster.fork();
  });
  
} else {
  app.listen(PORT, () => {
    console.log(`Server listening on Port: ${PORT} on worker ${process.pid}`);
  });
}

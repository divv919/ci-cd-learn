import express from "express";
import cors from "cors";
import os from "os";

export const app = express();

app.use(cors());

app.get("/pid", (req, res) => {
  res.status(200).json({ message: "PID is " + process.pid });
});

app.get("/cpu-intensive/:x", (req, res) => {
  const x = req.params.x ? Number(req.params.x) : 0;

  let sum = 0;
  console.log("running for " + x + " iterations on worker ", process.pid);
  for (let i = 0; i <= x; i++) {
    sum += i;
  }
  res
    .status(200)
    .json({ message: "Summation is ", sum, processUsed: process.pid });
});

app.get("/health", (req, res) => {
  return res.status(200).json({ message: "OK" });
});

app.get("/whoami", (req, res) => {
  res.status(200).json({
    hostname: os.hostname(),
  });
});

function getLocalIP() {
  const interfaces = os.networkInterfaces();

  for (const name of Object.keys(interfaces)) {
    for (const net of interfaces[name]!) {
      if (net.family === "IPv4" && !net.internal) {
        return net.address;
      }
    }
  }
  return "0.0.0.0";
}

// to delete
console.log("Interfaces", getLocalIP(), os.hostname());

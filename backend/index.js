import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 204,
  })
);

const SECRET_KEY = 'your_secret_key';
const USERNAME = 'demo@.com';
const PASSWORD = '123';

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log(req.body)

  if (username === USERNAME && password === PASSWORD) {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid username or password' });
  }
});





const initialReportData = [
    {
        orderNo: "A19025",
      date: "03/05/2024",
      patientName: "Sunita Rao",
      hospitalId: "DH2023/0001247",
      testName: "X-Ray",
      doctorName: "Dr. Suresh Nair",
      eta: "03/05/2024",
      status: "Partial Report",
    },
    {
      orderNo: "A19026",
      date: "04/05/2024",
      patientName: "Manoj Singh",
      hospitalId: "DH2023/0001248",
      testName: "MRI",
      doctorName: "Dr. Priya Mehta",
      eta: "04/05/2024",
      status: "Pending",
      },
      {
        orderNo: "A19024",
        date: "02/05/2024",
        patientName: "Rajesh Kumar",
        hospitalId: "DH2023/0001246",
        testName: "Blood Test",
        doctorName: "Dr. Anil Kapoor",
        eta: "02/05/2024",
        status: "Ready",
      },
      {
      orderNo: "A19027",
      date: "05/05/2024",
      patientName: "Neha Gupta",
      hospitalId: "DH2023/0001249",
      testName: "CT Scan",
      doctorName: "Dr. Rajeev Kumar",
      eta: "05/05/2024",
      status: "Lab dropped",
    },
    {
      orderNo: "A19024",
      date: "02/05/2024",
      patientName: "Rajesh Kumar",
      hospitalId: "DH2023/0001246",
      testName: "Blood Test",
      doctorName: "Dr. Anil Kapoor",
      eta: "02/05/2024",
      status: "Ready",
    },
    {
        orderNo: "A19026",
        date: "04/05/2024",
        patientName: "Manoj Singh",
        hospitalId: "DH2023/0001248",
        testName: "MRI",
        doctorName: "Dr. Priya Mehta",
        eta: "04/05/2024",
        status: "Pending",
        },
            {
              orderNo: "A19025",
              date: "03/05/2024",
              patientName: "Sunita Rao",
              hospitalId: "DH2023/0001247",
              testName: "X-Ray",
              doctorName: "Dr. Suresh Nair",
              eta: "03/05/2024",
              status: "Partial Report",
            },
        {
            orderNo: "A19027",
            date: "05/05/2024",
            patientName: "Neha Gupta",
      hospitalId: "DH2023/0001249",
      testName: "CT Scan",
      doctorName: "Dr. Rajeev Kumar",
      eta: "05/05/2024",
      status: "Lab dropped",
    },
    {
      orderNo: "A19024",
      date: "02/05/2024",
      patientName: "Rajesh Kumar",
      hospitalId: "DH2023/0001246",
      testName: "Blood Test",
      doctorName: "Dr. Anil Kapoor",
      eta: "02/05/2024",
      status: "Ready",
    },
    {
      orderNo: "A19025",
      date: "03/05/2024",
      patientName: "Sunita Rao",
      hospitalId: "DH2023/0001247",
      testName: "X-Ray",
      doctorName: "Dr. Suresh Nair",
      eta: "03/05/2024",
      status: "Partial Report",
    },
    {
      orderNo: "A19026",
      date: "04/05/2024",
      patientName: "Manoj Singh",
      hospitalId: "DH2023/0001248",
      testName: "MRI",
      doctorName: "Dr. Priya Mehta",
      eta: "04/05/2024",
      status: "Pending",
    },
    {
      orderNo: "A19027",
      date: "05/05/2024",
      patientName: "Neha Gupta",
      hospitalId: "DH2023/0001249",
      testName: "CT Scan",
      doctorName: "Dr. Rajeev Kumar",
      eta: "05/05/2024",
      status: "Lab dropped",
    },
    {
      orderNo: "A19024",
      date: "02/05/2024",
      patientName: "Rajesh Kumar",
      hospitalId: "DH2023/0001246",
      testName: "Blood Test",
      doctorName: "Dr. Anil Kapoor",
      eta: "02/05/2024",
      status: "Ready",
    },
    {
      orderNo: "A19025",
      date: "03/05/2024",
      patientName: "Sunita Rao",
      hospitalId: "DH2023/0001247",
      testName: "X-Ray",
      doctorName: "Dr. Suresh Nair",
      eta: "03/05/2024",
      status: "Partial Report",
    },
    {
      orderNo: "A19026",
      date: "04/05/2024",
      patientName: "Manoj Singh",
      hospitalId: "DH2023/0001248",
      testName: "MRI",
      doctorName: "Dr. Priya Mehta",
      eta: "04/05/2024",
      status: "Pending",
    },
    {
      orderNo: "A19027",
      date: "05/05/2024",
      patientName: "Neha Gupta",
      hospitalId: "DH2023/0001249",
      testName: "CT Scan",
      doctorName: "Dr. Rajeev Kumar",
      eta: "05/05/2024",
      status: "Lab dropped",
    },
  ];
  
  app.get('/reports', (req, res) => {
    res.json(initialReportData);
  });
  

const port = 7000;

app.listen(port, () => {
  console.log(`backend running ${port}`);
});

import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const rawData = {
  "Time Series (Daily)": {
    "2024-07-05": {
      "1. open": "221.6500",
      "2. high": "226.4500",
      "3. low": "221.6500",
      "4. close": "226.3400",
      "5. volume": "60412408",
    },
    "2024-07-03": {
      "1. open": "220.0000",
      "2. high": "221.5500",
      "3. low": "219.0300",
      "4. close": "221.5500",
      "5. volume": "37369801",
    },
    "2024-07-02": {
      "1. open": "216.1500",
      "2. high": "220.3800",
      "3. low": "215.1000",
      "4. close": "220.2700",
      "5. volume": "58046178",
    },
    "2024-07-01": {
      "1. open": "212.0900",
      "2. high": "217.5100",
      "3. low": "211.9200",
      "4. close": "216.7500",
      "5. volume": "60402929",
    },
    "2024-06-28": {
      "1. open": "215.7700",
      "2. high": "216.0700",
      "3. low": "210.3000",
      "4. close": "210.6200",
      "5. volume": "82542718",
    },
    "2024-06-27": {
      "1. open": "214.6900",
      "2. high": "215.7395",
      "3. low": "212.3500",
      "4. close": "214.1000",
      "5. volume": "49772707",
    },
    "2024-06-26": {
      "1. open": "211.5000",
      "2. high": "214.8600",
      "3. low": "210.6400",
      "4. close": "213.2500",
      "5. volume": "66213186",
    },
    "2024-06-25": {
      "1. open": "209.1500",
      "2. high": "211.3800",
      "3. low": "208.6100",
      "4. close": "209.0700",
      "5. volume": "56713868",
    },
    "2024-06-24": {
      "1. open": "207.7200",
      "2. high": "212.7000",
      "3. low": "206.5900",
      "4. close": "208.1400",
      "5. volume": "80727006",
    },
    "2024-06-21": {
      "1. open": "210.3900",
      "2. high": "211.8900",
      "3. low": "207.1100",
      "4. close": "207.4900",
      "5. volume": "246421353",
    },
    "2024-06-20": {
      "1. open": "213.9300",
      "2. high": "214.2400",
      "3. low": "208.8500",
      "4. close": "209.6800",
      "5. volume": "86172451",
    },
    "2024-06-18": {
      "1. open": "217.5900",
      "2. high": "218.6300",
      "3. low": "213.0000",
      "4. close": "214.2900",
      "5. volume": "79943254",
    },
    "2024-06-17": {
      "1. open": "213.3700",
      "2. high": "218.9500",
      "3. low": "212.7200",
      "4. close": "216.6700",
      "5. volume": "93728300",
    },
    "2024-06-14": {
      "1. open": "213.8500",
      "2. high": "215.1700",
      "3. low": "211.3000",
      "4. close": "212.4900",
      "5. volume": "70122748",
    },
    "2024-06-13": {
      "1. open": "214.7400",
      "2. high": "216.7500",
      "3. low": "211.6000",
      "4. close": "214.2400",
      "5. volume": "97862729",
    },
    "2024-06-12": {
      "1. open": "207.3700",
      "2. high": "220.2000",
      "3. low": "206.9000",
      "4. close": "213.0700",
      "5. volume": "198134293",
    },
    "2024-06-11": {
      "1. open": "193.6500",
      "2. high": "207.1600",
      "3. low": "193.6300",
      "4. close": "207.1500",
      "5. volume": "172373296",
    },
    "2024-06-10": {
      "1. open": "196.9000",
      "2. high": "197.3000",
      "3. low": "192.1500",
      "4. close": "193.1200",
      "5. volume": "97262077",
    },
    "2024-06-07": {
      "1. open": "194.6500",
      "2. high": "196.9400",
      "3. low": "194.1400",
      "4. close": "196.8900",
      "5. volume": "53103912",
    },
    "2024-06-06": {
      "1. open": "195.6850",
      "2. high": "196.5000",
      "3. low": "194.1700",
      "4. close": "194.4800",
      "5. volume": "41181753",
    },
    "2024-06-05": {
      "1. open": "195.4000",
      "2. high": "196.9000",
      "3. low": "194.8700",
      "4. close": "195.8700",
      "5. volume": "54156785",
    },
    "2024-06-04": {
      "1. open": "194.6350",
      "2. high": "195.3200",
      "3. low": "193.0342",
      "4. close": "194.3500",
      "5. volume": "47471445",
    },
    "2024-06-03": {
      "1. open": "192.9000",
      "2. high": "194.9900",
      "3. low": "192.5200",
      "4. close": "194.0300",
      "5. volume": "50080539",
    },
    "2024-05-31": {
      "1. open": "191.4400",
      "2. high": "192.5700",
      "3. low": "189.9100",
      "4. close": "192.2500",
      "5. volume": "75158277",
    },
    "2024-05-30": {
      "1. open": "190.7600",
      "2. high": "192.1800",
      "3. low": "190.6300",
      "4. close": "191.2900",
      "5. volume": "49947941",
    },
    "2024-05-29": {
      "1. open": "189.6100",
      "2. high": "192.2470",
      "3. low": "189.5100",
      "4. close": "190.2900",
      "5. volume": "53068016",  
    },
  },
};
const processData = (rawData) => {
  const timeSeries = rawData["Time Series (Daily)"];
  return Object.keys(timeSeries)
    .map((date) => ({
      date,
      open: parseFloat(timeSeries[date]["1. open"]),
      high: parseFloat(timeSeries[date]["2. high"]),
      low: parseFloat(timeSeries[date]["3. low"]),
      close: parseFloat(timeSeries[date]["4. close"]),
      volume: parseInt(timeSeries[date]["5. volume"]),
    }))
    .reverse(); // Reverse to get chronological order
};

const Graphs = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const transformedData = processData(rawData);
    setData(transformedData);
  }, []);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
        <XAxis dataKey="date" stroke="#333333" />
        <YAxis stroke="#333333" />
        <Tooltip
          contentStyle={{ backgroundColor: "#333333", borderColor: "#666666" }}
        />
        <Legend
          verticalAlign="top"
          align="right"
          wrapperStyle={{ paddingBottom: "20px" }}
        />
        <Line
          type="monotone"
          dataKey="close"
          stroke="#8884d8"
          strokeWidth={2}
          dot={{ r: 2 }}
        />
        <Line
          type="monotone"
          dataKey="open"
          stroke="#82ca9d"
          strokeWidth={2}
          dot={{ r: 2 }}
        />
        <Line
          type="monotone"
          dataKey="high"
          stroke="#ffc658"
          strokeWidth={2}
          dot={{ r: 2 }}
        />
        <Line
          type="monotone"
          dataKey="low"
          stroke="#ff7300"
          strokeWidth={2}
          dot={{ r: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Graphs;

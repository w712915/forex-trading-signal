import { useEffect, useState } from "react";
import { Container, Typography, Box, CircularProgress } from "@mui/material";
import { ForexChart } from "./components/ForexChart";
import { getForexData } from "./api/forexApi";
import { generateSignals } from "./utils/signalGenerator";
import { ForexData, TradingSignal } from "./types/forex";

const App = () => {
  const [forexData, setForexData] = useState<ForexData | null>(null);
  const [signal, setSignal] = useState<TradingSignal | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const data = await getForexData();
      setForexData(data);
      const newSignal = generateSignals(data);
      setSignal(newSignal);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 300000); // 5分ごとに更新

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box py={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          BTC/USD トレードシグナル
        </Typography>
        <ForexChart
          data={forexData ? [forexData] : []}
          signals={signal ? [signal] : []}
        />
        <Box mt={2}>
          <Typography variant="h6" gutterBottom>
            最新のシグナル
          </Typography>
          {signal && (
            <Typography
              color={signal.signal === "BUY" ? "success.main" : "error.main"}
            >
              {new Date(signal.timestamp).toLocaleString()}: {signal.signal} @ ¥
              {signal.price.toFixed(2)}
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default App;

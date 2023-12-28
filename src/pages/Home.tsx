import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import "./Home.css";

const Home: React.FC = () => {
  const [stopLoss, setStopLoss] = useState<number>(
    localStorage.getItem("stopLoss")
      ? (localStorage.getItem("stopLoss") as unknown as number)
      : 2
  );
  const [leverage, setLeverage] = useState<number>(
    localStorage.getItem("leverage")
      ? (localStorage.getItem("leverage") as unknown as number)
      : 10
  );
  const [risk, setRisk] = useState<number>(
    localStorage.getItem("risk")
      ? (localStorage.getItem("risk") as unknown as number)
      : 1
  );

  const margin = (risk / (leverage * stopLoss)) * 100;

  function onChangeStopLoss(e: React.ChangeEvent<HTMLInputElement>) {
    localStorage.setItem("stopLoss", e.currentTarget.value);
    setStopLoss(e.currentTarget.value as unknown as number);
  }

  function onChangeLeverage(e: React.ChangeEvent<HTMLInputElement>) {
    localStorage.setItem("leverage", e.currentTarget.value);
    setLeverage(e.currentTarget.value as unknown as number);
  }
  function onChangeRisk(e: React.ChangeEvent<HTMLInputElement>) {
    localStorage.setItem("risk", e.currentTarget.value);
    setRisk(e.currentTarget.value as unknown as number);
  }

  return (
    <div
      id="index-page"
      className="flex flex-col justify-center items-center min-h-screen"
    >
      <div className="w-full max-w-xs">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Risk Calculator</CardTitle>
            <CardDescription>Don't Get Rekt</CardDescription>
            <CardDescription>Margin: {margin.toFixed(2)}%</CardDescription>
          </CardHeader>

          <CardContent>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-y-4"
            >
              <div>
                <Label htmlFor="stop-loss">Stop Loss %</Label>
                <Input
                  id="stop-loss"
                  name="stop-loss"
                  placeholder="Stop Loss %"
                  type="number"
                  value={stopLoss}
                  onChange={onChangeStopLoss}
                />
              </div>

              <div>
                <Label htmlFor="leverage">Leverage X</Label>
                <Input
                  id="leverage"
                  name="leverage"
                  placeholder="Leverage X"
                  type="number"
                  value={leverage}
                  onChange={onChangeLeverage}
                />
              </div>

              <div>
                <Label htmlFor="risk">Risk %</Label>
                <Input
                  id="risk"
                  name="risk"
                  placeholder="Account Risk %"
                  type="number"
                  value={risk}
                  onChange={onChangeRisk}
                />
              </div>
              <button type="submit">Save</button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;

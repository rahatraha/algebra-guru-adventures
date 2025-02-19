import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Square, Divide, Plus, Minus, X, Percent, RotateCcw, Equal } from "lucide-react";
const Calculator = () => {
  const [display, setDisplay] = useState("0");
  const [memory, setMemory] = useState<number>(0);
  const [operation, setOperation] = useState<string | null>(null);
  const [newNumber, setNewNumber] = useState(true);
  const numberClick = (number: string) => {
    if (newNumber) {
      setDisplay(number);
      setNewNumber(false);
    } else {
      setDisplay(display === "0" ? number : display + number);
    }
  };
  const operationClick = (op: string) => {
    const currentValue = parseFloat(display);
    if (op === "^2") {
      setDisplay((currentValue * currentValue).toString());
      setNewNumber(true);
      return;
    }
    if (op === "√") {
      setDisplay(Math.sqrt(currentValue).toString());
      setNewNumber(true);
      return;
    }
    if (op === "log") {
      setDisplay(Math.log10(currentValue).toString());
      setNewNumber(true);
      return;
    }
    if (op === "ln") {
      setDisplay(Math.log(currentValue).toString());
      setNewNumber(true);
      return;
    }
    setMemory(currentValue);
    setOperation(op);
    setNewNumber(true);
  };
  const calculateResult = () => {
    if (!operation) return;
    const current = parseFloat(display);
    let result = 0;
    switch (operation) {
      case "+":
        result = memory + current;
        break;
      case "-":
        result = memory - current;
        break;
      case "*":
        result = memory * current;
        break;
      case "/":
        result = memory / current;
        break;
      default:
        result = current;
    }
    setDisplay(result.toString());
    setOperation(null);
    setNewNumber(true);
  };
  const clear = () => {
    setDisplay("0");
    setMemory(0);
    setOperation(null);
    setNewNumber(true);
  };
  return <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="shadow-sm p-6 rounded-sm mx-0 my-[35px] bg-blue-100">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
              Научный калькулятор
            </h1>
            
            <Input value={display} readOnly className="text-right text-2xl mb-4 h-12" />

            <div className="grid grid-cols-4 gap-2">
              {/* Специальные функции */}
              <Button variant="outline" onClick={() => operationClick("^2")} className="h-12">
                x²
              </Button>
              <Button variant="outline" onClick={() => operationClick("√")} className="h-12">
                √
              </Button>
              <Button variant="outline" onClick={() => operationClick("log")} className="h-12">
                log
              </Button>
              <Button variant="outline" onClick={() => operationClick("ln")} className="h-12">
                ln
              </Button>

              {/* Цифры и операции */}
              <Button variant="outline" onClick={() => numberClick("7")} className="h-12">
                7
              </Button>
              <Button variant="outline" onClick={() => numberClick("8")} className="h-12">
                8
              </Button>
              <Button variant="outline" onClick={() => numberClick("9")} className="h-12">
                9
              </Button>
              <Button variant="outline" onClick={() => operationClick("/")} className="h-12">
                <Divide className="h-4 w-4" />
              </Button>

              <Button variant="outline" onClick={() => numberClick("4")} className="h-12">
                4
              </Button>
              <Button variant="outline" onClick={() => numberClick("5")} className="h-12">
                5
              </Button>
              <Button variant="outline" onClick={() => numberClick("6")} className="h-12">
                6
              </Button>
              <Button variant="outline" onClick={() => operationClick("*")} className="h-12">
                <X className="h-4 w-4" />
              </Button>

              <Button variant="outline" onClick={() => numberClick("1")} className="h-12">
                1
              </Button>
              <Button variant="outline" onClick={() => numberClick("2")} className="h-12">
                2
              </Button>
              <Button variant="outline" onClick={() => numberClick("3")} className="h-12">
                3
              </Button>
              <Button variant="outline" onClick={() => operationClick("-")} className="h-12">
                <Minus className="h-4 w-4" />
              </Button>

              <Button variant="outline" onClick={() => numberClick("0")} className="h-12">
                0
              </Button>
              <Button variant="outline" onClick={() => numberClick(".")} className="h-12">
                .
              </Button>
              <Button variant="outline" onClick={calculateResult} className="h-12">
                <Equal className="h-4 w-4" />
              </Button>
              <Button variant="outline" onClick={() => operationClick("+")} className="h-12">
                <Plus className="h-4 w-4" />
              </Button>

              {/* Дополнительные кнопки */}
              <Button variant="outline" onClick={clear} className="h-12 col-span-2">
                <RotateCcw className="h-4 w-4 mr-2" />
                Очистить
              </Button>
              <Button variant="outline" onClick={() => {
              setDisplay((parseFloat(display) / 100).toString());
            }} className="h-12 col-span-2">
                <Percent className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>;
};
export default Calculator;
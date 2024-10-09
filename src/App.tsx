import { useState } from 'react';
import './App.css';
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ThemeToggle } from '@/components/theme-toggle';
import { useTheme } from '@/components/theme-provider';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const data = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
  { name: 'Jun', value: 700 },
];

const inventoryData = [
  { id: 1, name: 'Widget A', quantity: 100, price: 9.99 },
  { id: 2, name: 'Gadget B', quantity: 50, price: 19.99 },
  { id: 3, name: 'Doohickey C', quantity: 200, price: 5.99 },
  { id: 4, name: 'Thingamajig D', quantity: 75, price: 14.99 },
  { id: 5, name: 'Whatchamacallit E', quantity: 30, price: 24.99 },
];

const columnDefs = [
  { headerName: 'ID', field: 'id', sortable: true, filter: true },
  { headerName: 'Name', field: 'name', sortable: true, filter: true },
  { headerName: 'Quantity', field: 'quantity', sortable: true, filter: true },
  { headerName: 'Price', field: 'price', sortable: true, filter: true, valueFormatter: (params) => `$${params.value.toFixed(2)}` },
];

function App() {
  const [count, setCount] = useState(0);
  const { theme } = useTheme();

  const chartColors = {
    line: theme === 'dark' ? '#10b981' : '#059669',
    grid: theme === 'dark' ? '#374151' : '#e5e7eb',
    text: theme === 'dark' ? '#d1d5db' : '#374151',
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">React TypeScript with shadcn/ui</h1>
        <ThemeToggle />
      </div>
      
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-2">Buttons</h2>
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => setCount(count + 1)}>
              Count is {count}
            </Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">Button Sizes</h2>
          <div className="flex flex-wrap items-center gap-2">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
            </Button>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">Chart</h2>
          <div className="h-64 bg-card p-4 rounded-lg">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
                <XAxis dataKey="name" stroke={chartColors.text} />
                <YAxis stroke={chartColors.text} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
                    borderColor: chartColors.grid,
                    color: chartColors.text
                  }}
                />
                <Legend wrapperStyle={{ color: chartColors.text }} />
                <Line type="monotone" dataKey="value" stroke={chartColors.line} strokeWidth={2} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">Accordion</h2>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Is it styled?</AccordionTrigger>
              <AccordionContent>
                Yes. It comes with default styles that matches the other components' aesthetic.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">Select</h2>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="orange">Orange</SelectItem>
            </SelectContent>
          </Select>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">Inventory Table</h2>
          <div className={`ag-theme-alpine${theme === 'dark' ? '-dark' : ''} h-[400px] w-full`}>
            <AgGridReact
              rowData={inventoryData}
              columnDefs={columnDefs}
              defaultColDef={{
                flex: 1,
                minWidth: 100,
                resizable: true,
              }}
              animateRows={true}
              pagination={true}
              paginationPageSize={10}
            />
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
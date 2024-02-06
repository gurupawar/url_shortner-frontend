"use client";
import React from "react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Calendar } from "./ui/calendar";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const InputComp: React.FC = () => {
  const [show, setShow] = React.useState<boolean>(false);
  const [date, setDate] = React.useState<Date>();
  const [originalUrl, setOriginalUrl] = React.useState<string>("");
  const [shortenedUrl, setShortenedUrl] = React.useState<string>("");
  const [keyword, setKeyword] = React.useState<string>("");
  const today = new Date();

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("Submitted");
    console.log(originalUrl, keyword, date);
  };
  return (
    <div className="w-full mt-10">
      <span className="text-sm">Your long Url</span>
      <div className="flex items-center mt-1">
        <input
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          className="block bg-gray-100 bg-opacity-30 border rounded-sm px-3 border-gray-500 w-full text-white text-opacity-100 py-2 focus:outline-none"
          type="text"
          placeholder="https://wwww.example.com/this-is-a-very-long-url-that-needs-to-be-shortened"
        />
        <Button
          onClick={handleSubmit}
          className="bg-orange-500 text-white rounded-sm py-5 ml-2"
        >
          Shorten URL
        </Button>
      </div>
      <div className="flex items-center justify-center mt-5">
        <Checkbox id="customProperties" onClick={() => setShow(!show)} />
        <label
          htmlFor="customProperties"
          className="ms-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Custom Options
        </label>
      </div>
      {show && (
        <div className="flex items-end  mt-4">
          <div className="w-full">
            <span className="text-sm">Custom Keyword</span>
            <input
              id="keyword"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="mt-2 block w-full bg-gray-100 bg-opacity-30 border rounded-sm px-3 border-gray-500  text-white text-opacity-100 py-2 focus:outline-none"
              type="text"
              placeholder="portfolio"
            />
          </div>
          <div className="ms-2 flex flex-col w-full" style={{ height: "100%" }}>
            <span className="text-sm mb-2">Expiration Date</span>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  style={{ minHeight: "41.6px" }}
                  className="bg-gray-100 bg-opacity-30 text-white rounded-sm py-5 flex justify-start"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  disabled={(date) =>
                    date < new Date(new Date().setHours(0, 0, 0, 0))
                  }
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      )}
    </div>
  );
};

export default InputComp;

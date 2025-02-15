import { Button } from "@/components/ui/button";
export function StartInterview() {
  return (
    <div className="font-montserrat">
      <Button variant="default" className="bg-green-500 dark:bg-green-700 dark:border-green-800 z-[200] text-white fixed font-bold text-lg top-[100%] py-4 border-green-600 border-2 translate-y-[-140%] left-[50%] translate-x-[-50%] hover:bg-green-600 dark:hover:bg-green-800">Start Interview</Button>
    </div>
  );
}

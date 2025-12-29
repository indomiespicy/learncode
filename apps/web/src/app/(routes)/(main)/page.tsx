"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Home = () => {
  return (
    <div className="space-y-4">
      <div className="space-x-6">
        <Button variant="outline">Test</Button>
        <Button size="lg">Test Hello World!</Button>
        <Button asChild size="lg">
          <Link href="/admin">AdminDashboard</Link>
        </Button>
        <Button asChild size="lg">
          <Link href="/learn">Dashboard</Link>
        </Button>
      </div>
      <div className="text-red-400">Hello world!</div>
    </div>
  );
};

export default Home;

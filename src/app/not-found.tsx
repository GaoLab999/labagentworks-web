import { Hero, Button } from "@/components/ui";
export default function NotFound() {
  return (
    <Hero
      eyebrow="404 / Page not found"
      title="Let’s get you back on track."
      description="This page could not be found. Explore our scientific tools or return to the homepage."
    >
      <div className="button-row">
        <Button href="/">Return home</Button>
      </div>
    </Hero>
  );
}

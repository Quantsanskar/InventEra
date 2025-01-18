import { Handshake, MoveRight, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ImageVertical, { InfiniteSliderVertical } from "./InfiniteSliderVertical";

function AboutPage() {
  return (
    <div className="w-full text-white py-20 lg:py-40">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-8 items-center lg:grid-cols-2">
          <div className="flex gap-8 flex-col">
            <div>
              <Badge variant="outline">We&apos;re live!</Badge>
            </div>
            <div className="flex gap-8 flex-col">
              <h1 className="text-5xl md:text-7xl max-w-xl text-left font-medium">
                What is
                <br /> Builder's Space?
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg leading-normal tracking-wide text-left">
                A creative hub for developers, artists, chefs, filmmakers, and more. No degrees, no
                boring lectures—just passion, collaboration, and a community of builders.
              </p>
            </div>
            <div className="flex flex-row gap-8">
              <Button size="lg" className="gap-8" variant="outline">
                Join Us Now
                <Handshake className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="bg-muted rounded-md aspect-square">
            <InfiniteSliderVertical />
          </div>
        </div>
       
      </div>
    </div>
  );
}

export { AboutPage };

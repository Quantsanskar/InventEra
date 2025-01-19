import { InfiniteSlider } from "@/components/ui/infinite-slider";

export function InfiniteSliderVertical() {
  return (
    <div className="flex h-full space-x-2 sm:space-x-4 lg:space-x-8 mx-auto">
      <InfiniteSlider direction="vertical">
        <img
          src="/carousel/1.jpg"
          alt="Dean blunt - Black Metal 2"
          className="w-[200px] sm:w-[250px] md:w-[300px] lg:w-[350px] rounded-[4px] object-cover"
        />
        <img
          src="/carousel/2.jpg"
          alt="Jungle Jack - JUNGLE DES ILLUSIONS VOL 2"
          className="w-[200px] sm:w-[250px] md:w-[300px] lg:w-[350px] rounded-[4px] object-cover"
        />
        <img
          src="/carousel/3.png"
          alt="Yung Lean - Stardust"
          className="w-[200px] sm:w-[250px] md:w-[300px] lg:w-[350px] rounded-[4px] object-cover"
        />
        <img
          src="/carousel/4.PNG"
          alt="Lana Del Rey - Ultraviolence"
          className="w-[200px] sm:w-[250px] md:w-[300px] lg:w-[350px] rounded-[4px] object-cover"
        />
        <img
          src="/carousel/5.jpg"
          alt="A$AP Rocky - Tailor Swif"
          className="w-[200px] sm:w-[250px] md:w-[300px] lg:w-[350px] rounded-[4px] object-cover"
        />
        <img
          src="/carousel/6.jpg"
          alt="Midnight Miami (feat Konvy) - Nino Paid, Konvy"
          className="w-[200px] sm:w-[250px] md:w-[300px] lg:w-[350px] rounded-[4px] object-cover"
        />
        <img
          src="/carousel/8.jpg"
          alt="You're in My System - TORYONTHEBEAT"
          className="w-[200px] sm:w-[250px] md:w-[300px] lg:w-[350px] rounded-[4px] object-cover"
        />
        <img
          src="/carousel/9.jpg"
          alt="You can't tell me - People Make the World Go Round"
          className="w-[200px] sm:w-[250px] md:w-[300px] lg:w-[350px] rounded-[4px] object-cover"
        />
        <img src="/carousel/10.jpg" alt="ye - Kanye West" className="w-[200px] sm:w-[250px] md:w-[300px] lg:w-[350px] rounded-[4px] object-cover" />
        <img
          src="/carousel/11.jpg"
          alt="Slime Season 3 - Young Thug"
          className="w-[200px] sm:w-[250px] md:w-[300px] lg:w-[350px] rounded-[4px] object-cover"
        />
        <img src="/carousel/12.jpeg" alt="SWAG - 8ruki" className="w-[200px] sm:w-[250px] md:w-[300px] lg:w-[350px] rounded-[4px] object-cover" />
      </InfiniteSlider>
      <InfiniteSlider direction="vertical" reverse>
        <img
          src="/carousel/1.jpg"
          alt="Dean blunt - Black Metal 2"
          className="w-[200px] sm:w-[250px] md:w-[300px] lg:w-[350px] rounded-[4px] object-cover"
        />
        <img
          src="/carousel/2.jpg"
          alt="Jungle Jack - JUNGLE DES ILLUSIONS VOL 2"
          className="w-[200px] sm:w-[250px] md:w-[300px] lg:w-[350px] rounded-[4px] object-cover"
        />
        <img
          src="/carousel/3.png"
          alt="Yung Lean - Stardust"
          className="w-[200px] sm:w-[250px] md:w-[300px] lg:w-[350px] rounded-[4px] object-cover"
        />
        <img
          src="/carousel/4.PNG"
          alt="Lana Del Rey - Ultraviolence"
          className="w-[200px] sm:w-[250px] md:w-[300px] lg:w-[350px] rounded-[4px] object-cover"
        />
        <img
          src="/carousel/5.jpg"
          alt="A$AP Rocky - Tailor Swif"
          className="w-[200px] sm:w-[250px] md:w-[300px] lg:w-[350px] rounded-[4px] object-cover"
        />
        <img
          src="/carousel/6.jpg"
          alt="Midnight Miami (feat Konvy) - Nino Paid, Konvy"
          className="w-[200px] sm:w-[250px] md:w-[300px] lg:w-[350px] rounded-[4px] object-cover"
        />
        <img
          src="/carousel/8.jpg"
          alt="You're in My System - TORYONTHEBEAT"
          className="w-[200px] sm:w-[250px] md:w-[300px] lg:w-[350px] rounded-[4px] object-cover"
        />
        <img
          src="/carousel/9.jpg"
          alt="You can't tell me - People Make the World Go Round"
          className="w-[200px] sm:w-[250px] md:w-[300px] lg:w-[350px] rounded-[4px] object-cover"
        />
        <img src="/carousel/10.jpg" alt="ye - Kanye West" className="w-[200px] sm:w-[250px] md:w-[300px] lg:w-[350px] rounded-[4px] object-cover" />
        <img
          src="/carousel/11.jpg"
          alt="Slime Season 3 - Young Thug"
          className="w-[200px] sm:w-[250px] md:w-[300px] lg:w-[350px] rounded-[4px] object-cover"
        />
        <img src="/carousel/12.jpeg" alt="SWAG - 8ruki" className="w-[200px] sm:w-[250px] md:w-[300px] lg:w-[350px] rounded-[4px] object-cover" />
      </InfiniteSlider>
    </div>
  );
}

import LogoLoop from "./LogoLoop";

// Import brand logos
import tataLogo from "../assets/brands/tata.png";
import miLogo from "../assets/brands/mi.png";
import myntraLogo from "../assets/brands/myntra.png";
import flipkartLogo from "../assets/brands/flipkart.png";
import hotstarLogo from "../assets/brands/hotstar.png";
import zee5Logo from "../assets/brands/zee5.png";
import sonylivLogo from "../assets/brands/sonyliv.png";
import zeptoLogo from "../assets/brands/zepto.png";
import naukriLogo from "../assets/brands/naukri.png";
import unacademyLogo from "../assets/brands/unacademy.png";

// Combined brands from WLDD and Creative Fuel - mix of logos and text
const brandItems = [
    { name: "TATA", type: "logo", src: tataLogo },
    { name: "MI", type: "logo", src: miLogo },
    { name: "Myntra", type: "logo", src: myntraLogo },
    { name: "Flipkart", type: "logo", src: flipkartLogo },
    { name: "Disney+ Hotstar", type: "logo", src: hotstarLogo },
    { name: "Zee5", type: "logo", src: zee5Logo },
    { name: "Sony Liv", type: "logo", src: sonylivLogo },
    { name: "Zepto", type: "logo", src: zeptoLogo },
    { name: "Naukri.com", type: "logo", src: naukriLogo },
    { name: "Unacademy", type: "logo", src: unacademyLogo },
    { name: "Abhilash Thapiyal", type: "text" },
    { name: "Avatar Re-release", type: "text" },
    { name: "Baskin Robbins", type: "text" },
    { name: "Bigg Boss", type: "text" },
    { name: "Bingo!", type: "text" },
    { name: "Bindiya", type: "text" },
    { name: "Clensta", type: "text" },
    { name: "Collective Artist", type: "text" },
    { name: "Danube Properties", type: "text" },
    { name: "DDPD 2", type: "text" },
    { name: "Dot & Key", type: "text" },
    { name: "Flenc Cosmetics", type: "text" },
    { name: "India's Biggest Foodie", type: "text" },
    { name: "JioHotstar – The 50", type: "text" },
    { name: "Jurassic Hindi", type: "text" },
    { name: "Jurassic World Rebirth", type: "text" },
    { name: "Loventure", type: "text" },
    { name: "Mad Umbrella", type: "text" },
    { name: "Markets 4 You", type: "text" },
    { name: "Metaman", type: "text" },
    { name: "Minutes", type: "text" },
    { name: "Oppo", type: "text" },
    { name: "Palmonas", type: "text" },
    { name: "Priyagold", type: "text" },
    { name: "Rizwan PR", type: "text" },
    { name: "Rizwan Sajan", type: "text" },
    { name: "Shark Tank India", type: "text" },
    { name: "Simpl", type: "text" },
    { name: "Single Papa", type: "text" },
    { name: "Sunburn DJ Snake", type: "text" },
    { name: "Sunfeast YiPPee!", type: "text" },
    { name: "Tira", type: "text" },
    { name: "Vijay Subramanium", type: "text" },
    { name: "Welcome to Derry", type: "text" }
];

const brandLogos = brandItems.map((item) => ({
    title: item.name,
    node: item.type === "logo" ? (
        <div className="brand-logo-container">
            <img src={item.src} alt={item.name} className="brand-logo" />
        </div>
    ) : (
        <div className="campaign-pill">{item.name}</div>
    )
}));

export default function CampaignLogoLoop() {
    return (
        <section className="logo-loop-wrapper">
            <h3 className="logo-loop-title">Brands I've Worked With</h3>

            {/* Row 1 */}
            <LogoLoop
                logos={brandLogos}
                speed={80}
                direction="left"
                gap={32}
                hoverSpeed={20}
                scaleOnHover
                ariaLabel="Brands worked with"
            />

            {/* Row 2 (reverse for premium feel) */}
            <LogoLoop
                logos={brandLogos}
                speed={60}
                direction="right"
                gap={32}
                hoverSpeed={15}
                scaleOnHover
                ariaLabel="Brands worked with"
            />
        </section>
    );
}

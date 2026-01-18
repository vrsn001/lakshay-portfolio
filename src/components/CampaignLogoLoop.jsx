import LogoLoop from "./LogoLoop";

// Combined brands from WLDD and Creative Fuel (alphabetically sorted, duplicates removed)
const brands = [
    "Abhilash Thapiyal",
    "Avatar Re-release",
    "Baskin Robbins",
    "Bigg Boss",
    "Bingo!",
    "Bindiya",
    "Clensta",
    "DDPD 2",
    "Disney+ Hotstar",
    "Dot & Key",
    "Flipkart",
    "Flenc Cosmetics",
    "India's Biggest Foodie",
    "JioHotstar – The 50",
    "Jurassic Hindi",
    "Jurassic World Rebirth",
    "LinkedIn VS",
    "Loventure",
    "Mad Umbrella",
    "Markets 4 You",
    "Metaman",
    "MI",
    "Minutes",
    "Myntra",
    "Naukri.com",
    "Oppo Barcode",
    "Palmonas",
    "Priyagold",
    "Rizwan PR",
    "Rizwan Round 4",
    "Shark Tank India",
    "Simpl",
    "Single Papa",
    "Sony Liv",
    "Sunburn DJ Snake",
    "Sunfeast YiPPee!",
    "TATA",
    "Tira",
    "Unacademy",
    "Vijay Subramanium",
    "Welcome to Derry",
    "Zepto",
    "Zee5"
];


const brandLogos = brands.map((name) => ({
    title: name,
    node: <div className="campaign-pill">{name}</div>
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
                fadeOut
                fadeOutColor="#f5f0e1"
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
                fadeOut
                fadeOutColor="#f5f0e1"
                ariaLabel="Brands worked with"
            />
        </section>
    );
}

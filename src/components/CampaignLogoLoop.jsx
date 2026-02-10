import LogoLoop from "./LogoLoop";

// All brands and campaigns as text pills - clean vintage typography
const brandItems = [
    // Major Brands (previously logos)
    { name: "TATA" },
    { name: "Xiaomi" },
    { name: "Myntra" },
    { name: "Flipkart" },
    { name: "Disney+ Hotstar" },
    { name: "ZEE5" },
    { name: "SonyLIV" },
    { name: "Zepto" },
    { name: "Naukri.com" },
    { name: "Unacademy" },
    // Campaigns & Other Brands
    { name: "Abhilash Thapiyal" },
    { name: "Avatar Re-release" },
    { name: "Baskin Robbins" },
    { name: "Bigg Boss" },
    { name: "Bingo!" },
    { name: "Bindiya" },
    { name: "Clensta" },
    { name: "Collective Artist" },
    { name: "Danube Properties" },
    { name: "Luv Films (DDPD 2)" },
    { name: "Dot & Key" },
    { name: "Flenc Cosmetics" },
    { name: "India's Biggest Foodie" },
    { name: "JioHotstar – The 50" },
    { name: "Jurassic Hindi" },
    { name: "Jurassic World Rebirth" },
    { name: "Loventure" },
    { name: "Mad Umbrella" },
    { name: "Markets 4 You" },
    { name: "Metaman" },
    { name: "Flipkart Minutes" },
    { name: "Oppo" },
    { name: "Palmonas" },
    { name: "Priyagold" },
    { name: "Rizwan PR" },
    { name: "Rizwan Sajan" },
    { name: "Shark Tank India" },
    { name: "Simpl" },
    { name: "Single Papa" },
    { name: "Sunburn DJ Snake" },
    { name: "Sunfeast YiPPee!" },
    { name: "Tira" },
    { name: "Vijay Subramanium" },
    { name: "Welcome to Derry" },
    { name: "Beco" },
    { name: "How to Train Your Dragon" },
    { name: "Stree 2 (Maddock Films)" },
    { name: "Thamma (Maddock Films)" },
    { name: "Dil Lagana Mana Tha" },
    { name: "MX Player" },
    { name: "Amazon Prime" },
    { name: "Mirzapur S2" },
    { name: "Meesho" },
    { name: "Netflix" }
];

const brandLogos = brandItems.map((item) => ({
    title: item.name,
    node: <div className="campaign-pill">{item.name}</div>
}));

export default function CampaignLogoLoop() {
    return (
        <section className="logo-loop-wrapper">
            <h3 className="logo-loop-title">Brands I've Worked With</h3>

            {/* Row 1 */}
            <LogoLoop
                logos={brandLogos}
                speed={120}
                direction="left"
                gap={32}
                hoverSpeed={30}
                scaleOnHover
                ariaLabel="Brands worked with"
            />

            {/* Row 2 (reverse for premium feel) */}
            <LogoLoop
                logos={brandLogos}
                speed={100}
                direction="right"
                gap={32}
                hoverSpeed={25}
                scaleOnHover
                ariaLabel="Brands worked with"
            />
        </section>
    );
}

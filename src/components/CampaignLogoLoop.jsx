import LogoLoop from "./LogoLoop";

const campaigns = [
    "Bigg Boss",
    "Rizwan Round 4",
    "Priyagold",
    "Abhilash Thapiyal",
    "DDPD 2",
    "Mad Umbrella",
    "Tira",
    "Avatar Re-release",
    "Vijay Subramanium",
    "Rizwan PR",
    "Welcome to Derry",
    "Dot & Key",
    "Bindiya",
    "Loventure",
    "Flenc Cosmetics",
    "Sunburn DJ Snake",
    "India's Biggest Foodie",
    "Markets 4 You",
    "Jurassic World Rebirth",
    "Jurassic Hindi",
    "Naukri.com",
    "Zee5",
    "Baskin Robbins",
    "Single Papa",
    "LinkedIn VS",
    "Oppo Barcode",
    "JioHotstar – The 50"
];

const campaignLogos = campaigns.map((name) => ({
    title: name,
    node: <div className="campaign-pill">{name}</div>
}));

export default function CampaignLogoLoop() {
    return (
        <section className="logo-loop-wrapper">
            {/* Row 1 */}
            <LogoLoop
                logos={campaignLogos}
                speed={80}
                direction="left"
                gap={32}
                hoverSpeed={20}
                scaleOnHover
                fadeOut
                fadeOutColor="#f5f0e1"
                ariaLabel="Campaigns worked on"
            />

            {/* Row 2 (reverse for premium feel) */}
            <LogoLoop
                logos={campaignLogos}
                speed={60}
                direction="right"
                gap={32}
                hoverSpeed={15}
                scaleOnHover
                fadeOut
                fadeOutColor="#f5f0e1"
                ariaLabel="Campaigns worked on"
            />
        </section>
    );
}
